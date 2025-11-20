// server/src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js"; // import routes here
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Mount post routes at /api/posts
app.use("/api/posts", postRoutes);
app.use("/api/uploads", uploadRoutes);

export default app;
