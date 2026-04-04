/**
 * 📄 FILE: labelRoutes.js
 * PURPOSE:
 * Manage labels/tags for issues.
 */

import express from "express";

const router = express.Router();

// GET labels
router.get("/", (req, res) => {
  res.json({ message: "Get labels (Coming soon)" });
});

export default router;