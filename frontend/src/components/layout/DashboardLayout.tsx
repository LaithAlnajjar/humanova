import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from './Sidebar';
import { Outlet, Navigate } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" replace />;
  }
  
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading user...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
      <Sidebar role={user.role} />
      <main className="flex-1 space-y-6 px-4 py-8 md:py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
