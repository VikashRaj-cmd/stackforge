/**
 * 📄 FILE: commentRoutes.js
 * PURPOSE:
 * Manage comments on issues.
 */

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { addComment, getComments } from "../controllers/commentController.js";
import validate from "../middlewares/validate.js";
import { createCommentValidator } from "../validators/commentValidator.js";

const router = express.Router();

router.post("/", createCommentValidator, validate, addComment);
router.get("/:issueId", protect, getComments);

export default router;