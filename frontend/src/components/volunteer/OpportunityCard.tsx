import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types/enums";
import { useMutation } from "@tanstack/react-query";
import { opportunityService } from "../../services/opportunityService";

interface OpportunityCardProps {
  opportunity: {
    id: string | number;
    title: string;
    organization: string;
    location: string;
    description: string;
    image?: string;
    timeCommitment?: string;
    volunteersNeeded?: number;
    deadline?: string;
  };
  onClick?: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onClick,
}) => {
  const { user } = useAuth();
  const isVolunteer = user?.role === UserRole.Volunteer;

  const mutation = useMutation({
    mutationFn: () => opportunityService.apply(Number(opportunity.id)),
    onSuccess: () => {
      alert("Application successful! The charity will review your profile.");
    },
    onError: (err: Error) => {
      alert(`Application failed: ${err.message}`);
    },
  });

  // Handle Quick Apply button click
  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from opening details modal
    if (!isVolunteer) {
      alert("Only registered Volunteers can apply for opportunities.");
      return;
    }
    if (confirm(`Apply for "${opportunity.title}"?`)) {
      mutation.mutate();
    }
  };

  // Handle Card or 'View Details' click
  const handleCardClick = () => {
    console.log("Card clicked:", opportunity.id); // Debug log
    if (onClick) onClick();
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full cursor-pointer group"
      onClick={handleCardClick} // Make whole wrapper clickable
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <img
            src={
              opportunity.image ||
              "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
            }
            alt={opportunity.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Apply Overlay */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="sm"
              className="w-full bg-white text-black hover:bg-gray-100 border-none font-semibold shadow-lg"
              onClick={handleApply}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Applying..." : "Quick Apply"}
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3">
            <h3
              className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-primary-600 transition-colors"
              title={opportunity.title}
            >
              {opportunity.title}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium truncate">
              {opportunity.organization}
            </p>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {opportunity.description}
          </p>

          {/* Metadata Badges */}
          <div className="space-y-2 mb-5">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
              <span className="truncate">{opportunity.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
              <span>{opportunity.timeCommitment || "Flexible"}</span>
            </div>
            {opportunity.volunteersNeeded && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
                <span>{opportunity.volunteersNeeded} Volunteers needed</span>
              </div>
            )}
            {opportunity.deadline && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
                <span>
                  Apply by {new Date(opportunity.deadline).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* View Details Button (Visual Cue Only, click handled by parent) */}
          <Button
            variant="outline"
            className="w-full mt-auto border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={(e) => {
              e.stopPropagation(); // Avoid double-trigger
              handleCardClick();
            }}
          >
            View Details
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
