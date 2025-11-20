// client-admin/src/components/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaPlus } from "react-icons/fa";

const NavLink = ({ to, icon: Icon, label }) => {
  const loc = useLocation();
  const active = loc.pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        active ? "bg-white/6 text-[var(--accent)]" : "text-white/70 hover:bg-white/3"
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="text-sm">{label}</span>
    </Link>
  );
};

const AdminSidebar = () => {
  return (
    <aside className="w-72 bg-[#041125] border-r border-white/6 px-4 py-6 flex flex-col gap-6">
      <div className="px-2">
        <Link to="/dashboard" className="text-2xl font-bold text-white" style={{ color: "var(--accent)" }}>
          Fuwari Admin
        </Link>
        <p className="text-xs text-white/50 mt-1">Manage posts & content</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        <NavLink to="/dashboard" icon={FaTachometerAlt} label="Dashboard" />
        <NavLink to="/posts" icon={FaFileAlt} label="All Posts" />
        <NavLink to="/create" icon={FaPlus} label="Create Post" />
      </nav>

      <div className="text-xs text-white/50 px-4">
        <div>Tip: Use the create page to add posts. All admin routes require admin secret.</div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
