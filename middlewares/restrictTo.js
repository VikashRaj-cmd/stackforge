// restrict
/**
 * restrictTo.js
 *
 * WHY:
 * Restricts access based on platform role.
 * Example: only admin can access GET /users or DELETE /users/:id
 */

import AppError from "../utils/AppError.js";

const restrictTo = (...roles) => {
  /**
   * Role authorization middleware
   */
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }

    next();
  };
};

export default restrictTo;