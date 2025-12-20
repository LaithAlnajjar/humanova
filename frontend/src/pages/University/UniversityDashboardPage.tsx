// src/pages/University/UniversityDashboard.tsx
import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';

export const UniversityDashboardPage: React.FC = () => {
  // Mock data for university stats
  const universityStats = {
    studentsInTraining: 150,
    studentsWithoutTraining: 35,
    collaborativeCompanies: 12,
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">University Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Monitor student internships and progress.</p>
      </header>

      <StatsCards
        items={[
          { label: 'Students in Training', value: universityStats.studentsInTraining, helper: 'Currently active' },
          { label: 'Students Seeking Training', value: universityStats.studentsWithoutTraining, helper: 'Looking for opportunities' },
          { label: 'Collaborative Companies', value: universityStats.collaborativeCompanies, helper: 'Top industry partners' },
        ]}
      />
    </div>
  );
};
