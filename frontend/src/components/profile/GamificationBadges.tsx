import React from 'react';

const BADGES = [
  {
    id: 'b1',
    label: 'Impact starter',
    description: 'Completed first 10 volunteering hours.'
  },
  {
    id: 'b2',
    label: 'Accessibility ally',
    description: 'Supported accessibility-focused activities.'
  },
  {
    id: 'b3',
    label: 'Consistent learner',
    description: 'Completed 3 learning paths in a row.'
  }
];

export const GamificationBadges: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl px-4 py-3 text-xs text-gray-800 dark:text-gray-100">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Badges
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {BADGES.map((badge) => (
          <div
            key={badge.id}
            className="rounded-2xl bg-gradient-to-br from-humanova-cream/80 via-white/80 to-humanova-gold/20 px-3 py-3 dark:from-humanova-oliveDark/80 dark:via-black/70 dark:to-humanova-gold/20"
          >
            <p className="text-[11px] font-semibold text-humanova-olive dark:text-humanova-gold">
              {badge.label}
            </p>
            <p className="mt-1 text-[11px] text-gray-700 dark:text-gray-200">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
