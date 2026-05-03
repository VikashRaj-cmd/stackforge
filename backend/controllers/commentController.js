/**
 * commentController.js
 *
 * WHY:
 * Handles issue comments including threaded replies,
 * editing, deleting, and ownership checks.
 */

import Comment from "../models/Comment.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * Get comments for one issue
 */
export const getComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({ issue: req.params.issueId })
    .populate("author", "name email")
    .sort("createdAt")
    .lean();

  res.status(200).json({
    success: true,
    results: comments.length,
    data: comments,
  });
});

/**
 * Add comment to issue
 */
export const addComment = catchAsync(async (req, res) => {
  const { body, parent } = req.body;

  const comment = await Comment.create({
    issue: req.params.issueId,
    author: req.user._id,
    body,
    parent: parent || null,
  });

  res.status(201).json({
    success: true,
    data: comment,
  });
});

/**
 * Update comment
 * Only author may edit
 */
export const updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  if (comment.author.toString() !== req.user.id.toString()) {
    return next(new AppError("You can only edit your own comment", 403));
  }

  comment.body = req.body.body ?? comment.body;
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

/**
 * Delete comment
 * Only author may delete
 */
export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  if (comment.author.toString() !== req.user.id.toString()) {
    return next(new AppError("You can only delete your own comment", 403));
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.status(204).send();
});