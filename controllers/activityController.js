/**
 * 📄 FILE: activityController.js
 * PURPOSE:
 * Track user actions (create issue, update project, etc.)
 * Used for auditing and history tracking.
 */

import ActivityLog from "../models/ActivityLog.js";

// ✅ CREATE LOG
export const createLog = async (data) => {
  try {
    await ActivityLog.create(data);
  } catch (error) {
    console.error("Log error:", error.message);
  }
};