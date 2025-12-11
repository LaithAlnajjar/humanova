import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOpportunities } from '@/services/opportunityService';
import { Opportunity } from '@/types/opportunity';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OpportunityModal } from '@/components/opportunities/OpportunityModal';

export const OpportunitiesPage: React.FC = () => {
  const { data: opportunities, isLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: fetchOpportunities
  });

  const [selected, setSelected] = useState<Opportunity | null>(null);

  return (
    <div className="container py-10">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          Opportunities
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Browse volunteering, internships, and accessibility support curated by Humanova.
        </p>
      </div>

      {isLoading ? (
        <p className="mt-4 text-xs text-gray-600 dark:text-gray-300">Loading…</p>
      ) : !opportunities || opportunities.length === 0 ? (
        <p className="mt-4 text-xs text-gray-600 dark:text-gray-300">
          No opportunities are available at the moment.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onOpen={() => setSelected(opp)}
              // Public view should not have actions
              showActions={false} 
            />
          ))}
        </div>
      )}

      <OpportunityModal opportunity={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
