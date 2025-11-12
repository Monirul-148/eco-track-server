import express from "express";
import Tip from "../models/Tip.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all tips
router.get("/", async (req, res) => {
  const tips = await Tip.find().sort({ createdAt: -1 });
  res.json(tips);
});

// POST new tip
router.post("/", authMiddleware, async (req, res) => {
  const tip = new Tip({
    ...req.body,
    author: req.user.email,
    authorName: req.body.authorName || req.user.email
  });
  await tip.save();
  res.status(201).json(tip);
});

export default router;
