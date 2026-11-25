
import { useState } from "react";

type AlertItem = {
  title: string;
  detail: string;
  time: string;
  color: string;
};

type HeaderProps = {
  title: string;
  alerts: AlertItem[];
};

function Header({ title, alerts }: HeaderProps) {
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>SilverLife</span>
        <span className="breadcrumb-divider">/</span>
        <strong>{title}</strong>
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
            aria-expanded={showAlerts}
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
  );
}

export default Header;
