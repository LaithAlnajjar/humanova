import React from 'react';

export interface StatItem {
  label: string;
  value: string | number;
  helper?: string;
}

interface StatsCardsProps {
  items: StatItem[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ items }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="glass-panel rounded-2xl px-4 py-4 md:px-5 md:py-5 flex flex-col gap-1"
        >
          <span className="text-xs uppercase tracking-wide text-slate-400">
            {item.label}
          </span>
          <span className="text-xl md:text-2xl font-semibold text-emerald-300">
            {item.value}
          </span>
          {item.helper && (
            <span className="text-[11px] md:text-xs text-slate-400">
              {item.helper}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
