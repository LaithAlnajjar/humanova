import React from 'react';
import { SkillsEditor } from '@/components/profile/SkillsEditor';
import { CertificatesList } from '@/components/profile/CertificatesList';
import { GamificationBadges } from '@/components/profile/GamificationBadges';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { useAuth } from '@/context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container grid gap-4 py-10 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-4 text-xs text-gray-800 dark:text-gray-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-humanova-olive text-sm font-semibold text-white dark:bg-humanova-gold dark:text-black">
            {user?.name?.charAt(0)?.toUpperCase() ?? 'H'}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              {user?.name ?? 'Humanova member'}
            </p>
            <p className="text-[11px] text-gray-600 dark:text-gray-300">
              {user?.email ?? 'your.email@example.com'}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Role: {user?.role ?? 'student'}
            </p>
          </div>
        </div>

        <SkillsEditor initialSkills={['Java', 'Spring Boot', 'Community work']} />
        <CertificatesList />
      </div>

      <div className="space-y-4">
        <ProgressRing progress={68} label="Profile completeness" />
        <GamificationBadges />
      </div>
    </div>
  );
};
