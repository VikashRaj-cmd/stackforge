/**
 * 📄 FILE: issueController.js
 * PURPOSE:
 * Handles Issue Tracking logic.
 * Includes:
 * - Create Issue
 * - Get Issues (filtering)
 * - Update Issue
 * - Delete Issue
 */

import Issue from "../models/Issue.js";

// ✅ CREATE ISSUE
export const createIssue = async (req, res) => {
  try {
    const issue = await Issue.create({
      ...req.body,
      reporter: req.user._id
    });

    res.status(201).json(issue);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ISSUES (FILTER + PAGINATION)
export const getIssues = async (req, res) => {
  try {
    const { status, priority } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const page = Number(req.query.page) || 1;
    const limit = 5;

    const issues = await Issue.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      results: issues.length,
      issues
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE ISSUE
export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(issue);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE ISSUE
export const deleteIssue = async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);

    res.json({ message: "Issue deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};