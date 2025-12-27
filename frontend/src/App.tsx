import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"; // 🛡️ Import this!
import { UserRole } from "@/types/enums"; // 🛡️ Import Enums for role checks

// Public Pages
import { LandingPage } from "@/pages/Landing/LandingPage";
import { LoginPage } from "@/pages/Auth/LoginPage";
import { RegisterPage } from "@/pages/Auth/RegisterPage";
import { ProfilePage } from "@/pages/Profile/ProfilePage";

// Student Pages
import { StudentDashboard } from "@/pages/Dashboard/StudentDashboard";
import { TrackingPage } from "@/pages/Student/TrackingPage";
import StudentProfilePage from "@/pages/Student/StudentProfilePage";
import { HelpRequestsPage } from "./pages/Student/HelpRequestsPage";

// Volunteer Pages
import { VolunteerDashboard } from "@/pages/Dashboard/VolunteerDashboard";
import VolunteerOpportunitiesPage from "./pages/Volunteer/OpportunitiesPage";
import VolunteerProfilePage from "./pages/Volunteer/ProfilePage";
import VolunteerHistoryPage from "./pages/Volunteer/HistoryPage";
import SoftSkillsTestPage from "./pages/Volunteer/SoftSkillsTestPage";

// Company Pages
import CompanyDashboard from "@/pages/Dashboard/CompanyDashboard";
import PostInternshipPage from "./pages/Company/PostInternshipPage";
import ApplicationManagerPage from "./pages/Company/ApplicationManagerPage";
import SupervisorManagerPage from "./pages/Company/SupervisorManagerPage";

// Charity Pages
import { CharityDashboard } from "@/pages/Dashboard/CharityDashboard";
import PostOpportunityPage from "./pages/Charity/PostOpportunityPage";
import CharityApplicationManagerPage from "./pages/Charity/ApplicationManagerPage";
import PostInitiativePage from "./pages/Charity/PostInitiativePage";
import CampaignManagerPage from "./pages/Charity/CampaignManagerPage";
import CertificateSystemPage from "./pages/Charity/CertificateSystemPage";
import MyOpportunitiesPage from "./components/charity/MyOpportunities";

// Disabled Student Pages
import { DisabledStudentDashboard } from "@/pages/Dashboard/DisabledStudentDashboard";
import PODProfilePage from "./pages/POD/PODProfilePage";
import PublishHelpRequestPage from "./pages/POD/PublishHelpRequestPage";
import PODRatingPage from "./pages/POD/PODRatingPage";

// University Pages
import { UniversityDashboardPage } from "@/pages/University/UniversityDashboardPage";
import { StudentsPage } from "@/pages/University/StudentsPage";
import { ApprovalsPage } from "@/pages/University/ApprovalsPage";
import MyInternshipsPage from "./pages/Company/MyInternshipsPage";
import StudentOpportunitiesPage from "./pages/Student/StudentOpportunitiesPage";

export const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-humanova-cream/60 to-transparent dark:from-black dark:to-humanova-oliveDark/40">
      <Routes>
        {/* --- Public Routes --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* --- Protected Dashboard Routes --- */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Default Redirect (Optional: Can be smarter later) */}
          <Route index element={<Navigate to="/auth/login" replace />} />

          {/* 🛡️ STUDENT ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.Student]} />}>
            <Route path="student" element={<StudentDashboard />} />
            <Route
              path="student/opportunities"
              element={<StudentOpportunitiesPage />}
            />{" "}
            {/* UPDATED */}
            <Route path="student/tracking" element={<TrackingPage />} />
            <Route path="student/opportunities" />
            <Route path="student/profile" element={<StudentProfilePage />} />
            <Route
              path="student/help-requests"
              element={<HelpRequestsPage />}
            />
          </Route>

          {/* 🛡️ VOLUNTEER ROUTES */}
          <Route
            element={<ProtectedRoute allowedRoles={[UserRole.Volunteer]} />}
          >
            <Route path="volunteer" element={<VolunteerDashboard />} />
            <Route
              path="volunteer/opportunities"
              element={<VolunteerOpportunitiesPage />}
            />
            <Route
              path="volunteer/profile"
              element={<VolunteerProfilePage />}
            />
            <Route
              path="volunteer/history"
              element={<VolunteerHistoryPage />}
            />
            <Route
              path="volunteer/soft-skills-test"
              element={<SoftSkillsTestPage />}
            />
          </Route>

          {/* 🛡️ CHARITY ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.Charity]} />}>
            <Route path="charity" element={<CharityDashboard />} />
            <Route
              path="charity/post-opportunity"
              element={<PostOpportunityPage />}
            />
            <Route
              path="charity/my-opportunities"
              element={<MyOpportunitiesPage />}
            />
            <Route
              path="charity/applications"
              element={<CharityApplicationManagerPage />}
            />
            <Route
              path="charity/post-initiative"
              element={<PostInitiativePage />}
            />
            <Route path="charity/campaigns" element={<CampaignManagerPage />} />
            <Route
              path="charity/certificates"
              element={<CertificateSystemPage />}
            />
          </Route>

          {/* 🛡️ COMPANY ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.Company]} />}>
            <Route path="company" element={<CompanyDashboard />} />
            <Route path="company/post" element={<PostInternshipPage />} />
            <Route
              path="company/applications"
              element={<ApplicationManagerPage />}
            />
            <Route path="company/internships" element={<MyInternshipsPage />} />{" "}
            {/* NEW */}
            <Route
              path="company/supervisors"
              element={<SupervisorManagerPage />}
            />
          </Route>

          {/* 🛡️ DISABLED STUDENT ROUTES */}
          <Route
            element={
              <ProtectedRoute allowedRoles={[UserRole.DisabledStudent]} />
            }
          >
            <Route
              path="disabled-student"
              element={<DisabledStudentDashboard />}
            />
            <Route
              path="disabled-student/profile"
              element={<PODProfilePage />}
            />
            <Route
              path="disabled-student/publish-request"
              element={<PublishHelpRequestPage />}
            />
            <Route path="disabled-student/rating" element={<PODRatingPage />} />
          </Route>

          {/* 🛡️ UNIVERSITY ROUTES */}
          <Route
            element={<ProtectedRoute allowedRoles={[UserRole.University]} />}
          >
            <Route
              path="university"
              element={
                <Navigate to="/dashboard/university/dashboard" replace />
              }
            />
            <Route
              path="university/dashboard"
              element={<UniversityDashboardPage />}
            />
            <Route path="university/students" element={<StudentsPage />} />
            <Route path="university/approvals" element={<ApprovalsPage />} />
          </Route>
        </Route>

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <div className="container py-16 text-center text-xl font-bold">
              {t("nav.home")}
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
