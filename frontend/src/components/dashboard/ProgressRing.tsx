import React from 'react';

interface ProgressRingProps {
  progress: number; // 0–100
  label: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  label
}) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, progress));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="glass-panel flex items-center gap-4 rounded-2xl px-4 py-3 text-xs">
      <svg width="110" height="110" className="-rotate-90">
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="rgba(209, 213, 219, 0.8)"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="#556B2F"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="rotate-90 text-xs font-semibold"
          fill="#111827"
        >
          {clamped}%
        </text>
      </svg>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Progress
        </p>
        <p className="text-xs font-semibold text-gray-900 dark:text-gray-50">
          {label}
        </p>
        <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
          Keep going to unlock your next badge.
        </p>
      </div>
    </div>
  );
};
