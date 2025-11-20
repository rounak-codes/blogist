// client-admin/src/pages/CreatePost.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TipTapEditor from "../components/TipTapEditor";
import GalleryManager from "../components/GalleryManager";

const CreatePost = () => {
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE;
  const editorRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("published");
  const [saving, setSaving] = useState(false);

  // autosave local (every 20s)
  useEffect(() => {
    const t = setInterval(() => {
      const html = editorRef.current?.getHTML();
      if (html) localStorage.setItem("draft_content", html);
    }, 20000);
    return () => clearInterval(t);
  }, []);

  // restore draft
  useEffect(() => {
    const draft = localStorage.getItem("draft_content");
    if (draft) setContent(draft);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const html = editorRef.current?.getHTML() || content;
    if (!title.trim() || !html.trim()) {
      alert("Title + content required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${apiBase}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": localStorage.getItem("admin_secret") || "",
        },
        body: JSON.stringify({ title, content: html, coverImage, status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Create failed");
      localStorage.removeItem("draft_content");
      alert("Created");
      navigate("/posts");
    } catch (err) {
      alert(err.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full bg-[#021321] border border-white/6 rounded px-3 py-2 outline-none"
        />

        <div>
          <label className="text-sm text-white/60">Cover image URL</label>
          <input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://..."
            className="w-full bg-[#021321] border border-white/6 rounded px-3 py-2 mt-1 outline-none"
          />
          {coverImage && (
            <div className="mt-2">
              <img src={coverImage} alt="preview" className="w-full max-h-48 object-cover rounded" />
            </div>
          )}
        </div>

        <div>
          <label className="text-sm text-white/60 mb-2 block">Content</label>
          <TipTapEditor ref={editorRef} value={content} onChange={(html) => setContent(html)} apiBase={apiBase} />
        </div>

        <div>
          <label className="text-sm text-white/60 mb-2 block">Gallery</label>
          <GalleryManager apiBase={apiBase} onSelect={(img) => setCoverImage(img.secure_url || img.url)} />
        </div>

        <div className="flex items-center gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-[#021321] border border-white/6 rounded px-3 py-2">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <button type="submit" disabled={saving} className="bg-[var(--accent)] hover:bg-[var(--hover-accent)] px-4 py-2 rounded">
            {saving ? "Saving..." : "Create post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
