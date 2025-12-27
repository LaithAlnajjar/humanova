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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Check for existing session on startup
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("humanova_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user", error);
          localStorage.removeItem("humanova_user");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // 2. Login Function
  const login = async (payload: LoginPayload) => {
    try {
      const data = await apiLogin(payload);

      // Save to State
      setUser(data);

      // Save to LocalStorage (Persist)
      localStorage.setItem("humanova_user", JSON.stringify(data));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // 3. Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("humanova_user");
    // Optional: Redirect to home or login is handled by the UI consuming this
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
