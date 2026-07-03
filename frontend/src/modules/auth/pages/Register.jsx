import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { registerUser } from '../api/authApi';

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegisterSubmit = async (userData) => {
    setError(null);
    try {
      const response = await registerUser(userData);
      if (response.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <h1>Create an Account</h1>
      {success ? (
        <div className="success-message">
          Registration successful! You can now log in.
        </div>
      ) : (
        <RegisterForm onSubmit={handleRegisterSubmit} apiError={error} />
      )}
    </div>
  );
};

export default Register;
