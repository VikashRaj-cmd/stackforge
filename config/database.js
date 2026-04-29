// Database configuration and connection setup
/**
 * database.js
 *
 * WHY:
 * Handles MongoDB connection logic only.
 */

import mongoose from "mongoose";
import config from "./config.js";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info({ message: `MongoDB connected: ${mongoose.connection.host}` });
  } catch (error) {
    logger.error({ message: `Database connection failed: ${error.message}` });
    process.exit(1);
  }
};

export default connectDB;