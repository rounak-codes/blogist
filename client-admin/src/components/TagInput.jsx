import { useState } from "react";

const TagInput = ({ label, items, setItems }) => {
  const [value, setValue] = useState("");

  const addItem = (text) => {
    const clean = text.trim().toLowerCase();
    if (!clean) return;
    if (!items.includes(clean)) {
      setItems([...items, clean]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      addItem(value);
      setValue("");
    }

    if (e.key === "Backspace" && value === "") {
      setItems(items.slice(0, -1));
    }
  };

  const removeItem = (item) => {
    setItems(items.filter((i) => i !== item));
  };

  return (
    <div>
      <label className="text-sm text-white/60 mb-1 block">{label}</label>

      <div className="flex flex-wrap gap-2 p-2 bg-[#021321] border border-white/10 rounded">
        {items.map((tag) => (
          <span
            key={tag}
            className="
              bg-[var(--accent)]/20 
              text-[var(--accent)] 
              px-2 py-1 rounded-full text-sm cursor-pointer
              hover:bg-[var(--accent)] hover:text-black transition
            "
            onClick={() => removeItem(tag)}
          >
            #{tag}
          </span>
        ))}

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press comma or space…"
          className="bg-transparent outline-none text-white flex-grow min-w-[120px]"
        />
      </div>
    </div>
  );
};

export default TagInput;
