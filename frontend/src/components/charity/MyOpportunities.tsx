import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../components/layout/DashboardLayout"; // Or just use the wrapper in App.tsx
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { opportunityService } from "../../services/opportunityService";
import { OpportunityStatus } from "../../types/enums";

const getStatusColor = (status: OpportunityStatus) => {
  switch (status) {
    case OpportunityStatus.Published:
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
    case OpportunityStatus.Draft:
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    case OpportunityStatus.Closed:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusLabel = (status: OpportunityStatus) => {
  return OpportunityStatus[status];
};

export const MyOpportunitiesPage: React.FC = () => {
  const {
    data: opportunities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-opportunities"],
    queryFn: () => opportunityService.getMyOpportunities(),
  });

  if (isLoading)
    return <div className="p-8 text-center">Loading your opportunities...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading opportunities.
      </div>
    );

  return (
    <div className="space-y-6 px-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Opportunities
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your posted volunteering events
          </p>
        </div>
        <Link to="/dashboard/charity/post-opportunity">
          <Button>+ Post New Opportunity</Button>
        </Link>
      </div>

      {opportunities?.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-3xl">
            📭
          </div>
          <h3 className="text-lg font-medium">No opportunities yet</h3>
          <p className="text-gray-500">
            Create your first volunteering opportunity to start recruiting.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {opportunities?.map((opp) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className="p-5 hover:shadow-md transition-all border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">
                        {opp.title}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          opp.status
                        )}`}
                      >
                        {getStatusLabel(opp.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      Needed: {opp.volunteersNeeded} Volunteers • Accepted:{" "}
                      {opp.acceptedCount}
                    </p>
                    <div className="text-xs text-gray-400 pt-1">
                      Deadline:{" "}
                      {new Date(opp.applyDeadlineUtc).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    {opp.status === OpportunityStatus.Draft && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-primary-600 border-primary-200"
                      >
                        Publish
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOpportunitiesPage;
