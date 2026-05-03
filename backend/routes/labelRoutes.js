/**
 * labelRoutes.js
 *
 * WHY:
 * Labels are nested under projects, so mergeParams is required
 * to access :projectId from parent route.
 */

import express from "express";
import protect from "../middlewares/protect.js";
import validate from "../middlewares/validate.js";
import { createLabelValidator } from "../validators/labelValidator.js";
import {
  getLabels,
  createLabel,
  updateLabel,
  deleteLabel,
} from "../controllers/labelController.js";

const router = express.Router({ mergeParams: true });

router.get("/", protect, getLabels);
router.post("/", protect, createLabelValidator, validate, createLabel);
router.patch("/:id", protect, updateLabel);
router.delete("/:id", protect, deleteLabel);

export default router;