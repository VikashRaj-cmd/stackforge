/**
 * activityRoutes.js
 *
 * WHY:
 * Handles global activity log endpoints.
 */

import express from "express";
import protect from "../middlewares/protect.js";
import { getActivityLogs } from "../controllers/activityController.js";

const router = express.Router();

/**
 * Get all activity logs (supports filtering by actor and issue)
 */
router.get("/", protect, getActivityLogs);

export default router;
