import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  LogOut,
  Home,
  Briefcase,
  User,
  ClipboardList,
  Users,
  UserPlus,
  Award,
  LayoutDashboard,
  CheckSquare,
  PlusSquare,
  Volume2,
  Star,
  HeartHandshake,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/enums"; // Changed to enums to handle numeric values

interface SidebarProps {
  role: UserRole; // Role is now a number (Enum)
}

const baseLink =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200";

const NavItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}> = ({ to, icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      clsx(
        baseLink,
        isActive
          ? "bg-humanova-olive text-white dark:bg-humanova-gold dark:text-black"
          : "text-gray-600 hover:bg-humanova-cream/60 dark:text-gray-300 dark:hover:bg-humanova-oliveDark/70"
      )
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

// --- Navigation Groups (Kept exactly as you had them) ---

const StudentNav = () => (
  <>
    <NavItem
      to="/dashboard/student"
      icon={<Home size={18} />}
      label="Overview"
      end
    />
    <NavItem
      to="/dashboard/student/opportunities"
      icon={<Briefcase size={18} />}
      label="Browse Internships"
    />
    <NavItem
      to="/dashboard/student/profile"
      icon={<User size={18} />}
      label="My Profile"
    />
    <NavItem
      to="/dashboard/student/tracking"
      icon={<ClipboardList size={18} />}
      label="Training Log"
    />
    <NavItem
      to="/dashboard/student/help-requests"
      icon={<HeartHandshake size={18} />}
      label="Help Requests"
    />
  </>
);

const CompanyNav = () => (
  <>
    <NavItem
      to="/dashboard/company"
      icon={<Home size={18} />}
      label="Overview"
      end
    />
    <NavItem
      to="/dashboard/company/post"
      icon={<Briefcase size={18} />}
      label="Post Internship"
    />
    <NavItem
      to="/dashboard/company/applications"
      icon={<Users size={18} />}
      label="Applications"
    />
    <NavItem
      to="/dashboard/company/supervisors"
      icon={<UserPlus size={18} />}
      label="Supervisors"
    />
  </>
);

const VolunteerNav = () => (
  <>
    <NavItem
      to="/dashboard/volunteer"
      icon={<Home size={18} />}
      label="Overview"
      end
    />
    <NavItem
      to="/dashboard/volunteer/opportunities"
      icon={<Briefcase size={18} />}
      label="Browse Opportunities"
    />
    <NavItem
      to="/dashboard/volunteer/profile"
      icon={<User size={18} />}
      label="My Profile"
    />
    <NavItem
      to="/dashboard/volunteer/history"
      icon={<ClipboardList size={18} />}
      label="Application History"
    />
    <NavItem
      to="/dashboard/volunteer/soft-skills-test"
      icon={<Award size={18} />}
      label="Soft Skills Test"
    />
  </>
);

const UniversityNav = () => (
  <>
    <NavItem
      to="/dashboard/university"
      icon={<LayoutDashboard size={18} />}
      label="Overview"
      end
    />
    <NavItem
      to="/dashboard/university/students"
      icon={<Users size={18} />}
      label="Students"
    />
    <NavItem
      to="/dashboard/university/approvals"
      icon={<CheckSquare size={18} />}
      label="Approvals"
    />
  </>
);

const CharityNav = () => (
  <>
    <NavItem
      to="/dashboard/charity"
      icon={<LayoutDashboard size={18} />}
      label="Overview"
      end
    />
    <NavItem
      to="/dashboard/charity/post-opportunity"
      icon={<Briefcase size={18} />}
      label="Post Opportunities"
    />
    <NavItem
      to="/dashboard/charity/applications"
      icon={<Users size={18} />}
      label="Application Management"
    />
    <NavItem
      to="/dashboard/charity/campaigns"
      icon={<Volume2 size={18} />}
      label="Campaign Management"
    />
    <NavItem
      to="/dashboard/charity/certificates"
      icon={<Award size={18} />}
      label="Certificate System"
    />
  </>
);

const DisabledStudentNav = () => (
  <>
    <NavItem
      to="/dashboard/disabled-student"
      icon={<Home size={18} />}
      label="Overview"
      end
    />
    <NavItem
      to="/dashboard/disabled-student/profile"
      icon={<User size={18} />}
      label="My Profile"
    />
    <NavItem
      to="/dashboard/disabled-student/publish-request"
      icon={<PlusSquare size={18} />}
      label="Publish Help Request"
    />
    <NavItem
      to="/dashboard/disabled-student/rating"
      icon={<Star size={18} />}
      label="Rate Assistance"
    />
  </>
);

// Fallback for unknown roles
const DefaultNav: React.FC = () => (
  <>
    <NavItem to="/dashboard" icon={<Home size={18} />} label="Overview" end />
  </>
);

// --- Helper to convert Enum ID to Readable String (Fixes the .replace error) ---
const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case UserRole.Student:
      return "Student";
    case UserRole.Company:
      return "Company";
    case UserRole.Volunteer:
      return "Volunteer";
    case UserRole.Charity:
      return "Charity";
    case UserRole.University:
      return "University";
    case UserRole.DisabledStudent:
      return "Student (Disabled)";
    default:
      return "User";
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const { logout, user } = useAuth();

  // Updated Switch to check against Enum Numbers
  const renderNav = () => {
    switch (role) {
      case UserRole.Student:
        return <StudentNav />;
      case UserRole.Company:
        return <CompanyNav />;
      case UserRole.Volunteer:
        return <VolunteerNav />;
      case UserRole.University:
        return <UniversityNav />;
      case UserRole.Charity:
        return <CharityNav />;
      case UserRole.DisabledStudent:
        return <DisabledStudentNav />;
      default:
        return <DefaultNav />;
    }
  };

  return (
    <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 md:flex">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-humanova-olive dark:text-humanova-gold">
          {user?.name || "User"}
        </p>
        <p className="text-xs capitalize text-gray-500 dark:text-gray-400">
          {/* FIX: Use helper function instead of .replace() */}
          {getRoleLabel(role)}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">{renderNav()}</nav>

      {/* Footer */}
      <div className="mt-6">
        <button
          onClick={logout}
          className={clsx(
            baseLink,
            "w-full text-gray-600 hover:bg-red-100/60 dark:text-gray-300 dark:hover:bg-red-900/40"
          )}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
