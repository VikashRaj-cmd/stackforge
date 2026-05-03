/**
 * projectRoutes.js
 *
 * WHY:
 * Defines all project-related endpoints.
 */

import express from "express";
import protect from "../middlewares/protect.js";
import validate from "../middlewares/validate.js";
import {
  createProjectValidator,
  projectIdValidator,
} from "../validators/projectValidator.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", protect, getProjects);
router.post("/", protect, createProjectValidator, validate, createProject);

router.get("/:id", protect, projectIdValidator, validate, getProjectById);
router.patch("/:id", protect, projectIdValidator, validate, updateProject);
router.delete("/:id", protect, projectIdValidator, validate, deleteProject);

router.post("/:id/members", protect, projectIdValidator, validate, addMember);
router.delete("/:id/members/:userId", protect, projectIdValidator, validate, removeMember);

export default router;