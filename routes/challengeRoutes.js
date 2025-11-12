import express from "express";
import Challenge from "../models/Challenge.js";
import UserChallenge from "../models/UserChallenge.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all challenges with optional filters
router.get("/", async (req, res) => {
  try {
    const { category, startDate, participantsMin, participantsMax } = req.query;
    const filter = {};

    if (category) filter.category = { $in: category.split(",") };
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (participantsMin || participantsMax) {
      filter.participants = {};
      if (participantsMin) filter.participants.$gte = Number(participantsMin);
      if (participantsMax) filter.participants.$lte = Number(participantsMax);
    }

    const challenges = await Challenge.find(filter);
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET challenge by ID
router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create challenge
router.post("/", authMiddleware, async (req, res) => {
  try {
    const challenge = new Challenge({ ...req.body, createdBy: req.user.email });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update challenge
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });

    if (challenge.createdBy !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(challenge, req.body);
    await challenge.save();
    res.json(challenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE challenge
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });

    if (challenge.createdBy !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await challenge.delete();
    res.json({ message: "Challenge deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST join challenge
router.post("/join/:id", authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });

    // increment participants
    challenge.participants += 1;
    await challenge.save();

    // create UserChallenge record
    const userChallenge = new UserChallenge({
      userId: req.user.uid,
      challengeId: challenge._id
    });
    await userChallenge.save();

    res.json({ message: "Joined successfully", participants: challenge.participants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
