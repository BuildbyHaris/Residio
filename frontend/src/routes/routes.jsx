import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./paths.js";
// Landing
import LandingPage from "../modules/landing/pages/Landing";
import FindHostels from "../modules/landing/pages/FindHostels";
import PGs from "../modules/landing/pages/PGs";
import HowItWorks from "../modules/landing/pages/HowItWorks";
import About from "../modules/landing/pages/About";
import Contact from "../modules/landing/pages/Contact";

// Auth
import Register from "../modules/auth/pages/Register";
import VerifyOtp from "../modules/auth/pages/VerifyOtp";
import Login from "../modules/auth/pages/Login";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import VerifyResetOtp from "../modules/auth/pages/VerifyResetOtp";
import ResetPassword from "../modules/auth/pages/ResetPassword";

// User
import ProfilePage from "../modules/profile/pages/ProfilePage";

// Owner
import OwnerDashboard from "../modules/ownerDashboard/pages/ownerDashboard";
import OwnerVerificationPage from "../modules/ownerVerification/pages/OwnerVerificationPage";

// Admin
import AdminLogin from "../modules/admin/pages/AdminLogin";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import OwnerVerifications from "../modules/admin/pages/OwnerVerifications";
import OwnerVerificationDetailsPage from "../modules/admin/pages/OwnerVerificationDetails";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

import FindHostelPage from "../modules/findHostel/pages/FindHostelPage.jsx";
import HostelDetailPage from "../modules/findHostel/pages/HostelDetailPage.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/find-hostels" element={<FindHostels />} />

        <Route path="/pgs" element={<PGs />} />

        <Route path="/how-it-works" element={<HowItWorks />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* User Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />

          <Route
            path="/owner-verification"
            element={<OwnerVerificationPage />}
          />
        </Route>

        {/* ye ma ny add kye hee */}

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.FIND_HOSTEL} element={<FindHostelPage />} />
        </Route>

        <Route path="/hostel/:id" element={<HostelDetailPage />} />

        {/* Owner Dashboard */}
        <Route element={<ProtectedRoute allowedRole="owner" />}>
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route
            path="/admin/owner-verifications"
            element={<OwnerVerifications />}
          />

          <Route
            path="/admin/owner-verifications/:verificationId"
            element={<OwnerVerificationDetailsPage />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
