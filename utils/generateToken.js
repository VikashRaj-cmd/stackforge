/**
 * 📄 FILE: generateToken.js
 * PURPOSE:
 * This file is responsible for generating JWT tokens.
 * Token is used for authentication (who is logged in).
 */

import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },                 // Payload
    process.env.JWT_SECRET,         // Secret key
    { expiresIn: "7d" }             // Expiry
  );
};

export default generateToken;