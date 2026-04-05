/**
 * 📄 FILE: server.js
 * PURPOSE:
 * Starts server, connects database, and uses Winston logger.
 */

import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./utils/logger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error("MONGODB_URI is not set in environment variables");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info("✅ DB Connected");

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });

    // Graceful shutdown
    const gracefulShutdown = () => {
      logger.info("Received shutdown signal, closing server...");
      server.close(() => {
        mongoose.connection.close(false, () => {
          logger.info("Mongo connection closed. Exiting process.");
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);

  })
  .catch(err => {
    logger.error("DB connection error: " + (err.message || err));
    process.exit(1);
  });