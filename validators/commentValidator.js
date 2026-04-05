/**
 * commentValidator.js
 *
 * WHY:
 * Validate comment creation
 */

import { body } from "express-validator";

export const createCommentValidator = [
  body("issue")
    .isMongoId()
    .withMessage("Valid issue ID required"),

  body("body")
    .notEmpty()
    .withMessage("Comment body is required"),
];