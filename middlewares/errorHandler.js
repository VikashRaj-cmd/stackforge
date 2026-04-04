// Global error handling middleware\n
/**
 * 📄 FILE: errorHandler.js
 * PURPOSE:
 * Centralized error handling for cleaner code.
 */

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    message: err.message || "Server Error"
  });
};

export default errorHandler;