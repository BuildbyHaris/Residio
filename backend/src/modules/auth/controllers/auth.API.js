const {
  verifyEmailService,
  resendVerificationService,
} = require("../services/auth.Verification");

const verifyEmail = async (req, res) => {
  try {
    const result = await verifyEmailService(req.body.token);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resendVerification = async (req, res) => {
  try {
    const result = await resendVerificationService(req.body.email);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  verifyEmail,
  resendVerification,
};