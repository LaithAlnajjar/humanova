import React from 'react';
import { VolunteerMatcher } from '@/components/pod/VolunteerMatcher';

const PODMatchingPage: React.FC = () => {
  return (
    <div className="space-y-6 px-32">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Find a Volunteer
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Get matched with volunteers based on your needs and location.
        </p>
      </header>
      <VolunteerMatcher />
    </div>
  );
};

export default PODMatchingPage;
