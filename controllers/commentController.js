/**
 * 📄 FILE: commentController.js
 * PURPOSE:
 * Manage comments on issues.
 * Includes:
 * - Add comment
 * - Get comments by issue
 */

import Comment from "../models/Comment.js";

// ✅ ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      author: req.user._id
    });

    res.status(201).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET COMMENTS BY ISSUE
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      issue: req.params.issueId
    });

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};