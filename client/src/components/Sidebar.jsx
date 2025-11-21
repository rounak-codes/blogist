// client/src/components/Sidebar.jsx

import AuthorCard from "./AuthorCard";
import CategoriesCard from "./CategoriesCard";
import TagsCard from "./TagsCard";

const Sidebar = ({ onCategorySelect, onTagSelect }) => {
  return (
    <aside className="w-80 flex-col gap-4 mb-4 hidden lg:flex">
      <AuthorCard />
      <CategoriesCard onCategorySelect={onCategorySelect} />
      <TagsCard onTagSelect={onTagSelect} />
    </aside>
  );
};

export default Sidebar;
