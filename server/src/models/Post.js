import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // for URLs
    excerpt: { type: String },
    coverImage: { type: String },
    content: { type: String, required: true }, // store HTML from editor
    categories: [{ type: String }], // e.g. Patch Updates, Story Thoughts
    tags: [{ type: String }],       // e.g. #ArchonQuest, #5.0
    isThread: { type: Boolean, default: false }, // sticky threads / discussions
    authorName: { type: String, default: "Admin" },
    status: { type: String, enum: ["draft", "published"], default: "published" }
  },
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("Post", postSchema);
