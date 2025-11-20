// Sidebar.jsx
import AuthorCard from "./AuthorCard";
import CategoriesCard from "./CategoriesCard";
import TagsCard from "./TagsCard";

const Sidebar = ({ onCategorySelect, onTagSelect }) => {
  const categories = ["Coding", "Tech", "Gaming" , "Test"];
  const tags = ["Python", "AI", "Javascript", "Guides", "Test" , "Photo"];

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
