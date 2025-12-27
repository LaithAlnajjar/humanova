import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import { internshipService } from "@/services/internshipService";
import { InternshipListResponse } from "@/types/api/internships";
import { AttendanceType } from "@/types/enums";

// Components
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import InternshipFilters from "@/components/student/InternshipFilters";
import { OpportunityModal } from "@/components/opportunities/OpportunityModal";

const StudentOpportunitiesPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    major: "",
    attendanceType: "",
    isPaid: "",
  });

  // 1. Fetch List
  const { data: internships = [], isLoading: listLoading } = useQuery({
    queryKey: ["student-internships", filters],
    queryFn: () => internshipService.getAllPublished(filters),
  });

  // 2. Fetch Details
  const { data: fullOpportunity, isLoading: detailsLoading } = useQuery({
    queryKey: ["internship-detail", selectedId],
    queryFn: () => internshipService.getById(selectedId!),
    enabled: !!selectedId,
  });

  // 3. List Adapter
  const mapListToUi = (opp: InternshipListResponse) => ({
    id: opp.id.toString(),
    title: opp.title,
    organization: "Partner Company",
    location: AttendanceType[opp.attendanceType],
    description: `Major Required: ${opp.requiredMajor}. ${
      opp.isPaid ? "Paid Internship" : "Unpaid Internship"
    }.`,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    deadline: opp.deadlineUtc,
    volunteersNeeded: opp.seatsAvailable,
    timeCommitment: opp.isPaid ? "Paid" : "Unpaid",
    type: "internship", // Correctly set for the Card
  });

  // 4. Detail Adapter (FIXED)
  const mapDetailToModal = (detail: any) => {
    if (!detail) return null;
    return {
      id: detail.id.toString(),
      title: detail.title,
      organization: "Partner Company",
      location: AttendanceType[detail.attendanceType],
      description: detail.description,
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
      timeCommitment: detail.isPaid ? "Paid" : "Unpaid",
      volunteersNeeded: detail.seatsAvailable,
      deadline: detail.deadlineUtc,
      skills: [
        ...(detail.generalSkills || []),
        ...(detail.technicalSkills || []),
      ],
      isRemote: detail.attendanceType === AttendanceType.Remote,
      // FIXED: Explicitly set type so Modal knows it's an internship
      type: "internship",
    };
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-32 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Find Internships
        </h1>
      </div>

      <InternshipFilters filters={filters} onFilterChange={setFilters} />

      {listLoading ? (
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
            {internships.map((opp) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={opp.id}
              >
                <OpportunityCard
                  opportunity={mapListToUi(opp)}
                  onClick={() => setSelectedId(opp.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {internships.length === 0 && !listLoading && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No internships found.</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && fullOpportunity && (
          <OpportunityModal
            isOpen={!!selectedId}
            onClose={() => setSelectedId(null)}
            opportunity={mapDetailToModal(fullOpportunity)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentOpportunitiesPage;
