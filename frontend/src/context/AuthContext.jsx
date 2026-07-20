import { createContext, useMemo, useState } from "react";
import { getCurrentUser, logout } from "../modules/auth/services/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage for instant load — no waiting for API
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  /**
   * Validate session with server in the background.
   * Only called explicitly (e.g., after login) or on app mount.
   */
  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error) {
      // Token invalid/expired — clear session
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  /**
   * Logout — clear cookie + localStorage
   */
  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      setUser,
      refreshUser,
      logout: handleLogout,
    }),
    [user, loading]
  );
console.log("AuthContext user:", user);
console.log("isAuthenticated:", !!user);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};