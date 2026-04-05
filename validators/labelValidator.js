/**
 * labelValidator.js
 *
 * WHY:
 * Validate label creation
 */

import { body } from "express-validator";

export const createLabelValidator = [
  body("name")
    .notEmpty()
    .withMessage("Label name is required"),

  body("color")
    .notEmpty()
    .withMessage("Color is required"),

  body("project")
    .isMongoId()
    .withMessage("Valid project ID required"),
];