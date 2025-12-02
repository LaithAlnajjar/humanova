import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const CompanyDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Company overview"
      subtitle="Manage internships, training programs, and track applicants from partner universities."
    >
      <div className="space-y-5">
        <StatsCards
          items={[
            { label: 'Open internships', value: 4, helper: 'Tech + operations' },
            { label: 'Applicants this week', value: 23, helper: 'Across all roles' },
            { label: 'Partner universities', value: 6, helper: 'Active pipelines' }
          ]}
        />

        <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
          <OpportunitiesRecommendations
            items={[
              {
                id: 'co1',
                title: 'Backend Java intern',
                organization: 'Your company',
                type: 'internship',
                hours: 80
              },
              {
                id: 'co2',
                title: 'CSR volunteering day',
                organization: 'Your company',
                type: 'volunteering',
                hours: 8
              }
            ]}
          />

          <ImpactSummary
            points={760}
            level="Talent partner"
            completed={9}
            upcoming={2}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
