import express from "express";
import Event from "../models/Event.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

// POST new event
router.post("/", authMiddleware, async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
});

export default router;
