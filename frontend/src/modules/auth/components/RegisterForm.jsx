import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, googleLogin } from "../services/auth.service.js";
import { signupSchema } from "../validation/signup.validation.js";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../../context/AuthContext";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
} from "react-icons/fi";
import { FaShieldAlt, FaCheckCircle, FaHeart } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        const result = await googleLogin(tokenResponse.access_token);
        if (result.success) {
          toast.success("Successfully logged in with Google!");
          localStorage.setItem("user", JSON.stringify(result.user));
          setUser(result.user);
          navigate("/");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Google login failed.");
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google login failed.");
    },
  });

  const validate = () => {
    const { error } = signupSchema.validate(formData, { abortEarly: false });
    if (!error) {
      setErrors({});
      return true;
    }
    const newErrors = {};
    error.details.forEach((d) => {
      newErrors[d.path[0]] = d.message;
    });
    setErrors(newErrors);
    return false;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await register(formData);
      setLoading(false);

      if (result.success) {
        toast.success(result.message);
        const otpExpires = result.data?.otpExpires;

        // Save email and expiry for refresh/resend
        sessionStorage.setItem("otp_email", formData.email);
        sessionStorage.setItem("otp_expires_at", otpExpires);

        setTimeout(() => {
          navigate("/verify-otp", {
            state: {
              email: formData.email,
              otpExpires,
            },
          });
        }, 1200);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  // Input wrapper style
  const inputWrapper = (field) =>
    `flex items-center gap-3 w-full bg-white border rounded-xl px-4 py-3 transition-all focus-within:ring-2 focus-within:ring-[#ec6a52]/20 ${errors[field]
      ? "border-red-400 focus-within:border-red-500"
      : "border-gray-200 focus-within:border-[#ec6a52]"
    }`;

  const inputBase =
    "w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none";

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Join Residio and discover your next home away from home.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Full Name */}
          <div>
            <div className={inputWrapper("name")}>
              <FiUser className="text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className={inputWrapper("email")}>
              <FiMail className="text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <div className={inputWrapper("phone")}>
            <FiPhone className="text-gray-400" size={18} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputBase}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className={inputWrapper("password")}>
            <FiLock className="text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputBase}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-[#ec6a52]"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className={inputWrapper("confirmPassword")}>
            <FiLock className="text-gray-400" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputBase}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-[#ec6a52]"
            >
              {showConfirmPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-[#ec6a52] w-4 h-4"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-[#ec6a52] font-medium hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#ec6a52] font-medium hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#ec6a52] text-white font-semibold text-base shadow-[0_8px_20px_-6px_rgba(236,106,82,0.6)] hover:bg-[#e35a41] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={18} />
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#ec6a52] font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social buttons at the bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={isGoogleLoading}
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-70"
          >
            {isGoogleLoading ? <FiLoader className="animate-spin" size={20} /> : <FcGoogle size={20} />}
            Continue with Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <FaFacebook size={18} className="text-[#1877F2]" />
            Continue with Facebook
          </button>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-100 pt-5 mt-4 grid grid-cols-3 gap-3 text-center">
          <TrustBadge
            icon={<FaShieldAlt size={16} />}
            title="Safe & Secure"
            desc="Your data is protected"
          />
          <TrustBadge
            icon={<FaCheckCircle size={16} />}
            title="Trusted by Thousands"
            desc="Across multiple cities"
          />
          <TrustBadge
            icon={<FaHeart size={16} />}
            title="Loved by Students"
            desc="For comfort & service"
          />
        </div>
      </form>
    </div>
  );
};

/* Trust badge card */
const TrustBadge = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 rounded-full bg-[#ec6a52]/10 flex items-center justify-center text-[#ec6a52] mb-1.5">
      {icon}
    </div>
    <p className="text-xs font-semibold text-gray-800">{title}</p>
    <p className="text-[11px] text-gray-500 leading-tight">{desc}</p>
  </div>
);

export default RegisterForm;