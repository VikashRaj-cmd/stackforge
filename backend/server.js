/**
 * server.js
 *
 * WHY:
 * Bootstraps the application:
 * - validates environment
 * - connects database
 * - starts server
 * - handles graceful shutdown
 */

import app from "./app.js";
import mongoose from "mongoose";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import logger from "./config/logger.js";
import validateEnv from "./utils/validateEnv.js";

/**
 * Validate environment before starting anything.
 */
try {
  validateEnv();
} catch (error) {
  logger.error({ message: error.message });
  process.exit(1);
}

let server;

/**
 * Start server only after successful DB connection
 */
const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(config.PORT, () => {
      logger.info({
        message: `Server running on port ${config.PORT}`,
        env: config.NODE_ENV,
      });
    });
  } catch (error) {
    logger.error({ message: error.message });
    process.exit(1);
  }
};

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = (signal) => {
  logger.info({ message: `${signal} received. Starting graceful shutdown...` });

  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      logger.info({ message: "HTTP server closed and MongoDB connection closed." });
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startServer();