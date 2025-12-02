import React from 'react';
import { SupportTimeline, SupportStep } from '@/components/support/SupportTimeline';
import { SupportRequestForm } from '@/components/support/SupportRequestForm';

const MOCK_STEPS: SupportStep[] = [
  {
    id: '1',
    title: 'Request submitted',
    description: 'You shared where and how you would like support.',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Matching a helper',
    description: 'Humanova is matching you with a trained volunteer on campus.',
    status: 'accepted'
  },
  {
    id: '3',
    title: 'On-campus support',
    description: 'Your helper will meet you at the agreed location and time.',
    status: 'pending'
  }
];

export const SupportPage: React.FC = () => {
  return (
    <div className="container grid gap-4 py-10 md:grid-cols-2">
      <div className="space-y-4">
        <SupportRequestForm />
      </div>
      <div className="space-y-4">
        <SupportTimeline steps={MOCK_STEPS} />
        <div className="glass-panel rounded-2xl px-4 py-3 text-xs text-gray-800 dark:text-gray-100">
          <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            How support works
          </p>
          <p className="mt-1">
            Humanova never replaces official university services. Instead, it helps coordinate
            volunteers, buddies, and organizations around you, so that getting to class, labs and
            events feels more accessible and less stressful.
          </p>
        </div>
      </div>
    </div>
  );
};
