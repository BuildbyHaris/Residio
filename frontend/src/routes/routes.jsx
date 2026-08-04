// src/routes/AppRoutes.jsx

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
import MyProperties from "../modules/ownerDashboard/pages/MyProperties";
import AddProperty from "../modules/ownerDashboard/pages/AddProperty";

// Admin
import AdminLogin from "../modules/admin/pages/AdminLogin";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import OwnerVerifications from "../modules/admin/pages/OwnerVerifications";
import OwnerVerificationDetailsPage from "../modules/admin/pages/OwnerVerificationDetails";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

// Find Hostel
import FindHostelPage from "../modules/findHostel/pages/FindHostelPage.jsx";
import HostelDetailPage from "../modules/findHostel/pages/HostelDetailPage.jsx";
import ChatPage from "../modules/chat/pages/ChatPage.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC / LANDING
        ===================================================== */}

        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path="/find-hostels" element={<FindHostels />} />
        <Route path="/pgs" element={<PGs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


        {/* =====================================================
            AUTH
        ===================================================== */}

        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtp />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.VERIFY_RESET_OTP} element={<VerifyResetOtp />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />


        {/* =====================================================
            PROTECTED USER ROUTES
        ===================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path={ROUTES.PROFILE}
            element={<ProfilePage />}
          />

          <Route
            path={ROUTES.OWNER_VERIFICATION}
            element={<OwnerVerificationPage />}
          />

          <Route
            path={ROUTES.FIND_HOSTEL}
            element={<FindHostelPage />}
          />

        </Route>


        {/* =====================================================
            HOSTEL DETAILS
        ===================================================== */}

        <Route
          path={ROUTES.HOSTEL_DETAIL}
          element={<HostelDetailPage />}
        />


        {/* =====================================================
            OWNER DASHBOARD
        ===================================================== */}

        <Route element={<ProtectedRoute allowedRole="owner" />}>

          {/* Dashboard */}
          <Route
            path={ROUTES.OWNER_DASHBOARD}
            element={<OwnerDashboard />}
          />

          {/* My Properties */}
          <Route
            path={ROUTES.OWNER_PROPERTIES}
            element={<MyProperties />}
          />

          {/* Add Property */}
          <Route
            path={ROUTES.ADD_PROPERTY}
            element={<AddProperty />}
          />

        </Route>


        {/* =====================================================
            ADMIN LOGIN
        ===================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =====================================================
            ADMIN PROTECTED ROUTES
        ===================================================== */}

        <Route element={<AdminProtectedRoute />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/owner-verifications"
            element={<OwnerVerifications />}
          />

          <Route
            path="/admin/owner-verifications/:verificationId"
            element={<OwnerVerificationDetailsPage />}
          />

        </Route>

        <Route element={<ProtectedRoute />}>

          <Route
            path={ROUTES.PROFILE}
            element={<ProfilePage />}
          />

          <Route
            path={ROUTES.OWNER_VERIFICATION}
            element={<OwnerVerificationPage />}
          />

          <Route
            path={ROUTES.FIND_HOSTEL}
            element={<FindHostelPage />}
          />

          <Route
            path={ROUTES.CHAT}
            element={<ChatPage />}
          />

        </Route>


        {/* =====================================================
            404
        ===================================================== */}

        <Route
          path="*"
          element={<Navigate to={ROUTES.HOME} replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;