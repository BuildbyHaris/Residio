const crypto = require("crypto");

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const generateVerificationExpiry = () => {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
};

module.exports = {
  generateVerificationToken,
  generateVerificationExpiry,
};