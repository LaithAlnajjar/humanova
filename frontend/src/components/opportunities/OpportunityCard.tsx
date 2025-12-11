import React, { useState } from "react";
import { Opportunity } from "@/types/opportunity";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";
import { toggleFollowCompany } from "@/services/studentService";
import clsx from "clsx";

interface Props {
  opportunity: Opportunity;
  onOpen: () => void;
  showActions?: boolean;
}

const typeLabel: Record<Opportunity["type"], string> = {
  volunteering: "Volunteering",
  internship: "Internship",
  support: "Accessibility support",
};

export const OpportunityCard: React.FC<Props> = ({
  opportunity,
  onOpen,
  showActions = true,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onOpen from firing
    const nextState = await toggleFollowCompany(
      opportunity.organization,
      isFollowing
    );
    setIsFollowing(nextState);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Applying for: ${opportunity.title}`);
  };

  return (
    <div className="glass-panel flex h-full flex-col rounded-2xl p-4 text-left text-xs text-gray-800 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl dark:text-gray-100">
      {/* Header */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <span className="rounded-full bg-humanova-olive/10 px-2 py-0.5 text-[10px] font-semibold text-humanova-olive dark:bg-humanova-gold/15 dark:text-humanova-gold">
            {typeLabel[opportunity.type]}
          </span>
          {opportunity.isRemote && (
            <span className="ml-2 text-[10px] text-gray-500 dark:text-gray-300">
              Remote-friendly
            </span>
          )}
        </div>
        {showActions && (
          <Button
            variant="ghost"
            onClick={handleFollow}
            className="text-gray-400 hover:text-red-500"
            title={isFollowing ? "Unfollow company" : "Follow company"}
          >
            <Heart
              size={18}
              className={clsx(isFollowing && "fill-current text-red-500")}
            />
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow">
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
            <span className="text-[10px] text-gray-500 dark:text-gray-300">
              + more
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      {showActions ? (
        <div className="mt-4 flex items-center gap-2">
          <Button onClick={handleApply} className="flex-1 justify-center">
            Apply
          </Button>
          <Button
            onClick={onOpen}
            variant="outline"
            className="w-20 justify-center"
          >
            Details
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2">
          <Button
            onClick={onOpen}
            variant="outline"
            className="w-full justify-center"
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
};
