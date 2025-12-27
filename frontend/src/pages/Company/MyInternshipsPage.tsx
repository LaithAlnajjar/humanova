import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { internshipService } from "../../services/internshipService";
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

const MyInternshipsPage: React.FC = () => {
  const {
    data: internships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-internships"],
    queryFn: () => internshipService.getMyInternships(),
  });

  if (isLoading)
    return (
      <div className="p-8 text-center animate-pulse">
        Loading your internships...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading internships.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Internships
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your active and draft roles
          </p>
        </div>
        <Link to="/dashboard/company/post">
          <Button className="shadow-lg hover:scale-105 transition-transform">
            + Post New Internship
          </Button>
        </Link>
      </div>

      {!internships || internships.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4 border-dashed border-2">
          <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-3xl">
            💼
          </div>
          <h3 className="text-lg font-medium">No internships posted yet</h3>
          <p className="text-gray-500 max-w-md">
            Start recruiting talent by posting your first internship
            opportunity.
          </p>
          <Link to="/dashboard/company/post">
            <Button variant="outline">Create Draft</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {internships.map((opp) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className="p-5 hover:shadow-md transition-all border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-1 flex-grow">
                    <div className="flex items-center gap-3 flex-wrap">
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
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>Seats: {opp.seatsAvailable}</span>
                      <span>•</span>
                      <span>Applicants: {opp.acceptedCount}</span>{" "}
                      {/* Note: Backend sends 'AcceptedCount', might need 'ApplicantsCount' later */}
                      <span>•</span>
                      <span>
                        Deadline:{" "}
                        {new Date(opp.deadlineUtc).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      Edit
                    </Button>
                    {opp.status === OpportunityStatus.Draft && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-primary-600 border-primary-200 flex-1 sm:flex-none"
                      >
                        Publish
                      </Button>
                    )}
                    <Link to="/dashboard/company/applications">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                      >
                        View Applicants
                      </Button>
                    </Link>
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

export default MyInternshipsPage;
