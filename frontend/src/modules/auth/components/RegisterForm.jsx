import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, apiError }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {apiError && <div className="error-banner">{apiError}</div>}
      
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
