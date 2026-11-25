
import { useMemo, useState } from "react";
import "./ResidentPage.css";

type Resident = {
  id: number;
  name: string;
  gender: string;
  age: number;
  roomNumber: string;
  careLevel: string;
  status: string;
};

const initialResidents: Resident[] = [
  { id: 1, name: "김민수", gender: "남성", age: 78, roomNumber: "301호", careLevel: "일반", status: "입주 중" },
  { id: 2, name: "이영희", gender: "여성", age: 82, roomNumber: "302호", careLevel: "집중", status: "입주 중" },
  { id: 3, name: "박철수", gender: "남성", age: 75, roomNumber: "203호", careLevel: "일반", status: "입주 중" },
  { id: 4, name: "최정숙", gender: "여성", age: 86, roomNumber: "405호", careLevel: "주의", status: "외출 중" },
  { id: 5, name: "정동현", gender: "남성", age: 80, roomNumber: "502호", careLevel: "일반", status: "입주 중" },
  { id: 6, name: "한미자", gender: "여성", age: 79, roomNumber: "105호", careLevel: "집중", status: "퇴소" },
];

function ResidentPage() {
  const [residents, setResidents] = useState(initialResidents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    gender: "여성",
    age: "",
    roomNumber: "",
    careLevel: "일반",
  });

  const filteredResidents = useMemo(() => {
    return residents.filter((resident) => {
      const matchesSearch =
        resident.name.includes(search.trim()) ||
        resident.roomNumber.includes(search.trim());

      const matchesStatus =
        statusFilter === "전체" || resident.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [residents, search, statusFilter]);

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newResident: Resident = {
      id: Math.max(0, ...residents.map((resident) => resident.id)) + 1,
      name: form.name.trim(),
      gender: form.gender,
      age: Number(form.age),
      roomNumber: form.roomNumber.trim(),
      careLevel: form.careLevel,
      status: "입주 중",
    };

    setResidents((previous) => [...previous, newResident]);
    setForm({
      name: "",
      gender: "여성",
      age: "",
      roomNumber: "",
      careLevel: "일반",
    });
    setIsModalOpen(false);
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
              {filteredResidents.length > 0 ? (
                filteredResidents.map((resident) => (
                  <tr key={resident.id}>
                    <td>{resident.id}</td>
                    <td>
                      <strong className="resident-name">
                        {resident.name}
                      </strong>
                    </td>
                    <td>{resident.gender}</td>
                    <td>{resident.age}세</td>
                    <td>{resident.roomNumber}</td>
                    <td>
                      <span className="care-level">
                        {resident.careLevel}
                      </span>
                    </td>
                    <td>
                      <span className={`resident-status ${getStatusClass(resident.status)}`}>
                        {resident.status}
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
