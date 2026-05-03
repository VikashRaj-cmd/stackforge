// Global error handling middleware\n
/**
 * FILE: middlewares/errorHandler.js
 * PURPOSE:
 * Global error middleware.
 * All operational errors and unexpected errors end here and are formatted once.
 */

import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  logger.error({
    message: err.message,
    statusCode,
    stack: err.stack,
    requestId: req.requestId || null,
    method: req.method,
    url: req.originalUrl,
  });

  res.status(statusCode).json({
    success: false,
    status,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;