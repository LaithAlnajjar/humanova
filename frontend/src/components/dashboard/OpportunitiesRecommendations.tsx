import React from 'react';

interface Recommendation {
  id: string;
  title: string;
  organization: string;
  type: 'volunteering' | 'internship' | 'support';
  hours?: number;
}

interface Props {
  items: Recommendation[];
}

const typeLabel: Record<Recommendation['type'], string> = {
  volunteering: 'Volunteering',
  internship: 'Internship',
  support: 'Support'
};

export const OpportunitiesRecommendations: React.FC<Props> = ({ items }) => {
  return (
    <section className="glass-panel rounded-2xl p-4 md:p-5 space-y-3">
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-50">
          Recommended opportunities
        </h2>
        <span className="text-[11px] text-slate-400">
          Based on your role & interests
        </span>
      </header>

      <div className="space-y-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-slate-900/60 px-3 py-2.5 border border-slate-700/60"
          >
            <div className="space-y-0.5">
              <p className="text-xs md:text-sm font-medium text-slate-50">
                {item.title}
              </p>
              <p className="text-[11px] text-slate-400">{item.organization}</p>
            </div>
            <div className="text-right space-y-1">
              <span className="inline-flex items-center rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-500/40 px-2 py-[2px] text-[10px]">
                {typeLabel[item.type]}
              </span>
              {item.hours !== undefined && (
                <p className="text-[10px] text-slate-400">
                  ~{item.hours} hrs
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
