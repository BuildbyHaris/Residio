import { useState } from "react";
import { register } from "../services/authservice";
import "./RegisterForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Client-side Validation
  const validate = () => {
    let newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+92\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be like +923234113114";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setMessage("");
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!validate()) return;

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    });

    setLoading(false);

    if (result.success) {
      setMessage(result.message);

      setErrors({});

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "student",
      });
    } else {
      let backendErrors = {};

      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((error) => {
          backendErrors[error.field] = error.message;
        });

        setErrors(backendErrors);
      }

      setMessage(result.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <small>{errors.name}</small>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <small>{errors.email}</small>

        <input
          type="text"
          name="phone"
          placeholder="+923234113114"
          value={formData.phone}
          onChange={handleChange}
        />
        <small>{errors.phone}</small>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="owner">Hostel Owner</option>
        </select>

    <div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
        <small>{errors.password}</small>

 <div className="password-field">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleChange}
  />

  <span
    className="eye-icon"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
        <small>{errors.confirmPassword}</small>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        
        {message && <p className="message">{message}</p>}
        
      </form>
    </div>
  );
};

export default RegisterForm;