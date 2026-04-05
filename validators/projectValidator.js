/**
 * projectValidator.js
 *
 * WHY:
 * Ensure project data is valid before saving
 */

import { body, param } from "express-validator";

export const createProjectValidator = [
  body("title")
    .notEmpty()
    .withMessage("Project title is required"),
];

export const projectIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid project ID"),
];