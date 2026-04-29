/**
 * issueRoutes.js
 *
 * WHY:
 * Defines all issue-related endpoints including status, assignment, and activity.
 */

import express from "express";
import protect from "../middlewares/protect.js";
import validate from "../middlewares/validate.js";
import { createIssueValidator, issueIdValidator } from "../validators/issueValidator.js";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  updateIssueStatus,
  assignIssue,
  getIssueActivity,
} from "../controllers/issueController.js";

const router = express.Router();

router.get("/", protect, getIssues);
router.post("/", protect, createIssueValidator, validate, createIssue);

router.get("/:id", protect, issueIdValidator, validate, getIssueById);
router.patch("/:id", protect, issueIdValidator, validate, updateIssue);
router.delete("/:id", protect, issueIdValidator, validate, deleteIssue);

router.patch("/:id/status", protect, issueIdValidator, validate, updateIssueStatus);
router.patch("/:id/assign", protect, issueIdValidator, validate, assignIssue);
router.get("/:id/activity", protect, issueIdValidator, validate, getIssueActivity);

export default router;