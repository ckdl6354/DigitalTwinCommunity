
import { useState } from "react";
import "./App.css";

const navItems = [
  { id: "dashboard", icon: "▦", label: "통합 관제" },
  { id: "residents", icon: "♙", label: "입주민 관리" },
  { id: "rooms", icon: "▤", label: "객실 관리" },
  { id: "facilities", icon: "⌂", label: "시설 관리" },
  { id: "health", icon: "♡", label: "건강 기록" },
  { id: "care", icon: "✚", label: "돌봄 요청" },
];

const stats = [
  { label: "전체 입주민", value: "128", unit: "명", note: "현재 등록 인원", icon: "♙", color: "green" },
  { label: "객실 사용률", value: "86.4", unit: "%", note: "총 148실 중 128실", icon: "▤", color: "blue" },
  { label: "운영 시설", value: "24", unit: "개", note: "정상 운영 22개", icon: "⌂", color: "purple" },
  { label: "미처리 돌봄 요청", value: "7", unit: "건", note: "확인 및 조치 필요", icon: "✚", color: "orange" },
];

const alerts = [
  { type: "긴급", title: "건강 상태 확인 요청", detail: "김○○ 입주민 · 건강 기록 확인 필요", time: "09:12", color: "red" },
  { type: "확인", title: "객실 시설 점검", detail: "302호 · 시설 점검 요청 접수", time: "08:45", color: "orange" },
  { type: "일반", title: "돌봄 서비스 요청", detail: "이○○ 입주민 · 생활 지원 요청", time: "08:20", color: "blue" },
];

const requests = [
  { name: "김○○", room: "302호", category: "건강 확인", priority: "높음", status: "접수" },
  { name: "이○○", room: "105호", category: "생활 지원", priority: "보통", status: "진행 중" },
  { name: "박○○", room: "408호", category: "시설 점검", priority: "보통", status: "접수" },
];

const floors = [
  { floor: "5F", used: 18, total: 20 },
  { floor: "4F", used: 27, total: 30 },
  { floor: "3F", used: 29, total: 32 },
  { floor: "2F", used: 28, total: 32 },
  { floor: "1F", used: 26, total: 34 },
];

function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showAlerts, setShowAlerts] = useState(false);

  const currentMenu =
    navItems.find((item) => item.id === activeMenu) ?? navItems[0];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <strong>SilverLife</strong>
            <span>DIGITAL TWIN PLATFORM</span>
          </div>
        </div>

        <div className="side-label">MAIN MENU</div>
        <nav className="side-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeMenu === item.id ? "active" : ""}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "care" && <span className="nav-count">7</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-card">
            <div className="system-card-top">
              <span className="status-dot" />
              시스템 정상
            </div>
            <p>모든 서비스가 정상적으로 운영 중입니다.</p>
          </div>
          <div className="profile">
            <div className="profile-avatar">관리</div>
            <div className="profile-info">
              <strong>관리자</strong>
              <span>운영 관리자</span>
            </div>
            <span className="profile-more">···</span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>SilverLife</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{currentMenu.label}</strong>
          </div>

          <div className="topbar-actions">
            <span className="today">
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </span>
            <div className="notification-wrap">
              <button
                className="icon-button"
                aria-label="알림"
                onClick={() => setShowAlerts(!showAlerts)}
              >
                ♧
                <span className="notification-dot" />
              </button>
              {showAlerts && (
                <div className="notification-popover">
                  <strong>새로운 알림</strong>
                  <p>확인이 필요한 알림이 3건 있습니다.</p>
                  {alerts.map((alert) => (
                    <div className="popover-alert" key={alert.title}>
                      <span className={`mini-dot ${alert.color}`} />
                      <span>{alert.title}</span>
                      <small>{alert.time}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="top-profile">관</div>
          </div>
        </header>

        <div className="content">
          {activeMenu === "dashboard" ? (
            <>
              <section className="page-heading">
                <div>
                  <div className="eyebrow">SILVER TOWN CONTROL CENTER</div>
                  <h1>통합 관제 대시보드</h1>
                  <p>실버타운의 주요 운영 현황을 한눈에 확인합니다.</p>
                </div>
                <div className="live-badge">
                  <span className="status-dot" />
                  LIVE 운영 현황
                </div>
              </section>

              <section className="stats-grid">
                {stats.map((stat) => (
                  <article className="stat-card" key={stat.label}>
                    <div className="stat-card-top">
                      <span className="stat-label">{stat.label}</span>
                      <span className={`stat-icon ${stat.color}`}>
                        {stat.icon}
                      </span>
                    </div>
                    <div className="stat-value">
                      {stat.value}
                      <small>{stat.unit}</small>
                    </div>
                    <div className="stat-note">{stat.note}</div>
                  </article>
                ))}
              </section>

              <section className="dashboard-grid">
                <article className="panel twin-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">DIGITAL TWIN</span>
                      <h2>시설 배치 현황</h2>
                    </div>
                    <span className="panel-chip">공간 미리보기</span>
                  </div>

                  <div className="twin-visual">
                    <div className="twin-toolbar">
                      <span className="twin-live">
                        <span className="status-dot" /> 실시간 상태
                      </span>
                      <span className="floor-select">전체 층 ▾</span>
                    </div>
                    <div className="building-scene">
                      <div className="building-label label-one">생활 공간</div>
                      <div className="building-label label-two">공용 시설</div>
                      <div className="building">
                        <div className="building-roof" />
                        <div className="building-front">
                          <div className="building-floor floor-five">
                            <span>501</span><span>502</span><span>503</span><span>504</span>
                          </div>
                          <div className="building-floor floor-four">
                            <span>401</span><span>402</span><span>403</span><span>404</span>
                          </div>
                          <div className="building-floor floor-three">
                            <span>301</span><span>302</span><span>303</span><span>304</span>
                          </div>
                          <div className="building-floor floor-two">
                            <span>201</span><span>202</span><span>203</span><span>204</span>
                          </div>
                          <div className="building-floor floor-one">
                            <span className="facility-room">식당</span>
                            <span className="facility-room">로비</span>
                            <span className="facility-room">운동</span>
                            <span className="facility-room">진료</span>
                          </div>
                        </div>
                        <div className="building-side" />
                      </div>
                      <div className="scene-caption">3D 공간 시각화 영역 · 샘플 배치</div>
                    </div>
                    <div className="twin-legend">
                      <span><i className="legend-dot occupied" /> 사용 중</span>
                      <span><i className="legend-dot available" /> 이용 가능</span>
                      <span><i className="legend-dot facility" /> 공용 시설</span>
                    </div>
                  </div>
                </article>

                <article className="panel floor-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">ROOM STATUS</span>
                      <h2>층별 객실 현황</h2>
                    </div>
                    <span className="subtle-label">입주 현황</span>
                  </div>
                  <div className="floor-summary">
                    <div>
                      <strong>128<span> / 148실</span></strong>
                      <p>전체 객실 사용 현황</p>
                    </div>
                    <div className="occupancy-rate">86.4%</div>
                  </div>
                  <div className="floor-list">
                    {floors.map((floor) => (
                      <div className="floor-row" key={floor.floor}>
                        <span className="floor-name">{floor.floor}</span>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${(floor.used / floor.total) * 100}%` }}
                          />
                        </div>
                        <span className="floor-count">
                          {floor.used}<small>/{floor.total}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="floor-footnote">
                    <span><i className="legend-dot occupied" /> 사용 객실</span>
                    <span><i className="legend-dot available" /> 빈 객실</span>
                  </div>
                </article>
              </section>

              <section className="bottom-grid">
                <article className="panel request-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">CARE REQUESTS</span>
                      <h2>최근 돌봄 요청</h2>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setActiveMenu("care")}
                    >
                      전체 보기 →
                    </button>
                  </div>
                  <div className="request-table-wrap">
                    <table className="request-table">
                      <thead>
                        <tr>
                          <th>입주민</th>
                          <th>요청 유형</th>
                          <th>우선순위</th>
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((request) => (
                          <tr key={`${request.name}-${request.room}`}>
                            <td>
                              <strong>{request.name}</strong>
                              <small>{request.room}</small>
                            </td>
                            <td>{request.category}</td>
                            <td>
                              <span className={`priority ${request.priority === "높음" ? "high" : "normal"}`}>
                                {request.priority}
                              </span>
                            </td>
                            <td>
                              <span className={`request-status ${request.status === "접수" ? "received" : "working"}`}>
                                {request.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>

                <article className="panel alert-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">RECENT ALERTS</span>
                      <h2>주요 알림</h2>
                    </div>
                    <span className="alert-count">3건</span>
                  </div>
                  <div className="alert-list">
                    {alerts.map((alert) => (
                      <div className="alert-item" key={alert.title}>
                        <span className={`alert-symbol ${alert.color}`}>!</span>
                        <div className="alert-content">
                          <div className="alert-title-row">
                            <strong>{alert.title}</strong>
                            <span>{alert.time}</span>
                          </div>
                          <p>{alert.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </section>

              <footer className="page-footer">
                <span>SilverLife Digital Twin Management System</span>
                <span>Dashboard · Sample Data</span>
              </footer>
            </>
          ) : (
            <section className="coming-soon panel">
              <div className="coming-icon">{currentMenu.icon}</div>
              <span className="section-kicker">MODULE PREPARATION</span>
              <h1>{currentMenu.label}</h1>
              <p>이 화면은 다음 개발 단계에서 구현할 예정입니다.</p>
              <button
                className="primary-button"
                onClick={() => setActiveMenu("dashboard")}
              >
                대시보드로 돌아가기
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
