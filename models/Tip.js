import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  author: String,
  authorName: String,
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Tip", tipSchema);
