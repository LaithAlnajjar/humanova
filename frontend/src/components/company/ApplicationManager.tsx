// src/components/company/ApplicationManager.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplicants, updateApplicationStatus } from '../../services/companyService';
import { Applicant, ApplicationStatus } from '../../types/company';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const ApplicationManager = () => {
  const queryClient = useQueryClient();
  const { data: applicants, isLoading } = useQuery({
    queryKey: ['applicants'],
    queryFn: getApplicants,
  });

  const mutation = useMutation({
    mutationFn: ({ applicantId, status }: { applicantId: string; status: ApplicationStatus }) =>
      updateApplicationStatus(applicantId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicants'] });
      queryClient.invalidateQueries({ queryKey: ['companyStats'] });
    },
  });

  const handleUpdateStatus = (applicantId: string, status: ApplicationStatus) => {
    mutation.mutate({ applicantId, status });
  };

  if (isLoading) return <div className="p-4 md:p-8">Loading applicants...</div>;

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-semibold">Manage Applications</h1>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Internship</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {applicants?.map((app: Applicant) => (
              <tr key={app.id} className="hover:bg-gray-800/40">
                <td className="px-6 py-4 whitespace-nowrap">{app.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.internshipTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    app.status === 'Interview' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {app.status === 'Pending' && (
                    <Button variant="outline" className="px-4 py-1" onClick={() => handleUpdateStatus(app.id, 'Interview')}>
                      Schedule Interview
                    </Button>
                  )}
                  {app.status === 'Interview' && (
                    <>
                      <Button variant="primary" className="px-4 py-1" onClick={() => handleUpdateStatus(app.id, 'Accepted')}>
                        Accept
                      </Button>
                      <Button variant="outline" className="px-4 py-1" onClick={() => handleUpdateStatus(app.id, 'Rejected')}>
                        Reject
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" className="px-4 py-1">Chat</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ApplicationManager;
