// userController.js - Match folder structure
/**
 * userController.js
 *
 * WHY:
 * Handles user CRUD operations.
 * Admin-only routes are protected in route definitions.
 */

import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * Get all users
 */
export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().select("-password").lean();

  res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});

/**
 * Get single user by ID
 */
export const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password").lean();

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Update user name or avatar
 */
export const updateUser = catchAsync(async (req, res, next) => {
  const { name, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, avatar },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Delete user
 */
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(204).send();
});