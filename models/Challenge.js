import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  duration: Number,
  target: String,
  participants: { type: Number, default: 0 },
  impactMetric: String,
  createdBy: String,
  startDate: Date,
  endDate: Date,
  imageUrl: String
}, { timestamps: true });

export default mongoose.model("Challenge", challengeSchema);
