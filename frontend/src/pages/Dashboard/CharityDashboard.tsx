import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OpportunitiesRecommendations } from '@/components/dashboard/OpportunitiesRecommendations';
import { ImpactSummary } from '@/components/dashboard/ImpactSummary';

export const CharityDashboard: React.FC = () => {
  return (
    <>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Charity Overview
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Publish roles, track volunteers, and see your outreach impact across campuses.
        </p>
      </header>
      <div className="space-y-5">
        <StatsCards
          items={[
            { label: 'Active positions', value: 5, helper: 'Visible to students' },
            { label: 'Registered volunteers', value: 47, helper: 'Across all programs' },
            { label: 'Events this month', value: 3, helper: 'On & off campus' }
          ]}
        />

        <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
          <OpportunitiesRecommendations
            items={[
              {
                id: 'c1',
                title: 'Fundraising outreach team',
                organization: 'Your charity',
                type: 'volunteering',
                hours: 10
              },
              {
                id: 'c2',
                title: 'Social media storyteller',
                organization: 'Your charity',
                type: 'internship',
                hours: 6
              }
            ]}
          />

        <ImpactSummary
            points={410}
            level="Trusted partner"
            completed={6}
            upcoming={3}
          />
        </div>
      </div>
    </>
  );
};
