import { Link } from "react-router-dom";

const CategoriesCard = ({ categories }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>

      <div className="flex flex-col gap-2">
        {safeCategories.length === 0 && (
          <span className="text-sm text-gray-500">No categories found</span>
        )}

        {safeCategories.map((cat, idx) => (
          <Link
            key={idx}
            to={`/blogs?category=${cat}`}
            className="text-left px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-850 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCard;
