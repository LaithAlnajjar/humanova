import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOpportunities } from '@/services/opportunityService';
import { Opportunity } from '@/types/opportunity';
import {
  OpportunityFilters,
  OpportunityFilterState
} from '@/components/opportunities/OpportunityFilters';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OpportunityModal } from '@/components/opportunities/OpportunityModal';

export const StudentOpportunitiesPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: fetchOpportunities
  });

  const [filters, setFilters] = useState<OpportunityFilterState>({
    type: 'all',
    location: '',
    search: '',
    major: 'all',
    internshipTypes: [],
  });

  const [selected, setSelected] = useState<Opportunity | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((opp) => {
      // Category filter
      if (filters.type !== 'all' && opp.type !== filters.type) return false;
      
      // Location filter
      if (
        filters.location &&
        !opp.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      
      // Search filter
      if (filters.search) {
        const haystack = `${opp.title} ${opp.organization} ${opp.skills.join(
          ' '
        )}`.toLowerCase();
        if (!haystack.includes(filters.search.toLowerCase())) return false;
      }

      // Major filter (assuming opp has a 'major' property or similar)
      if (filters.major !== 'all' && opp.major !== filters.major) {
        return false;
      }

      // Internship type filter
      if (
        opp.type === 'internship' &&
        filters.internshipTypes.length > 0 &&
        !filters.internshipTypes.includes(opp.internshipType)
      ) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  return (
    <div className="container py-10">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          Browse Internships
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Filter internships curated by Humanova.
        </p>
      </div>

      <OpportunityFilters value={filters} onChange={setFilters} />

      {isLoading ? (
        <p className="mt-4 text-xs text-gray-600 dark:text-gray-300">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-4 text-xs text-gray-600 dark:text-gray-300">
          No opportunities match your filters yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onOpen={() => setSelected(opp)}
            />
          ))}
        </div>
      )}

      <OpportunityModal opportunity={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
