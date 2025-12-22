import React from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Search,
  User,
  FileText,
  Award,
  QrCode,
  Rss,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

const ActionCard: React.FC<{
  title: string;
  description: string;
  to: string;
  icon: React.ReactNode;
}> = ({ title, description, to, icon }) => (
  <Link
    to={to}
    className="block hover:-translate-y-1 transition-transform duration-300"
  >
    <Card className="p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <ArrowRight className="text-gray-400" />
    </Card>
  </Link>
);

export const VolunteerDashboard: React.FC = () => {
  // Mock data for volunteer stats
  const volunteerStats = {
    totalHours: 120,
    completedOpportunities: 5,
    generalRating: 4.8,
  };

  return (
    <div className="space-y-8 px-32">
      <header>
        <h1 className="text-2xl font-semibold">Volunteer Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your hub for making a difference.
        </p>
      </header>

      <StatsCards
        items={[
          {
            label: "Total Hours",
            value: volunteerStats.totalHours,
            helper: "All time",
          },
          {
            label: "Completed Tasks",
            value: volunteerStats.completedOpportunities,
            helper: "Valuable contributions",
          },
          {
            label: "General Rating",
            value: volunteerStats.generalRating,
            helper: "From your peers",
          },
        ]}
      />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-gray-500" />
            <div>
              <h3 className="font-semibold">Application Accepted!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your application for "Beach Cleanup" has been accepted.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-gray-500" />
            <div>
              <h3 className="font-semibold">New Opportunity</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                "Red Crescent" has posted a new opportunity: "Food Drive".
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                1 day ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-gray-500" />
            <div>
              <h3 className="font-semibold">Rating Received</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You received a 5-star rating for "Elderly Care Assistant".
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                3 days ago
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
