import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PlusCircle, ArrowRight } from "lucide-react";

import { StatsCards } from "@/components/dashboard/StatsCards";
import { getCharityStats } from "@/services/charityService";
import { Button } from "@/components/ui/Button";
import { ApplicationManager } from "@/components/charity/ApplicationManager";
import { ImpactDocumentation } from "@/components/charity/ImpactDocumentation";

export const CharityDashboard: React.FC = () => {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["charityStats"],
    queryFn: getCharityStats,
  });

  const statItems = stats
    ? [
        {
          label: "Opportunities Posted",
          value: stats.opportunitiesPosted,
          helper: "Active volunteer roles",
        },
        {
          label: "Applications Received",
          value: stats.applicationsReceived,
          helper: "From students & volunteers",
        },
        {
          label: "Volunteers Accepted",
          value: stats.volunteersAccepted,
          helper: "For all opportunities",
        },
        {
          label: "Initiatives Launched",
          value: stats.initiativesLaunched,
          helper: "Campaigns and drives",
        },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 py-8 space-y-8"
    >
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Charity Overview
          </h1>
          <p className="mt-1 text-muted-foreground text-gray-500 dark:text-gray-400">
            Track your impact, manage volunteers, and publish new initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="shadow-sm">
            <Link to="/dashboard/charity/post-initiative">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post Initiative
            </Link>
          </Button>
          <Button
            asChild
            className="shadow-md bg-primary-600 hover:bg-primary-700"
          >
            <Link to="/dashboard/charity/post-opportunity">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post Opportunity
            </Link>
          </Button>
        </div>
      </header>

      {/* 2. Stats Row */}
      <section>
        {isLoading && (
          <div className="h-32 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
        )}
        {isError && <p className="text-red-500">Unable to load statistics.</p>}
        {stats && <StatsCards items={statItems} />}
      </section>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Left Column: Applications (Takes 2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Applications
            </h2>
            <Link
              to="/dashboard/charity/applications"
              className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/50 p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm">
            <ApplicationManager />
          </div>
        </div>

        {/* Right Column: Impact / Docs (Takes 1/3 width) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Impact & Documentation
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/50 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm h-full">
            <ImpactDocumentation />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
