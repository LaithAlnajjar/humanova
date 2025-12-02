import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LandingPage } from '@/pages/Landing/LandingPage';
import { LoginPage } from '@/pages/Auth/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage';
import { StudentDashboard } from '@/pages/Dashboard/StudentDashboard';
import { VolunteerDashboard } from '@/pages/Dashboard/VolunteerDashboard';
import { CharityDashboard } from '@/pages/Dashboard/CharityDashboard';
import { CompanyDashboard } from '@/pages/Dashboard/CompanyDashboard';
import { UniversityDashboard } from '@/pages/Dashboard/UniversityDashboard';
import { DisabledStudentDashboard } from '@/pages/Dashboard/DisabledStudentDashboard';
import { OpportunitiesPage } from '@/pages/Opportunities/OpportunitiesPage';
import { SupportPage } from '@/pages/Support/SupportPage';
import { ProfilePage } from '@/pages/Profile/ProfilePage';

export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-humanova-cream/60 to-transparent dark:from-black dark:to-humanova-oliveDark/40">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Auth */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
          <Route path="/dashboard/charity" element={<CharityDashboard />} />
          <Route path="/dashboard/company" element={<CompanyDashboard />} />
          <Route path="/dashboard/university" element={<UniversityDashboard />} />
          <Route
            path="/dashboard/disabled_student"
            element={<DisabledStudentDashboard />}
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<div className="container py-16">{t('nav.home')}</div>}
          />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route
          
          path="/opportunities" 
          element={<OpportunitiesPage />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
