import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const DisabledStudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6 px-32">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Accessibility Overview
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          See your support requests, assigned helpers, and tailored opportunities.
        </p>
      </header>
      <div className="space-y-5">
        <StatsCards
          items={[
            { label: 'Active support requests', value: 2, helper: 'In progress' },
            { label: 'Assigned helpers', value: 3, helper: 'This semester' },
            { label: 'Completed sessions', value: 11, helper: 'Across all courses' }
          ]}
        />

        <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
          <OpportunitiesRecommendations
            items={[
              {
                id: 'd1',
                title: 'Note-taking support',
                organization: 'Accessibility Center',
                type: 'support',
                hours: 2
              },
              {
                id: 'd2',
                title: 'Remote tutoring sessions',
                organization: 'Humanova mentors',
                type: 'support',
                hours: 3
              }
            ]}
          />

          <ImpactSummary
            points={380}
            level="Empowered learner"
            completed={7}
            upcoming={2}
          />
        </div>
      </div>
    </div>
  );
};
