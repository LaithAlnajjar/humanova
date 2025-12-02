import React from 'react';

export type SupportStatus = 'pending' | 'accepted' | 'completed';

export interface SupportStep {
  id: string;
  title: string;
  description: string;
  status: SupportStatus;
}

interface Props {
  steps: SupportStep[];
}

const statusColor: Record<SupportStatus, string> = {
  pending: 'bg-amber-400',
  accepted: 'bg-sky-500',
  completed: 'bg-emerald-500'
};

export const SupportTimeline: React.FC<Props> = ({ steps }) => {
  return (
    <div className="glass-panel rounded-2xl px-4 py-3 text-xs text-gray-800 dark:text-gray-100">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Request timeline
      </p>

      <ol className="relative ml-3 border-l border-gray-300 dark:border-gray-600">
        {steps.map((step, index) => (
          <li key={step.id} className="mb-4 ml-4 last:mb-0">
            <div className="absolute -left-[9px] mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-black">
              <span
                className={`h-2.5 w-2.5 rounded-full ${statusColor[step.status]}`}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold text-gray-900 dark:text-gray-50">
                {step.title}
              </p>
              <span className="text-[10px] capitalize text-gray-500 dark:text-gray-300">
                {step.status}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};
