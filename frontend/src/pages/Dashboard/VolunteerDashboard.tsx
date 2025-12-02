import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const VolunteerDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Volunteer overview"
      subtitle="See your upcoming shifts, hours, and the students or charities you are currently supporting."
    >
      <div className="space-y-5">
        <StatsCards
          items={[
            { label: 'Confirmed shifts', value: 4, helper: 'This week' },
            { label: 'Lifetime hours', value: 128, helper: 'Across all causes' },
            { label: 'Students supported', value: 9, helper: 'Last 6 months' }
          ]}
        />

        <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
          <OpportunitiesRecommendations
            items={[
              {
                id: 'v1',
                title: 'Exam support sessions',
                organization: 'HU Accessibility Center',
                type: 'support',
                hours: 3
              },
              {
                id: 'v2',
                title: 'Sign language buddy program',
                organization: 'Humanova Community',
                type: 'volunteering',
                hours: 5
              }
            ]}
          />

          <ImpactSummary
            points={540}
            level="Community builder"
            completed={8}
            upcoming={4}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
