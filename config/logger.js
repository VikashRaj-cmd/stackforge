// Logging configuration and utilities\n
/**
 * logger.js
 *
 * WHY:
 * Central logger using Winston.
 * Replaces console.log / console.error in production-ready apps.
 */

import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;