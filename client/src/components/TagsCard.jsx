// client/src/components/TagsCard.jsx

const TagsCard = ({ onTagSelect }) => {
  const tags = ["Python", "AI", "Javascript", "Guides", "Test", "Photo"];

  return (
    <div
      className="
        bg-[#0d1525]/70 p-5 rounded-xl shadow 
        border border-white/10 backdrop-blur
      "
    >
      <h3 className="text-xl font-semibold mb-3 text-white">Tags</h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag.toLowerCase())}
            className="
              px-3 py-[6px] rounded-full
              bg-white/5 text-white/80 border border-white/10
              hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)]
              transition text-sm
            "
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsCard;
