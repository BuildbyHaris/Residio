import jwt from "jsonwebtoken";
import { env } from "../../../config/env.js";

/**
 * Generate Reset Session Token
 */
export const generateResetSessionToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
      purpose: "password_reset",
    },
    env.jwtSecret,
    {
      expiresIn: env.resetSessionExpiresIn,
    }
  );
};

/**
 * Verify Reset Session Token
 */
export const verifyResetSessionToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    if (decoded.purpose !== "password_reset") {
      throw new Error();
    }

    return decoded;
  } catch {
    throw new Error("Invalid or expired reset session.");
  }
};

/**
 * Generate Access Token
 */
export const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};