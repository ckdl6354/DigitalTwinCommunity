
export type MenuId =
  | "dashboard"
  | "residents"
  | "rooms"
  | "facilities"
  | "health"
  | "care";

type NavItem = {
  id: MenuId;
  icon: string;
  label: string;
};

export const navItems: NavItem[] = [
  { id: "dashboard", icon: "▦", label: "통합 관제" },
  { id: "residents", icon: "♙", label: "입주민 관리" },
  { id: "rooms", icon: "▤", label: "객실 관리" },
  { id: "facilities", icon: "⌂", label: "시설 관리" },
  { id: "health", icon: "♡", label: "건강 기록" },
  { id: "care", icon: "✚", label: "돌봄 요청" },
];

type SidebarProps = {
  activeMenu: MenuId;
  onMenuChange: (menuId: MenuId) => void;
};

function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  return (
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
            className={`nav-item ${
              activeMenu === item.id ? "active" : ""
            }`}
            onClick={() => onMenuChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>

            {item.id === "care" && (
              <span className="nav-count">7</span>
            )}
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
  );
}

export default Sidebar;
