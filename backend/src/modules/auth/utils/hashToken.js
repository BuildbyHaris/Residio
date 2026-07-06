import crypto from "crypto";

/**
 * Hash reset token
 */
export const hashResetToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};