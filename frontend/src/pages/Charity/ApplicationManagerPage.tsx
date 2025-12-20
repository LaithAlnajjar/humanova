import React from 'react';
import { ApplicationManager } from '@/components/charity/ApplicationManager';

const ApplicationManagerPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Application Management</h1>
        <p className="text-muted-foreground text-lg">
          Review and manage applications for your volunteer opportunities.
        </p>
      </header>
      <ApplicationManager />
    </div>
  );
};

export default ApplicationManagerPage;
