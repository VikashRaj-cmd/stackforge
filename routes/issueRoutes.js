/**
 * 📄 FILE: issueRoutes.js
 * PURPOSE:
 * Connects issue routes with controller logic.
 */

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue
} from "../controllers/issueController.js";
import validate from "../middlewares/validate.js";
import { createIssueValidator } from "../validators/issueValidator.js";

const router = express.Router();

router.post("/", createIssueValidator, validate, createIssue);
router.get("/", protect, getIssues);
router.put("/:id", protect, updateIssue);
router.delete("/:id", protect, deleteIssue);

export default router;