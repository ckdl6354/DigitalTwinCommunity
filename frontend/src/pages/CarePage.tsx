
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./CarePage.css";

type CareRequest = {
  id: number;
  residentName: string;
  roomNumber: string;
  requestType: string;
  description: string;
  priority: "높음" | "보통" | "낮음";
  status: "접수" | "진행 중" | "완료";
  createdAt: string;
  completedAt: string;
};

const initialRequests: CareRequest[] = [
  {
    id: 1,
    residentName: "김민수",
    roomNumber: "301호",
    requestType: "건강 확인",
    description: "정기 건강 측정 기록 확인 요청",
    priority: "높음",
    status: "접수",
    createdAt: "2026-11-25T09:12",
    completedAt: "",
  },
  {
    id: 2,
    residentName: "이영희",
    roomNumber: "302호",
    requestType: "생활 지원",
    description: "생활 공간 정리 지원 요청",
    priority: "보통",
    status: "진행 중",
    createdAt: "2026-11-25T08:45",
    completedAt: "",
  },
  {
    id: 3,
    residentName: "박철수",
    roomNumber: "203호",
    requestType: "식사 지원",
    description: "식사 준비 관련 지원 요청",
    priority: "보통",
    status: "완료",
    createdAt: "2026-11-25T08:20",
    completedAt: "2026-11-25T08:50",
  },
  {
    id: 4,
    residentName: "최정숙",
    roomNumber: "405호",
    requestType: "시설 점검",
    description: "객실 내 시설 상태 확인 요청",
    priority: "높음",
    status: "접수",
    createdAt: "2026-11-24T16:30",
    completedAt: "",
  },
  {
    id: 5,
    residentName: "정동현",
    roomNumber: "502호",
    requestType: "이동 지원",
    description: "공용 시설 이동 지원 요청",
    priority: "낮음",
    status: "완료",
    createdAt: "2026-11-24T14:10",
    completedAt: "2026-11-24T14:35",
  },
  {
    id: 6,
    residentName: "한미자",
    roomNumber: "105호",
    requestType: "생활 지원",
    description: "생활용품 전달 요청",
    priority: "보통",
    status: "진행 중",
    createdAt: "2026-11-24T11:25",
    completedAt: "",
  },
  {
    id: 7,
    residentName: "김민수",
    roomNumber: "301호",
    requestType: "기타",
    description: "프로그램 일정 문의",
    priority: "낮음",
    status: "완료",
    createdAt: "2026-11-23T10:00",
    completedAt: "2026-11-23T10:15",
  },
];

const residentOptions = [
  { name: "김민수", room: "301호" },
  { name: "이영희", room: "302호" },
  { name: "박철수", room: "203호" },
  { name: "최정숙", room: "405호" },
  { name: "정동현", room: "502호" },
  { name: "한미자", room: "105호" },
];

const requestTypes = [
  "건강 확인",
  "생활 지원",
  "식사 지원",
  "시설 점검",
  "이동 지원",
  "기타",
];

function getLocalDateTime() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;

  return new Date(now.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

function formatDateTime(value: string) {
  if (!value) return "-";
  return value.replace("T", " ");
}

function CarePage() {
  const [requests, setRequests] =
    useState<CareRequest[]>(initialRequests);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [priorityFilter, setPriorityFilter] = useState("전체");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    residentName: "김민수",
    requestType: "생활 지원",
    description: "",
    priority: "보통" as CareRequest["priority"],
  });

  const pendingCount = requests.filter(
    (request) => request.status === "접수"
  ).length;

  const progressCount = requests.filter(
    (request) => request.status === "진행 중"
  ).length;

  const completedCount = requests.filter(
    (request) => request.status === "완료"
  ).length;

  const highPriorityCount = requests.filter(
    (request) =>
      request.priority === "높음" &&
      request.status !== "완료"
  ).length;

  const filteredRequests = useMemo(() => {
    return requests
      .filter((request) => {
        const keyword = search.trim().toLowerCase();

        const matchesSearch =
          request.residentName.toLowerCase().includes(keyword) ||
          request.roomNumber.toLowerCase().includes(keyword) ||
          request.description.toLowerCase().includes(keyword) ||
          request.requestType.toLowerCase().includes(keyword);

        const matchesStatus =
          statusFilter === "전체" ||
          request.status === statusFilter;

        const matchesPriority =
          priorityFilter === "전체" ||
          request.priority === priorityFilter;

        const matchesType =
          typeFilter === "전체" ||
          request.requestType === typeFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority &&
          matchesType
        );
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [
    requests,
    search,
    statusFilter,
    priorityFilter,
    typeFilter,
  ]);

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resident = residentOptions.find(
      (item) => item.name === form.residentName
    );

    if (!resident) {
      alert("입주민을 선택해 주세요.");
      return;
    }

    const newRequest: CareRequest = {
      id: Math.max(0, ...requests.map((request) => request.id)) + 1,
      residentName: resident.name,
      roomNumber: resident.room,
      requestType: form.requestType,
      description: form.description.trim(),
      priority: form.priority,
      status: "접수",
      createdAt: getLocalDateTime(),
      completedAt: "",
    };

    setRequests((previous) => [newRequest, ...previous]);

    setSearch("");
    setStatusFilter("전체");
    setPriorityFilter("전체");
    setTypeFilter("전체");

    setForm({
      residentName: "김민수",
      requestType: "생활 지원",
      description: "",
      priority: "보통",
    });

    setIsModalOpen(false);
  };

  const handleStatusChange = (id: number) => {
    setRequests((previous) =>
      previous.map((request) => {
        if (request.id !== id) return request;

        if (request.status === "접수") {
          return {
            ...request,
            status: "진행 중",
          };
        }

        if (request.status === "진행 중") {
          return {
            ...request,
            status: "완료",
            completedAt: getLocalDateTime(),
          };
        }

        return request;
      })
    );
  };

  const getStatusClass = (status: CareRequest["status"]) => {
    if (status === "접수") return "care-status-received";
    if (status === "진행 중") return "care-status-progress";
    return "care-status-completed";
  };

  const getPriorityClass = (priority: CareRequest["priority"]) => {
    if (priority === "높음") return "care-priority-high";
    if (priority === "보통") return "care-priority-normal";
    return "care-priority-low";
  };

  return (
    <div className="care-page">
      <section className="care-heading">
        <div>
          <span className="care-eyebrow">CARE REQUEST MANAGEMENT</span>
          <h1>돌봄 요청</h1>
          <p>
            입주민의 요청을 확인하고 처리 진행 상황을 관리합니다.
          </p>
        </div>

        <button
          className="care-primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span>＋</span> 요청 등록
        </button>
      </section>

      <section className="care-summary">
        <article className="care-summary-card">
          <div className="care-summary-top">
            <span>전체 요청</span>
            <span className="care-icon green">▤</span>
          </div>
          <strong>{requests.length}<small>건</small></strong>
          <p>누적 돌봄 요청</p>
        </article>

        <article className="care-summary-card">
          <div className="care-summary-top">
            <span>접수 대기</span>
            <span className="care-icon orange">◷</span>
          </div>
          <strong>{pendingCount}<small>건</small></strong>
          <p>처리가 시작되지 않은 요청</p>
        </article>

        <article className="care-summary-card">
          <div className="care-summary-top">
            <span>진행 중</span>
            <span className="care-icon blue">↻</span>
          </div>
          <strong>{progressCount}<small>건</small></strong>
          <p>현재 처리 중인 요청</p>
        </article>

        <article className="care-summary-card">
          <div className="care-summary-top">
            <span>높은 우선순위</span>
            <span className="care-icon purple">!</span>
          </div>
          <strong>{highPriorityCount}<small>건</small></strong>
          <p>완료되지 않은 높은 우선순위 요청</p>
        </article>
      </section>

      <section className="care-progress-panel">
        <div className="care-progress-heading">
          <div>
            <span className="care-eyebrow">REQUEST OVERVIEW</span>
            <h2>요청 처리 현황</h2>
          </div>
          <span className="care-completed-label">
            완료 {completedCount}건
          </span>
        </div>

        <div className="care-progress-bar">
          <div
            className="care-progress-received"
            style={{
              width: `${requests.length ? pendingCount / requests.length * 100 : 0}%`,
            }}
          />
          <div
            className="care-progress-working"
            style={{
              width: `${requests.length ? progressCount / requests.length * 100 : 0}%`,
            }}
          />
          <div
            className="care-progress-done"
            style={{
              width: `${requests.length ? completedCount / requests.length * 100 : 0}%`,
            }}
          />
        </div>

        <div className="care-progress-legend">
          <span>
            <i className="care-legend-dot received" />
            접수 {pendingCount}건
          </span>
          <span>
            <i className="care-legend-dot working" />
            진행 중 {progressCount}건
          </span>
          <span>
            <i className="care-legend-dot done" />
            완료 {completedCount}건
          </span>
        </div>
      </section>

      <section className="care-list-panel">
        <div className="care-list-heading">
          <div>
            <h2>돌봄 요청 목록</h2>
            <p>요청 내용과 처리 상태를 확인하고 업데이트합니다.</p>
          </div>
          <span className="care-total">
            총 {filteredRequests.length}건
          </span>
        </div>

        <div className="care-toolbar">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="입주민, 객실, 요청 내용 검색"
            aria-label="돌봄 요청 검색"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="처리 상태 필터"
          >
            <option value="전체">전체 상태</option>
            <option value="접수">접수</option>
            <option value="진행 중">진행 중</option>
            <option value="완료">완료</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            aria-label="우선순위 필터"
          >
            <option value="전체">전체 우선순위</option>
            <option value="높음">높음</option>
            <option value="보통">보통</option>
            <option value="낮음">낮음</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            aria-label="요청 유형 필터"
          >
            <option value="전체">전체 요청 유형</option>
            {requestTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="care-table-wrap">
          <table className="care-table">
            <thead>
              <tr>
                <th>입주민</th>
                <th>요청 유형 및 내용</th>
                <th>우선순위</th>
                <th>접수 일시</th>
                <th>처리 상태</th>
                <th>처리 관리</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <strong className="care-resident-name">
                        {request.residentName}
                      </strong>
                      <small className="care-room-number">
                        {request.roomNumber}
                      </small>
                    </td>

                    <td className="care-request-description">
                      <strong>{request.requestType}</strong>
                      <span>{request.description}</span>
                    </td>

                    <td>
                      <span className={`care-priority ${getPriorityClass(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>

                    <td>
                      <span className="care-date">
                        {formatDateTime(request.createdAt)}
                      </span>
                      {request.completedAt && (
                        <small className="care-completed-date">
                          완료: {formatDateTime(request.completedAt)}
                        </small>
                      )}
                    </td>

                    <td>
                      <span className={`care-status ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>

                    <td>
                      {request.status !== "완료" ? (
                        <button
                          className="care-action-button"
                          onClick={() => handleStatusChange(request.id)}
                        >
                          {request.status === "접수"
                            ? "처리 시작"
                            : "완료 처리"}
                        </button>
                      ) : (
                        <span className="care-finished-text">
                          처리 완료
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="care-empty">
                    검색 조건에 맞는 요청이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="care-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            className="care-modal"
            onSubmit={handleRegister}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="care-modal-heading">
              <div>
                <span className="care-eyebrow">NEW CARE REQUEST</span>
                <h2>돌봄 요청 등록</h2>
              </div>

              <button
                type="button"
                className="care-close-button"
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
                  setForm({
                    ...form,
                    residentName: event.target.value,
                  })
                }
              >
                {residentOptions.map((resident) => (
                  <option key={resident.name} value={resident.name}>
                    {resident.name} ({resident.room})
                  </option>
                ))}
              </select>
            </label>

            <div className="care-form-row">
              <label>
                요청 유형
                <select
                  value={form.requestType}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      requestType: event.target.value,
                    })
                  }
                >
                  {requestTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                우선순위
                <select
                  value={form.priority}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      priority: event.target.value as CareRequest["priority"],
                    })
                  }
                >
                  <option value="높음">높음</option>
                  <option value="보통">보통</option>
                  <option value="낮음">낮음</option>
                </select>
              </label>
            </div>

            <label>
              요청 내용
              <textarea
                required
                rows={4}
                maxLength={500}
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description: event.target.value,
                  })
                }
                placeholder="요청 내용을 입력해 주세요."
              />
            </label>

            <div className="care-modal-notice">
              등록된 요청은 처음에 '접수' 상태로 저장됩니다.
            </div>

            <div className="care-modal-actions">
              <button
                type="button"
                className="care-cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button type="submit" className="care-primary-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CarePage;
