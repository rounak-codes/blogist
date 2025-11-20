import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [accent, setAccent] = useState(265);
  const [openPicker, setOpenPicker] = useState(false);

  const pickerRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // -----------------------------------
  // Load accent & detect clicks outside
  // -----------------------------------
  useEffect(() => {
    const storedHue = localStorage.getItem("accent-hue");
    if (storedHue) {
      setAccent(Number(storedHue));
      applyAccent(Number(storedHue));
    } else {
      applyAccent(265);
    }

    const handleClickOutside = (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setOpenPicker(false);
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -----------------------------------
  // Apply accent color
  // -----------------------------------
  const applyAccent = (hue) => {
    document.documentElement.style.setProperty("--accent-h", hue);
    document.documentElement.style.setProperty(
      "--accent",
      `hsl(${hue}, var(--accent-s), var(--accent-l))`
    );
    document.documentElement.style.setProperty(
      "--hover-accent",
      `hsla(${hue}, var(--accent-s), var(--accent-l), var(--accent-alpha))`
    );
  };

  const handleAccentChange = (e) => {
    const hue = Number(e.target.value);
    setAccent(hue);
    applyAccent(hue);
    localStorage.setItem("accent-hue", hue);
  };

  // -----------------------------------
  // 🔍 LIVE SEARCH (debounced)
  // -----------------------------------
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/posts?search=${search}`
        );
        const data = await res.json();
        setResults(data.slice(0, 5)); // Top 5
        setShowResults(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSearch = (e) => e.preventDefault();

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className="
          max-w-7xl w-full mx-auto 
          shadow-lg rounded-b-2xl
          px-6 py-5 
          flex justify-between items-center
        "
        style={{ backgroundColor: "var(--bg-accent)" }}
      >
        {/* LEFT */}
        <Link
          to="/"
          className="font-bold text-lg ml-6"
          style={{ color: "var(--accent)" }}
        >
          Home
        </Link>

        {/* CENTER LINKS */}
        <ul className="flex space-x-6 ml-40 text-white">
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/archive">Archive</Link></li>
          <li>
            <a
              href="https://github.com/rounak-codes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition"
            >
              Github
            </a>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH BOX */}
          <div className="relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="relative flex items-center rounded-lg overflow-hidden bg-white/10 backdrop-blur px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.65 6.65a7.5 7.5 0 0 0 10 10Z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-3 py-2 bg-transparent outline-none text-white placeholder-white/40 w-64"
              />
            </form>

            {/* 🔽 SEARCH DROPDOWN */}
            {search.length > 0 && showResults && (
              <div className="absolute top-full mt-2 w-80 bg-[#0a0f1c] 
                              rounded-xl shadow-xl p-2 z-50 border border-white/10">

                {/* Nothing found */}
                {results.length === 0 && (
                  <div className="p-3 text-white/60 text-sm">
                    No posts found.
                  </div>
                )}

                {/* Results */}
                {results.map((post) => (
                  <Link
                    key={post._id}
                    to={`/post/${post._id}`}
                    onClick={() => {
                      setShowResults(false);
                      setSearch("");
                    }}
                    className="block p-3 rounded-lg bg-white/5 
                               hover:bg-white/10 transition cursor-pointer"
                  >
                    <h3 className="font-semibold text-white text-sm">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/40">
                      {post.excerpt || "Article"}
                    </p>
                  </Link>
                ))}

                {/* SEE ALL RESULTS */}
                {results.length > 0 && (
                  <button
                    onClick={() => {
                      navigate(`/blogs?search=${search}`);
                      setShowResults(false);
                    }}
                    className="w-full text-left mt-2 text-[var(--accent)] 
                               hover:text-white transition text-sm px-3 py-2"
                  >
                    See all results →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ACCENT PICKER */}
          <div ref={pickerRef} className="relative">
            <button
              onClick={() => setOpenPicker((prev) => !prev)}
              className="p-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
                style={{ color: "var(--accent)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c-4.97 0-9 3.58-9 8 0 4.42 4.03 8 9 8 .74 0 1.45-.08 2.13-.23.47-.11.87-.46 1.03-.92.27-.79-.3-1.61-1.12-1.61h-1.02c-1.1 0-2-.9-2-2 0-.79.46-1.47 1.13-1.8.33-.16.54-.5.54-.87V10c0-.55-.45-1-1-1H9.5c-.51 0-.93-.37-.99-.88C8.1 5.88 9.67 4 12 4c3.31 0 6 2.24 6 5 0 2.21-1.79 4-4 4h-.5"
                />
              </svg>
            </button>

            {openPicker && (
              <div
                className="
                  absolute right-0 mt-2 bg-gray-800 
                  p-3 rounded-xl shadow-xl w-80 
                  border border-white/10
                "
              >
                <p className="text-white text-sm mb-1">Accent Color</p>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={accent}
                  onChange={handleAccentChange}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
