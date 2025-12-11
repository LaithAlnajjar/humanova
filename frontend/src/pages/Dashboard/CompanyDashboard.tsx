import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const CompanyDashboard: React.FC = () => {
  return (
    <>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Company Overview
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Manage internships, training programs, and track applicants from partner universities.
        </p>
      </header>
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
    </>
  );
};
