/**
 * 📄 FILE: activityController.js
 * PURPOSE:
 * Track user actions (create issue, update project, etc.)
 * Used for auditing and history tracking.
 */

import ActivityLog from "../models/ActivityLog.js";
import catchAsync from "../utils/catchAsync.js";

// ✅ CREATE LOG
export const createLog = async (data) => {
  try {
    await ActivityLog.create(data);
  } catch (error) {
    console.error("Log error:", error.message);
  }
};

// ✅ GET ALL LOGS
export const getActivityLogs = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.actor) {
    filter.actor = req.query.actor;
  }
  if (req.query.issue) {
    filter.issue = req.query.issue;
  }

  const activities = await ActivityLog.find(filter)
    .populate("actor", "name email avatar")
    .populate("issue", "title")
    .sort("-createdAt")
    .lean();

  res.status(200).json({
    success: true,
    results: activities.length,
    data: activities,
  });
});