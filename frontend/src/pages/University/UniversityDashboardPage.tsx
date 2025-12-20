// src/pages/University/UniversityDashboardPage.tsx
import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { StudentTable } from '@/components/university/StudentTable';
import { Leaderboard } from '@/components/dashboard/Leaderboard';

export const UniversityDashboardPage: React.FC = () => {
  // Mock data for university stats
  const universityStats = {
    studentsInTraining: 150,
    studentsWithoutTraining: 35,
    collaborativeCompanies: 12,
  };

  return (
    <div className="space-y-6 px-32">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          University Overview
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Monitor student internships, track progress, and manage approvals.
        </p>
      </header>

      <StatsCards
        items={[
          {
            label: 'Students in Training',
            value: universityStats.studentsInTraining,
            helper: 'Currently active',
          },
          {
            label: 'Students Seeking Training',
            value: universityStats.studentsWithoutTraining,
            helper: 'Looking for opportunities',
          },
          {
            label: 'Collaborative Companies',
            value: universityStats.collaborativeCompanies,
            helper: 'Top industry partners',
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <StudentTable />
        <div className="space-y-4">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};
