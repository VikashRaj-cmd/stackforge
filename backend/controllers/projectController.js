// Project controller functions (create, read, update, delete projects)\n
/**
 * projectController.js
 *
 * WHY:
 * Handles project CRUD and project membership.
 * Includes ownership checks where required.
 */

import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * Create a project
 */
export const createProject = catchAsync(async (req, res) => {
  const { title, description } = req.body;

  const project = await Project.create({
    title,
    description,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "owner" }],
  });

  res.status(201).json({
    success: true,
    data: project,
  });
});

/**
 * Get active projects
 */
export const getProjects = catchAsync(async (req, res) => {
  const projects = await Project.find({ status: "active" })
    .populate("owner", "name email")
    .lean();

  res.status(200).json({
    success: true,
    results: projects.length,
    data: projects,
  });
});

/**
 * Get single project
 */
export const getProjectById = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate("owner", "name email")
    .populate("members.user", "name email")
    .lean();

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * Update project
 */
export const updateProject = catchAsync(async (req, res, next) => {
  const { title, description, status } = req.body;

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * Delete project
 */
export const deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  if (project.owner.toString() !== req.user.id.toString()) {
    return next(new AppError("Only project owner can delete the project", 403));
  }

  await Project.findByIdAndDelete(req.params.id);

  res.status(204).send();
});

/**
 * Add member to project
 */
export const addMember = catchAsync(async (req, res, next) => {
  const { userId, role } = req.body;

  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  if (project.owner.toString() !== req.user.id.toString()) {
    return next(new AppError("Only project owner can add members", 403));
  }

  const alreadyMember = project.members.some(
    (member) => member.user.toString() === userId
  );

  if (alreadyMember) {
    return next(new AppError("User is already a project member", 409));
  }

  project.members.push({ user: userId, role });
  await project.save();

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * Remove member from project
 */
export const removeMember = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found", 404));
  }

  if (project.owner.toString() !== req.user.id.toString()) {
    return next(new AppError("Only project owner can remove members", 403));
  }

  project.members = project.members.filter(
    (member) => member.user.toString() !== req.params.userId
  );

  await project.save();

  res.status(200).json({
    success: true,
    data: project,
  });
});