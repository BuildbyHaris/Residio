import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================
// Public / Auth Pages
// =========================
import LandingPage from "../modules/landing/pages/Landing";
import Register from "../modules/auth/pages/Register";
import VerifyOtp from "../modules/auth/pages/VerifyOtp";
import Login from "../modules/auth/pages/Login";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import VerifyResetOtp from "../modules/auth/pages/VerifyResetOtp";
import ResetPassword from "../modules/auth/pages/ResetPassword";

// =========================
// User Pages
// =========================
import ProfilePage from "../modules/profile/pages/ProfilePage";

// =========================
// Owner Pages
// =========================
import OwnerDashboard from "../modules/ownerDashboard/pages/ownerDashboard";
import OwnerVerificationPage from "../modules/ownerVerification/pages/OwnerVerificationPage";

// =========================
// Admin Pages
// =========================
import AdminLogin from "../modules/admin/pages/AdminLogin";
import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import OwnerVerifications from "../modules/admin/pages/OwnerVerifications";
import OwnerVerificationDetailsPage from "../modules/admin/pages/OwnerVerificationDetails";

// =========================
// Route Guards
// =========================
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            PUBLIC LANDING
        ====================================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />


        {/* =====================================
            USER AUTHENTICATION
        ====================================== */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-reset-otp"
          element={<VerifyResetOtp />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =====================================
            USER PROTECTED ROUTES
        ====================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/owner-verification"
            element={<OwnerVerificationPage />}
          />

        </Route>


        {/* =====================================
            OWNER DASHBOARD
            Only users with role = owner
        ====================================== */}

        <Route
          element={
            <ProtectedRoute allowedRole="owner" />
          }
        >
          <Route
            path="/owner-dashboard"
            element={<OwnerDashboard />}
          />
        </Route>


        {/* =====================================
            ADMIN LOGIN
            Public route
        ====================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =====================================
            ADMIN PROTECTED ROUTES
        ====================================== */}

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
            element={
              <OwnerVerificationDetailsPage />
            }
          />

        </Route>


        {/* =====================================
            404
        ====================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;