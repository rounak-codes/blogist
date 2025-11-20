// server/src/routes/postRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/Post.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { extractPublicId } from "../utils/getPublicId.js";

const router = express.Router();

/* ------------------ MULTER SETUP ------------------ */
const upload = multer({ storage: multer.memoryStorage() });

/* ------------------ CLOUDINARY UPLOAD ROUTE ------------------ */
router.post(
  "/upload",
  adminAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadPromise = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "genshin-blog",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.end(req.file.buffer);
        });

      const uploaded = await uploadPromise();

      res.json({ url: uploaded.secure_url });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

/* ------------------ PUBLIC ROUTES ------------------ */

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Get one post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

/* ------------------ ADMIN ROUTES ------------------ */

// Create post
router.post("/", adminAuth, async (req, res) => {
  try {
    const { title, content, categories, tags, coverImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Excerpt (first 150 plain-text chars)
    const text = content.replace(/<[^>]+>/g, "");
    const excerpt = text.substring(0, 150) + "...";

    const newPost = new Post({
      title,
      slug,
      content,
      excerpt,
      categories: categories || [],
      tags: tags || [],
      coverImage: coverImage || "",
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update post
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating post" });
  }
});

// Delete post
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Delete cover image
    if (post.coverImage) {
      const pid = extractPublicId(post.coverImage);
      if (pid) await cloudinary.uploader.destroy(pid);
    }

    // Delete gallery images
    if (post.gallery && post.gallery.length > 0) {
      for (let img of post.gallery) {
        const pid = extractPublicId(img);
        if (pid) await cloudinary.uploader.destroy(pid);
      }
    }

    await post.deleteOne();

    res.json({ message: "Post + images deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

export default router;
