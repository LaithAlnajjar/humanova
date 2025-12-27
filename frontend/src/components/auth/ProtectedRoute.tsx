import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/enums";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // 1. If we are still loading/checking auth, show nothing (or a spinner)
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // 2. If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3. If roles are specified and user doesn't match, redirect to unauthorized (or home)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Optional: Redirect to their correct dashboard if they are lost
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Authorized! Render the child routes
  return <Outlet />;
};
