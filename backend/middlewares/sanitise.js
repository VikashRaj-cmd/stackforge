/**
 * sanitise.js
 *
 * WHY:
 * Trims whitespace from all string fields in req.body.
 */

const sanitise = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }

  next();
};

export default sanitise;