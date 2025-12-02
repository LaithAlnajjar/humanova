import React from 'react';
import { Opportunity } from '@/types/opportunity';
import { Button } from '@/components/ui/Button';

interface Props {
  opportunity: Opportunity;
  onOpen: () => void;
}

const typeLabel: Record<Opportunity['type'], string> = {
  volunteering: 'Volunteering',
  internship: 'Internship',
  support: 'Accessibility support'
};

export const OpportunityCard: React.FC<Props> = ({ opportunity, onOpen }) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="glass-panel flex h-full flex-col rounded-2xl px-4 py-3 text-left text-xs text-gray-800 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl dark:text-gray-100"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-humanova-olive/10 px-2 py-0.5 text-[10px] font-semibold text-humanova-olive dark:bg-humanova-gold/15 dark:text-humanova-gold">
          {typeLabel[opportunity.type]}
        </span>
        {opportunity.isRemote && (
          <span className="text-[10px] text-gray-500 dark:text-gray-300">
            Remote-friendly
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
        {opportunity.title}
      </h3>
      <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
        {opportunity.organization}
      </p>
      <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
        {opportunity.location} · {opportunity.timeCommitment}
      </p>

      <div className="mt-2 flex flex-wrap gap-1">
        {opportunity.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-humanova-cream/80 px-2 py-0.5 text-[10px] text-humanova-olive dark:bg-humanova-oliveDark/70 dark:text-gray-50"
          >
            {skill}
          </span>
        ))}
        {opportunity.skills.length > 3 && (
          <span className="text-[10px] text-gray-500 dark:text-gray-300">+ more</span>
        )}
      </div>

      <div className="mt-3">
        <Button variant="outline" className="w-full justify-center px-3 py-1.5 text-[11px]">
          View details & apply
        </Button>
      </div>
    </button>
  );
};
