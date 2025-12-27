import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { MyRequestsList } from "@/components/pod/MyRequestsList";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  HandHelping,
  CalendarCheck,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { podService } from "@/services/podService";
import { AssistanceRequestStatus } from "@/types/enums";

export const DisabledStudentDashboard: React.FC = () => {
  // Fetch real request data for stats
  const { data: requests } = useQuery({
    queryKey: ["my-pod-requests"],
    queryFn: podService.getMyRequests,
  });

  // Calculate real stats
  const activeRequests =
    requests?.filter(
      (r) =>
        r.status === AssistanceRequestStatus.Submitted ||
        r.status === AssistanceRequestStatus.Matched
    ).length || 0;
  const completed =
    requests?.filter((r) => r.status === AssistanceRequestStatus.Completed)
      .length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your support requests and upcoming sessions.
          </p>
        </div>
        <Link to="/dashboard/pod/request">
          <Button className="shadow-lg bg-humanova-olive hover:bg-humanova-oliveDark text-white">
            <Plus size={18} className="mr-2" /> New Request
          </Button>
        </Link>
      </header>

      {/* Stats Row */}
      <StatsCards
        items={[
          {
            label: "Active Requests",
            value: activeRequests,
            helper: "Looking for volunteers",
            // We can pass an icon if StatsCards supports it, or it defaults
          },
          {
            label: "Confirmed Sessions",
            value:
              requests?.filter(
                (r) => r.status === AssistanceRequestStatus.Matched
              ).length || 0,
            helper: "Volunteers assigned",
          },
          {
            label: "Completed Help",
            value: completed,
            helper: "Total sessions finished",
          },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: Active Requests List */}
        <div className="lg:col-span-2 space-y-6">
          <MyRequestsList />
        </div>

        {/* Side Column: Actions & Info */}
        <div className="space-y-6">
          {/* Quick Action Card */}
          <motion.div whileHover={{ y: -4 }}>
            <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <HandHelping size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Need Assistance?</h3>
                <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                  Whether it's note-taking, campus navigation, or exam support,
                  our volunteers are here to help.
                </p>
                <Link to="/dashboard/pod/request">
                  <Button
                    variant="outline"
                    className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-none"
                  >
                    Request Now <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Session (Mocked Example for Presentation) */}
          <Card className="p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CalendarCheck size={18} className="text-green-500" />
              Next Session
            </h3>

            {/* Conditional: If no matched requests, show empty state */}
            {(requests?.filter(
              (r) => r.status === AssistanceRequestStatus.Matched
            ).length || 0) > 0 ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase">
                    Note Taking
                  </span>
                  <span className="text-xs bg-white dark:bg-black/20 px-2 py-1 rounded text-green-800 dark:text-green-300">
                    Tomorrow
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Computer Science 101
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <Clock size={14} /> 10:00 AM - 12:00 PM
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <ShieldCheck size={14} /> Volunteer: <strong>Sarah M.</strong>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <Clock size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No upcoming sessions confirmed yet.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
