import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

export default app;
