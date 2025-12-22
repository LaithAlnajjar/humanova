import React from 'react';
import { PublishHelpRequestForm } from '@/components/pod/PublishHelpRequestForm';

const PublishHelpRequestPage: React.FC = () => {
  return (
    <div className="space-y-6 px-32">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Publish a Help Request
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Fill out the form below to request assistance from a volunteer.
        </p>
      </header>
      <PublishHelpRequestForm />
    </div>
  );
};

export default PublishHelpRequestPage;
