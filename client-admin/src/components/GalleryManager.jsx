// client-admin/src/components/GalleryManager.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

/**
 * GalleryManager
 *
 * Props:
 * - apiBase (default from env)
 * - onSelect(image) -> used when user clicks "Use" (returns image object)
 * - onInsert(image) -> used when user clicks "Insert into editor" (image object)
 * - max: number of images to show
 *
 * This component:
 * - lists images from GET `${apiBase}/upload/list` (if available)
 * - uploads to POST `${apiBase}/upload/image`
 * - deletes via POST `${apiBase}/upload/delete`
 *
 * If server doesn't have /list, it still shows uploads done during this session.
 */

const GalleryManager = ({ apiBase = "/api", onSelect = () => {}, onInsert = () => {}, max = 50 }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("admin_secret") || "";

  // fetch recent images (if endpoint exists)
  const fetchRecent = useCallback(async () => {
    try {
      const res = await axios.get(`${apiBase}/uploads/list`, {
        headers: { "x-admin-secret": token },
      });
      const imgs = (res.data.images || []).slice(0, max);
      setImages(imgs);
    } catch (err) {
      // server may not implement list — ignore
      console.warn("Gallery list unavailable:", err?.message || err);
    }
  }, [apiBase, token, max]);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await axios.post(`${apiBase}/uploads/image`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-admin-secret": token,
        },
      });

      // expected response: { secure_url, public_id, ... }
      const img = res.data;
      setImages((prev) => [img, ...prev].slice(0, max));
      return img;
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  const handleDelete = async (public_id) => {
    if (!confirm("Delete this image permanently?")) return;
    try {
      await axios.post(`${apiBase}/uploads/delete`, { public_id }, {
        headers: { "x-admin-secret": token }
      });
      setImages((prev) => prev.filter((i) => i.public_id !== public_id && i.secure_url !== public_id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border border-white/6 rounded p-3 bg-[#021321] text-white"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Upload / Gallery</span>

          <label className="cursor-pointer bg-white/5 px-3 py-1 rounded text-sm">
            {uploading ? "Uploading..." : "Upload"}
            <input onChange={onFileChange} type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          {images.length === 0 && (
            <div className="text-sm text-white/60 col-span-3">No images yet — upload or drop an image here.</div>
          )}

          {images.map((img) => (
            <div key={img.public_id || img.secure_url} className="relative bg-black/20 rounded overflow-hidden">
              <img src={img.secure_url || img.url} alt="" className="w-full h-24 object-cover" />
              <div className="absolute inset-0 flex items-end justify-between p-1">
                <div className="flex gap-1">
                  <button
                    onClick={() => onInsert(img)}
                    className="bg-[var(--accent)] text-xs px-2 py-1 rounded"
                  >
                    Insert
                  </button>
                  <button
                    onClick={() => onSelect(img)}
                    className="bg-white/10 text-xs px-2 py-1 rounded"
                  >
                    Use
                  </button>
                </div>
                {img.public_id && (
                  <button
                    onClick={() => handleDelete(img.public_id)}
                    className="bg-red-600 text-xs px-2 py-1 rounded"
                  >
                    Del
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
