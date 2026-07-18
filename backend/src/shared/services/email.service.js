import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
  tls: {
    rejectUnauthorized: env.nodeEnv === "production",
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}) => {
  await transporter.sendMail({
    from: env.emailFrom,
    to,
    subject,
    text,
    html,
  });
};