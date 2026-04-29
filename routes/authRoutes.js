// Authentication routes (/api/v1/auth)\n
/**
 * authRoutes.js
 *
 * WHY:
 * Defines all authentication endpoints.
 * Public: register, login
 * Protected: logout, me
 */

import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

/**
 * Public routes
 */
router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

/**
 * Protected routes
 */
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;