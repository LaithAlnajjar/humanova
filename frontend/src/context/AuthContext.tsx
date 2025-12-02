import React, { createContext, useContext, useState } from 'react';

type UserRole = 'student' | 'volunteer' | 'charity' | 'company' | 'university' | 'disabled_student';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (nextUser: AuthUser) => {
    setUser(nextUser);
    // ممكن لاحقاً نضيف تخزين في localStorage / JWT الخ...
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
