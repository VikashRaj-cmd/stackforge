/**
 * 📄 FILE: roleMiddleware.js
 * PURPOSE:
 * Restrict access based on user role (admin, member).
 * Used in protected routes where only specific roles are allowed.
 */

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }
    next();
  };
};

export default authorizeRoles;