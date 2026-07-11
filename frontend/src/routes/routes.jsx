import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage  from "../modules/landing/pages/Landing";
import Register from "../modules/auth/pages/Register";
import VerifyOtp from "../modules/auth/pages/VerifyOtp";
import Login from "../modules/auth/pages/Login";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import VerifyResetOtp from "../modules/auth/pages/VerifyResetOtp";
import ResetPassword from "../modules/auth/pages/ResetPassword";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;