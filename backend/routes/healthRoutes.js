/**
 * 📄 FILE: healthRoutes.js
 * PURPOSE:
 * This file is used to check if the server is running properly.
 * It is used in production for monitoring and uptime checks.
 */

import express from "express";

const router = express.Router();

// GET /api/health
router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  });
});

export default router;