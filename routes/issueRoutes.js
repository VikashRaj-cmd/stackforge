/**
 * 📄 FILE: issueRoutes.js
 * PURPOSE:
 * Handles issue tracking APIs (bugs, tasks, features).
 */

import express from "express";

const router = express.Router();

// GET all issues
router.get("/", (req, res) => {
  res.json({ message: "Get all issues (Coming soon)" });
});

// POST create issue
router.post("/", (req, res) => {
  res.json({ message: "Create issue (Coming soon)" });
});

export default router;