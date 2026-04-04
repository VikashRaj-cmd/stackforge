/**
 * 📄 FILE: labelRoutes.js
 * PURPOSE:
 * Manage labels/tags for issues.
 */

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { createLabel, getLabels } from "../controllers/labelController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createLabel);
router.get("/", protect, getLabels);

export default router;