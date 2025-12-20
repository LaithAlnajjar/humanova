import React from 'react';
import { PODProfile } from '@/components/pod/PODProfile';

const PODProfilePage: React.FC = () => {
  return (
    <div className="space-y-6 px-32">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          My Profile
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Update your profile information and support needs.
        </p>
      </header>
      <PODProfile />
    </div>
  );
};

export default PODProfilePage;
