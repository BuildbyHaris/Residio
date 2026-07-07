import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Pehle check krein aapka file path sahi ho
import { loginApi } from "../api/auth.api";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
      // Purana fetch hata kar Axios ka function use kiya
      const response = await loginApi(formData);

      // Axios response data ko direct 'data' variable mein save krta hai
      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      // Axios errors ko handle karne ka tareeqa
      const errorMessage = err.response?.data?.message || "Something went wrong";
      setErrors({ server: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      label: "Secure Authentication",
      description: "Bank-grade encryption on every login",
      icon: (
        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
      ),
    },
    {
      label: "Property Management",
      description: "Track every unit from one dashboard",
      icon: (
        <>
          <rect x="4" y="9" width="6" height="11" />
          <rect x="14" y="4" width="6" height="16" />
        </>
      ),
    },
    {
      label: "Tenant Portal",
      description: "Give renters self-service access",
      icon: (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="9" r="2.3" />
          <path d="M21 20c0-2.6-1.7-4.8-4-5.6" />
        </>
      ),
    },
    {
      label: "Real-time Analytics",
      description: "Revenue and occupancy, always current",
      icon: (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 15v-3M12 15V9M16 15v-5" />
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left panel — full height */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 lg:p-16 text-white bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.75) 60%, rgba(8,11,26,0.92) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 text-blue-300"
            >
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">Residio</span>
        </div>

        {/* Heading + features */}
        <div className="max-w-md">
          <h2 className="text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight mb-3">
            Manage properties
            <br />
            with confidence
          </h2>
          <p className="text-slate-300 text-[15px] mb-10 leading-relaxed">
            One platform for landlords and property managers to run
            everything — leases, rent, maintenance, and tenants.
          </p>

          <ul className="space-y-5">
            {features.map((f) => (
              <li key={f.label} className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-200"
                  >
                    {f.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">
                    {f.label}
                  </p>
                  <p className="text-[13px] text-slate-400 mt-0.5">
                    {f.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Floating stat badge — premium touch */}
        <div className="flex items-center gap-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4 w-fit">
          <div>
            <p className="text-2xl font-bold leading-none">12,400+</p>
            <p className="text-[12px] text-slate-300 mt-1">
              Properties managed
            </p>
          </div>
          <div className="w-px h-9 bg-white/20" />
          <div>
            <p className="text-2xl font-bold leading-none">98%</p>
            <p className="text-[12px] text-slate-300 mt-1">
              On-time rent collection
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form, full height, vertically centered */}
      <div className="flex items-center justify-center px-6 sm:px-12 lg:px-20 py-16 bg-white">
        <div className="w-full max-w-[380px]">
          {/* Mobile-only logo */}
          <div className="flex md:hidden items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="w-4.5 h-4.5"
              >
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
              </svg>
            </div>
            <span className="text-base font-semibold text-slate-900">
              Residio
            </span>
          </div>

          <h1 className="text-[1.75rem] font-bold text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-[15px] text-slate-500 mt-2 mb-8">
            Sign in to continue managing your properties.
          </p>

          {errors.server && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 flex-shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
              {errors.server}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className={`w-full rounded-xl px-3.5 py-3 text-[15px] bg-slate-50 border text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white ${
                  errors.email ? "border-red-300" : "border-slate-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[13px] font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-xl px-3.5 py-3 pr-11 text-[15px] bg-slate-50 border text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white ${
                    errors.password ? "border-red-300" : "border-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-[18px] h-[18px]"
                  >
                    {showPassword ? (
                      <>
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.4 5.5A9.9 9.9 0 0 1 12 5c5 0 9 4 10 7a13 13 0 0 1-2.9 3.9M6.6 6.6A13.1 13.1 0 0 0 2 12c1 3 5 7 10 7 1.4 0 2.7-.3 3.9-.8" />
                      </>
                    ) : (
                      <>
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer w-fit">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 accent-blue-600"
              />
              Remember me
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white text-[15px] font-semibold hover:bg-slate-800 active:scale-[0.99] transition-all duration-150 shadow-sm hover:shadow-md disabled:opacity-50 disabled:hover:bg-slate-900"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.5c-.1.9-.8 2.4-2.4 3.4l-.02.15 3.5 2.7.24.02c2.2-2 3.5-5 3.5-8.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-6-2.1-7-5.1l-.14.01-3.7 2.8-.05.13C3.1 21.3 7.2 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5 14.3a7.1 7.1 0 0 1 0-4.6l-3.7-2.9a12 12 0 0 0 0 10.4L5 14.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.8c1.7 0 3.3.7 4.4 1.9l3.3-3.2C17.9 1.4 15.2 0 12 0 7.2 0 3.1 2.7 1.3 6.8l3.7 2.9C6 6.9 8.8 4.8 12 4.8Z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.9 10.8.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12c0-6.3-5.2-11.5-11.5-11.5Z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="mt-9 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-slate-900 font-semibold hover:text-blue-600 transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
