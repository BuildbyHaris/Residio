const User = require("./auth.UserSchema.js");

const verifyEmail = async (token) => {
  // 1. Find user by verification token
  const user = await User.findOne({
    verificationToken: token,
  });

 
  if (!user) {
    throw new Error("Invalid verification token.");
  }

  // 3. Check token expiry
  if (user.verificationTokenExpiry < new Date()) {
    throw new Error("Verification token has expired.");
  }

  // 4. Update verification status
  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpiry = null;

  // 5. Save user
  await user.save();

  // 6. Return success response
  return {
    success: true,
    message: "Email verified successfully.",
  };
};

module.exports = {
  verifyEmail,
};
