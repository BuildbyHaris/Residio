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

const ADMIN_STORAGE_KEY = "adminInfo";

export const AdminAuthProvider = ({
  children,
}) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const storedAdmin =
        localStorage.getItem(
          ADMIN_STORAGE_KEY
        );

      if (!storedAdmin) {
        return null;
      }

      return JSON.parse(storedAdmin);
    } catch (error) {
      console.error(
        "Failed to restore admin from localStorage:",
        error
      );

      localStorage.removeItem(
        ADMIN_STORAGE_KEY
      );

      return null;
    }
  });
  const [loading, setLoading] =
    useState(true);

  const clearAdminSession =
    useCallback(() => {
      setAdmin(null);

      localStorage.removeItem(
        ADMIN_STORAGE_KEY
      );
    }, []);

  const refreshAdmin = useCallback(
    async () => {
      try {
        setLoading(true);

        const response =
          await getCurrentAdmin();

        console.log(
          "Current admin session response:",
          response
        );

        if (
          response?.success &&
          response?.data
        ) {
          const currentAdmin =
            response.data;

          setAdmin(currentAdmin);

          localStorage.setItem(
            ADMIN_STORAGE_KEY,
            JSON.stringify(
              currentAdmin
            )
          );

          return currentAdmin;
        }
        clearAdminSession();

        return null;
      } catch (error) {
        console.error(
          "Failed to restore admin session:",
          error
        );
        clearAdminSession();

        return null;
      } finally {
        setLoading(false);
      }
    },
    [clearAdminSession]
  );
  useEffect(() => {
    refreshAdmin();
  }, [refreshAdmin]);

  const handleAdminLogin =
    useCallback(
      async (credentials) => {
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
            ADMIN_STORAGE_KEY,
            JSON.stringify(
              loggedInAdmin
            )
          );
        }

        return response;
      },
      []
    );

  const handleAdminLogout =
    useCallback(async () => {
      try {
        await logoutAdmin();
      } catch (error) {
        console.error(
          "Admin logout error:",
          error
        );
      } finally {
        clearAdminSession();
      }
    }, [clearAdminSession]);

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
      handleAdminLogin,
      handleAdminLogout,
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