// Project routes (/api/v1/projects)\n
/**
 * 📄 FILE: projectRoutes.js
 * PURPOSE:
 * Handles project-related APIs like create, update, delete projects.
 * Example of protected route using JWT middleware.
 */

import express from "express";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected route
router.get("/", protect, (req, res) => {
  res.json({
    message: "Projects fetched",
    user: req.user
  });
});

export default router;