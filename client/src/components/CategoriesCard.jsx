const CategoriesCard = ({ categories, onCategorySelect }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div
      className="shadow rounded-xl p-4"
      style={{ backgroundColor: "var(--bg-accent)" }}
    >
      <h2 className="text-lg font-semibold mb-3 text-white">Categories</h2>

      <div className="flex flex-col gap-2">
        {safeCategories.length === 0 && (
          <span className="text-sm text-gray-500">No categories found</span>
        )}

        {safeCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onCategorySelect(cat)}
            className="
              text-left px-3 py-2 rounded-lg 
              bg-transparent text-white w-full
              transition-colors duration-200
              hover:bg-[var(--hover-accent)]
            "
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCard;
