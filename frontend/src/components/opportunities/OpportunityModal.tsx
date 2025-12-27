import React from 'react';
import { Opportunity } from '@/types/opportunity';
import { Button } from '@/components/ui/Button';

interface Props {
  opportunity: Opportunity | null;
  onClose: () => void;
  showActions?: boolean;
}

export const OpportunityModal: React.FC<Props> = ({
  opportunity,
  onClose,
  showActions = true,
}) => {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 text-xs">
      <div className="glass-panel max-h-[80vh] w-full max-w-lg overflow-hidden rounded-3xl bg-white/90 p-4 text-gray-800 shadow-xl dark:bg-black/90 dark:text-gray-100">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            {opportunity.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-0.5 text-[11px] text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-[11px] text-gray-600 dark:text-gray-300">
          {opportunity.organization}
        </p>
        <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
          {opportunity.location} · {opportunity.timeCommitment}
        </p>

        <p className="mt-3 text-xs leading-relaxed text-gray-700 dark:text-gray-200">
          {opportunity.description}
        </p>

        <div className="mt-3">
          <p className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
            Skills
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {opportunity.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-humanova-cream/80 px-2 py-0.5 text-[10px] text-humanova-olive dark:bg-humanova-oliveDark/70 dark:text-gray-50"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {showActions && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <Button
              variant="ghost"
              className="px-3 py-1.5 text-[11px]"
              type="button"
              onClick={onClose}
            >
              Close
            </Button>
            <Button className="px-4 py-1.5 text-[11px]" type="button">
              Apply (mock)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
