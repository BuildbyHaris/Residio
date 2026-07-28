import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { login, googleLogin } from "../services/auth.service";
import { AuthContext } from "../../../context/AuthContext";
import { FiEye, FiEyeOff, FiLoader, FiUser, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaShieldAlt, FaHeart } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        const result = await googleLogin(tokenResponse.access_token);
        if (result.success) {
          toast.success("Successfully logged in with Google!");
          localStorage.setItem("user", JSON.stringify(result.user));
          setUser(result.user);
          if (result.user.role === "owner") {
            navigate("/owner-dashboard");
          } else {
            navigate("/");
          }
        } else {
          setErrors({ server: result.message });
        }
      } catch (err) {
        setErrors({ server: err.response?.data?.message || "Google login failed" });
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setErrors({ server: "Google login failed" });
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      localErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      localErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      localErrors.password = "Password must be at least 8 characters";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
       const response = await login(formData);
       localStorage.setItem("user", JSON.stringify(response.user));
       setUser(response.user);
       
       if (response.user.role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      if (errorMessage.toLowerCase().includes("verify your email")) {
        toast.error(errorMessage);
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
        }, 1500);
      } else {
        setErrors({ server: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#1e293b] tracking-tight mb-2">
          Welcome back!
        </h2>
        <p className="text-gray-500 text-[15px] leading-relaxed">
          Log in to your Residio account
          <br />
          and continue your journey.
        </p>
      </div>

      {/* Server error */}
      {errors.server && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-200 p-3 text-red-600 text-sm">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <div
            className={`relative flex items-center rounded-xl border bg-white transition-colors ${
              errors.email
                ? "border-red-400"
                : "border-gray-200 focus-within:border-[#ec6a52]"
            }`}
          >
            <FiUser className="ml-4 text-gray-400" size={18} />
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none px-3 py-3.5 text-[15px] text-gray-800 placeholder-gray-400"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div
            className={`relative flex items-center rounded-xl border bg-white transition-colors ${
              errors.password
                ? "border-red-400"
                : "border-gray-200 focus-within:border-[#ec6a52]"
            }`}
          >
            <FiLock className="ml-4 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none px-3 py-3.5 pr-11 text-[15px] text-gray-800 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-gray-600 bg-transparent"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
          )}
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 accent-[#ec6a52] cursor-pointer"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#ec6a52] hover:text-[#e35a41] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Log In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-[#ec6a52] text-white font-semibold text-base shadow-[0_10px_30px_-5px_rgba(236,106,82,0.5)] hover:bg-[#e35a41] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <FiLoader className="animate-spin" size={18} />
              Signing in...
            </>
          ) : (
            "Log In"
          )}
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#ec6a52] font-semibold hover:text-[#e35a41] transition-colors"
          >
            Sign Up
          </Link>
        </p>

        {/* Divider */}
        {/* <div className="flex items-center gap-3 pt-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div> */}

        {/*Social buttons - at the END as requested */}
         {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={isGoogleLoading}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-70"
          >
            {isGoogleLoading ? <FiLoader className="animate-spin" size={20} /> : <FcGoogle size={20} />}
            Continue with Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <FaFacebook size={18} className="text-[#1877F2]" />
            Continue with Facebook
          </button>
        </div> */}

        {/* Trust badges */}
        <div className="pt-6 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-[#ec6a52]/10 flex items-center justify-center">
                <FaShieldAlt className="text-[#ec6a52]" size={16} />
              </div>
              <p className="text-xs font-semibold text-gray-800">Safe & Secure</p>
              <p className="text-[10px] text-gray-500">Your data is protected</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-[#ec6a52]/10 flex items-center justify-center">
                <MdVerified className="text-[#ec6a52]" size={18} />
              </div>
              <p className="text-xs font-semibold text-gray-800">Trusted by Thousands</p>
              <p className="text-[10px] text-gray-500">Across multiple cities</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-[#ec6a52]/10 flex items-center justify-center">
                <FaHeart className="text-[#ec6a52]" size={15} />
              </div>
              <p className="text-xs font-semibold text-gray-800">Loved by Students</p>
              <p className="text-[10px] text-gray-500">For comfort & service</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;