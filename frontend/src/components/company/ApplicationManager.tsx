import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApplicants,
  updateApplicationStatus,
} from "../../services/companyService";
import { Applicant, ApplicationStatus } from "../../types/company";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  Calendar,
} from "lucide-react";

const ApplicationManager = () => {
  const queryClient = useQueryClient();
  const { data: applicants, isLoading } = useQuery({
    queryKey: ["applicants"],
    queryFn: getApplicants,
  });

  const mutation = useMutation({
    mutationFn: ({
      applicantId,
      status,
    }: {
      applicantId: string;
      status: ApplicationStatus;
    }) => updateApplicationStatus(applicantId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["companyStats"] });
    },
  });

  const handleUpdateStatus = (
    applicantId: string,
    status: ApplicationStatus
  ) => {
    mutation.mutate({ applicantId, status });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center gap-1 w-fit">
            <CheckCircle size={12} /> Accepted
          </span>
        );
      case "Rejected":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center gap-1 w-fit">
            <XCircle size={12} /> Rejected
          </span>
        );
      case "Interview":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800 flex items-center gap-1 w-fit">
            <Calendar size={12} /> Interview
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 flex items-center gap-1 w-fit">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-center animate-pulse">Loading applicants...</div>
    );

  return (
    <Card className="space-y-6 mx-32 py-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Internship Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {applicants?.map((app: Applicant) => (
              <tr
                key={app.id}
                className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {app.studentName}
                  </div>
                  <div className="text-xs text-gray-500">
                    GPA: 3.8 • Computer Science
                  </div>{" "}
                  {/* Mock extra data */}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {app.internshipTitle}
                </td>
                <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  {app.status === "Pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(app.id, "Interview")}
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
                    >
                      Schedule Interview
                    </Button>
                  )}
                  {app.status === "Interview" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleUpdateStatus(app.id, "Accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                        onClick={() => handleUpdateStatus(app.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-primary-600"
                  >
                    <MessageCircle size={18} />
                  </Button>
                </td>
              </tr>
            ))}

            {(!applicants || applicants.length === 0) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No applications received yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ApplicationManager;
