import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TipTapEditor from "../components/TipTapEditor";
import GalleryManager from "../components/GalleryManager";
import TagInput from "../components/TagInput";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE;
  const editorRef = useRef();

  const [post, setPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ---------------- LOAD POST ----------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${apiBase}/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch {
        alert("Error loading post");
      }
    };
    load();
  }, [apiBase, id]);

  if (!post) return <div className="text-white">Loading...</div>;

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    setSaving(true);

    const updatedContent = editorRef.current?.getHTML() || post.content;

    try {
      const res = await fetch(`${apiBase}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": localStorage.getItem("admin_secret") || "",
        },
        body: JSON.stringify({
          ...post,
          content: updatedContent,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Update failed");

      alert("Updated");
      navigate("/posts");
    } catch (err) {
      alert(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async () => {
    if (!confirm("Delete this post permanently?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${apiBase}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": localStorage.getItem("admin_secret") || "",
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Post deleted");
      navigate("/posts");
    } catch (err) {
      alert(err.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full px-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

      {/* TITLE */}
      <input
        value={post.title || ""}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Title"
        className="w-full bg-[#021321] border border-white/6 rounded px-3 py-2 outline-none mb-3"
      />

      {/* COVER IMAGE */}
      <div className="mb-3">
        <label className="text-sm text-white/60">Cover image URL</label>
        <input
          value={post.coverImage || ""}
          onChange={(e) => setPost({ ...post, coverImage: e.target.value })}
          placeholder="https://..."
          className="w-full bg-[#021321] border border-white/6 rounded px-3 py-2 mt-1 outline-none"
        />

        {post.coverImage && (
          <div className="mt-2">
            <img
              src={post.coverImage}
              className="w-full max-h-48 object-cover rounded"
            />
          </div>
        )}
      </div>

      {/* CATEGORIES USING TAGINPUT */}
      <TagInput
        label="Categories"
        items={post.categories || []}
        setItems={(items) => setPost({ ...post, categories: items })}
      />

      {/* TAGS USING TAGINPUT */}
      <TagInput
        label="Tags"
        items={post.tags || []}
        setItems={(items) => setPost({ ...post, tags: items })}
      />

      {/* CONTENT EDITOR */}
      <div className="mb-4">
        <TipTapEditor
          ref={editorRef}
          value={post.content || ""}
          onChange={(html) => setPost({ ...post, content: html })}
          apiBase={apiBase}
        />
      </div>

      {/* GALLERY */}
      <div className="mb-4">
        <label className="text-sm text-white/60 mb-1 block">Gallery</label>
        <GalleryManager
          apiBase={apiBase}
          onSelect={(img) =>
            setPost({ ...post, coverImage: img.secure_url || img.url })
          }
        />
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[var(--accent)] px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save"}
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 px-4 py-2 rounded"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>

        <button
          onClick={() => navigate("/posts")}
          className="ml-auto px-4 py-2 rounded border border-white/6"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPost;
