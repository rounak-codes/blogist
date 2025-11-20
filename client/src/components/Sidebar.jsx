// Sidebar.jsx
import AuthorCard from "./AuthorCard";
import CategoriesCard from "./CategoriesCard";
import TagsCard from "./TagsCard";

const Sidebar = ({ onCategorySelect, onTagSelect }) => {
  const categories = ["Patch Notes", "Story Thoughts", "Meta Talk"];
  const tags = ["furina", "neuvillette", "archon", "abyss", "guide", "build"];

  return (
    <div className="w-80 flex flex-col gap-4 mb-4">
      <AuthorCard />
      <CategoriesCard 
        categories={categories} 
        onCategorySelect={onCategorySelect}
      />
      <TagsCard 
        tags={tags} 
        onTagSelect={onTagSelect}
      />
    </div>
  );
};

export default Sidebar;
