import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, LoginPayload } from "@/types/auth";
import { login as apiLogin } from "@/services/authService";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // FIX: Lazy Initialization.
  // We check localStorage BEFORE the first render happens.
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem("humanova_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false); // No longer need true default since we load synchronously above

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const data = await apiLogin(payload);

      // 1. Update State
      setUser(data);

      // 2. Persist to Storage
      localStorage.setItem("humanova_user", JSON.stringify(data));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("humanova_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
