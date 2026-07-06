export const forgotPasswordTemplate = ({ resetUrl, userName }) => {
  return `
    <h2>Hello ${userName},</h2>
    <p>You requested a password reset.</p>
    <p>
      <a href="${resetUrl}">Reset Password</a>
    </p>
    <p>This link expires in 15 minutes.</p>
  `;
};