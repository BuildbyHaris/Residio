import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheck, FiLoader } from "react-icons/fi";

import { resetPassword } from "../services/auth.service";
import { resetPasswordSchema } from "../validation/resetPassword.validation";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  // Password strength checks
  const checks = useMemo(() => {
    const pwd = formData.password;
    return {
      length: pwd.length >= 8,
      number: /\d/.test(pwd),
      symbol: /[!@#$%^&*(),.?":{}|<>_\-\[\]\\/'`~+=;]/.test(pwd),
    };
  }, [formData.password]);

  const strengthScore = Object.values(checks).filter(Boolean).length;

  // Strength bar color
  const getStrengthColor = (index) => {
    if (index >= strengthScore) return "bg-gray-200";
    if (strengthScore === 1) return "bg-red-400";
    if (strengthScore === 2) return "bg-[#f5a26f]";
    return "bg-[#ec6a52]";
  };

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { error: validationError } = resetPasswordSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    try {
      setLoading(true);
      const { password } = formData;

      await resetPassword({ password });
      
      setSuccess("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login", { replace: true });
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
    <div className="bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] p-8 md:p-10">
      {/* Residio branding */}
      <h1 className="text-3xl font-bold text-[#1e293b] text-center tracking-tight mb-5">
        Residio
      </h1>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-[24px] font-bold text-[#1e293b] tracking-tight mb-2">
          Choose a new password
        </h2>
        <p className="text-gray-500 text-[14px] leading-relaxed max-w-xs mx-auto">
          Make it strong — you'll use this to access your Residio account
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
        {/* New Password */}
        <div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b outline-none pb-2 pt-1 pr-10 text-[15px] text-gray-800 placeholder-gray-500 focus:ring-0 transition-colors border-[#ec6a52]/60 focus:border-[#ec6a52]"
            />
            {/* Dark check indicator */}
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${strengthScore === 3
                ? "bg-[#1e293b] text-white"
                : "bg-gray-200 text-gray-400"
                }`}
            >
              <FiCheck size={14} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b outline-none pb-2 pt-1 pr-10 text-[15px] text-gray-800 placeholder-gray-500 focus:ring-0 transition-colors border-[#ec6a52]/60 focus:border-[#ec6a52]"
            />
            {/* Dark check indicator */}
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${passwordsMatch
                ? "bg-[#1e293b] text-white"
                : "bg-gray-200 text-gray-400"
                }`}
            >
              <FiCheck size={14} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Strength Bar */}
        <div className="flex items-center gap-1.5 pt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${getStrengthColor(
                i
              )}`}
            />
          ))}
        </div>

        {/* Password Requirements Checklist */}
        <div className="space-y-2.5 pt-1">
          <ChecklistItem checked={checks.length} label="8+ characters" />
          <ChecklistItem checked={checks.number} label="number" />
          <ChecklistItem checked={checks.symbol} label="symbol" />
        </div>

        {/* Update Password Pill Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={
              loading || !formData.password || !formData.confirmPassword
            }
            className="px-14 py-3.5 rounded-full bg-[#ec6a52] text-white font-semibold text-base shadow-[0_10px_30px_-5px_rgba(236,106,82,0.5)] hover:bg-[#e35a41] hover:shadow-[0_14px_35px_-5px_rgba(236,106,82,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[220px]"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center pt-1">
          <Link
            to="/login"
            className="text-[14px] font-medium text-[#ec6a52] hover:text-[#e35a41] transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

/* ==========================
   Checklist Item Component
========================== */
const ChecklistItem = ({ checked, label }) => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center border-2 transition-all ${checked
        ? "bg-white border-[#ec6a52]"
        : "bg-white border-gray-300"
        }`}
    >
      {checked && (
        <FiCheck size={12} className="text-[#ec6a52]" strokeWidth={3} />
      )}
    </div>
    <span
      className={`text-sm transition-colors ${checked ? "text-gray-800 font-medium" : "text-gray-500"
        }`}
    >
      {label}
    </span>
  </div>
);

export default ResetPasswordForm;