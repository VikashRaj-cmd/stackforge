/**
 * 📄 FILE: labelRoutes.js
 * PURPOSE:
 * Manage labels/tags for issues.
 */

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { createLabel, getLabels } from "../controllers/labelController.js";
import validate from "../middlewares/validate.js";
import { createLabelValidator } from "../validators/labelValidator.js";

const router = express.Router();

router.post("/", createLabelValidator, validate, createLabel);
router.get("/", protect, getLabels);

export default router;