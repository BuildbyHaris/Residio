const User = require("../models/UserSchema");

const verifyEmail = async (token) => {

  if (!token) {
  throw new Error("Verification token is required.");
}

  const user = await User.findOne({
  verificationToken: token,
  verificationTokenExpiry: { $gt: new Date() },
});

 
  if (!user) {
    throw new Error("Invalid verification token.");
  }

  
  if (user.verificationTokenExpiry < new Date()) {
    throw new Error("Verification token has expired.");
  }


  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpiry = null;

  
  await user.save();

  return {
    success: true,
    message: "Email verified successfully.",
  };
};

module.exports = {
  verifyEmail,
};
