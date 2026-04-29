/**
 * commentRoutes.js
 *
 * WHY:
 * Comments are nested under issues, so mergeParams is required
 * to access :issueId from parent route.
 */

import express from "express";
import protect from "../middlewares/protect.js";
import validate from "../middlewares/validate.js";
import { createCommentValidator } from "../validators/commentValidator.js";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router({ mergeParams: true });

router.get("/", protect, getComments);
router.post("/", protect, createCommentValidator, validate, addComment);
router.patch("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);

export default router;