// Project routes (/api/v1/projects)\n
/**
 * 📄 FILE: projectRoutes.js
 * PURPOSE:
 * Handles project-related APIs like create, update, delete projects.
 */

import express from "express";

const router = express.Router();

// GET all projects
router.get("/", (req, res) => {
  res.json({ message: "Get all projects (Coming soon)" });
});

// POST create project
router.post("/", (req, res) => {
  res.json({ message: "Create project (Coming soon)" });
});

export default router;