import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./ResidentPage.css";

import { getResidents, createResident } from "../api/residentApi";
import type { Resident } from "../types/resident";


function ResidentPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [residents,setResidents] = useState<Resident[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{
    let isMounted = true;
    const loadResidents = async () =>{
      try{
        setLoading(true);
        setError("");
        const data = await getResidents();
        if(isMounted){
          setResidents(data);
        }
      }catch(error){
        console.error("입주민 목록 조회 실패:",error);
        if(isMounted){
          setError("입주민 목록을 불러오지 못했습니다. 백엔드 서버를 확인해 주세요.");
        }
      }finally{
        if(isMounted){
          setLoading(false);
        }
      }
    };
    void loadResidents();

    return () => {
      isMounted = false;
    };
  },[]);

  const [form, setForm] = useState({
    name: "",
    gender: "여성",
    age: "",
    roomNumber: "",
    careLevel: "일반",
  });

  const filteredResidents = useMemo(()=>{
    return residents.filter((resident)=>{
      const keyword = search.trim().toLowerCase();

      const matchesSearch  = resident.name.toLowerCase().includes(keyword) || (resident.roomNumber ?? "").toLowerCase().includes(keyword);
    
      const matchesStatus = statusFilter == "전체" || resident.status == statusFilter;

      return matchesSearch && matchesStatus;
    });
  },[residents,search,statusFilter]);

  const handleRegister = async (
    event:FormEvent<HTMLFormElement>
  ) =>{
    event.preventDefault();
    setError("");
    

    const newResident = {
      name : form.name.trim(),
      gender: form.gender,
      age:Number(form.age),
      roomNumber:form.roomNumber.trim(),
      careLevel:form.careLevel,
      status:"입주 중",
    };
    try{
      const savedResident = await createResident(newResident);

      // 서버에서 받은 실제 저장 결과 사용
      setResidents((previous)=>[
        savedResident,
        ...previous,
      ]);
        setForm({
          name:"",
          gender:"여성",
          age:"",
          roomNumber:"",
          careLevel:"일반",
        });
        setIsModalOpen(false);
    }catch(error){
      console.error("입주민 등록 실패:",error);
      setError(
        "입주민 등록에 실패했습니다. 서버 로그를 확인해주세요."
      );
    }
  };


  const activeCount = residents.filter(
    (resident) => resident.status === "입주 중"
  ).length;

  const outingCount = residents.filter(
    (resident) => resident.status === "외출 중"
  ).length;

  const getStatusClass = (status: string) => {
    if (status === "입주 중") return "resident-active";
    if (status === "외출 중") return "resident-outing";
    return "resident-left";
  };

  return (
    <div className="resident-page">
      <section className="resident-heading">
        <div>
          <span className="resident-eyebrow">RESIDENT MANAGEMENT</span>
          <h1>입주민 관리</h1>
          <p>입주민 정보와 생활 상태를 확인하고 관리합니다.</p>
        </div>

        <button
          className="resident-primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span>＋</span> 입주민 등록
        </button>
      </section>

      <section className="resident-summary">
        <article>
          <span>전체 등록 인원</span>
          <strong>{residents.length}<small>명</small></strong>
        </article>
        <article>
          <span>입주 중</span>
          <strong>{activeCount}<small>명</small></strong>
        </article>
        <article>
          <span>외출 중</span>
          <strong>{outingCount}<small>명</small></strong>
        </article>
      </section>

      <section className="resident-list-panel">
        <div className="resident-list-heading">
          <div>
            <h2>입주민 목록</h2>
            <p>등록된 입주민 정보를 확인할 수 있습니다.</p>
          </div>
          <span className="resident-total">
            총 {filteredResidents.length}명
          </span>
        </div>

        <div className="resident-toolbar">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="이름 또는 객실 번호 검색"
            aria-label="이름 또는 객실 번호 검색"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="입주 상태 필터"
          >
            <option value="전체">전체 상태</option>
            <option value="입주 중">입주 중</option>
            <option value="외출 중">외출 중</option>
            <option value="퇴소">퇴소</option>
          </select>
        </div>

        <div className="resident-table-wrap">
          <table className="resident-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>입주민</th>
                <th>성별</th>
                <th>나이</th>
                <th>객실</th>
                <th>돌봄 등급</th>
                <th>입주 상태</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="resident-empty">
                      입주민 정보를 불러오는 중입니다...
                  </td>
                </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="resident-empty">
                      {error}
                    </td>
                  </tr>
              ) : filteredResidents.length > 0 ? (
                filteredResidents.map((resident) => (
                  <tr key={resident.id}>
                    <td>{resident.id}</td>
                    <td>
                      <strong className="resident-name">
                        {resident.name}
                      </strong>
                    </td>
                    <td>{resident.gender || "-"}</td>
                    <td>{resident.age ?? "-"}{resident.age != null ? "세":""}</td>
                    <td>{resident.roomNumber || "-"}</td>
                    <td>
                      <span className="care-level">
                        {resident.careLevel || "미지정"}
                      </span>
                    </td>
                    <td>
                      <span className={`resident-status ${getStatusClass(resident.status || "")}`}>
                        {resident.status || "미지정"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="resident-empty" colSpan={7}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="resident-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            className="resident-modal"
            onSubmit={handleRegister}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="resident-modal-heading">
              <div>
                <span className="resident-eyebrow">NEW RESIDENT</span>
                <h2>입주민 등록</h2>
              </div>
              <button
                type="button"
                className="resident-close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            <label>
              이름
              <input
                required
                maxLength={30}
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="입주민 이름"
              />
            </label>

            <div className="resident-form-row">
              <label>
                성별
                <select
                  value={form.gender}
                  onChange={(event) =>
                    setForm({ ...form, gender: event.target.value })
                  }
                >
                  <option>여성</option>
                  <option>남성</option>
                </select>
              </label>

              <label>
                나이
                <input
                  required
                  type="number"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={(event) =>
                    setForm({ ...form, age: event.target.value })
                  }
                  placeholder="나이"
                />
              </label>
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
                placeholder="예: 301호"
              />
            </label>

            <label>
              돌봄 등급
              <select
                value={form.careLevel}
                onChange={(event) =>
                  setForm({ ...form, careLevel: event.target.value })
                }
              >
                <option>일반</option>
                <option>주의</option>
                <option>집중</option>
              </select>
            </label>

            <div className="resident-modal-actions">
              <button
                type="button"
                className="resident-cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button type="submit" className="resident-primary-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResidentPage;
