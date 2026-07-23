import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "../modules/admin/services/admin.service";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  /**
   * ============================================================
   * Admin State
   *
   * We initially restore the cached admin from localStorage
   * so the UI does not immediately assume the admin is logged out.
   * ============================================================
   */

  const [admin, setAdmin] = useState(() => {
    try {
      const storedAdmin =
        localStorage.getItem("adminInfo");

      return storedAdmin
        ? JSON.parse(storedAdmin)
        : null;
    } catch (error) {
      console.error(
        "Failed to restore admin from localStorage:",
        error
      );

      return null;
    }
  });

  /**
   * ============================================================
   * Loading State
   *
   * IMPORTANT:
   * While this is true, AdminProtectedRoute will show
   * "Loading admin panel..."
   *
   * This prevents redirecting to login before /admin/me
   * has checked the HTTP-only cookie.
   * ============================================================
   */

  const [loading, setLoading] = useState(true);

  /**
   * ============================================================
   * Restore Admin Session
   *
   * This runs on:
   * - Initial application load
   * - Page refresh
   *
   * The backend checks the HTTP-only admin cookie.
   * ============================================================
   */

  const refreshAdmin = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCurrentAdmin();

      console.log(
        "Current admin response:",
        response
      );

      /**
       * Service returns:
       *
       * {
       *   success: true,
       *   data: adminObject
       * }
       */

      if (
        response?.success &&
        response?.data
      ) {
        const currentAdmin =
          response.data;

        setAdmin(currentAdmin);

        localStorage.setItem(
          "adminInfo",
          JSON.stringify(currentAdmin)
        );

        return currentAdmin;
      }

      /**
       * If /admin/me returns 401,
       * the admin session is invalid.
       */

      setAdmin(null);

      localStorage.removeItem(
        "adminInfo"
      );

      return null;
    } catch (error) {
      console.error(
        "Failed to restore admin session:",
        error
      );

      setAdmin(null);

      localStorage.removeItem(
        "adminInfo"
      );

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * ============================================================
   * Check Session When App Starts
   * ============================================================
   */

  useEffect(() => {
    refreshAdmin();
  }, [refreshAdmin]);

  /**
   * ============================================================
   * Admin Login
   * ============================================================
   */

  const handleAdminLogin = async (
    credentials
  ) => {
    const response =
      await loginAdmin(
        credentials.email,
        credentials.password
      );

    console.log(
      "Admin login response:",
      response
    );

    if (
      response?.success &&
      response?.data
    ) {
      const loggedInAdmin =
        response.data;

      setAdmin(loggedInAdmin);

      localStorage.setItem(
        "adminInfo",
        JSON.stringify(loggedInAdmin)
      );
    }

    return response;
  };

  /**
   * ============================================================
   * Admin Logout
   * ============================================================
   */

  const handleAdminLogout = async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      console.error(
        "Admin logout error:",
        error
      );
    } finally {
      /**
       * Always clear frontend auth state
       * even if backend logout fails.
       */

      setAdmin(null);

      localStorage.removeItem(
        "adminInfo"
      );
    }
  };

  /**
   * ============================================================
   * Context Value
   * ============================================================
   */

  const value = useMemo(
    () => ({
      admin,

      loading,

      isAdminAuthenticated:
        !!admin,

      loginAdmin:
        handleAdminLogin,

      logoutAdmin:
        handleAdminLogout,

      refreshAdmin,
    }),
    [
      admin,
      loading,
      refreshAdmin,
    ]
  );

  return (
    <AdminAuthContext.Provider
      value={value}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

/**
 * ============================================================
 * useAdminAuth Hook
 * ============================================================
 */

export const useAdminAuth = () => {
  const context =
    useContext(
      AdminAuthContext
    );

  if (!context) {
    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }

  return context;
};