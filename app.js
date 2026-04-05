/**
 * 📄 FILE: app.js
 * PURPOSE:
 * Main Express app configuration.
 * Connects middlewares and routes.
 * Includes production-level security middleware.
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import labelRoutes from "./routes/labelRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// ======================================================
// 🛡️ SECURITY MIDDLEWARES
// ======================================================

// rateLimit → prevents spam / brute-force / DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});

// helmet → secures HTTP headers
// cors → allows cross-origin requests

// ======================================================
// 🔐 CORE MIDDLEWARES
// ======================================================

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json()); // parse JSON request body

// ======================================================
// 🛡️ CUSTOM MONGO SANITIZER (SAFE VERSION)
// ======================================================
// Prevents NoSQL Injection attacks
// Removes keys starting with "$" or containing "."

const sanitize = (obj) => {
  if (!obj) return;

  for (let key in obj) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      sanitize(obj[key]); // recursive sanitize
    }
  }
};

// Apply sanitizer ONLY to request body (safe for Express)
app.use((req, res, next) => {
  sanitize(req.body);
  next();
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/labels", labelRoutes);

app.use(errorHandler);

export default app;