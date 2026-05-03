// Validation schemas for issue requests\n
/**
 * issueValidator.js
 *
 * WHY:
 * Validates issue creation and issue route params.
 */

import { body, param } from "express-validator";

export const createIssueValidator = [
  body("title").trim().notEmpty().withMessage("Issue title is required"),
  body("type")
    .isIn(["bug", "feature", "task", "improvement"])
    .withMessage("Invalid issue type"),
  body("project").isMongoId().withMessage("Valid project ID is required"),
  body("priority")
    .optional()
    .isIn(["critical", "high", "medium", "low"])
    .withMessage("Invalid priority"),
  body("assignee")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Assignee must be a valid user ID"),
];

export const issueIdValidator = [
  param("id").isMongoId().withMessage("Invalid issue ID"),
];