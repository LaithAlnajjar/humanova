// src/pages/Dashboard/CompanyDashboard.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCompanyStats } from "../../services/companyService";
import { StatsCards } from "../../components/dashboard/StatsCards";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Briefcase, Users, UserPlus, CheckSquare } from "lucide-react";

const CompanyDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["companyStats"],
    queryFn: getCompanyStats,
  });

  const summaryStats = [
    {
      title: "Finished Internships",
      value: stats?.finishedInternships ?? 0,
      icon: <CheckSquare />,
    },
    {
      title: "Current Internships",
      value: stats?.currentInternships ?? 0,
      icon: <Briefcase />,
    },
    {
      title: "Pending Applications",
      value: stats?.pendingApplications ?? 0,
      icon: <Users />,
    },
  ];

  return (
    <div className="space-y-6 px-4 md:px-32 py-6">
      <h1 className="text-2xl font-semibold">Company Dashboard</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="h-24 animate-pulse"></Card>
          <Card className="h-24 animate-pulse"></Card>
          <Card className="h-24 animate-pulse"></Card>
        </div>
      ) : (
        <StatsCards
          items={[
            {
              label: "Finished Internships",
              value: stats?.finishedInternships ?? 0,
              helper: "Completed programs",
            },
            {
              label: "Current Internships",
              value: stats?.currentInternships ?? 0,
              helper: "Ongoing programs",
            },
            {
              label: "Pending Applications",
              value: stats?.pendingApplications ?? 0,
              helper: "Awaiting review",
            },
          ]}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-lg">In-App Chat (Mock)</h3>
            <p className="text-sm text-gray-400 mt-2">
              Contact students and supervisors directly.
            </p>
            <Button className="mt-4" variant="ghost">
              Open Messenger
            </Button>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-lg">Rate a Student (Mock)</h3>
            <p className="text-sm text-gray-400 mt-2">
              Provide feedback for completed internships.
            </p>
            <Button className="mt-4" variant="ghost">
              Evaluate
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
