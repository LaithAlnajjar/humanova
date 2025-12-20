import React from 'react';
import { CampaignManager } from '@/components/charity/CampaignManager';

const CampaignManagerPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
        <p className="text-muted-foreground text-lg">
          Upload photos and reports for your campaigns and initiatives.
        </p>
      </header>
      <CampaignManager />
    </div>
  );
};

export default CampaignManagerPage;
