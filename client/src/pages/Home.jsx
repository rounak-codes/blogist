import Sidebar from "../components/Sidebar";
import PostGrid from "../components/PostGrid";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.log("Error loading posts", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      {/* Navbar */}
      <Navbar />

      {/* HERO BACKGROUND SECTION (fixed, top only) */}
      <div
        className="w-full"
        style={{ height: "400px" }} // adjust height as needed
      >
        <img
          src="/images/bg.jpg"
          alt="Hero Background"
          className="w-full object-contain pointer-events-none select-none"
        />
      </div>

      {/* CONTENT THAT OVERLAPS THE HERO BACKGROUND */}
      <div className="w-full px-4 flex gap-6 max-w-7xl mx-auto -mt-16
      opacity-0 animate-[slideDownFade_0.6s_ease-out_forwards]">
        {/* Sidebar */}
        <Sidebar />

        {/* Posts */}
        <div className="flex-1">
          <PostGrid posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
