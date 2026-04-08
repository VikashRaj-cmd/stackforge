// Global error handling middleware\n
/**
 * 📄 FILE: errorHandler.js
 * PURPOSE:
 * Centralized error handling for cleaner code.
  * Catch all errors in one place
 */

const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;