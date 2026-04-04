/**
 * 📄 FILE: app.js
 * PURPOSE:
 * Main Express app configuration.
 * Connects middlewares and routes.
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import labelRoutes from "./routes/labelRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// 🔐 Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// 📡 Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/labels", labelRoutes);

app.use(errorHandler);

export default app;