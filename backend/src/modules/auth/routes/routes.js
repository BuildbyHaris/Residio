const express = require("express");
const router = express.Router();

const {
  verifyEmail,
  resendVerification,
} = require("../controllers/auth.API");

router.post("/verify-email", verifyEmail);

router.post("/resend-verification", resendVerification);

module.exports = router;