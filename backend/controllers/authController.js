// Authentication controller functions (login, register, etc.)\n
/**
 * authController.js
 *
 * WHY:
 * Handles authentication logic:
 * - register
 * - login
 * - logout
 * - get current logged-in user
 */

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import config from "../config/config.js";

/**
 * Helper function to generate JWT token
 */
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * Register a new user
 */
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("Email is already registered", 409));
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * Login existing user and return JWT
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  const token = signToken(user);

  res.status(200).json({
    success: true,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * Logout route
 * Since JWT is stateless, backend usually just tells client to remove token.
 */
export const logout = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully. Remove token on client side.",
  });
});

/**
 * Return current authenticated user
 */
export const getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});