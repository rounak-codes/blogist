// src/pages/Blogs.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostGrid from "../components/PostGrid";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read URL query parameters
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    search: query.get("search") || "",
    category: query.get("category") || "",
    tag: query.get("tag") || ""
  });

  // ---------------------------
  // Sync filters → URL query 
  // ---------------------------
  useEffect(() => {
    const params = new URLSearchParams();
  
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.tag) params.set("tag", filters.tag);
  
    navigate(`/blogs?${params.toString()}`, { replace: true });
  }, [filters, navigate]);  

  // ---------------------------
  // Fetch posts from backend
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
  // Helper to update filters
  // ---------------------------
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // ---------------------------
  // Clear all filters
  // ---------------------------
  const clearFilters = () =>
    setFilters({ search: "", category: "", tag: "" });

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      {/* Navbar */}
      <Navbar />

      {/* Page Layout */}
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-10 flex gap-6">
        {/* Sidebar */}
        <Sidebar
          onCategorySelect={(cat) => updateFilter("category", cat)}
          onTagSelect={(tag) => updateFilter("tag", tag)}
        />

        {/* Main Content */}
        <div className="flex-1 text-white">
          {/* Title */}
          <h1
            className="text-4xl font-bold"
            style={{ color: "var(--accent)" }}
          >
            All Blog Posts
          </h1>
          <p className="text-white/60 mt-1">
            Browse posts or refine them using categories and tags.
          </p>

          {/* Active Filters */}
          {(filters.search || filters.category || filters.tag) && (
            <div className="mt-4 px-4 py-2 bg-white/5 rounded-lg text-sm flex gap-3 items-center">
              <span className="text-white/70">Filters:</span>

              {filters.search && (
                <span className="px-3 py-1 rounded bg-white/10 text-[var(--accent)]">
                  Search: {filters.search}
                </span>
              )}

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

              <button
                onClick={clearFilters}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                Clear
              </button>
            </div>
          )}

          {/* Posts Display */}
          {loading ? (
            <p className="mt-10 text-white/50 animate-pulse">
              Loading posts...
            </p>
          ) : posts.length === 0 ? (
            <div className="mt-12 text-center text-white/40 text-lg">
              No matching posts found.
            </div>
          ) : (
            <div className="mt-8">
              <PostGrid posts={posts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
