// client/src/components/CategoriesCard.jsx

const CategoriesCard = ({ onCategorySelect }) => {
  const categories = ["Coding", "Tech", "Gaming", "Test"];

  return (
    <div
      className="
        bg-[#0d1525]/70 p-5 rounded-xl shadow 
        border border-white/10 backdrop-blur
      "
    >
      <h3 className="text-xl font-semibold mb-3 text-white">Categories</h3>

      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className="
              text-left px-3 py-2 rounded-lg
              bg-white/5 hover:bg-[var(--accent)] hover:text-black
              border border-white/10 hover:border-[var(--accent)]
              transition text-white/80
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
