// src/pages/Archive.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const Archive = () => {
  const [posts, setPosts] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();

        // Group posts by year
        const grouped = {};
        data.forEach((post) => {
          const year = new Date(post.createdAt).getFullYear();
          if (!grouped[year]) grouped[year] = [];
          grouped[year].push(post);
        });

        // Sort years (desc)
        const sorted = Object.keys(grouped)
          .sort((a, b) => b - a)
          .reduce((acc, key) => {
            acc[key] = grouped[key];
            return acc;
          }, {});

        setPosts(sorted);
        setLoaded(true);
      } catch (err) {
        console.error("Archive load error:", err);
      }
    };

    load();
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] text-white p-10">
        Loading archive…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <Navbar />

      {/* HERO --- similar to Blogs */}
      <div className="relative w-full h-[360px] mt-16">
        <img
          src="/images/bg.jpg"
          className="w-full h-full object-cover opacity-60 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold drop-shadow-lg"
            style={{ color: "var(--accent)" }}
          >
            Archive
          </h1>
          <p className="text-white/80 mt-3 text-lg max-w-2xl">
            Browse posts organized by year and timeline.
          </p>
        </div>
      </div>

      {/* CONTENT (flexible height — no fixed values) */}
      <div
        className="
          w-full px-4 flex gap-10 max-w-7xl mx-auto
          -mt-24 relative z-10
          opacity-0 animate-[slideDownFade_0.6s_ease-out_forwards]
        "
      >
        {/* Sidebar */}
        <Sidebar />

        {/* ARCHIVE TIMELINE CARD */}
        <div
          className="
            flex-1 bg-[#0d1525] p-8 rounded-xl shadow
            border border-white/5
          "
        >
          {/* YEARS */}
          {Object.keys(posts).map((year) => (
            <div key={year} className="mb-16">
              {/* YEAR HEADER */}
              <div className="flex items-baseline gap-4 mb-6">
                <h2 className="text-4xl font-bold tracking-tight">{year}</h2>
                <span className="text-white/40 text-lg">
                  {posts[year].length} posts
                </span>
              </div>

              {/* TIMELINE */}
              <div className="relative pl-14">
                {/* Vertical Line */}
                <div
                  className="
                    absolute top-0 bottom-0
                    w-[3px] bg-[var(--accent)]/40 rounded-full
                  "
                />

                {/* POSTS */}
                {posts[year].map((post) => {
                  const d = new Date(post.createdAt);
                  const mm = String(d.getMonth() + 1).padStart(2, "0");
                  const dd = String(d.getDate()).padStart(2, "0");

                  return (
                    <div key={post._id} className="relative pb-10">
                      {/* DOT */}
                      <div
                        className="
                          w-4 h-4 rounded-full
                          bg-[var(--accent)]
                          absolute left-[64px] top-2
                          shadow-[0_0_12px_var(--accent)]
                        "
                      />

                      {/* CONTENT */}
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* DATE */}
                        <div className="w-20 text-white/50 text-lg font-medium">
                          {mm}-{dd}
                        </div>

                        {/* TITLE */}
                        <Link
                          to={`/post/${post._id}`}
                          className="
                            text-2xl font-semibold tracking-tight leading-snug
                            text-white hover:text-[var(--accent)] transition
                          "
                        >
                          {post.title}
                        </Link>

                        {/* TAGS */}
                        <div className="flex flex-wrap gap-2 md:ml-auto">
                          {post.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="
                                text-sm px-3 py-[3px] rounded-full
                                bg-[var(--accent)]/10
                                border border-[var(--accent)]/40
                                text-[var(--accent)]
                                hover:bg-[var(--accent)] hover:text-black
                                transition backdrop-blur-sm
                              "
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* END DIVIDER (visible) */}
          <div className="w-full h-[1px] bg-white/20 mt-8 mb-2 rounded-full opacity-70"></div>
        </div>
      </div>
    </div>
  );
};

export default Archive;
