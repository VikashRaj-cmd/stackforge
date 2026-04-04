/**
 * 📄 FILE: commentRoutes.js
 * PURPOSE:
 * Manage comments on issues.
 */

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, addComment);
router.get("/:issueId", protect, getComments);

export default router;