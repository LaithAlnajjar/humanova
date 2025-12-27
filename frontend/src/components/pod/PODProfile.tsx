import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPODProfile } from "../../services/podService";
import { Card } from "../ui/Card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Accessibility,
  BookOpen,
  FileText,
  AlertCircle,
} from "lucide-react";
import { DisabilityType, AssistanceType } from "../../types/enums";

// Helper to get Enum label
const getEnumLabel = (enumObj: any, value: number) => {
  return Object.keys(enumObj)
    .find((key) => enumObj[key] === value)
    ?.replace(/([A-Z])/g, " $1")
    .trim();
};

export const PODProfileView = () => {
  // Fetch profile data (Mocked)
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pod-profile-view"],
    queryFn: () => getPODProfile("current-user"),
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse max-w-5xl mx-auto">
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl col-span-1" />
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl col-span-2" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Identity Card (Replaces the broken blue header) */}
      <Card className="p-8 border-l-4 border-l-primary-500 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* Info */}
          <div className="text-center md:text-left space-y-1 flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Student Profile
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <BookOpen size={14} /> {profile.major}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <MapPin size={14} /> ID: {profile.universityId}
              </span>
            </div>

            {/* Contact Grid */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Mail size={16} className="text-primary-500" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Phone size={16} className="text-primary-500" />
                {profile.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* 2. Needs Column (Critical Info) */}
        <Card className="md:col-span-1 p-6 h-full flex flex-col bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg text-red-500 shadow-sm">
              <Accessibility size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Primary Category
              </p>
              <p className="font-bold text-gray-900 dark:text-white text-lg">
                {getEnumLabel(DisabilityType, profile.disabilityType)}
              </p>
            </div>
          </div>

          <div className="space-y-4 flex-grow">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Assistance Required
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.assistanceNeeds.map((needId) => (
                <span
                  key={needId}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold border border-gray-100 dark:border-gray-700 shadow-sm"
                >
                  {getEnumLabel(AssistanceType, needId)}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* 3. Details Column */}
        <div className="md:col-span-2 flex flex-col gap-6 h-full">
          {/* Condition & Notes */}
          <Card className="p-6 flex-grow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText size={20} className="text-primary-600" />
              Condition & Requirements
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {profile.conditionSummary}
                </p>
              </div>

              {profile.additionalNotes && (
                <div className="flex gap-3 items-start p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
                  <AlertCircle
                    size={18}
                    className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase mb-1">
                      Additional Notes
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "{profile.additionalNotes}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Preferences (Compact) */}
          <Card className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase block mb-1">
                  Preferred Time
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Clock size={16} className="text-primary-500" />
                  {profile.preferredTime || "Flexible"}
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase block mb-1">
                  Preferred Place
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <MapPin size={16} className="text-primary-500" />
                  {profile.preferredPlace || "Campus Wide"}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
