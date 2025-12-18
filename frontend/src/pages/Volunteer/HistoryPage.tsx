import React, { useState, useEffect } from 'react';
import { Application } from '@/types/volunteer';
import { getApplications } from '@/services/volunteerService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';

const statusStyles = {
  Accepted: 'border-l-4 border-green-500',
  Rejected: 'border-l-4 border-red-500',
  Pending: 'border-l-4 border-yellow-500',
  Completed: 'border-l-4 border-blue-500',
};

const HistoryPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      // Assuming a logged-in volunteer with id 'vol-1'
      const data = await getApplications('vol-1');
      setApplications(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const downloadCertificate = (app: Application) => {
    alert(`Downloading certificate for: ${app.opportunity.title}`);
    // In a real app, this would trigger a PDF download.
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-24 animate-pulse"></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 px-32">
      <h1 className="text-2xl font-semibold">My Opportunity History</h1>
      {applications.length === 0 ? (
        <p className="text-center text-gray-500">You have no application history yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <Card key={app.id} className={clsx('p-4 flex flex-col md:flex-row justify-between items-start md:items-center', statusStyles[app.status])}>
              <div>
                <h3 className="font-semibold">{app.opportunity.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{app.opportunity.entity}</p>
                <p className="text-xs text-gray-500 mt-1">Applied on: {app.appliedAt.toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                  app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>{app.status}</span>
                {app.status === 'Completed' && (
                  <Button variant="outline" size="sm" onClick={() => downloadCertificate(app)}>
                    Certificate
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;