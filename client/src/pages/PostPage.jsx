import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error loading post:", err);
      }
    };

    load();
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] text-white p-10">
        Loading post…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <Navbar />

      {/* EXACT HERO FROM HOME */}
      <div className="w-full h-[380px]">
        <img
          src="/images/bg.jpg"
          alt="banner"
          className="w-full object-contain pointer-events-none select-none"
        />
        <div/>
      </div>

      {/* ALIGN EXACTLY LIKE HOME */}
      <div className="
        w-full px-4 flex gap-10 max-w-7xl mx-auto 
        -mt-11 relative z-10
      ">
        {/* Sidebar — same position as Home */}
        <Sidebar />

        {/* Main Post Container */}
        <div className="
          flex-1 
          bg-[#0d1525] 
          p-8 
          rounded-xl 
          shadow 
          border border-white/5
          mt-4
        ">
          <h1 className="text-6xl font-bold mb-2 text-[var(--accent)]">
            {post.title}
          </h1>

          <p className="text-white/50 mb-6">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {post.coverImage && (
            <img
              src={post.coverImage}
              className="w-full rounded-xl mb-8"
            />
          )}

          <div
            className="prose dark:prose-invert max-w-none prose-img:rounded-xl
                        prose-p:text-[18px] prose-li:text-[18px] prose-h2:text-[28px] prose-h3:text-[22px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
