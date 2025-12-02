import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const StudentDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Student overview"
      subtitle="Track your volunteering hours, internships, and accessibility support in one place."
    >
      <div className="space-y-5">
        <StatsCards
          items={[
            { label: 'Total hours', value: 42, helper: 'Volunteering + training' },
            { label: 'Active opportunities', value: 3, helper: 'You can apply today' },
            { label: 'Impact score', value: 87, helper: 'Top 15% in your university' }
          ]}
        />

        <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
          <OpportunitiesRecommendations
            items={[
              {
                id: '1',
                title: 'On-campus accessibility buddy',
                organization: 'Humanova x HU',
                type: 'support',
                hours: 4
              },
              {
                id: '2',
                title: 'AI for social good hackathon',
                organization: 'Tech4Impact',
                type: 'internship',
                hours: 12
              },
              {
                id: '3',
                title: 'Community coding club mentor',
                organization: 'Local NGO',
                type: 'volunteering',
                hours: 6
              }
            ]}
          />

          <ImpactSummary
            points={320}
            level="Explorer"
            completed={5}
            upcoming={2}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
