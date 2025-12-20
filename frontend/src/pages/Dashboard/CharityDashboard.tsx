import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { getCharityStats } from '@/services/charityService';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { ApplicationManager } from '@/components/charity/ApplicationManager';
import { ImpactDocumentation } from '@/components/charity/ImpactDocumentation';

export const CharityDashboard: React.FC = () => {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['charityStats'],
    queryFn: getCharityStats,
  });

  const statItems = stats
    ? [
        { label: 'Opportunities Posted', value: stats.opportunitiesPosted, helper: 'Active volunteer roles' },
        { label: 'Applications Received', value: stats.applicationsReceived, helper: 'From students & volunteers' },
        { label: 'Volunteers Accepted', value: stats.volunteersAccepted, helper: 'For all opportunities' },
        { label: 'Initiatives Launched', value: stats.initiativesLaunched, helper: 'Campaigns and drives' },
      ]
    : [];

  return (
    <div className="space-y-6 px-4">
      <header className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Charity Overview</h1>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Publish roles, track volunteers, and see your outreach impact across campuses.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/dashboard/charity/post-opportunity">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post Opportunity
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/charity/post-initiative">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post Initiative
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      {isLoading && <p>Loading stats...</p>}
      {isError && <p>Error fetching stats.</p>}
      {stats && <StatsCards items={statItems} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Volunteer Applications</h2>
          <ApplicationManager />
        </div>
        <div>
          <ImpactDocumentation />
        </div>
      </div>
    </div>
  );
};
