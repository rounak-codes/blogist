import mongoose from "mongoose";

const tierItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    element: { type: String },       // Pyro, Hydro, etc.
    rarity: { type: Number, default: 5 },
    image: { type: String },         // URL for character icon
    tier: { type: String, enum: ["S", "A", "B", "C"], default: "B" },
    notes: { type: String }          // optional commentary
  },
  { timestamps: true }
);

export default mongoose.model("TierItem", tierItemSchema);
