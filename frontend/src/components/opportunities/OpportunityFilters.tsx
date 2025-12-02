import React from 'react';
import { OpportunityType } from '@/types/opportunity';

export interface OpportunityFilterState {
  type: OpportunityType | 'all';
  location: string;
  search: string;
}

interface Props {
  value: OpportunityFilterState;
  onChange: (next: OpportunityFilterState) => void;
}

export const OpportunityFilters: React.FC<Props> = ({ value, onChange }) => {
  const update = (patch: Partial<OpportunityFilterState>) =>
    onChange({ ...value, ...patch });

  return (
    <div className="glass-panel mb-4 flex flex-col gap-3 rounded-2xl px-4 py-3 text-xs sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1">
        <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
          Type
        </label>
        <select
          className="w-full rounded-xl border border-white/60 bg-white/80 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
          value={value.type}
          onChange={(e) => update({ type: e.target.value as OpportunityFilterState['type'] })}
        >
          <option value="all">All</option>
          <option value="volunteering">Volunteering</option>
          <option value="internship">Internship</option>
          <option value="support">Support</option>
        </select>
      </div>

      <div className="flex-1 space-y-1">
        <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
          Location
        </label>
        <input
          className="w-full rounded-xl border border-white/60 bg-white/80 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
          placeholder="Amman, Zarqa, Remote..."
          value={value.location}
          onChange={(e) => update({ location: e.target.value })}
        />
      </div>

      <div className="flex-1 space-y-1">
        <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
          Search
        </label>
        <input
          className="w-full rounded-xl border border-white/60 bg-white/80 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
          placeholder="Title, skills, organization..."
          value={value.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>
    </div>
  );
};
