import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Redirect ke liye import kiya
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate(); // Navigation hook initialized

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle state for Checkbox
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      localErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      localErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      localErrors.password = 'Password must be at least 4 characters';
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
      console.log('API Request Data:', formData);
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cookies handle --> business standard header:
        credentials: 'include', 
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      //  Browser handle cookie and User save  non-sensitive data save for display
      localStorage.setItem('user', JSON.stringify(data.user));
      
      alert('Login Successful!');
      
      // Exact redirection path (e.g., /dashboard)
      navigate('/dashboard'); 
      
    } catch (err) {
      setErrors({ server: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
      
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to your account</p>
        </div>

        {errors.server && (
          <div className="server-error">{errors.server}</div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-actions">
            <label className="remember-me">
              <input 
                id="remember-me" 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? 'Signing in...' : 'Log in'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{' '}
          <a href="#" className="signup-link">Sign up</a>
        </p>

      </div>
    </div>
  );
};

export default Login;
