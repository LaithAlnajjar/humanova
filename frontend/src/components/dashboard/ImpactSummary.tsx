import React from 'react';

interface ImpactSummaryProps {
  points: number;
  level: string;
  completed: number;
  upcoming: number;
}

export const ImpactSummary: React.FC<ImpactSummaryProps> = ({
  points,
  level,
  completed,
  upcoming
}) => {
  const total = completed + upcoming || 1;
  const progress = Math.round((completed / total) * 100);

  return (
    <section className="glass-panel rounded-2xl p-4 md:p-5 space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-50">Impact</h2>
          <p className="text-[11px] text-slate-400">
            Your current Humanova contribution
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Level</p>
          <p className="text-sm font-semibold text-emerald-300">{level}</p>
        </div>
      </header>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{completed} completed</span>
          <span>{upcoming} upcoming</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-[10px]">
        <span className="px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-200">
          +{points} pts
        </span>
        <span className="px-2 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200">
          Consistency badge
        </span>
        <span className="px-2 py-1 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-200">
          Community helper
        </span>
      </div>
    </section>
  );
};
