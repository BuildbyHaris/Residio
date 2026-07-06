import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./ResetPassword.css";

import { resetPassword } from "../services/auth.service";
import { resetPasswordSchema } from "../validation/resetPassword.validation";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Joi Validation
    const { error: validationError } = resetPasswordSchema.validate(
      formData,
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

      const response = await resetPassword(token, formData);

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Password</h1>

      <p className="subtitle">
        Create a strong new password for your account.
      </p>

      {success && (
        <div className="success-box">
          <strong>Password Updated Successfully</strong>
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
        {/* Password */}

        <label htmlFor="password">New Password</label>

        <div className="password-input">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="button"
            className="toggle-btn"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password */}

        <label htmlFor="confirmPassword">
          Confirm Password
        </label>

        <div className="password-input">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm new password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="button"
            className="toggle-btn"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
          >
            {showConfirmPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={
            loading ||
            !formData.password ||
            !formData.confirmPassword
          }
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
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

export default ResetPasswordForm;