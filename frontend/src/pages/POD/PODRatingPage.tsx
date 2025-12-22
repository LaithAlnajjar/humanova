import React, { useEffect, useState } from 'react';
import { getCompletedHelpRequests } from '@/services/podService';
import { SupportRequest } from '@/types/pod';
import { RatingForm } from '@/components/pod/RatingForm';
import { Card } from '@/components/ui/Card';

const PODRatingPage: React.FC = () => {
  const [completedRequests, setCompletedRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const requests = await getCompletedHelpRequests();
        setCompletedRequests(requests);
      } catch (error) {
        console.error("Failed to fetch completed requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="space-y-6 px-32">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Rate Your Assistance
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Provide feedback on the assistance you received from volunteers for completed help requests.
        </p>
      </header>
      
      {loading ? (
        <p>Loading completed requests...</p>
      ) : (
        <div className="space-y-8">
          {completedRequests.length > 0 ? (
            completedRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{request.category}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {request.description}
                  </p>
                </div>
                <RatingForm interactionId={request.id} volunteerId={request.volunteerId} />
              </Card>
            ))
          ) : (
            <p>No completed help requests to rate.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PODRatingPage;
