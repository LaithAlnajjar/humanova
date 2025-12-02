import React from 'react';

interface LeaderboardItem {
  name: string;
  points: number;
}

const MOCK_LEADERBOARD: LeaderboardItem[] = [
  { name: 'Nadia B.', points: 1280 },
  { name: 'Lina S.', points: 1130 },
  { name: 'Omar H.', points: 980 },
  { name: 'Sara A.', points: 910 }
];

export const Leaderboard: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl px-4 py-3 text-xs text-gray-800 dark:text-gray-100">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Leaderboard
      </p>
      <ul className="space-y-1">
        {MOCK_LEADERBOARD.map((item, index) => (
          <li key={item.name} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-humanova-olive/90 text-[10px] font-semibold text-white dark:bg-humanova-gold dark:text-black">
                {index + 1}
              </span>
              <span>{item.name}</span>
            </span>
            <span className="text-[11px] text-gray-600 dark:text-gray-300">
              {item.points} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
