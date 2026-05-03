/**
 * issueController.js
 *
 * WHY:
 * Handles issue CRUD, status changes, assignment changes,
 * activity logs, filtering, searching, and pagination.
 */

import Issue from "../models/Issue.js";
import ActivityLog from "../models/ActivityLog.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { applyPagination, buildPaginationMeta } from "../utils/queryHelper.js";

/**
 * Create issue
 */
export const createIssue = catchAsync(async (req, res) => {
  const {
    title,
    description,
    type,
    priority,
    project,
    assignee,
    labels,
    dueDate,
  } = req.body;

  const issue = await Issue.create({
    title,
    description,
    type,
    priority,
    project,
    reporter: req.user._id,
    assignee,
    labels,
    dueDate,
  });

  res.status(201).json({
    success: true,
    data: issue,
  });
});

/**
 * Get issues with filtering, search, sorting, pagination
 */
export const getIssues = catchAsync(async (req, res) => {
  const filter = {};

  if (req.query.project) filter.project = req.query.project;
  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.type) filter.type = req.query.type;
  if (req.query.assignee) filter.assignee = req.query.assignee;
  if (req.query.search) filter.$text = { $search: req.query.search };

  let query = Issue.find(filter)
    .select("title type status priority reporter assignee createdAt")
    .populate("reporter", "name email")
    .populate("assignee", "name email");

  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort("-createdAt");
  }

  const total = await Issue.countDocuments(filter);
  const paginated = applyPagination(query, req.query, 20);
  const issues = await paginated.query.lean();

  res.status(200).json({
    success: true,
    meta: buildPaginationMeta(total, paginated.page, paginated.limit),
    data: issues,
  });
});

/**
 * Get single issue with full details
 */
export const getIssueById = catchAsync(async (req, res, next) => {
  const issue = await Issue.findById(req.params.id)
    .populate("reporter", "name email")
    .populate("assignee", "name email")
    .populate("project", "title description status")
    .populate("labels", "name color description")
    .lean();

  if (!issue) {
    return next(new AppError("Issue not found", 404));
  }

  res.status(200).json({
    success: true,
    data: issue,
  });
});

/**
 * Update issue
 */
export const updateIssue = catchAsync(async (req, res, next) => {
  const { title, description, priority, dueDate, labels } = req.body;
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (priority !== undefined) updateData.priority = priority;
  if (dueDate !== undefined) updateData.dueDate = dueDate;
  if (labels !== undefined) updateData.labels = labels;

  const issue = await Issue.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!issue) {
    return next(new AppError("Issue not found", 404));
  }

  res.status(200).json({
    success: true,
    data: issue,
  });
});

/**
 * Delete issue
 * Only reporter can delete their own issue
 */
export const deleteIssue = catchAsync(async (req, res, next) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    return next(new AppError("Issue not found", 404));
  }

  if (issue.reporter.toString() !== req.user.id.toString()) {
    return next(new AppError("You can only delete issues you reported", 403));
  }

  await Issue.findByIdAndDelete(req.params.id);

  res.status(204).send();
});

/**
 * Update issue status and create activity log
 * Only reporter or assignee may change status
 */
export const updateIssueStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    return next(new AppError("Issue not found", 404));
  }

  const isReporter = issue.reporter.toString() === req.user.id.toString();
  const isAssignee = issue.assignee && issue.assignee.toString() === req.user.id.toString();

  if (!isReporter && !isAssignee) {
    return next(new AppError("Only reporter or assignee can change issue status", 403));
  }

  const previousStatus = issue.status;
  issue.status = status;
  await issue.save();

  const activity = await ActivityLog.create({
    issue: issue._id,
    actor: req.user._id,
    action: "status_changed",
    beforeValue: previousStatus,
    afterValue: status,
  });

  res.status(200).json({
    success: true,
    data: issue,
    activity,
  });
});

/**
 * Assign issue and create activity log
 */
export const assignIssue = catchAsync(async (req, res, next) => {
  const { assigneeId } = req.body;

  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    return next(new AppError("Issue not found", 404));
  }

  const previousAssignee = issue.assignee ? issue.assignee.toString() : "unassigned";
  issue.assignee = assigneeId || null;
  await issue.save();

  const activity = await ActivityLog.create({
    issue: issue._id,
    actor: req.user._id,
    action: assigneeId ? "assigned" : "unassigned",
    beforeValue: previousAssignee,
    afterValue: assigneeId || "unassigned",
  });

  res.status(200).json({
    success: true,
    data: issue,
    activity,
  });
});

/**
 * Get issue activity log
 */
export const getIssueActivity = catchAsync(async (req, res) => {
  const activities = await ActivityLog.find({ issue: req.params.id })
    .populate("actor", "name email")
    .sort("-createdAt")
    .lean();

  res.status(200).json({
    success: true,
    results: activities.length,
    data: activities,
  });
});