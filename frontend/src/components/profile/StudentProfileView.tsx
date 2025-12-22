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
    return (
      <div className="space-y-6 px-32 animate-pulse">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column */}
          <div className="flex flex-col gap-6 md:col-span-2">
            {/* InfoSection Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
              <div className="h-8 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 mt-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/3 mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            {/* SkillsMatrix Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
              <div className="h-6 w-1/3 mb-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
            {/* PortfolioSection Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
              <div className="h-6 w-1/4 mb-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* ProgressRing Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center h-48">
              <div className="h-32 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
            {/* GamificationBadges Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
              <div className="h-6 w-1/2 mb-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="flex gap-4">
                <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width bottom section */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
          <div className="h-6 w-1/5 mb-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
        </div>
      </div>
    );
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
