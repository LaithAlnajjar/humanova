import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  children
}) => {
  const { user } = useAuth();

  if (!user) {
    // TODO: Add a loading spinner or a more robust unauthorized view
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
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-sm text-slate-300 md:text-base">
              {subtitle}
            </p>
          )}
        </header>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
