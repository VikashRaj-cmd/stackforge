/**
 * 📄 FILE: commentRoutes.js
 * PURPOSE:
 * Manage comments on issues.
 */

import express from "express";

const router = express.Router();

// POST comment
router.post("/", (req, res) => {
  res.json({ message: "Add comment (Coming soon)" });
});

export default router;