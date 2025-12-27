import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  X,
  CheckCircle,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input"; // Import Input component
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types/enums";
import { useMutation } from "@tanstack/react-query";
import { opportunityService } from "../../services/opportunityService";
import { internshipService } from "../../services/internshipService";

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
  type?: string; // 'volunteering' | 'internship'
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

  // State for Internship Application
  const [cvUrl, setCvUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const isVolunteer = user?.role === UserRole.Volunteer;
  const isStudent =
    user?.role === UserRole.Student || user?.role === UserRole.DisabledStudent;
  const isInternship = opportunity?.type === "internship";

  // --- Mutation Logic ---
  const mutation = useMutation({
    mutationFn: async () => {
      if (isInternship) {
        // Internship Application
        return internshipService.apply(Number(opportunity?.id), {
          cvUrl,
          linkedInUrl,
          coverLetter,
        });
      } else {
        // Volunteer Application
        return opportunityService.apply(Number(opportunity?.id));
      }
    },
    onSuccess: () => {
      alert("Application submitted successfully!");
      onClose();
    },
    onError: (err: Error) => {
      alert(`Application failed: ${err.message}`);
    },
  });

  const handleApply = () => {
    // Role Validation
    if (isInternship && !isStudent) {
      alert("Only registered Students can apply for internships.");
      return;
    }
    if (!isInternship && !isVolunteer) {
      alert("Only registered Volunteers can apply for volunteering.");
      return;
    }

    // Form Validation for Internships
    if (isInternship) {
      if (!cvUrl || !linkedInUrl) {
        alert("Please provide your CV and LinkedIn profile links.");
        return;
      }
    }

    if (confirm(`Submit application for "${opportunity?.title}"?`)) {
      mutation.mutate();
    }
  };

  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/95 shadow-2xl dark:bg-gray-900/95 dark:border-gray-700 scrollbar-hide"
      >
        {/* Header Image */}
        <div className="relative h-32 bg-gradient-to-r from-humanova-olive to-primary-600">
          <div className="absolute inset-0 bg-black/20" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-10"
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
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {opportunity.title}
              </h2>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {opportunity.organization}
              </p>
            </div>
            <div className="flex gap-2">
              {opportunity.isRemote && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                  Remote
                </span>
              )}
              {isInternship && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                  Internship
                </span>
              )}
            </div>
          </div>

          {/* Details Grid */}
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
                Seats
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

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                About the Role
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
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

          {/* Internship Application Form */}
          {isInternship && isStudent && (
            <div className="space-y-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-primary-600" />
                Submit Your Application
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Link to CV / Resume"
                  placeholder="https://drive.google.com/..."
                  value={cvUrl}
                  onChange={(e) => setCvUrl(e.target.value)}
                  className="h-10 bg-white dark:bg-gray-900"
                />
                <Input
                  label="LinkedIn Profile"
                  placeholder="https://linkedin.com/in/..."
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  className="h-10 bg-white dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                  Cover Letter
                </label>
                <textarea
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white min-h-[80px]"
                  placeholder="Why are you a good fit for this role?"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>
            </div>
          )}

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
                "Submitting..."
              ) : (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  {isInternship ? "Submit Application" : "Apply Now"}
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
