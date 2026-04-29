// validateEnv.js - Match folder structure
/**
 * validateEnv.js
 *
 * WHY:
 * Ensures the app fails early if critical environment variables
 * are missing or weak.
 */

import config from "../config/config.js";

const validateEnv = () => {
  const required = ["PORT", "MONGODB_URI", "JWT_SECRET"];

  for (const key of required) {
    if (!config[key] || String(config[key]).trim() === "") {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  if (String(config.JWT_SECRET).length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long");
  }
};

export default validateEnv;