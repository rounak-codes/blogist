// client-admin/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({ posts: 0, published: 0, drafts: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/posts`);
        if (!res.ok) return;
        const data = await res.json();
        const posts = Array.isArray(data) ? data : [];
        const published = posts.filter((p) => p.status === "published").length;
        const drafts = posts.filter((p) => p.status === "draft").length;
        setStats({ posts: posts.length, published, drafts });
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-sm text-white/60">Quick overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#061226] rounded-lg border border-white/6">
          <p className="text-sm text-white/60">Total posts</p>
          <h3 className="text-2xl font-bold">{stats.posts}</h3>
        </div>

        <div className="p-4 bg-[#061226] rounded-lg border border-white/6">
          <p className="text-sm text-white/60">Published</p>
          <h3 className="text-2xl font-bold">{stats.published}</h3>
        </div>

        <div className="p-4 bg-[#061226] rounded-lg border border-white/6">
          <p className="text-sm text-white/60">Drafts</p>
          <h3 className="text-2xl font-bold">{stats.drafts}</h3>
        </div>
      </div>

      <div className="p-4 bg-[#061226] rounded-lg border border-white/6">
        <h4 className="font-semibold">Recent activity</h4>
        <p className="text-sm text-white/50 mt-2">No recent activity yet — create your first post!</p>
      </div>
    </div>
  );
};

export default Dashboard;
