import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  organizer: String,
  maxParticipants: Number,
  currentParticipants: { type: Number, default: 0 }
});

export default mongoose.model("Event", eventSchema);
