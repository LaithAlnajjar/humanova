import React, { useEffect, useState } from "react";
import { getPodSupportRequests } from "@/services/studentService";
import { SupportRequest } from "@/types/pod";
import { HelpRequestList } from "@/components/student/HelpRequestList";

export const HelpRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const fetchedRequests = await getPodSupportRequests();
        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Failed to fetch support requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="space-y-8 px-32">
      <header>
        <h1 className="text-2xl font-semibold">POD Help Requests</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Help a person of disability with their requests.
        </p>
      </header>
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-2/3 mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <HelpRequestList requests={requests} />
      )}
    </div>
  );
};
