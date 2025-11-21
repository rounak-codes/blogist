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
        w-full
      "
    >
      {/* Cover */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="
            w-full 
            h-48 object-cover 
            sm:h-56 
            md:h-60 
            lg:h-56
          "
        />
      )}

      <div className="p-4 sm:p-5 pr-16 sm:pr-20 space-y-3 sm:space-y-4">

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-[var(--accent)] mt-1.5 sm:mt-2 rounded-full"></div>

          <h2
            className="
              text-2xl sm:text-4.5xl font-semibold 
              transition
              group-hover:text-[var(--accent)]
              leading-snug
            "
          >
            {post.title}
          </h2>
        </div>

        {/* Meta Row */}
        <div
          className="
            flex flex-wrap items-center gap-3 sm:gap-4 
            text-sm sm:text-base text-gray-400
          "
        >
          {/* Date */}
          <div className="flex items-center gap-1">
            <CalendarDays size={15} className="text-[var(--accent)]" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Categories */}
          {post.categories?.length > 0 && (
            <div className="flex items-center gap-1">
              <Folder size={15} className="text-[var(--accent)]" />
              {post.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/blogs?category=${encodeURIComponent(cat)}`;
                  }}
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
                </button>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag size={15} className="text-[var(--accent)]" />

              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/blogs?tag=${encodeURIComponent(tag)}`;
                    }}
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
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Excerpt */}
        <p
          className="
            text-base sm:text-lg 
            text-gray-700 dark:text-gray-300 
            line-clamp-3
          "
        >
          {post.excerpt}
        </p>

        {/* Footer Row */}
        <div
          className="
            flex items-center gap-3 sm:gap-4 
            text-gray-400 
            text-sm sm:text-base
            pt-2
          "
        >
          <div className="flex items-center gap-1">
            <BookOpen size={14} className="text-[var(--accent)]" />
            <span>{wordCount} words</span>
          </div>

          <div className="text-[var(--accent)] font-medium">{minutes} min read</div>
        </div>
      </div>

      {/* Bottom hover highlight */}
      <div className="h-[3px] bg-[var(--accent)] w-0 group-hover:w-full transition-all"></div>

      {/* Right Accent Bar */}
      <div
        className="
          absolute top-5 bottom-2 right-3 sm:right-4 
          h-[65%] sm:h-[80%] 
          w-10 sm:w-14
          bg-[var(--accent)]/20 
          flex items-center justify-center
          rounded-xl
          opacity-80
          group-hover:bg-[var(--accent)] 
          group-hover:text-black
          transition-all
        "
      >
        <ArrowRight size={18} className="text-[var(--accent)] group-hover:text-black" />
      </div>
    </Link>
  );
};

export default PostCard;
