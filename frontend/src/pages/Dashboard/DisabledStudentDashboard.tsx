import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const DisabledStudentDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Accessibility overview"
      subtitle="See your support requests, assigned helpers, and tailored opportunities."
    >
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
    </DashboardLayout>
  );
};
