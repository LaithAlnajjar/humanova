import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const UniversityDashboard: React.FC = () => {
  return (
    <>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          University Overview
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Monitor student engagement, accessibility requests, and partner network impact.
        </p>
      </header>
      <div className="space-y-5">
        <StatsCards
          items={[
            { label: 'Active students', value: 324, helper: 'Using Humanova' },
            { label: 'Accessibility cases', value: 28, helper: 'Open this semester' },
            { label: 'Partner organizations', value: 14, helper: 'Charities + companies' }
          ]}
        />

        <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
          <OpportunitiesRecommendations
            items={[
              {
                id: 'u1',
                title: 'On-campus volunteering fair',
                organization: 'Student affairs',
                type: 'volunteering',
                hours: 5
              },
              {
                id: 'u2',
                title: 'Co-op training placements',
                organization: 'Career center',
                type: 'internship',
                hours: 120
              }
            ]}
          />

          <ImpactSummary
            points={920}
            level="Campus hub"
            completed={12}
            upcoming={4}
          />
        </div>
      </div>
    </>
  );
};
