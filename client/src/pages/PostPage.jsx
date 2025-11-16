import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);
  }, [id]);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {post.coverImage && (
        <img
          src={post.coverImage}
          className="w-full rounded-xl mb-6"
          alt={post.title}
        />
      )}

      <div
        className="prose dark:prose-invert max-w-full"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostPage;
