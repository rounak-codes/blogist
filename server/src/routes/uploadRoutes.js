// server/src/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { adminAuth } from "../middleware/adminAuth.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload a single image (from file input / drag-drop / paste)
router.post("/image", adminAuth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "genshin-blog",
      resource_type: "image",
    });

    // remove temp
    try { fs.unlinkSync(req.file.path); } catch (e) {}

    res.json({
      ok: true,
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Delete image by public_id
router.post("/delete", adminAuth, async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ message: "public_id required" });

    const result = await cloudinary.uploader.destroy(public_id, { resource_type: "image" });
    res.json({ ok: true, result });
  } catch (err) {
    console.error("Cloudinary delete error", err);
    res.status(500).json({ ok: false, message: "Delete failed" });
  }
});

// server/src/routes/uploadRoutes.js (append)
router.get("/list", adminAuth, async (req, res) => {
  try {
    // small search: folder genshin-blog, resource_type image
    const result = await cloudinary.search
      .expression("folder:genshin-blog")
      .max_results(50)
      .sort_by("uploaded_at", "desc")
      .execute();

    const images = (result.resources || []).map((r) => ({
      secure_url: r.secure_url,
      public_id: r.public_id,
      width: r.width,
      height: r.height,
    }));
    res.json({ images });
  } catch (err) {
    res.status(500).json({ message: "List failed" });
  }
});


export default router;
