import { Link } from "react-router-dom";

const TagsCard = ({ tags }) => {
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Tags</h2>

      <div className="flex flex-wrap gap-2">
        {safeTags.length === 0 && (
          <span className="text-sm text-gray-500">No tags found</span>
        )}

        {safeTags.map((tag, idx) => (
          <Link
            key={idx}
            to={`/blogs?tag=${tag}`}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-850 cursor-pointer"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsCard;
