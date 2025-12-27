import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  CheckSquare,
  PlusCircle,
  ArrowRight,
  List,
} from "lucide-react";

import { getCompanyStats } from "../../services/companyService";
import { StatsCards } from "../../components/dashboard/StatsCards";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const CompanyDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["companyStats"],
    queryFn: getCompanyStats,
  });

  const statItems = [
    {
      label: "Finished Internships",
      value: stats?.finishedInternships ?? 0,
      helper: "Completed programs",
    },
    {
      label: "Active Internships",
      value: stats?.currentInternships ?? 0,
      helper: "Currently running",
    },
    {
      label: "Pending Applications",
      value: stats?.pendingApplications ?? 0,
      helper: "Awaiting review",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Company Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground text-gray-500 dark:text-gray-400">
            Manage your internship programs and recruit top talent.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="shadow-lg bg-primary-600 hover:bg-primary-700 hover:scale-[1.02] transition-transform"
          >
            <Link to="/dashboard/company/post">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Internship
            </Link>
          </Button>
        </div>
      </header>

      {/* 2. Stats Section */}
      <section>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <StatsCards items={statItems} />
        )}
      </section>

      {/* 3. Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A: Manage Internships */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full p-6 flex flex-col justify-between hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-black/40 backdrop-blur-sm">
            <div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <List size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Manage Internships
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                View your active posts, edit drafts, and track the status of
                your published opportunities.
              </p>
            </div>
            <Link to="/dashboard/company/internships">
              <Button
                variant="outline"
                className="w-full justify-between group"
              >
                Go to My Internships
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Card B: Application Manager */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full p-6 flex flex-col justify-between hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-black/40 backdrop-blur-sm">
            <div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Review Applications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Screen candidates, review CVs, and manage the hiring pipeline
                for your open roles.
              </p>
            </div>
            <Link to="/dashboard/company/applications">
              <Button
                variant="outline"
                className="w-full justify-between group"
              >
                View Applicants
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
