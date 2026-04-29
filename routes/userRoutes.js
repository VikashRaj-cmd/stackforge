/**
/**
 * userRoutes.js
 *
 * WHY:
 * Handles user endpoints.
 * Only admin can list all users or delete a user.
 */

import express from "express";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

/**
 * Admin-only list users
 */
router.get("/", protect, restrictTo("admin"), getAllUsers);

/**
 * Logged-in users can fetch/update user by ID
 * Delete remains admin-only
 */
router.get("/:id", protect, getUserById);
router.patch("/:id", protect, updateUser);
router.delete("/:id", protect, restrictTo("admin"), deleteUser);

export default router;