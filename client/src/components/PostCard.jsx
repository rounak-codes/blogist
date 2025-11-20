// client/src/components/PostCard.jsx
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Tag,
  Folder,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const PostCard = ({ post }) => {
  const wordCount = post.content
    ? post.content.replace(/<[^>]+>/g, "").trim().split(/\s+/).length
    : 0;

  const minutes = Math.max(1, Math.ceil(wordCount / 180));

  return (
    <Link
      to={`/post/${post._id}`}
      className="
        group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden 
        shadow hover:shadow-lg transition-all border border-white/10 
        hover:scale-[1.01] relative
      "
    >
      {/* Cover */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-5 pr-20 space-y-4">

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-[var(--accent)] mt-2 rounded-full"></div>

          <h2
            className="
              text-4.5xl font-semibold 
              transition
              group-hover:text-[var(--accent)]
            "
          >
            {post.title}
          </h2>
        </div>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-base text-gray-400">

          {/* Date */}
          <div className="flex items-center gap-1">
            <CalendarDays size={16} className="text-[var(--accent)]" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Categories */}
          {post.categories?.length > 0 && (
            <div className="flex items-center gap-1">
              <Folder size={16} className="text-[var(--accent)]" />
              {post.categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/blogs?category=${encodeURIComponent(cat)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="
                    px-2 py-[1px] rounded-full text-xs 
                    border 
                    bg-[var(--accent)]/10
                    text-[var(--accent)]
                    border-[var(--accent)]/40
                    hover:bg-[var(--accent)] hover:text-black 
                    transition
                  "
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag size={16} className="text-[var(--accent)]" />

              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blogs?tag=${encodeURIComponent(tag)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="
                      px-2 py-[1px] rounded-full text-xs 
                      border 
                      bg-[var(--accent)]/10
                      text-[var(--accent)]
                      border-[var(--accent)]/40
                      hover:bg-[var(--accent)] hover:text-black 
                      transition
                    "
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-700 dark:text-gray-300 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer Row */}
        <div className="flex items-center gap-4 text-gray-400 text-base pt-2">
          <div className="flex items-center gap-1">
            <BookOpen size={15} className="text-[var(--accent)]" />
            <span>{wordCount} words</span>
          </div>

          <div className="text-[var(--accent)] font-medium">
            {minutes} min read
          </div>
        </div>
      </div>

      {/* Bottom hover highlight */}
      <div className="h-[3px] bg-[var(--accent)] w-0 group-hover:w-full transition-all"></div>

      {/* Right Accent Bar */}
      <div
        className="
          absolute top-5 bottom-2 right-4 h-[80%] w-14
          bg-[var(--accent)]/20 
          flex items-center justify-center
          rounded-xl
          opacity-80
          group-hover:bg-[var(--accent)] 
          group-hover:text-black
          transition-all
        "
      >
        <ArrowRight className="text-[var(--accent)] group-hover:text-black" size={20} />
      </div>
    </Link>
  );
};

export default PostCard;
