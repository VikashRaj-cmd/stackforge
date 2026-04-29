/**
 * commentValidator.js
 *
 * WHY:
 * Validates nested issue comments.
 */

import { body } from "express-validator";

export const createCommentValidator = [
  body("body").trim().notEmpty().withMessage("Comment body is required"),
  body("parent")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Parent comment ID must be valid"),
];