// requestLogger.js - Match folder structure
/**
 * requestLogger.js
 *
 * WHY:
 * Logs method, URL, IP, request ID, response status, and response time.
 */

import logger from "../config/logger.js";

const requestLogger = (req, res, next) => {
  req.startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - req.startTime;

    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      statusCode: res.statusCode,
      durationMs: duration,
      timestamp: new Date().toISOString(),
    });
  });

  next();
};

export default requestLogger;