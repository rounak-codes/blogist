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
    <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO (mobile-friendly height) */}
      <div className="relative w-full h-[300px] sm:h-[340px] md:h-[380px] mt-0">
        <img
          src="/images/bg.jpg"
          alt="banner"
          className="w-full h-full object-cover opacity-60 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* LAYOUT: stacks on mobile, side-by-side on desktop */}
      <div
        className="
          max-w-7xl mx-auto px-3 sm:px-4 
          -mt-20 md:-mt-24 pb-10
          flex flex-col md:flex-row 
          gap-6 relative z-10
          opacity-0 animate-[slideDownFade_0.6s_ease-out_forwards]
        "
      >
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN POST CONTENT */}
        <div
          className="
            flex-1 bg-[#0d1525] p-5 sm:p-8 
            rounded-xl shadow border border-white/5
            mt-2 md:mt-8
          "
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-[var(--accent)] leading-snug">
            {post.title}
          </h1>

          <p className="text-white/50 mb-6 text-sm sm:text-base">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {post.coverImage && (
            <img
              src={post.coverImage}
              className="w-full rounded-xl mb-6 sm:mb-8 object-cover"
            />
          )}

          {/* PROSE CONTENT (mobile-friendly typography) */}
          <div
            className="
              prose dark:prose-invert max-w-none
              prose-img:rounded-xl prose-img:w-full prose-img:h-auto
              prose-p:text-[16px] sm:prose-p:text-[18px]
              prose-li:text-[16px] sm:prose-li:text-[18px]
              prose-h2:text-[24px] sm:prose-h2:text-[28px]
              prose-h3:text-[20px] sm:prose-h3:text-[22px]
              overflow-x-hidden
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
