// Validation schemas for auth requests\n
/**
 * 📄 FILE: authValidator.js
 * PURPOSE:
 * Validate request data before hitting controller.
 */

import { body } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars")
];

export const loginValidator = [
  body("email").isEmail(),
  body("password").notEmpty()
];