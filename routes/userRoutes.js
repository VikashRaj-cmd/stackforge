/**
 * 📄 FILE: userRoutes.js
 * PURPOSE:
 * Manage users like profile, list users, etc.
 */

import express from "express";

const router = express.Router();

// GET /api/users
router.get("/", (req, res) => {
  res.json({ message: "Get all users (Coming soon)" });
});

// GET /api/users/:id
router.get("/:id", (req, res) => {
  res.json({ message: "Get user by ID (Coming soon)" });
});

export default router;