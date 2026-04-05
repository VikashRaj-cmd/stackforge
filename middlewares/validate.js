// Request validation middleware\n
/**
 * validate.js
 *
 * WHY:
 * This middleware checks validation errors from express-validator.
 * If errors exist → send response
 * Else → move to controller
 */

import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

export default validate;