/**
 * labelController.js
 *
 * WHY:
 * Handles project-scoped labels.
 */

import Label from "../models/Label.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * Get labels for a project
 */
export const getLabels = catchAsync(async (req, res) => {
  const labels = await Label.find({ project: req.params.projectId }).lean();

  res.status(200).json({
    success: true,
    results: labels.length,
    data: labels,
  });
});

/**
 * Create label for a project
 */
export const createLabel = catchAsync(async (req, res) => {
  const { name, color, description } = req.body;

  const label = await Label.create({
    name,
    color,
    description,
    project: req.params.projectId,
  });

  res.status(201).json({
    success: true,
    data: label,
  });
});

/**
 * Update label
 */
export const updateLabel = catchAsync(async (req, res, next) => {
  const label = await Label.findOneAndUpdate(
    { _id: req.params.id, project: req.params.projectId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!label) {
    return next(new AppError("Label not found", 404));
  }

  res.status(200).json({
    success: true,
    data: label,
  });
});

/**
 * Delete label
 */
export const deleteLabel = catchAsync(async (req, res, next) => {
  const label = await Label.findOneAndDelete({
    _id: req.params.id,
    project: req.params.projectId,
  });

  if (!label) {
    return next(new AppError("Label not found", 404));
  }

  res.status(204).send();
});