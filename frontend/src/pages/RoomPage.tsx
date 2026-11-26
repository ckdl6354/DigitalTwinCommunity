import { useEffect, useMemo, useState } from "react";
import "./RoomPage.css";
import {getRooms,createRoom,getRoomOccupancy} from "../api/roomApi";
import type {Room,RoomCreateRequest} from "../api/roomApi";

function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=> {
    let isMounted = true;

    const loadRooms = async () => {
      try{
        setLoading(true);
        setError("");

        const data = await getRooms();

        const roomsWithOccupancy = await Promise.all(
          data.map(async (room)=>{
            try{
              const occupied = await getRoomOccupancy(room.id);
              return {...room,occupied};
            }catch {
              return {...room,occupied:0};
            }
          })
        );
      if(isMounted){
        setRooms(roomsWithOccupancy);
      }
    }catch(err){
      console.error("객실 목록 조회 실패:",err);

      if(isMounted){
        setError("객실 정보를 불러오지 못했습니다.");
      }
    }finally{
      if(isMounted){
        setLoading(false);
      }
    }
  };
    void loadRooms();
    return ()=>{
      isMounted = false;
    };
  },[]);
  

  const [form, setForm] = useState({
    roomNumber: "",
    floor: "1",
    roomType: "1인실",
    capacity: "1",
    area: "24",
    status: "공실" as Room["status"],
  });

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch = room.roomNumber
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFloor =
        floorFilter === "전체" || room.floor === Number(floorFilter);

      const matchesStatus =
        statusFilter === "전체" || room.status === statusFilter;

      return matchesSearch && matchesFloor && matchesStatus;
    });
  }, [rooms, search, floorFilter, statusFilter]);

  const occupiedRooms = rooms.filter(
    (room) => room.status === "사용 중"
  ).length;

  const vacantRooms = rooms.filter(
    (room) => room.status === "공실"
  ).length;

  const maintenanceRooms = rooms.filter(
    (room) => room.status === "점검 중"
  ).length;

  const totalCapacity = rooms.reduce(
    (sum, room) => sum + room.capacity,
    0
  );

  const totalOccupied = rooms.reduce(
    (sum, room) => sum + room.occupied,
    0
  );

  const handleRoomTypeChange = (roomType: string) => {
    const capacity = roomType === "2인실" ? "2" : "1";
    const area = roomType === "특실" ? "42" : roomType === "2인실" ? "34" : "24";

    setForm({
      ...form,
      roomType,
      capacity,
      area,
    });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const roomNumber = form.roomNumber.trim();

    if (!roomNumber) {
      alert("객실 번호를 입력해 주세요.");
      return;
    }

    const duplicate = rooms.some(
      (room) => room.roomNumber === roomNumber
    );

    if (duplicate) {
      alert("이미 등록된 객실 번호입니다.");
      return;
    }

    const newRoom: RoomCreateRequest = {
      roomNumber,
      floor : Number(form.floor),
      roomType:form.roomType,
      capacity:Number(form.capacity),
      area:Number(form.area),
      status:form.status,
    };
    try{

      const savedRoom = await createRoom(newRoom);
      setRooms((previous) => [...previous, {...savedRoom,occupied:0},]);

      setSearch("");
      setFloorFilter("전체");
      setStatusFilter("전체");

      setForm({
        roomNumber: "",
        floor: "1",
        roomType: "1인실",
        capacity: "1",
        area: "24",
        status: "공실",
      });
      setIsModalOpen(false);
    }catch (error) {
      console.error("객실 등로 실패:",error)
      alert("객실 등록에 실패했습니다. 백엔드 콘솔을 확인 해 주세요.");
    }
  };
  

  const getStatusClass = (status: Room["status"]) => {
    if (status === "사용 중") return "room-status-active";
    if (status === "공실") return "room-status-vacant";
    return "room-status-maintenance";
  };

  return (
    <div className="room-page">
      <section className="room-page-heading">
        <div>
          <span className="room-eyebrow">ROOM MANAGEMENT</span>
          <h1>객실 관리</h1>
          <p>객실 배치와 입주 현황 및 객실 운영 상태를 관리합니다.</p>
        </div>

        <button
          className="room-primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span>＋</span> 객실 등록
        </button>
      </section>

      <section className="room-summary">
        <article className="room-summary-card">
          <div className="room-summary-label">
            <span>전체 객실</span>
            <span className="room-summary-icon green">▤</span>
          </div>
          <strong>{rooms.length}<small>실</small></strong>
          <p>등록된 전체 객실 수</p>
        </article>

        <article className="room-summary-card">
          <div className="room-summary-label">
            <span>사용 중</span>
            <span className="room-summary-icon blue">♙</span>
          </div>
          <strong>{occupiedRooms}<small>실</small></strong>
          <p>입주민이 배정된 객실</p>
        </article>

        <article className="room-summary-card">
          <div className="room-summary-label">
            <span>공실</span>
            <span className="room-summary-icon orange">⌂</span>
          </div>
          <strong>{vacantRooms}<small>실</small></strong>
          <p>입주 가능한 객실</p>
        </article>

        <article className="room-summary-card">
          <div className="room-summary-label">
            <span>점검 중</span>
            <span className="room-summary-icon purple">⚙</span>
          </div>
          <strong>{maintenanceRooms}<small>실</small></strong>
          <p>시설 확인이 필요한 객실</p>
        </article>
      </section>

      <section className="room-capacity-panel">
        <div className="room-capacity-info">
          <div>
            <span className="room-eyebrow">ROOM CAPACITY</span>
            <h2>전체 객실 정원 현황</h2>
            <p>객실에 배정된 입주 인원 기준</p>
          </div>
          <strong>
            {totalOccupied}
            <small> / {totalCapacity}명</small>
          </strong>
        </div>

        <div className="room-capacity-track">
          <div
            className="room-capacity-fill"
            style={{
              width: `${
                totalCapacity === 0
                  ? 0
                  : (totalOccupied / totalCapacity) * 100
              }%`,
            }}
          />
        </div>

        <div className="room-capacity-bottom">
          <span>정원 사용률</span>
          <strong>
            {totalCapacity === 0
              ? "0"
              : ((totalOccupied / totalCapacity) * 100).toFixed(1)}
            %
          </strong>
        </div>
      </section>

      <section className="room-list-panel">
        <div className="room-list-heading">
          <div>
            <h2>객실 목록</h2>
            <p>등록된 객실의 상세 정보를 확인할 수 있습니다.</p>
          </div>
          <span className="room-list-count">
            총 {filteredRooms.length}실
          </span>
        </div>

        <div className="room-toolbar">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="객실 번호 검색"
            aria-label="객실 번호 검색"
          />

          <select
            value={floorFilter}
            onChange={(event) => setFloorFilter(event.target.value)}
            aria-label="층별 필터"
          >
            <option value="전체">전체 층</option>
            <option value="1">1층</option>
            <option value="2">2층</option>
            <option value="3">3층</option>
            <option value="4">4층</option>
            <option value="5">5층</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="객실 상태 필터"
          >
            <option value="전체">전체 상태</option>
            <option value="사용 중">사용 중</option>
            <option value="공실">공실</option>
            <option value="점검 중">점검 중</option>
          </select>
        </div>

        <div className="room-table-wrap">
          <table className="room-table">
            <thead>
              <tr>
                <th>객실 번호</th>
                <th>층</th>
                <th>객실 유형</th>
                <th>입주 현황</th>
                <th>면적</th>
                <th>객실 상태</th>
              </tr>
            </thead>

            <tbody>
            {loading ?(
              <tr>
                <td colSpan={6} className="room-empty">
                  객실 정보를 불러오는 중입니다...
                </td>
              </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="room-empty">
                    {error}
                  </td>
                </tr>
              ) : filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room.id}>
                    <td>
                      <strong className="room-number">
                        {room.roomNumber}
                      </strong>
                    </td>
                    <td>{room.floor}층</td>
                    <td>{room.roomType}</td>
                    <td>
                      <div className="room-occupancy">
                        <span className="room-occupancy-track">
                          <span
                            style={{
                              width: `${(room.occupied / room.capacity) * 100}%`,
                            }}
                          />
                        </span>
                        <span>
                          {room.occupied}/{room.capacity}명
                        </span>
                      </div>
                    </td>
                    <td>{room.area}㎡</td>
                    <td>
                      <span
                        className={`room-status ${getStatusClass(room.status)}`}
                      >
                        {room.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="room-empty">
                    검색 조건에 맞는 객실이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="room-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            className="room-modal"
            onSubmit={handleRegister}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="room-modal-heading">
              <div>
                <span className="room-eyebrow">NEW ROOM</span>
                <h2>객실 등록</h2>
              </div>
              <button
                type="button"
                className="room-close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            <label>
              객실 번호
              <input
                required
                maxLength={10}
                value={form.roomNumber}
                onChange={(event) =>
                  setForm({ ...form, roomNumber: event.target.value })
                }
                placeholder="예: 201호"
              />
            </label>

            <div className="room-form-row">
              <label>
                층
                <select
                  value={form.floor}
                  onChange={(event) =>
                    setForm({ ...form, floor: event.target.value })
                  }
                >
                  <option value="1">1층</option>
                  <option value="2">2층</option>
                  <option value="3">3층</option>
                  <option value="4">4층</option>
                  <option value="5">5층</option>
                </select>
              </label>

              <label>
                객실 유형
                <select
                  value={form.roomType}
                  onChange={(event) =>
                    handleRoomTypeChange(event.target.value)
                  }
                >
                  <option value="1인실">1인실</option>
                  <option value="2인실">2인실</option>
                  <option value="특실">특실</option>
                </select>
              </label>
            </div>

            <div className="room-form-row">
              <label>
                정원
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={form.capacity}
                  onChange={(event) =>
                    setForm({ ...form, capacity: event.target.value })
                  }
                />
              </label>

              <label>
                면적 (㎡)
                <input
                  type="number"
                  min="1"
                  required
                  value={form.area}
                  onChange={(event) =>
                    setForm({ ...form, area: event.target.value })
                  }
                />
              </label>
            </div>

            <label>
              객실 상태
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target.value as Room["status"],
                  })
                }
              >
                <option value="공실">공실</option>
                <option value="점검 중">점검 중</option>
                <option value="사용 중">사용 중</option>
              </select>
            </label>

            <div className="room-modal-actions">
              <button
                type="button"
                className="room-cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button type="submit" className="room-primary-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RoomPage;
