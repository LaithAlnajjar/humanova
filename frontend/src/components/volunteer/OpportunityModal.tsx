import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  X,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types/enums";
import { useMutation } from "@tanstack/react-query";
import { opportunityService } from "../../services/opportunityService";

interface Opportunity {
  id: string | number;
  title: string;
  organization: string;
  location: string;
  description: string;
  image?: string;
  timeCommitment?: string;
  volunteersNeeded?: number;
  deadline?: string;
  skills: string[];
  type?: string;
  isRemote?: boolean;
}

interface Props {
  opportunity: Opportunity | null;
  onClose: () => void;
  isOpen: boolean;
}

export const OpportunityModal: React.FC<Props> = ({
  opportunity,
  onClose,
  isOpen,
}) => {
  const { user } = useAuth();
  const isVolunteer = user?.role === UserRole.Volunteer;

  // --- Real Application Logic ---
  const mutation = useMutation({
    mutationFn: () => opportunityService.apply(Number(opportunity?.id)),
    onSuccess: () => {
      alert("Application successful! The charity will review your profile.");
      onClose();
    },
    onError: (err: Error) => {
      alert(`Application failed: ${err.message}`);
    },
  });

  const handleApply = () => {
    if (!isVolunteer) {
      alert("Only registered Volunteers can apply for opportunities.");
      return;
    }
    if (confirm(`Apply for "${opportunity?.title}"?`)) {
      mutation.mutate();
    }
  };

  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/90 shadow-2xl dark:bg-gray-900/90 dark:border-gray-700"
      >
        {/* Header Image Area */}
        <div className="relative h-32 bg-gradient-to-r from-humanova-olive to-primary-600">
          <div className="absolute inset-0 bg-black/20" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="absolute -bottom-10 left-8">
            <div className="h-20 w-20 rounded-2xl bg-white p-2 shadow-lg dark:bg-gray-800">
              <img
                src={
                  opportunity.image ||
                  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
                }
                alt="Logo"
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="pt-12 pb-8 px-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {opportunity.title}
              </h2>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {opportunity.organization}
              </p>
            </div>
            {opportunity.isRemote && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                Remote
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase font-bold">
                Location
              </span>
              <div className="flex items-center mt-1">
                <MapPin size={14} className="mr-1" /> {opportunity.location}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase font-bold">
                Commitment
              </span>
              <div className="flex items-center mt-1">
                <Clock size={14} className="mr-1" />{" "}
                {opportunity.timeCommitment}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase font-bold">
                Needed
              </span>
              <div className="flex items-center mt-1">
                <Users size={14} className="mr-1" />{" "}
                {opportunity.volunteersNeeded || "Open"}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase font-bold">
                Deadline
              </span>
              <div className="flex items-center mt-1">
                <Calendar size={14} className="mr-1" />
                {opportunity.deadline
                  ? new Date(opportunity.deadline).toLocaleDateString()
                  : "Ongoing"}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                About the Role
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {opportunity.description}
              </p>
            </div>

            {opportunity.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={mutation.isPending}
              className="bg-primary-600 hover:bg-primary-700 text-white min-w-[140px]"
            >
              {mutation.isPending ? (
                "Applying..."
              ) : (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  Apply Now
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
