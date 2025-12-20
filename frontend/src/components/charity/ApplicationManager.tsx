// src/components/charity/ApplicationManager.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplicants, updateApplicationStatus } from '../../services/charityService';
import { Applicant, ApplicationStatus } from '../../types/charity';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const ApplicationManager = () => {
  const queryClient = useQueryClient();
  const { data: applicants, isLoading } = useQuery({
    queryKey: ['charityApplicants'],
    queryFn: getApplicants,
  });

  const mutation = useMutation({
    mutationFn: ({ applicantId, status }: { applicantId: string; status: ApplicationStatus }) =>
      updateApplicationStatus(applicantId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['charityApplicants'] });
      queryClient.invalidateQueries({ queryKey: ['charityStats'] });
    },
  });

  const handleUpdateStatus = (applicantId: string, status: ApplicationStatus) => {
    mutation.mutate({ applicantId, status });
  };

  if (isLoading) return <div className="p-4 md:p-8">Loading applicants...</div>;

  return (
    <Card className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Volunteer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Opportunity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {applicants?.map((app: Applicant) => (
            <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
              <td className="px-6 py-4 whitespace-nowrap">{app.volunteerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{app.opportunityTitle}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                  app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {app.status === 'Pending' && (
                  <>
                    <Button variant="primary" size="sm" onClick={() => handleUpdateStatus(app.id, 'Accepted')}>
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(app.id, 'Rejected')}>
                      Reject
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm">View Profile</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
