import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { validateLoginForm } from '../validation/admin.validation';

const AdminLoginForm = ({ onSubmit, loading, serverError }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change if field was touched
    if (touched[name]) {
      const newErrors = validateLoginForm({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateLoginForm(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] || null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData.email.trim(), formData.password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Server Error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <div className="w-5 h-5 mt-0.5 flex-shrink-0">
            <svg viewBox="0 0 20 20" fill="currentColor" className="text-red-500">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Admin Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <HiOutlineMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@residio.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none
              ${errors.email && touched.email
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 bg-white focus:border-[#ec6a52] focus:ring-2 focus:ring-orange-100'
              }
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            aria-label="Admin email address"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        {errors.email && touched.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="admin-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            className={`w-full pl-11 pr-12 py-3 rounded-xl border text-sm transition-all duration-200 outline-none
              ${errors.password && touched.password
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 bg-white focus:border-[#ec6a52] focus:ring-2 focus:ring-orange-100'
              }
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            aria-label="Admin password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <HiOutlineEyeOff className="h-5 w-5" />
            ) : (
              <HiOutlineEye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <p id="password-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.password}
          </p>
        )}
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 
          ${loading
            ? 'bg-[#ec6a52]/70 cursor-not-allowed'
            : 'bg-[#ec6a52] hover:bg-[#e35a41] active:scale-[0.99] shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-200'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </span>
        ) : (
          'Sign In to Admin Panel'
        )}
      </button>

      {/* Security Notice */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-gray-400">
          Secured admin access. All activities are monitored.
        </p>
      </div>
    </form>
  );
};

export default AdminLoginForm;