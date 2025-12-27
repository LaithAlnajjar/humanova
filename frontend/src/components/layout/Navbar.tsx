import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, LogOut } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/enums"; // Import Enum

const navLinkBase =
  "text-sm sm:text-base px-3 py-1 rounded-full transition-colors duration-300";
const navLinkActive =
  "bg-humanova-olive text-white dark:bg-humanova-gold dark:text-black";
const navLinkInactive =
  "text-gray-700 hover:bg-humanova-cream/60 dark:text-gray-200 dark:hover:bg-humanova-oliveDark/70";

// Helper to convert Numeric Role to URL String
const getDashboardSlug = (role: UserRole): string => {
  switch (role) {
    case UserRole.Student:
      return "student";
    case UserRole.Company:
      return "company";
    case UserRole.Volunteer:
      return "volunteer";
    case UserRole.Charity:
      return "charity";
    case UserRole.University:
      return "university";
    case UserRole.DisabledStudent:
      return "disabled-student";
    default:
      return "student"; // Fallback
  }
};

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const { isAuthenticated, user, logout } = useAuth();

  // FIX: Convert numeric enum to string path
  const dashboardPath =
    user && user.role !== undefined
      ? `/dashboard/${getDashboardSlug(user.role)}`
      : "/auth/login";

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-md dark:from-black/70 dark:to-black/30">
      <nav className="container flex items-center justify-between py-3 sm:py-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-3 py-1 glass-panel"
          aria-label={t("brand") as string}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-humanova-olive text-lg font-semibold text-white shadow-md dark:bg-humanova-gold dark:text-black">
            H
          </span>
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            {t("brand")}
          </span>
        </Link>

        {/* Nav links + actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-1 sm:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              to="/opportunities"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              {t("nav.opportunities")}
            </NavLink>
          </div>

          {/* Auth section */}
          <div className="hidden items-center gap-2 sm:flex">
            {isAuthenticated && user ? (
              <>
                <Link
                  to={dashboardPath}
                  className="flex h-8 w-8 items-center justify-center rounded-full glass-panel text-gray-800 hover:text-humanova-olive dark:text-gray-100 dark:hover:text-humanova-gold"
                  title="Go to dashboard"
                >
                  <User size={18} />
                </Link>
                <button
                  onClick={logout}
                  className="flex h-8 w-8 items-center justify-center rounded-full glass-panel text-gray-800 hover:text-red-600 dark:text-gray-100 dark:hover:text-red-500"
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-xs font-medium text-gray-800 hover:text-humanova-olive dark:text-gray-100 dark:hover:text-humanova-gold"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/auth/register"
                  className="rounded-full bg-humanova-olive px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-humanova-oliveDark dark:bg-humanova-gold dark:text-black dark:hover:bg-humanova-gold/90"
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
