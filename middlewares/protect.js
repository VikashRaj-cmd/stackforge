// Middleware to protect routes (authentication check)\n
/**
 * protect.js
 *
 * WHY:
 * This middleware verifies JWT tokens from the Authorization header.
 * If token is valid, it loads the user and attaches it to req.user.
 */

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import config from "../config/config.js";

const protect = catchAsync(async (req, res, next) => {
  let token;

  // Check Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Not authenticated. Please log in.", 401));
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Find current user
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return next(new AppError("User belonging to this token no longer exists.", 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Your session has expired. Please log in again.", 401));
    }

    return next(new AppError("Invalid token", 401));
  }
});

export default protect;