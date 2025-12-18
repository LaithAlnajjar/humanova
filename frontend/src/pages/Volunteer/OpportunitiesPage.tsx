import React, { useState, useEffect } from 'react';
import { VolunteerOpportunity } from '@/types/volunteer';
import { getOpportunities } from '@/services/volunteerService';
import { OpportunityCard } from '@/components/volunteer/OpportunityCard';
import OpportunityFilters from '@/components/volunteer/OpportunityFilters';
import { OpportunityModal } from '@/components/opportunities/OpportunityModal';
import { AnimatePresence, motion } from 'framer-motion';

const OpportunitiesPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    hours: '',
    duration: '',
  });

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      const data = await getOpportunities();
      setOpportunities(data);
      setFilteredOpportunities(data);
      setLoading(false);
    };
    fetchOpportunities();
  }, []);

  const handleFilter = () => {
    let result = opportunities;
    if (filters.category) {
      result = result.filter(o => o.category === filters.category);
    }
    if (filters.location) {
      result = result.filter(o => o.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.hours) {
      result = result.filter(o => o.hours <= parseInt(filters.hours, 10));
    }
    if (filters.duration) {
      result = result.filter(o => o.duration === filters.duration);
    }
    setFilteredOpportunities(result);
  };

  const handleOpenModal = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const handleCloseModal = () => {
    setSelectedOpportunity(null);
  };

  return (
    <div className="space-y-6 px-32">
      <h1 className="text-2xl font-semibold">Browse Volunteer Opportunities</h1>
      <OpportunityFilters filters={filters} onFilterChange={setFilters} onFilter={handleFilter} />
      
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-panel h-60 animate-pulse rounded-2xl p-4"></div>
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredOpportunities.map(opp => (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={opp.id}>
                <OpportunityCard
                  opportunity={opp}
                  onDetailsClick={() => handleOpenModal(opp)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filteredOpportunities.length === 0 && !loading && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No opportunities found matching your criteria.</p>
        </div>
      )}

      <AnimatePresence>
        {selectedOpportunity && (
          <OpportunityModal
            isOpen={!!selectedOpportunity}
            onClose={handleCloseModal}
            opportunity={{
              ...selectedOpportunity,
              organization: selectedOpportunity.entity,
              type: 'volunteering',
              isRemote: false,
              skills: [],
              timeCommitment: selectedOpportunity.duration,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpportunitiesPage;