/**
 * 📄 FILE: projectRoutes.js
 * PURPOSE:
 * Connects project routes with controller logic.
 */

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;