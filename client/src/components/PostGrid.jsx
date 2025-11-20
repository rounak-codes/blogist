// src/components/PostGrid.jsx
import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;
