
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./FacilityPage.css";

type Facility = {
  id: number;
  facilityName: string;
  facilityType: string;
  floor: number;
  status: "정상 운영" | "점검 중" | "운영 중단";
  positionX: number;
  positionY: number;
  positionZ: number;
};

const initialFacilities: Facility[] = [
  { id: 1, facilityName: "중앙 식당", facilityType: "식당", floor: 1, status: "정상 운영", positionX: 10, positionY: 0, positionZ: 20 },
  { id: 2, facilityName: "건강 관리실", facilityType: "의료 시설", floor: 1, status: "정상 운영", positionX: 25, positionY: 0, positionZ: 15 },
  { id: 3, facilityName: "실내 운동실", facilityType: "운동 시설", floor: 2, status: "정상 운영", positionX: 30, positionY: 3, positionZ: 12 },
  { id: 4, facilityName: "휴게 라운지", facilityType: "휴게 시설", floor: 2, status: "점검 중", positionX: 15, positionY: 3, positionZ: 25 },
  { id: 5, facilityName: "물리 치료실", facilityType: "의료 시설", floor: 3, status: "정상 운영", positionX: 22, positionY: 6, positionZ: 18 },
  { id: 6, facilityName: "문화 활동실", facilityType: "문화 시설", floor: 3, status: "운영 중단", positionX: 35, positionY: 6, positionZ: 10 },
  { id: 7, facilityName: "옥상 정원", facilityType: "휴게 시설", floor: 5, status: "정상 운영", positionX: 40, positionY: 12, positionZ: 30 },
  { id: 8, facilityName: "프로그램실", facilityType: "문화 시설", floor: 4, status: "정상 운영", positionX: 18, positionY: 9, positionZ: 22 },
];

const facilityTypes = [
  "식당",
  "의료 시설",
  "운동 시설",
  "휴게 시설",
  "문화 시설",
  "기타",
];

function FacilityPage() {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("전체");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    facilityName: "",
    facilityType: "식당",
    floor: "1",
    status: "정상 운영" as Facility["status"],
    positionX: "0",
    positionY: "0",
    positionZ: "0",
  });

  const normalCount = facilities.filter(
    (facility) => facility.status === "정상 운영"
  ).length;

  const maintenanceCount = facilities.filter(
    (facility) => facility.status === "점검 중"
  ).length;

  const stoppedCount = facilities.filter(
    (facility) => facility.status === "운영 중단"
  ).length;

  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      const matchesSearch = facility.facilityName
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFloor =
        floorFilter === "전체" ||
        facility.floor === Number(floorFilter);

      const matchesType =
        typeFilter === "전체" ||
        facility.facilityType === typeFilter;

      const matchesStatus =
        statusFilter === "전체" ||
        facility.status === statusFilter;

      return (
        matchesSearch &&
        matchesFloor &&
        matchesType &&
        matchesStatus
      );
    });
  }, [facilities, search, floorFilter, typeFilter, statusFilter]);

  const getStatusClass = (status: Facility["status"]) => {
    if (status === "정상 운영") return "facility-status-normal";
    if (status === "점검 중") return "facility-status-check";
    return "facility-status-stopped";
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFacility: Facility = {
      id: Math.max(0, ...facilities.map((facility) => facility.id)) + 1,
      facilityName: form.facilityName.trim(),
      facilityType: form.facilityType,
      floor: Number(form.floor),
      status: form.status,
      positionX: Number(form.positionX),
      positionY: Number(form.positionY),
      positionZ: Number(form.positionZ),
    };

    setFacilities((previous) => [...previous, newFacility]);

    setForm({
      facilityName: "",
      facilityType: "식당",
      floor: "1",
      status: "정상 운영",
      positionX: "0",
      positionY: "0",
      positionZ: "0",
    });

    setSearch("");
    setFloorFilter("전체");
    setTypeFilter("전체");
    setStatusFilter("전체");
    setIsModalOpen(false);
  };

  return (
    <div className="facility-page">
      <section className="facility-heading">
        <div>
          <span className="facility-eyebrow">FACILITY MANAGEMENT</span>
          <h1>시설 관리</h1>
          <p>실버타운의 공용 시설과 운영 상태를 관리합니다.</p>
        </div>

        <button
          className="facility-primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span>＋</span> 시설 등록
        </button>
      </section>

      <section className="facility-summary">
        <article className="facility-summary-card">
          <div className="facility-summary-top">
            <span>전체 시설</span>
            <span className="facility-icon green">⌂</span>
          </div>
          <strong>{facilities.length}<small>개</small></strong>
          <p>등록된 전체 시설</p>
        </article>

        <article className="facility-summary-card">
          <div className="facility-summary-top">
            <span>정상 운영</span>
            <span className="facility-icon blue">✓</span>
          </div>
          <strong>{normalCount}<small>개</small></strong>
          <p>정상적으로 운영 중</p>
        </article>

        <article className="facility-summary-card">
          <div className="facility-summary-top">
            <span>점검 중</span>
            <span className="facility-icon orange">⚙</span>
          </div>
          <strong>{maintenanceCount}<small>개</small></strong>
          <p>점검이 진행 중인 시설</p>
        </article>

        <article className="facility-summary-card">
          <div className="facility-summary-top">
            <span>운영 중단</span>
            <span className="facility-icon purple">!</span>
          </div>
          <strong>{stoppedCount}<small>개</small></strong>
          <p>현재 이용할 수 없는 시설</p>
        </article>
      </section>

      <section className="facility-overview-panel">
        <div className="facility-panel-heading">
          <div>
            <span className="facility-eyebrow">FACILITY OVERVIEW</span>
            <h2>시설 운영 현황</h2>
          </div>
          <span className="facility-live">
            <span /> 시설 현황
          </span>
        </div>

        <div className="facility-overview-content">
          <div className="facility-chart">
            <div
              className="facility-donut"
              style={{
                background: `conic-gradient(
                  #82b991 0deg ${facilities.length ? normalCount / facilities.length * 360 : 0}deg,
                  #e5ae70 ${normalCount / Math.max(facilities.length, 1) * 360}deg ${(normalCount + maintenanceCount) / Math.max(facilities.length, 1) * 360}deg,
                  #ad9bcf ${(normalCount + maintenanceCount) / Math.max(facilities.length, 1) * 360}deg 360deg
                )`,
              }}
            >
              <div className="facility-donut-inner">
                <strong>{facilities.length}</strong>
                <span>전체 시설</span>
              </div>
            </div>
          </div>

          <div className="facility-legend-list">
            <div>
              <span className="facility-legend-dot normal" />
              <span>정상 운영</span>
              <strong>{normalCount}개</strong>
            </div>
            <div>
              <span className="facility-legend-dot check" />
              <span>점검 중</span>
              <strong>{maintenanceCount}개</strong>
            </div>
            <div>
              <span className="facility-legend-dot stopped" />
              <span>운영 중단</span>
              <strong>{stoppedCount}개</strong>
            </div>
          </div>

          <div className="facility-overview-note">
            <span>운영 안내</span>
            <p>
              시설 상태를 주기적으로 확인하고 점검이 필요한 시설을
              관리해 주세요.
            </p>
          </div>
        </div>
      </section>

      <section className="facility-list-panel">
        <div className="facility-panel-heading">
          <div>
            <h2>시설 목록</h2>
            <p>등록된 시설의 위치와 운영 상태를 확인합니다.</p>
          </div>
          <span className="facility-total">
            총 {filteredFacilities.length}개
          </span>
        </div>

        <div className="facility-toolbar">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="시설명 검색"
            aria-label="시설명 검색"
          />

          <select
            value={floorFilter}
            onChange={(event) => setFloorFilter(event.target.value)}
            aria-label="층별 필터"
          >
            <option value="전체">전체 층</option>
            {[1, 2, 3, 4, 5].map((floor) => (
              <option key={floor} value={String(floor)}>
                {floor}층
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            aria-label="시설 유형 필터"
          >
            <option value="전체">전체 유형</option>
            {facilityTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="운영 상태 필터"
          >
            <option value="전체">전체 상태</option>
            <option value="정상 운영">정상 운영</option>
            <option value="점검 중">점검 중</option>
            <option value="운영 중단">운영 중단</option>
          </select>
        </div>

        <div className="facility-table-wrap">
          <table className="facility-table">
            <thead>
              <tr>
                <th>시설명</th>
                <th>시설 유형</th>
                <th>위치</th>
                <th>공간 좌표 (X, Y, Z)</th>
                <th>운영 상태</th>
              </tr>
            </thead>

            <tbody>
              {filteredFacilities.length > 0 ? (
                filteredFacilities.map((facility) => (
                  <tr key={facility.id}>
                    <td>
                      <strong className="facility-name">
                        {facility.facilityName}
                      </strong>
                    </td>
                    <td>
                      <span className="facility-type">
                        {facility.facilityType}
                      </span>
                    </td>
                    <td>{facility.floor}층</td>
                    <td>
                      <span className="facility-coordinates">
                        {facility.positionX}, {facility.positionY},{" "}
                        {facility.positionZ}
                      </span>
                    </td>
                    <td>
                      <span className={`facility-status ${getStatusClass(facility.status)}`}>
                        {facility.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="facility-empty">
                    검색 조건에 맞는 시설이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="facility-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            className="facility-modal"
            onSubmit={handleRegister}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="facility-modal-heading">
              <div>
                <span className="facility-eyebrow">NEW FACILITY</span>
                <h2>시설 등록</h2>
              </div>
              <button
                type="button"
                className="facility-close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            <label>
              시설명
              <input
                required
                maxLength={40}
                value={form.facilityName}
                onChange={(event) =>
                  setForm({ ...form, facilityName: event.target.value })
                }
                placeholder="예: 중앙 식당"
              />
            </label>

            <div className="facility-form-row">
              <label>
                시설 유형
                <select
                  value={form.facilityType}
                  onChange={(event) =>
                    setForm({ ...form, facilityType: event.target.value })
                  }
                >
                  {facilityTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label>
                설치 층
                <select
                  value={form.floor}
                  onChange={(event) =>
                    setForm({ ...form, floor: event.target.value })
                  }
                >
                  {[1, 2, 3, 4, 5].map((floor) => (
                    <option key={floor} value={String(floor)}>
                      {floor}층
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              운영 상태
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target.value as Facility["status"],
                  })
                }
              >
                <option value="정상 운영">정상 운영</option>
                <option value="점검 중">점검 중</option>
                <option value="운영 중단">운영 중단</option>
              </select>
            </label>

            <div className="facility-coordinate-group">
              <span>디지털 트윈 공간 좌표</span>
              <div className="facility-form-row">
                <label>
                  X 좌표
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={form.positionX}
                    onChange={(event) =>
                      setForm({ ...form, positionX: event.target.value })
                    }
                  />
                </label>
                <label>
                  Y 좌표
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={form.positionY}
                    onChange={(event) =>
                      setForm({ ...form, positionY: event.target.value })
                    }
                  />
                </label>
                <label>
                  Z 좌표
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={form.positionZ}
                    onChange={(event) =>
                      setForm({ ...form, positionZ: event.target.value })
                    }
                  />
                </label>
              </div>
            </div>

            <div className="facility-modal-actions">
              <button
                type="button"
                className="facility-cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button type="submit" className="facility-primary-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FacilityPage;
