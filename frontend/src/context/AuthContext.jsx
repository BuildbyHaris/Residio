import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentUser,
  logout,
} from "../modules/auth/services/auth.service";

import {
  connectSocket,
  disconnectSocket,
} from "../modules/chat/socket/socket.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage for instant load — no waiting for API
  const [user, setUser] = useState(() => {
    try {
      const stored =
        localStorage.getItem("user");

      return stored
        ? JSON.parse(stored)
        : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] =
    useState(false);

  /**
   * =========================================================
   * SOCKET CONNECTION
   * =========================================================
   *
   * Connect Socket.IO only when an authenticated user exists.
   *
   * The backend will authenticate the socket using the
   * accessToken cookie.
   *
   * When the user becomes null, disconnect the socket.
   */
  useEffect(() => {
    if (user) {
      connectSocket();
    } else {
      disconnectSocket();
    }

    /**
     * Cleanup socket when AuthProvider unmounts
     * or before the effect runs again.
     */
    return () => {
      disconnectSocket();
    };
  }, [user]);

  /**
   * =========================================================
   * REFRESH CURRENT USER
   * =========================================================
   *
   * Validate session with server in the background.
   * Called explicitly (e.g., after login) or on app mount.
   */
  const refreshUser = async () => {
    try {
      const response =
        await getCurrentUser();

      setUser(response.user);

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );
    } catch (error) {
      // Token invalid/expired — clear session
      setUser(null);

      localStorage.removeItem("user");
    }
  };

  /**
   * =========================================================
   * LOGOUT
   * =========================================================
   *
   * Clear cookie + localStorage.
   *
   * Socket will also be disconnected because
   * setUser(null) triggers the socket effect.
   */
  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  /**
   * =========================================================
   * AUTH CONTEXT VALUE
   * =========================================================
   */
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

  console.log(
    "AuthContext user:",
    user
  );

  console.log(
    "isAuthenticated:",
    !!user
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};