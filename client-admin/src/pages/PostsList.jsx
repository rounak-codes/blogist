// client-admin/src/pages/PostsList.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/posts`);
        if (!res.ok) {
          setPosts([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [apiBase]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this post? This can't be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`${apiBase}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": localStorage.getItem("admin_secret") || "",
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Delete failed" }));
        alert(err.message || "Delete failed");
        return;
      }
      setPosts((p) => p.filter((x) => x._id !== id));
    } catch {
      alert("Network error deleting post");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Posts</h2>
        <button
          onClick={() => navigate("/create")}
          className="bg-[var(--accent)] hover:bg-[var(--hover-accent)] px-4 py-2 rounded"
        >
          Create Post
        </button>
      </div>

      <div className="bg-[#061226] border border-white/6 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-3 text-sm text-white/60 border-b border-white/6">
          <div className="col-span-6">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-6 text-white/60">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="p-6 text-white/50">No posts yet.</div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="grid grid-cols-12 gap-4 items-center p-3 hover:bg-white/2 transition"
            >
              <div className="col-span-6">
                <div className="font-semibold">{post.title}</div>
                <div className="text-xs text-white/50 mt-1">{post.excerpt || (post.content ? post.content.substring(0, 80) + "..." : "")}</div>
              </div>

              <div className="col-span-2">
                <span className={`px-2 py-1 rounded text-xs ${post.status === "published" ? "bg-green-700/30 text-green-300" : "bg-yellow-700/20 text-yellow-200"}`}>
                  {post.status}
                </span>
              </div>

              <div className="col-span-2 text-sm text-white/60">{new Date(post.createdAt).toLocaleDateString()}</div>

              <div className="col-span-2 text-right flex justify-end gap-2">
                <Link to={`/edit/${post._id}`} className="px-3 py-1 rounded border border-white/8 hover:bg-white/5 text-sm">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-1 rounded bg-red-600/80 hover:bg-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsList;
