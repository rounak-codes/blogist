import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostGrid from "../components/PostGrid";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // ---------------------------
  // Sync URL → filter state
  // ---------------------------
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    tag: "",
  });

  // When URL changes, update filter values
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setFilters({
      search: params.get("search") || "",
      category: params.get("category") || "",
      tag: params.get("tag") || "",
    });
  }, [location.search]);

  // ---------------------------
  // Fetch posts based on filters
  // ---------------------------
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams(filters).toString();
        const res = await fetch(`http://localhost:5000/api/posts?${qs}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error loading posts", err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [filters]);

  // ---------------------------
  // Click handler → updates URL directly
  // ---------------------------
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) params.set(key, value);
    else params.delete(key);

    navigate(`/blogs?${params.toString()}`);
  };

  // ---------------------------
  // Clear filters
  // ---------------------------
  const clearFilters = () => navigate("/blogs");

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      <Navbar />

      {/* HERO SECTION TO MATCH HOME */}
      <div className="relative w-full h-[380px] md:h-[360px] mt-16">
        <img
          src="/images/bg.jpg"
          alt="Blogs Banner"
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
            style={{ color: "var(--accent)" }}
          >
            Blog Posts
          </h1>
          <p className="text-white/80 mt-3 text-lg max-w-2xl">
            Explore articles, guides, and updates filtered by categories & tags.
          </p>
        </div>
      </div>

      {/* PAGE CONTENT (same layout as home) */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 pb-10 flex gap-6 relative z-10
      opacity-0 animate-[slideDownFade_0.6s_ease-out_forwards]
      ">
        {/* Sidebar */}
        <Sidebar
          onCategorySelect={(cat) => updateFilter("category", cat)}
          onTagSelect={(tag) => updateFilter("tag", tag)}
        />

        {/* Main Content */}
        <div className="flex-1 text-white">
          {/* Active Filters */}
          {(filters.search || filters.category || filters.tag) && (
            <div className="mt-4 px-4 py-2 bg-white/5 rounded-lg text-sm flex gap-3 items-center">
              <span className="text-white/70">Filters:</span>

              {filters.category && (
                <span className="px-3 py-1 rounded bg-white/10 text-[var(--accent)]">
                  Category: {filters.category}
                </span>
              )}

              {filters.tag && (
                <span className="px-3 py-1 rounded bg-white/10 text-[var(--accent)]">
                  Tag: #{filters.tag}
                </span>
              )}

              {filters.search && (
                <span className="px-3 py-1 rounded bg-white/10 text-[var(--accent)]">
                  Search: {filters.search}
                </span>
              )}

              <button
                onClick={clearFilters}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                Reset
              </button>
            </div>
          )}

          {/* Posts */}
          {loading ? (
            <p className="mt-10 text-white/50 animate-pulse">Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="mt-12 text-center text-white/40 text-lg">
              No posts match your selected filters.
            </div>
          ) : (
            <div className="mt-8 opacity-0 animate-[slideDownFade_0.7s_ease-out_forwards]">
              <PostGrid posts={posts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
