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
        <p>Loading requests...</p>
      ) : (
        <HelpRequestList requests={requests} />
      )}
    </div>
  );
};
