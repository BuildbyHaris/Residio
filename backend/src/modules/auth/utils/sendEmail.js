const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const sendVerificationEmail = async (email, name, verificationLink) => {
  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2>Hello ${name},</h2>

        <p>Thank you for registering.</p>

        <p>Please click the button below to verify your email address.</p>

        <a
          href="${verificationLink}"
          style="
            display:inline-block;
            padding:12px 24px;
            background:#007bff;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
            margin:20px 0;
          "
        >
          Verify Email
        </a>

        <p>
          If the button doesn't work, copy and paste this link into your browser:
        </p>

        <p>${verificationLink}</p>

        <p>This link will expire in 24 hours.</p>

        <br>

        <p>Regards,</p>
        <p>Your Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};