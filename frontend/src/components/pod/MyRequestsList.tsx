import React from "react";
import { useQuery } from "@tanstack/react-query";
import { podService } from "../../services/podService";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { AssistanceRequestStatus, AssistanceType } from "../../types/enums";

// Helper for labels
const getEnumLabel = (enumObj: any, value: number) => {
  return Object.keys(enumObj)
    .find((key) => enumObj[key] === value)
    ?.replace(/([A-Z])/g, " $1")
    .trim();
};

const getStatusColor = (status: AssistanceRequestStatus) => {
  switch (status) {
    case AssistanceRequestStatus.Matched:
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case AssistanceRequestStatus.Submitted:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case AssistanceRequestStatus.Draft:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    case AssistanceRequestStatus.Cancelled:
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

export const MyRequestsList = () => {
  const { data: requests, isLoading } = useQuery({
    queryKey: ["my-pod-requests"],
    queryFn: podService.getMyRequests,
  });

  if (isLoading)
    return (
      <div className="h-40 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
    );

  if (!requests || requests.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed border-2 bg-gray-50/50 dark:bg-gray-900/20">
        <p className="text-gray-500 mb-4">
          You haven't submitted any help requests yet.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Recent Requests
        </h3>
        <span className="text-xs text-gray-500">{requests.length} Total</span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(
                    req.status
                  )}`}
                >
                  {getEnumLabel(AssistanceRequestStatus, req.status)}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {/* FIX: Added safe navigation ?. and fallback || [] */}
                  {(req.assistanceTypes || [])
                    .map((t) => getEnumLabel(AssistanceType, t))
                    .join(", ") || "General Assistance"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />{" "}
                  {new Date(req.startDateUtc).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />{" "}
                  {new Date(req.startDateUtc).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {req.status === AssistanceRequestStatus.Matched ? (
              <Button
                size="sm"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400"
              >
                <CheckCircle size={14} className="mr-2" /> View Volunteer
              </Button>
            ) : (
              <span className="text-xs text-gray-400 italic">
                Waiting for match...
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
