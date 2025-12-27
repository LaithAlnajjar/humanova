import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

// Real Service & Types
import { opportunityService } from "@/services/opportunityService";
import { OpportunityResponse } from "@/types/api/opportunities";
import {
  VolunteerActivityType,
  VolunteeringType,
  VolunteerSkill,
} from "@/types/enums";

// Components
import { OpportunityCard } from "@/components/volunteer/OpportunityCard";
import { OpportunityModal } from "@/components/volunteer/OpportunityModal";

const OpportunitiesPage: React.FC = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(
    null
  );
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    hours: "",
    duration: "",
  });

  const { data: apiOpportunities = [], isLoading: loading } = useQuery({
    queryKey: ["published-opportunities"],
    queryFn: () => opportunityService.getAllPublished(),
  });

  // 2. Adapter: Map Backend DTO -> UI Format
  const mapApiToUi = (opp: OpportunityResponse) => ({
    id: opp.id.toString(), // FIXED: Convert number to string
    title: opp.title,
    organization: "Charity Organization",
    category: VolunteerActivityType[opp.activityType],
    location: opp.governorateOrCity,
    description: opp.description,
    duration: VolunteeringType[opp.volunteeringType],
    skills: opp.skills
      ? opp.skills.map((s) => {
          // Handle case where s.skill is the enum number
          return typeof s.skill === "number"
            ? VolunteerSkill[s.skill]
            : s.skill;
        })
      : [],
    isRemote: opp.placeType === 2,
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800",
    deadline: opp.applyDeadlineUtc,
    volunteersNeeded: opp.volunteersNeeded,
    type: "volunteering",
    timeCommitment: "Part Time",
  });

  const filteredOpportunities = apiOpportunities
    .map(mapApiToUi)
    .filter((opp) => {
      if (filters.category && opp.category !== filters.category) return false;
      if (
        filters.location &&
        !opp.location.toLowerCase().includes(filters.location.toLowerCase())
      )
        return false;
      if (filters.duration && opp.duration !== filters.duration) return false;
      return true;
    });

  const handleOpenModal = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
  };

  const handleCloseModal = () => {
    setSelectedOpportunity(null);
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-32 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Browse Volunteer Opportunities
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="glass-panel h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            ></div>
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredOpportunities.map((opp) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={opp.id}
              >
                <OpportunityCard
                  opportunity={opp}
                  onClick={() => handleOpenModal(opp)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filteredOpportunities.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">
            No opportunities found matching your criteria.
          </p>
          <button
            onClick={() =>
              setFilters({
                category: "",
                location: "",
                hours: "",
                duration: "",
              })
            }
            className="mt-2 text-primary-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedOpportunity && (
          <OpportunityModal
            isOpen={!!selectedOpportunity}
            onClose={handleCloseModal}
            opportunity={selectedOpportunity}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpportunitiesPage;
