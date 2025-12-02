import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { UserRole } from '@/types/auth';

interface SidebarProps {
  role: UserRole;
}

const baseLink =
  'flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-200';

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  return (
    <aside className="hidden w-56 flex-col border-r border-white/10 bg-white/60 p-3 text-xs text-gray-800 backdrop-blur-md dark:bg-black/50 dark:text-gray-100 md:flex">
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Dashboard
        </p>
        <p className="text-sm font-semibold text-humanova-olive dark:text-humanova-gold">
          {role === 'disabled_student'
            ? 'Accessibility'
            : role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      </div>

      <nav className="space-y-1">
        <NavLink
          to={`/dashboard/${role}`}
          end
          className={({ isActive }) =>
            clsx(
              baseLink,
              isActive
                ? 'bg-humanova-olive text-white dark:bg-humanova-gold dark:text-black'
                : 'text-gray-700 hover:bg-humanova-cream/60 dark:text-gray-200 dark:hover:bg-humanova-oliveDark/70'
            )
          }
        >
          <span>Overview</span>
        </NavLink>

        <NavLink
          to={`/dashboard/${role}/opportunities`}
          className={({ isActive }) =>
            clsx(
              baseLink,
              isActive
                ? 'bg-humanova-olive text-white dark:bg-humanova-gold dark:text-black'
                : 'text-gray-700 hover:bg-humanova-cream/60 dark:text-gray-200 dark:hover:bg-humanova-oliveDark/70'
            )
          }
        >
          <span>Opportunities</span>
        </NavLink>

        <NavLink
          to={`/dashboard/${role}/activity`}
          className={({ isActive }) =>
            clsx(
              baseLink,
              isActive
                ? 'bg-humanova-olive text-white dark:bg-humanova-gold dark:text-black'
                : 'text-gray-700 hover:bg-humanova-cream/60 dark:text-gray-200 dark:hover:bg-humanova-oliveDark/70'
            )
          }
        >
          <span>Activity & impact</span>
        </NavLink>
      </nav>
    </aside>
  );
};
