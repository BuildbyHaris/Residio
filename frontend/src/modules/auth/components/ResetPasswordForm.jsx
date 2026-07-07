import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const { error: validationError } =
      resetPasswordSchema.validate(formData, {
        abortEarly: false,
      });

    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword(
        token,
        formData
      );

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
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6 py-12">

    {/* Background Blur */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 h-80 w-80 bg-indigo-600/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 bg-cyan-500/20 blur-[140px] rounded-full"></div>
    </div>

    <div className="relative z-10 w-full max-w-md">

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,.55)] p-10">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-white text-center">
          Reset Password
        </h1>

        <p className="text-slate-400 text-center mt-3">
          Create a strong new password to secure your account.
        </p>

        {/* Success */}

        {success && (
          <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
            <h3 className="text-green-400 font-semibold">
              Password Updated Successfully
            </h3>

            <p className="text-green-200 text-sm mt-1">
              {success}
            </p>
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <h3 className="text-red-400 font-semibold">
              Error
            </h3>

            <p className="text-red-200 text-sm mt-1">
              {error}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-8"
        >
          {/* Password */}

          <div>

            <label className="text-sm font-medium text-slate-300 mb-2 block">
              New Password
            </label>

            <div className="relative">

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-900/70 border border-slate-700 text-white px-4 py-3 pr-20 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-400 hover:text-indigo-300 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Confirm Password
            </label>

            <div className="relative">

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
                className="w-full rounded-xl bg-slate-900/70 border border-slate-700 text-white px-4 py-3 pr-20 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-400 hover:text-indigo-300 transition"
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={
              loading ||
              !formData.password ||
              !formData.confirmPassword
            }
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Updating Password..."
              : "Reset Password"}
          </button>

        </form>

        {/* Footer */}

        <div className="mt-8 text-center">

          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>

  </div>
)};

export default ResetPasswordForm;