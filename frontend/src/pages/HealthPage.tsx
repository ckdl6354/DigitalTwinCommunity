
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./HealthPage.css";

type HealthRecord = {
  id: number;
  residentName: string;
  roomNumber: string;
  measurementType: string;
  measurementValue: string;
  measurementUnit: string;
  recordedAt: string;
  memo: string;
};

const initialRecords: HealthRecord[] = [
  {
    id: 1,
    residentName: "김민수",
    roomNumber: "301호",
    measurementType: "혈압",
    measurementValue: "120/80",
    measurementUnit: "mmHg",
    recordedAt: "2026-11-25",
    memo: "정기 건강 측정",
  },
  {
    id: 2,
    residentName: "이영희",
    roomNumber: "302호",
    measurementType: "체온",
    measurementValue: "36.5",
    measurementUnit: "°C",
    recordedAt: "2026-11-25",
    memo: "일상 건강 기록",
  },
  {
    id: 3,
    residentName: "박철수",
    roomNumber: "203호",
    measurementType: "맥박",
    measurementValue: "72",
    measurementUnit: "bpm",
    recordedAt: "2026-11-25",
    memo: "정기 측정",
  },
  {
    id: 4,
    residentName: "최정숙",
    roomNumber: "405호",
    measurementType: "혈당",
    measurementValue: "105",
    measurementUnit: "mg/dL",
    recordedAt: "2026-11-24",
    memo: "식후 측정",
  },
  {
    id: 5,
    residentName: "정동현",
    roomNumber: "502호",
    measurementType: "체중",
    measurementValue: "63.5",
    measurementUnit: "kg",
    recordedAt: "2026-11-24",
    memo: "정기 측정",
  },
  {
    id: 6,
    residentName: "한미자",
    roomNumber: "105호",
    measurementType: "혈압",
    measurementValue: "118/76",
    measurementUnit: "mmHg",
    recordedAt: "2026-11-23",
    memo: "정기 건강 측정",
  },
  {
    id: 7,
    residentName: "김민수",
    roomNumber: "301호",
    measurementType: "체온",
    measurementValue: "36.6",
    measurementUnit: "°C",
    recordedAt: "2026-11-23",
    memo: "일상 건강 기록",
  },
];

const measurementTypes = [
  "혈압",
  "체온",
  "맥박",
  "혈당",
  "체중",
  "기타",
];

const residentOptions = [
  { name: "김민수", room: "301호" },
  { name: "이영희", room: "302호" },
  { name: "박철수", room: "203호" },
  { name: "최정숙", room: "405호" },
  { name: "정동현", room: "502호" },
  { name: "한미자", room: "105호" },
];

function getLocalDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function HealthPage() {
  const [records, setRecords] = useState<HealthRecord[]>(initialRecords);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [dateFilter, setDateFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    residentName: "김민수",
    measurementType: "혈압",
    measurementValue: "",
    measurementUnit: "mmHg",
    recordedAt: getLocalDate(),
    memo: "",
  });

  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => {
        const keyword = search.trim().toLowerCase();

        const matchesSearch =
          record.residentName.toLowerCase().includes(keyword) ||
          record.roomNumber.toLowerCase().includes(keyword);

        const matchesType =
          typeFilter === "전체" ||
          record.measurementType === typeFilter;

        const matchesDate =
          !dateFilter || record.recordedAt === dateFilter;

        return matchesSearch && matchesType && matchesDate;
      })
      .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
  }, [records, search, typeFilter, dateFilter]);

  const todayCount = records.filter(
    (record) => record.recordedAt === getLocalDate()
  ).length;

  const residentCount = new Set(
    records.map((record) => record.residentName)
  ).size;

  const bloodPressureCount = records.filter(
    (record) => record.measurementType === "혈압"
  ).length;

  const handleTypeChange = (type: string) => {
    const units: Record<string, string> = {
      혈압: "mmHg",
      체온: "°C",
      맥박: "bpm",
      혈당: "mg/dL",
      체중: "kg",
      기타: "",
    };

    setForm({
      ...form,
      measurementType: type,
      measurementUnit: units[type] ?? "",
    });
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resident = residentOptions.find(
      (item) => item.name === form.residentName
    );

    if (!resident) {
      alert("입주민을 선택해 주세요.");
      return;
    }

    const newRecord: HealthRecord = {
      id: Math.max(0, ...records.map((record) => record.id)) + 1,
      residentName: resident.name,
      roomNumber: resident.room,
      measurementType: form.measurementType,
      measurementValue: form.measurementValue.trim(),
      measurementUnit: form.measurementUnit.trim(),
      recordedAt: form.recordedAt,
      memo: form.memo.trim(),
    };

    setRecords((previous) => [...previous, newRecord]);

    setSearch("");
    setTypeFilter("전체");
    setDateFilter("");
    setForm({
      residentName: "김민수",
      measurementType: "혈압",
      measurementValue: "",
      measurementUnit: "mmHg",
      recordedAt: getLocalDate(),
      memo: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="health-page">
      <section className="health-heading">
        <div>
          <span className="health-eyebrow">HEALTH RECORD MANAGEMENT</span>
          <h1>건강 기록</h1>
          <p>입주민별 건강 측정 기록을 조회하고 관리합니다.</p>
        </div>

        <button
          className="health-primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span>＋</span> 건강 기록 등록
        </button>
      </section>

      <section className="health-summary">
        <article className="health-summary-card">
          <div className="health-summary-top">
            <span>전체 기록</span>
            <span className="health-icon green">▤</span>
          </div>
          <strong>{records.length}<small>건</small></strong>
          <p>누적 건강 측정 기록</p>
        </article>

        <article className="health-summary-card">
          <div className="health-summary-top">
            <span>기록된 입주민</span>
            <span className="health-icon blue">♙</span>
          </div>
          <strong>{residentCount}<small>명</small></strong>
          <p>건강 기록이 등록된 인원</p>
        </article>

        <article className="health-summary-card">
          <div className="health-summary-top">
            <span>오늘 측정 기록</span>
            <span className="health-icon orange">◷</span>
          </div>
          <strong>{todayCount}<small>건</small></strong>
          <p>오늘 등록된 기록</p>
        </article>

        <article className="health-summary-card">
          <div className="health-summary-top">
            <span>혈압 측정 기록</span>
            <span className="health-icon purple">♡</span>
          </div>
          <strong>{bloodPressureCount}<small>건</small></strong>
          <p>누적 혈압 측정 기록</p>
        </article>
      </section>

      <section className="health-info-panel">
        <div className="health-info-icon">♡</div>
        <div>
          <strong>건강 기록 통합 관리</strong>
          <p>
            입주민별 측정 내역을 기록하고 날짜와 측정 항목을 기준으로
            조회할 수 있습니다. 이 화면의 샘플 수치는 기능 확인용입니다.
          </p>
        </div>
      </section>

      <section className="health-list-panel">
        <div className="health-list-heading">
          <div>
            <h2>건강 측정 기록</h2>
            <p>입주민의 측정 항목과 기록 정보를 확인할 수 있습니다.</p>
          </div>
          <span className="health-total">
            총 {filteredRecords.length}건
          </span>
        </div>

        <div className="health-toolbar">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="입주민 이름 또는 객실 번호 검색"
            aria-label="입주민 검색"
          />

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            aria-label="측정 항목 필터"
          >
            <option value="전체">전체 측정 항목</option>
            {measurementTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            aria-label="측정 날짜 필터"
          />
        </div>

        <div className="health-table-wrap">
          <table className="health-table">
            <thead>
              <tr>
                <th>입주민</th>
                <th>측정 항목</th>
                <th>측정값</th>
                <th>기록 일자</th>
                <th>메모</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong className="health-resident-name">
                        {record.residentName}
                      </strong>
                      <small className="health-room-number">
                        {record.roomNumber}
                      </small>
                    </td>
                    <td>
                      <span className={`health-type type-${record.measurementType}`}>
                        {record.measurementType}
                      </span>
                    </td>
                    <td>
                      <strong className="health-value">
                        {record.measurementValue}
                      </strong>
                      <span className="health-unit">
                        {record.measurementUnit}
                      </span>
                    </td>
                    <td>{record.recordedAt}</td>
                    <td className="health-memo">
                      {record.memo || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="health-empty">
                    검색 조건에 맞는 건강 기록이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="health-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            className="health-modal"
            onSubmit={handleRegister}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="health-modal-heading">
              <div>
                <span className="health-eyebrow">NEW HEALTH RECORD</span>
                <h2>건강 기록 등록</h2>
              </div>
              <button
                type="button"
                className="health-close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            <label>
              입주민
              <select
                value={form.residentName}
                onChange={(event) =>
                  setForm({ ...form, residentName: event.target.value })
                }
              >
                {residentOptions.map((resident) => (
                  <option key={resident.name} value={resident.name}>
                    {resident.name} ({resident.room})
                  </option>
                ))}
              </select>
            </label>

            <div className="health-form-row">
              <label>
                측정 항목
                <select
                  value={form.measurementType}
                  onChange={(event) => handleTypeChange(event.target.value)}
                >
                  {measurementTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                측정 일자
                <input
                  type="date"
                  required
                  value={form.recordedAt}
                  onChange={(event) =>
                    setForm({ ...form, recordedAt: event.target.value })
                  }
                />
              </label>
            </div>

            <div className="health-form-row">
              <label>
                측정값
                <input
                  required
                  maxLength={30}
                  value={form.measurementValue}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      measurementValue: event.target.value,
                    })
                  }
                  placeholder="측정값 입력"
                />
              </label>

              <label>
                측정 단위
                <input
                  maxLength={20}
                  value={form.measurementUnit}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      measurementUnit: event.target.value,
                    })
                  }
                  placeholder="예: mmHg"
                />
              </label>
            </div>

            <label>
              메모
              <textarea
                rows={3}
                maxLength={300}
                value={form.memo}
                onChange={(event) =>
                  setForm({ ...form, memo: event.target.value })
                }
                placeholder="측정 관련 메모를 입력하세요."
              />
            </label>

            <div className="health-modal-actions">
              <button
                type="button"
                className="health-cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button type="submit" className="health-primary-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HealthPage;
