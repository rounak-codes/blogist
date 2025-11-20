import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link
      to={`/post/${post._id}`}
      className="block bg-white dark:bg-gray-900 shadow rounded-xl overflow-hidden hover:scale-[1.02] transition"
    >
      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{post.title}</h2>

        <p className="text-gray-500 text-sm mb-3">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* CLEAN excerpt preview (no HTML) */}
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
