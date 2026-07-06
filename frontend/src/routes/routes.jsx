import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "../modules/auth/pages/Register";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import ResetPassword from "../modules/auth/pages/ResetPassword";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Redirect Unknown Routes */}

        <Route
          path="*"
          element={<Navigate to="/register" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;