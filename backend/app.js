/**
 * app.js
 *
 * WHY:
 * Configures Express app, global middleware, route mounting,
 * and the final centralized error handler.
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import labelRoutes from "./routes/labelRoutes.js";

import requestId from "./middlewares/requestId.js";
import requestLogger from "./middlewares/requestLogger.js";
import sanitise from "./middlewares/sanitise.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

/**
 * Security headers
 */
app.use(helmet());

/**
 * CORS support
 */
app.use(cors());

/**
 * Request ID should run early
 */
app.use(requestId);

/**
 * Global rate limiter
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(globalLimiter);

/**
 * Strict auth limiter
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many auth attempts. Please try again later.",
  },
});

/**
 * Body parsers with body size limit
 */
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * Input cleanup and sanitization
 */
app.use(sanitise);

/**
 * Request logging
 */
app.use(requestLogger);

/**
 * Health route
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date(),
  });
});

/**
 * Auth routes with stricter rate limiting
 */
app.use("/api/v1/auth", authLimiter, authRoutes);

/**
 * Application routes
 */
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1/issues/:issueId/comments", commentRoutes);
app.use("/api/v1/projects/:projectId/labels", labelRoutes);

/**
 * Central error handler
 */
app.use(errorHandler);

export default app;