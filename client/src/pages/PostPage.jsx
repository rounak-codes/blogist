import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);

  // Load the single post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error loading post", err);
      }
    };

    fetchPost();
  }, [id]);

  // Load related posts (same tag or category)
  useEffect(() => {
    if (!post) return;

    const fetchRelated = async () => {
      try {
        const tag = post.tags?.[0] || "";
        const category = post.category || "";

        const res = await fetch(
          `http://localhost:5000/api/posts?tag=${tag}&category=${category}`
        );
        const data = await res.json();

        setRelated(data.filter((p) => p._id !== post._id).slice(0, 3)); // limit 3
      } catch (err) {
        console.error("Error fetching related posts", err);
      }
    };

    fetchRelated();
  }, [post]);

  if (!post)
    return (
      <div className="min-h-screen bg-[#0a0f1c] text-white p-10">
        Loading post...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <Navbar />

      {/* MAIN WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-10">

        {/* --- SIDEBAR --- */}
        <Sidebar />

        {/* --- POST BODY AREA --- */}
        <div className="flex-1">

          {/* Breadcrumb */}
          <div className="text-sm text-white/60 mb-4">
            <Link to="/blogs" className="hover:text-[var(--accent)]">
              Blogs
            </Link>{" "}
            /{" "}
            <span className="text-[var(--accent)]">{post.category}</span>
          </div>

          {/* Post Title */}
          <h1
            className="text-4xl font-bold mb-2 leading-snug"
            style={{ color: "var(--accent)" }}
          >
            {post.title}
          </h1>

          {/* Date */}
          <p className="text-white/50 mb-6">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full mb-8 rounded-2xl overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1c]/80"></div>
            </div>
          )}

          {/* CONTENT */}
          <div
            className="prose dark:prose-invert prose-img:rounded-xl max-w-none text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* --- TAGS SECTION --- */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/blogs?tag=${tag}`}
                  className="px-3 py-1 rounded-full text-sm 
                    bg-white/5 hover:bg-[var(--hover-accent)] 
                    transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* --- AUTHOR BOX --- */}
          <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-2">
              Written by <span style={{ color: "var(--accent)" }}>Xiffy</span>
            </h3>
            <p className="text-white/60 text-sm">
              Genshin Impact Enthusiast • Blogger • Developer
            </p>
          </div>

          {/* --- RELATED POSTS --- */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent)" }}>
                Related Posts
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p._id}
                    to={`/post/${p._id}`}
                    className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"
                  >
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-white/40 mt-1">
                      {p.category}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* --- BOTTOM NAVIGATION --- */}
          <div className="mt-12 flex justify-between text-sm text-white/50">
            <button
              onClick={() => navigate(-1)}
              className="hover:text-[var(--accent)] transition"
            >
              ← Back
            </button>

            <Link
              to="/blogs"
              className="hover:text-[var(--accent)] transition"
            >
              View all posts →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostPage;
