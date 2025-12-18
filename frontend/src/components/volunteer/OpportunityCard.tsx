import React, { useState } from 'react';
import { VolunteerOpportunity } from '@/types/volunteer';
import { Button } from '@/components/ui/Button';
import { Heart } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  opportunity: VolunteerOpportunity;
  onDetailsClick: () => void;
}

const categoryLabel: Record<VolunteerOpportunity['category'], string> = {
  Educational: 'Educational',
  Health: 'Health',
  Logistical: 'Logistical',
  Events: 'Events',
};

export const OpportunityCard: React.FC<Props> = ({ opportunity, onDetailsClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    alert(`${isFollowing ? 'Unfollowing' : 'Following'} ${opportunity.entity}`);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Applying for: ${opportunity.title}`);
  };

  return (
    <div className="glass-panel flex h-full flex-col rounded-2xl p-4 text-left text-xs text-gray-800 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl dark:text-gray-100">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <span className="rounded-full bg-humanova-olive/10 px-2 py-0.5 text-[10px] font-semibold text-humanova-olive dark:bg-humanova-gold/15 dark:text-humanova-gold">
            {categoryLabel[opportunity.category]}
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={handleFollow}
          className="text-gray-400 hover:text-red-500"
          title={isFollowing ? `Unfollow ${opportunity.entity}` : `Follow ${opportunity.entity}`}
        >
          <Heart size={18} className={clsx(isFollowing && 'fill-current text-red-500')} />
        </Button>
      </div>

      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
          {opportunity.title}
        </h3>
        <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">{opportunity.entity}</p>
        <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
          {opportunity.location} · {opportunity.duration}
        </p>
        <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
          {opportunity.hours} hours
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button onClick={handleApply} className="flex-1 justify-center">
          Apply
        </Button>
        <Button onClick={onDetailsClick} variant="outline" className="w-20 justify-center">
          Details
        </Button>
      </div>
    </div>
  );
};