// Authentication routes (/api/v1/auth)\n
/**
 * 📄 FILE: authRoutes.js
 * PURPOSE:
 * Handles authentication routes like Register & Login.
 * Later we will connect controllers and JWT authentication.
 */

import express from "express";

const router = express.Router();

// POST /api/auth/register
router.post("/register", (req, res) => {
  res.json({ message: "Register API (Coming soon)" });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  res.json({ message: "Login API (Coming soon)" });
});

export default router;