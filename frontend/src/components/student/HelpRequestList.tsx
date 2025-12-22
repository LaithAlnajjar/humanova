import React from "react";
import { SupportRequest } from "@/types/pod";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface HelpRequestListProps {
  requests: SupportRequest[];
}

export const HelpRequestList: React.FC<HelpRequestListProps> = ({
  requests,
}) => {
  if (requests.length === 0) {
    return <p>No pending help requests.</p>;
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{request.category}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {request.description}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    request.urgency === "High"
                      ? "bg-red-200 text-red-800"
                      : request.urgency === "Medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {request.urgency}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Status: {request.status}
                </span>
              </div>
            </div>
            <Button className="text-xs px-3 py-1">Accept</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
