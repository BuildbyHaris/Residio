import crypto from "crypto";

/**
 * Generate secure random token
 */
export const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};