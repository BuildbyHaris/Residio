import dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const requiredEnvVariables = [
    "PORT",
    "NODE_ENV",
    "MONGO_URI",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "BCRYPT_SALT_ROUNDS",
    "PASSWORD_RESET_EXPIRES_MINUTES",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_SECURE",
    "SMTP_USER",
    "SMTP_PASS",
    "EMAIL_FROM",
    "FRONTEND_URL",
];

// Validate required environment variables
for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

export const env = {
    port: Number(process.env.PORT),

    nodeEnv: process.env.NODE_ENV,

    mongoUri: process.env.MONGO_URI,

    jwtSecret: process.env.JWT_SECRET,

    jwtExpiresIn: process.env.JWT_EXPIRES_IN,

    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),

    smtpHost: process.env.SMTP_HOST,

    smtpPort: Number(process.env.SMTP_PORT),

    smtpSecure: process.env.SMTP_SECURE === "true",

    smtpUser: process.env.SMTP_USER,

    smtpPass: process.env.SMTP_PASS,

    emailFrom: process.env.EMAIL_FROM,

    passwordResetExpiryMinutes: Number(
        process.env.PASSWORD_RESET_EXPIRES_MINUTES
    ),

    frontendUrl: process.env.FRONTEND_URL,
};