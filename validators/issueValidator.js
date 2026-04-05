// Validation schemas for issue requests\n
/**
 * issueValidator.js
 *
 * WHY:
 * Validate issue creation and updates
 */

import { body, param } from "express-validator";

export const createIssueValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("project").isMongoId().withMessage("Valid project ID required"),
];

export const issueIdValidator = [
  param("id").isMongoId().withMessage("Invalid issue ID"),
];