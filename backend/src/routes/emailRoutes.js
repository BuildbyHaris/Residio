router.post(
  "/verify-email",
  verifyEmailValidation,
  verifyEmail
);

router.post(
  "/resend-verification",
  resendVerificationValidation,
  resendVerification
);