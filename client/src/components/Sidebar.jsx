import AuthorCard from "./AuthorCard";
import CategoriesCard from "./CategoriesCard";
import TagsCard from "./TagsCard";

const Sidebar = () => {
  const categories = ["Patch Notes", "Story Thoughts", "Meta Talk"];
  const tags = ["furina", "neuvillette", "archon", "abyss", "guide", "build"];

  return (
    <div className="w-64 flex flex-col gap-4">
      <AuthorCard />
      <CategoriesCard categories={categories} />
      <TagsCard tags={tags} />
    </div>
  );
};

export default Sidebar;
