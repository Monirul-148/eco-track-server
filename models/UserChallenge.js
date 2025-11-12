import mongoose from "mongoose";

const userChallengeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  status: { type: String, default: "Not Started" },
  progress: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now }
});

export default mongoose.model("UserChallenge", userChallengeSchema);
