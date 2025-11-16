const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchPosts = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.tag) params.append("tag", filters.tag);
  if (filters.search) params.append("search", filters.search);
  if (filters.sort) params.append("sort", filters.sort);
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);

  const res = await fetch(`${API_URL}/api/posts?${params.toString()}`);
  return res.json();
};
