/**
 * projectValidator.js
 *
 * WHY:
 * Validates project body and route params.
 */

import { body, param } from "express-validator";

export const createProjectValidator = [
  body("title").trim().notEmpty().withMessage("Project title is required"),
  body("description").optional().isString().withMessage("Description must be a string"),
];

export const projectIdValidator = [
  param("id").isMongoId().withMessage("Invalid project ID"),
];