import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentProfile } from "@/services/studentService";
import { InfoSection } from "./InfoSection";
import { SkillsMatrix } from "./SkillsMatrix";
import { PortfolioSection } from "./PortfolioSection";
import { InternshipHistory } from "./InternshipHistory";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { GamificationBadges } from "./GamificationBadges";

export const StudentProfileView: React.FC = () => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: getStudentProfile,
  });

  if (isLoading) {
    return <div className="space-y-6">Loading student profile...</div>;
  }

  if (error || !profile) {
    return (
      <div className="space-y-6 text-red-500">Failed to load profile.</div>
    );
  }

  return (
    <div className="space-y-6 px-32">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:col-span-2">
          <InfoSection profile={profile} />
          <SkillsMatrix
            softSkills={profile.softSkills}
            technicalSkills={profile.technicalSkills}
          />
          <PortfolioSection portfolio={profile.portfolio} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <ProgressRing progress={75} label="Profile Completeness" />
          <GamificationBadges />
        </div>
      </div>

      {/* Full-width bottom section */}
      <InternshipHistory internships={profile.internshipHistory} />
    </div>
  );
};
