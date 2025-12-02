import React from 'react';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Layout بسيط للداشبورد:
 * - ما فيه Navbar ولا Footer (هذول جايين من App.tsx)
 * - بس يضبط الكونتينت والـ heading والـ padding.
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  children
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-slate-300 max-w-2xl">
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
