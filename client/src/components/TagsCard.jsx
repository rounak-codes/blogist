import { Link } from "react-router-dom";

const TagsCard = ({ tags, onTagSelect }) => {
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <div
      className="shadow rounded-xl p-4"
      style={{ backgroundColor: "var(--bg-accent)" }}
    >
      <h2 className="text-lg font-semibold mb-3 text-white">Tags</h2>

      <div className="flex flex-wrap gap-2">
        {safeTags.length === 0 && (
          <span className="text-sm text-gray-500">No tags found</span>
        )}

        {safeTags.map((tag, idx) => {
          const safe = tag.toLowerCase();  // <-- CASE INSENSITIVE

          return (
            <Link
              key={idx}
              to={`/blogs?tag=${encodeURIComponent(safe)}`}
              onClick={() => onTagSelect(safe)}
              className="
                px-3 py-1 text-sm rounded-full 
                bg-[var(--accent)]/10
                text-[var(--accent)]
                border border-[var(--accent)]/40
                hover:bg-[var(--accent)] hover:text-black
                transition
              "
            >
              #{tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TagsCard;
