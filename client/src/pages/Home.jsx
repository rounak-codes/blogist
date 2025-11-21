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
    <div className="min-h-screen bg-[#0a0f1c] overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION — mobile-optimized */}
      <div className="w-full">
        <img
          src="/images/bg.jpg"
          alt="Hero Background"
          className="
            w-full 
            h-[260px] sm:h-[380px] md:h-[400px]
            object-cover 
            pointer-events-none select-none
          "
        />
      </div>

      {/* MAIN CONTENT */}
      <div
        className="
          w-full 
          max-w-7xl mx-auto 
          px-2 sm:px-4 
          flex flex-col md:flex-row 
          gap-6
          -mt-12 sm:-mt-16 
          relative z-10
          opacity-0 animate-[slideDownFade_0.6s_ease-out_forwards]
        "
      >
        {/* Sidebar — collapses under PostGrid on mobile */}
        <div className="md:w-80 w-full">
          <Sidebar />
        </div>

        {/* Posts */}
        <div className="flex-1">
          <PostGrid posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
