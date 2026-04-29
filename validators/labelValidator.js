/**
 * labelValidator.js
 *
 * WHY:
 * Validates labels within a project.
 */

import { body } from "express-validator";

export const createLabelValidator = [
  body("name").trim().notEmpty().withMessage("Label name is required"),
  body("color").trim().notEmpty().withMessage("Label color is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];