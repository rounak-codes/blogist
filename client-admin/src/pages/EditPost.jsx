// client-admin/src/pages/EditPost.jsx
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TipTapEditor from "../components/TipTapEditor";
import GalleryManager from "../components/GalleryManager";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE;
  const [post, setPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  // editor ref to call getHTML / insertImage
  const editorRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${apiBase}/posts/${id}`);
        if (!res.ok) return alert("Failed to load post");
        const json = await res.json();
        setPost(json);
      } catch {
        alert("Network error");
      }
    };
    load();
  }, [apiBase, id]);

  if (!post) return <div className="text-white">Loading...</div>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedContent = editorRef.current?.getHTML() || post.content;
      const body = { ...post, content: updatedContent };

      const res = await fetch(`${apiBase}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": localStorage.getItem("admin_secret") || "",
        },
        body: JSON.stringify(body),
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

  const handleDelete = async () => {
    if (!confirm("Delete this post permanently?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`${apiBase}/posts/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": localStorage.getItem("admin_secret") || "" },
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Delete failed");
      }
      alert("Deleted");
      navigate("/posts");
    } catch (err) {
      alert(err.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

      <input
        value={post.title || ""}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Title"
        className="w-full bg-[#021321] border border-white/6 rounded px-3 py-2 outline-none mb-3"
      />

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
            <img src={post.coverImage} alt="cover" className="w-full max-h-48 object-cover rounded" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-sm text-white/60">Content</label>
        <TipTapEditor
          ref={editorRef}
          value={post.content || ""}
          onChange={(html) => setPost({ ...post, content: html })}
          apiBase={apiBase}
        />
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setGalleryOpen(true)}
            className="px-3 py-1 rounded bg-white/5"
          >
            Open Gallery
          </button>
          <button
            onClick={() => {
              const html = editorRef.current?.getHTML() || "";
              prompt("HTML preview (copy):", html.substring(0, 2000));
            }}
            className="px-3 py-1 rounded bg-white/5"
          >
            Preview HTML
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm text-white/60 mb-2 block">Gallery</label>
        <GalleryManager
          apiBase={apiBase}
          onSelect={(img) => setPost({ ...post, coverImage: img.secure_url || img.url })}
          onInsert={(img) => editorRef.current?.insertImage(img.secure_url || img.url)}
        />
      </div>

      {/* gallery modal (alternative) */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setGalleryOpen(false)} />
          <div className="relative max-w-3xl w-full p-4 bg-[#071422] rounded border border-white/6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg">Gallery</h3>
              <button onClick={() => setGalleryOpen(false)} className="px-2 py-1 rounded bg-white/5">Close</button>
            </div>
            <GalleryManager
              apiBase={apiBase}
              onSelect={(img) => {
                setPost({ ...post, coverImage: img.secure_url || img.url });
                setGalleryOpen(false);
              }}
              onInsert={(img) => {
                editorRef.current?.insertImage(img.secure_url || img.url);
                setGalleryOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handleSave} disabled={saving} className="bg-[var(--accent)] px-4 py-2 rounded">
          {saving ? "Saving..." : "Save"}
        </button>

        <button onClick={handleDelete} disabled={deleting} className="bg-red-600 px-4 py-2 rounded">
          {deleting ? "Deleting..." : "Delete"}
        </button>

        <button onClick={() => navigate("/posts")} className="ml-auto px-4 py-2 rounded border border-white/6">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPost;
