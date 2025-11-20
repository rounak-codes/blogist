// client-admin/src/components/AdminLayout.jsx
import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_secret");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-[#071022] text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="w-full bg-[#061226] border-b border-white/6 px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
            <p className="text-sm text-white/60">Manage posts, drafts & settings</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">Signed in as <strong className="ml-1">Admin</strong></span>
            <button
              onClick={handleLogout}
              className="bg-transparent border border-white/10 hover:bg-white/5 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 w-full p-6 overflow-x-visible">
          {/* FORCE full width for the content inserted by routes */}
          <div className="w-full max-w-full mx-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
