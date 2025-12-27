import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LandingPage } from '@/pages/Landing/LandingPage';
import { LoginPage } from '@/pages/Auth/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage';
import { StudentDashboard } from '@/pages/Dashboard/StudentDashboard';
import { VolunteerDashboard } from '@/pages/Dashboard/VolunteerDashboard';
import { CharityDashboard } from '@/pages/Dashboard/CharityDashboard';
import CompanyDashboard from '@/pages/Dashboard/CompanyDashboard';
import { DisabledStudentDashboard } from '@/pages/Dashboard/DisabledStudentDashboard';
import { OpportunitiesPage } from '@/pages/Opportunities/OpportunitiesPage';

import { ProfilePage } from '@/pages/Profile/ProfilePage';
import { TrackingPage } from '@/pages/Student/TrackingPage';
import { StudentOpportunitiesPage } from '@/pages/Student/StudentOpportunitiesPage';
import StudentProfilePage from '@/pages/Student/StudentProfilePage';
import { HelpRequestsPage } from './pages/Student/HelpRequestsPage';
import PostInternshipPage from './pages/Company/PostInternshipPage';
import ApplicationManagerPage from './pages/Company/ApplicationManagerPage';
import SupervisorManagerPage from './pages/Company/SupervisorManagerPage';
import VolunteerOpportunitiesPage from './pages/Volunteer/OpportunitiesPage';
import VolunteerProfilePage from './pages/Volunteer/ProfilePage';
import VolunteerHistoryPage from './pages/Volunteer/HistoryPage';
import SoftSkillsTestPage from './pages/Volunteer/SoftSkillsTestPage';
import { UniversityDashboardPage } from '@/pages/University/UniversityDashboardPage';
import { StudentsPage } from '@/pages/University/StudentsPage';
import { ApprovalsPage } from '@/pages/University/ApprovalsPage';
import PostOpportunityPage from './pages/Charity/PostOpportunityPage';
import CharityApplicationManagerPage from './pages/Charity/ApplicationManagerPage';
import PostInitiativePage from './pages/Charity/PostInitiativePage';
import CampaignManagerPage from './pages/Charity/CampaignManagerPage';
import CertificateSystemPage from './pages/Charity/CertificateSystemPage';
import PODProfilePage from './pages/POD/PODProfilePage';
import PublishHelpRequestPage from './pages/POD/PublishHelpRequestPage';
import PODRatingPage from './pages/POD/PODRatingPage';



export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-humanova-cream/60 to-transparent dark:from-black dark:to-humanova-oliveDark/40">
      <Routes>
        {/* Public routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Dashboard routes with Sidebar */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/dashboard/student" replace />} />
                  <Route path="student" element={<StudentDashboard />} />
                  <Route path="student/tracking" element={<TrackingPage />} />
                  <Route path="student/opportunities" element={<StudentOpportunitiesPage />} />
                  <Route path="student/profile" element={<StudentProfilePage />} />
                  <Route path="student/help-requests" element={<HelpRequestsPage />} />
                  <Route path="volunteer" element={<VolunteerDashboard />} />
                  <Route path="volunteer/opportunities" element={<VolunteerOpportunitiesPage />} />
                  <Route path="volunteer/profile" element={<VolunteerProfilePage />} />
                  <Route path="volunteer/history" element={<VolunteerHistoryPage />} />
                  <Route path="volunteer/soft-skills-test" element={<SoftSkillsTestPage />} />
                  
                  <Route path="charity" element={<CharityDashboard />} />
                  <Route path="charity/post-opportunity" element={<PostOpportunityPage />} />
                  <Route path="charity/applications" element={<CharityApplicationManagerPage />} />
                  <Route path="charity/post-initiative" element={<PostInitiativePage />} />
                  <Route path="charity/campaigns" element={<CampaignManagerPage />} />
                  <Route path="charity/certificates" element={<CertificateSystemPage />} />

                  <Route path="company" element={<CompanyDashboard />} />
                  <Route path="company/post" element={<PostInternshipPage />} />
                  <Route path="company/applications" element={<ApplicationManagerPage />} />
                  <Route path="company/supervisors" element={<SupervisorManagerPage />} />
                  
                  <Route path="disabled-student" element={<DisabledStudentDashboard />} />
                  <Route path="disabled-student/profile" element={<PODProfilePage />} />
                  <Route path="disabled-student/publish-request" element={<PublishHelpRequestPage />} />

                  <Route path="disabled-student/rating" element={<PODRatingPage />} />

                  <Route path="university" element={<Navigate to="/dashboard/university/dashboard" replace />} />
                  <Route path="university/dashboard" element={<UniversityDashboardPage />} />
                  <Route path="university/students" element={<StudentsPage />} />
                  <Route path="university/approvals" element={<ApprovalsPage />} />
                </Route>
        
                {/* Fallback */}
        <Route
          path="*"
          element={<div className="container py-16">{t('nav.home')}</div>}
        />
      </Routes>
    </div>
  );
};

export default App;
