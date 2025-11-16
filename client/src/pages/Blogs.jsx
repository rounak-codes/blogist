import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import AuthorCard from "../components/AuthorCard";
import CategoriesCard from "../components/CategoriesCard";
import TagsCard from "../components/TagsCard";
import { fetchPosts } from "../api/posts";

const Blogs = () => {
  // FILTER STATES
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
    search: "",
    sort: "newest",
    page: 1,
    limit: 10,
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH POSTS WHEN FILTERS CHANGE
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchPosts(filters);
      setPosts(data.posts || data);
      setLoading(false);
    };

    load();
  }, [filters]);

  return (
    <div className="w-full mx-auto px-6 py-8 flex gap-8">
  
      {/* LEFT SIDEBAR */}
      <div className="w-1/4 space-y-6 hidden lg:block">
        <AuthorCard />
  
        {/* optional: remove if using dropdown filters */}
        <CategoriesCard
          categories={["tech", "life", "travel", "coding"]}  // temporary, until backend integration
          filters={filters}
          setFilters={setFilters}
        />

        <TagsCard
          tags={["react", "mongodb", "javascript"]}          // temporary
          filters={filters}
          setFilters={setFilters}
        />

      </div>
  
      {/* MAIN CONTENT AREA */}
      <div className="flex-1">
        
        {/* ⭐ PLACE THE FILTER UI HERE — RIGHT ON TOP OF POSTS ⭐ */}
        <div className="filters flex gap-4 items-center mb-6">
  
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value, page: 1 })
            }
          />
  
          {/* Category */}
          <select
            className="border px-3 py-2 rounded"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value, page: 1 })
            }
          >
            <option value="">All Categories</option>
            <option value="tech">Tech</option>
            <option value="life">Life</option>
            <option value="travel">Travel</option>
            <option value="coding">Coding</option>
          </select>
  
          {/* Tag */}
          <select
            className="border px-3 py-2 rounded"
            value={filters.tag}
            onChange={(e) =>
              setFilters({ ...filters, tag: e.target.value, page: 1 })
            }
          >
            <option value="">All Tags</option>
            <option value="react">React</option>
            <option value="mongodb">MongoDB</option>
            <option value="javascript">JavaScript</option>
          </select>
  
          {/* Sort */}
          <select
            className="border px-3 py-2 rounded"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
        {/* END FILTER UI */}
  
        {/* POSTS GRID */}
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              posts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );  
};

export default Blogs;
