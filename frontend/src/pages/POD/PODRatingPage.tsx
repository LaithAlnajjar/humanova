import React from 'react';
import { RatingForm } from '@/components/pod/RatingForm';

const PODRatingPage: React.FC = () => {
  // In a real app, you would pass the ID of the interaction to be rated.
  const interactionId = 'interaction-123';

  return (
    <div className="space-y-6 px-32">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Rate Your Assistance
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Provide feedback on the assistance you received from volunteers.
        </p>
      </header>
      <RatingForm interactionId={interactionId} />
    </div>
  );
};

export default PODRatingPage;
