import React from 'react';
import { OpportunityType } from '@/types/opportunity';
import { InternshipType } from '@/types/student';

export interface OpportunityFilterState {
  type: OpportunityType | 'all';
  location: string;
  search: string;
  major: 'all' | 'CS' | 'SE' | 'AI' | 'CIS' | 'CY' | 'BIT';
  internshipTypes: InternshipType[];
}

interface Props {
  value: OpportunityFilterState;
  onChange: (next: OpportunityFilterState) => void;
}

const MAJORS: OpportunityFilterState['major'][] = ['all', 'CS', 'SE', 'AI', 'CIS', 'CY', 'BIT'];
const INTERNSHIP_TYPES: InternshipType[] = ['On-site', 'Remote', 'Hybrid'];

export const OpportunityFilters: React.FC<Props> = ({ value, onChange }) => {
  const update = (patch: Partial<OpportunityFilterState>) =>
    onChange({ ...value, ...patch });

  const handleInternshipTypeChange = (type: InternshipType) => {
    const newTypes = value.internshipTypes.includes(type)
      ? value.internshipTypes.filter(t => t !== type)
      : [...value.internshipTypes, type];
    update({ internshipTypes: newTypes });
  };

  return (
    <div className="glass-panel mb-4 flex flex-col gap-4 rounded-2xl p-4 text-xs">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="space-y-1">
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
        
        {/* Location */}
        <div className="space-y-1">
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

        {/* Major */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
            Major
          </label>
          <select
            className="w-full rounded-xl border border-white/60 bg-white/80 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
            value={value.major}
            onChange={(e) => update({ major: e.target.value as OpportunityFilterState['major'] })}
          >
            {MAJORS.map(major => (
              <option key={major} value={major}>{major === 'all' ? 'All Majors' : major}</option>
            ))}
          </select>
        </div>

        {/* Opportunity Type */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
            Opportunity Type
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
      </div>
      
      {/* Internship Type Checkboxes */}
      {value.type === 'internship' && (
        <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
          <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
            Internship Mode
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            {INTERNSHIP_TYPES.map(type => (
              <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded-sm accent-humanova-olive"
                  checked={value.internshipTypes.includes(type)}
                  onChange={() => handleInternshipTypeChange(type)}
                />
                <span className="text-xs text-gray-800 dark:text-gray-100">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
