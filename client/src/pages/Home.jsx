import Sidebar from "../components/Sidebar";
import PostGrid from "../components/PostGrid";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.log("Error loading posts", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="w-full px-4 py-8 flex gap-6">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Post Grid */}
        <div className="flex-1">
          <PostGrid posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
