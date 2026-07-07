export const verificationEmailTemplate = ({
    userName,
    otp,
}) => {

    return `
        <h2>Hello ${userName}</h2>

        <p>
            Thank you for registering.
        </p>

        <p>
            Your verification code is:
        </p>

        <h1>${otp}</h1>

        <p>
            This code expires in 1 minute.
        </p>

        <p>
            If you didn't request this,
            ignore this email.
        </p>
    `;
};