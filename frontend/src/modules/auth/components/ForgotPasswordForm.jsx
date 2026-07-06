import { useState } from "react";
import { Link } from "react-router-dom";

import "./ForgotPassword.css";

import { forgotPassword } from "../services/auth.service";
import { forgotPasswordSchema } from "../validation/forgotPassword.validation";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Joi Validation
    const { error: validationError } = forgotPasswordSchema.validate(
      {
        email,
      },
      {
        abortEarly: false,
      }
    );

    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email);

      setSuccess(response.message);

      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send password reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>

      <p className="subtitle">
        Enter your registered email address and we'll send you a password reset
        link.
      </p>

      {success && (
        <div className="success-box">
          <strong>Password Reset Link Sent</strong>

          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <strong>Error</strong>

          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>

        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);

            if (error) {
              setError("");
            }
          }}
        />

        <button
          type="submit"
          disabled={loading || !email.trim()}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="back-login">
        <Link to="/login">
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;