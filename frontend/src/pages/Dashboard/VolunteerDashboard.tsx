import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const VolunteerDashboard: React.FC = () => {
  return (
    <>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Volunteer Overview
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          See your upcoming shifts, hours, and the students or charities you are currently supporting.
        </p>
      </header>
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
    </>
  );
};
