import { Link } from "react-router-dom";

const TagsCard = ({ tags }) => {
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

        {safeTags.map((tag, idx) => (
          <Link
            key={idx}
            to={`/blogs?tag=${tag}`}
            className="
              px-3 py-1 text-sm rounded-full 
              bg-transparent text-white
              transition-colors duration-200
              hover:bg-[var(--hover-accent)]
            "
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsCard;
