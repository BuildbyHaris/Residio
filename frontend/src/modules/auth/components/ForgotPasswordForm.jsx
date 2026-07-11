import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiMail } from "react-icons/fi";

import { forgotPassword } from "../services/auth.service";
import { forgotPasswordSchema } from "../validation/forgotPassword.validation";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
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
      { email },
      { abortEarly: false }
    );

    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(email);
      sessionStorage.setItem("reset_email", email);
      sessionStorage.setItem(
        "otp_expires_at",
        response.otpExpires
      );

      setTimeout(() => {
        navigate("/verify-reset-otp", {
          replace: true,
          state: {
            email,
            otpExpires: response.otpExpires,
          },
        });
      }, 1500);
    } catch (err) {
      const error =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back to Login */}
      <div className="mb-10">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-gray-700 hover:text-[#ec6a52] transition-colors group"
        >
          <FiArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          Back to Login
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] tracking-tight mb-4">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-[15px] leading-relaxed max-w-sm mx-auto">
          No worries! Enter your email and we'll send you
          <br />
          a link to reset your password.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 rounded-xl bg-green-500/10 border border-green-200 p-3 text-green-700 text-sm">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-200 p-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input with icon */}
        <div className="relative">
          <FiMail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            className="w-full bg-white border border-gray-200 rounded-xl outline-none pl-12 pr-4 py-4 text-[15px] text-gray-800 placeholder-gray-400 focus:border-[#ec6a52] focus:ring-2 focus:ring-[#ec6a52]/10 transition-all"
          />
        </div>

        {/* Send Reset Link Button */}
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="w-full py-4 rounded-xl bg-[#ec6a52] text-white font-semibold text-base shadow-[0_10px_30px_-5px_rgba(236,106,82,0.4)] hover:bg-[#e35a41] hover:shadow-[0_14px_35px_-5px_rgba(236,106,82,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={18} />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>

        {/* Divider with Remember password link */}
        <div className="relative flex items-center justify-center pt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-4 text-[14px] text-gray-500">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#ec6a52] font-semibold hover:text-[#e35a41] transition-colors"
            >
              Log in
            </Link>
          </span>
        </div>
      </form>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 mt-12">
        <TrustBadge
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec6a52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
          title="Safe & Secure"
          subtitle="Your data is protected"
        />
        <TrustBadge
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec6a52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
          title="Trusted by Thousands"
          subtitle="Across multiple cities"
        />
        <TrustBadge
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec6a52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          }
          title="Loved by Students"
          subtitle="For comfort & service"
        />
      </div>
    </div>
  );
};

const TrustBadge = ({ icon, title, subtitle }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-[#ec6a52]/10 flex items-center justify-center mb-2">
      {icon}
    </div>
    <p className="text-[13px] font-semibold text-[#1e293b] leading-tight">
      {title}
    </p>
    <p className="text-[11px] text-gray-500 mt-1">{subtitle}</p>
  </div>
);

export default ForgotPasswordForm;