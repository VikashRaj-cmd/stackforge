// Authentication routes (/api/v1/auth)\n
/**
 * 📄 FILE: authRoutes.js
 * PURPOSE:
 * Handles authentication routes like Register & Login.
 * Defines authentication routes and connects controller.
 */

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerValidator, validate, registerUser);

// POST /api/auth/login
router.post("/login", loginValidator, validate, loginUser);

export default router;