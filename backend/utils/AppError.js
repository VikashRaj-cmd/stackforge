// Custom AppError class for error handling\n
/**
 * FILE: utils/AppError.js
 * PURPOSE:
 * Custom operational error class used across the project.
 * It carries HTTP status code, status type, and an operational flag.
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;