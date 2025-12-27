import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { opportunityService } from "../../services/opportunityService";
import { CreateOrUpdateOpportunityRequest } from "../../types/api/opportunities";
import {
  VolunteerActivityType,
  VolunteeringType,
  VolunteerDaysType,
  VolunteeringPlaceType,
  TargetGroup,
  AcceptanceMethod,
  VolunteerSkill,
  AvailabilityType,
} from "../../types/enums";

// --- STYLING CONSTANTS ---
// Added 'h-11' to enforce fixed height matching the inputs
const SELECT_CLASSES =
  "w-full h-11 rounded-xl border border-gray-200 bg-white/50 px-4 pr-10 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-humanova-olive focus:ring-2 focus:ring-humanova-olive/20 dark:border-gray-600 dark:bg-black/40 dark:text-white dark:focus:border-humanova-gold dark:focus:ring-humanova-gold/20";

const OPTION_CLASSES =
  "bg-white text-gray-900 dark:bg-gray-800 dark:text-white";

// Helper for Enum Options
const getEnumOptions = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(),
      value: enumObj[key as keyof typeof enumObj],
    }));
};

export const PostOpportunityForm = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<
    Partial<CreateOrUpdateOpportunityRequest>
  >({
    title: "",
    description: "",
    activityType: VolunteerActivityType.Social,
    requiresExperience: false,
    volunteeringType: VolunteeringType.OneDay,
    expectedHours: 5,
    daysType: VolunteerDaysType.FixedDays,
    startDateUtc: "",
    country: "Jordan",
    governorateOrCity: "Amman",
    placeType: VolunteeringPlaceType.Field,
    volunteersNeeded: 10,
    targetGroup: TargetGroup.Anyone,
    suitableForDisabled: false,
    timeCommitmentRequired: true,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    provideCertificate: true,
    provideVerifiedHours: true,
    provideFieldExperience: false,
    provideBadge: true,
    applyDeadlineUtc: "",
    acceptanceMethod: AcceptanceMethod.Instant,
    autoCloseWhenFull: true,
    skills: [],
  });

  const [skillsInput, setSkillsInput] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: CreateOrUpdateOpportunityRequest) => {
      const draft = await opportunityService.createDraft(data);
      await opportunityService.publish(draft.id);
      return draft;
    },
    onSuccess: () => {
      alert("Opportunity Published Successfully!");
      queryClient.invalidateQueries({ queryKey: ["published-opportunities"] });
    },
    onError: (err: Error) => {
      alert(`Failed to post opportunity: ${err.message}`);
    },
  });

  const handleChange = (
    field: keyof CreateOrUpdateOpportunityRequest,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: VolunteerSkill) => {
    setFormData((prev) => {
      const currentSkills = prev.skills || [];
      if (currentSkills.includes(skill)) {
        return { ...prev, skills: currentSkills.filter((s) => s !== skill) };
      } else {
        return { ...prev, skills: [...currentSkills, skill] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.startDateUtc || !formData.applyDeadlineUtc) {
      alert("Please select dates");
      return;
    }

    if (!formData.skills || formData.skills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    const payload: CreateOrUpdateOpportunityRequest = {
      ...(formData as CreateOrUpdateOpportunityRequest),
      startDateUtc: new Date(formData.startDateUtc).toISOString(),
      applyDeadlineUtc: new Date(formData.applyDeadlineUtc).toISOString(),
    };

    mutation.mutate(payload);
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      {/* Updated Title Styling: Removed gradient, set explicit colors */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Post New Volunteering Opportunity
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-gray-800 dark:text-gray-200">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Opportunity Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Beach Cleanup 2025"
              required
              className="h-11" // Enforce height match
            />

            <div className="space-y-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Activity Type
              </label>
              <select
                className={SELECT_CLASSES}
                value={formData.activityType}
                onChange={(e) =>
                  handleChange("activityType", Number(e.target.value))
                }
              >
                {getEnumOptions(VolunteerActivityType).map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className={OPTION_CLASSES}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`${SELECT_CLASSES} min-h-[100px] h-auto py-3`} // Override height for textarea
              rows={4}
              required
            />
          </div>

          {/* Skill Selector */}
          <div className="space-y-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Required Skills
            </label>
            <div className="flex flex-wrap gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-black/40">
              {getEnumOptions(VolunteerSkill).map((skill) => {
                const isSelected = formData.skills?.includes(skill.value);
                return (
                  <button
                    key={skill.value}
                    type="button"
                    onClick={() => toggleSkill(skill.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      isSelected
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {skill.label}
                  </button>
                );
              })}
            </div>
            {formData.skills?.length === 0 && (
              <p className="text-xs text-orange-500">
                Please select at least one.
              </p>
            )}
          </div>
        </div>

        {/* Section 2: Logistics & Time */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-gray-800 dark:text-gray-200">
            Logistics & Time
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Start Date"
              type="datetime-local"
              value={formData.startDateUtc}
              onChange={(e) => handleChange("startDateUtc", e.target.value)}
              required
              className="h-11"
            />
            <Input
              label="Apply Deadline"
              type="datetime-local"
              value={formData.applyDeadlineUtc}
              onChange={(e) => handleChange("applyDeadlineUtc", e.target.value)}
              required
              className="h-11"
            />
            <Input
              label="Expected Hours"
              type="number"
              value={formData.expectedHours?.toString()}
              onChange={(e) =>
                handleChange("expectedHours", Number(e.target.value))
              }
              required
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City / Governorate"
              value={formData.governorateOrCity}
              onChange={(e) =>
                handleChange("governorateOrCity", e.target.value)
              }
              required
              className="h-11"
            />

            <div className="space-y-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Place Type
              </label>
              <select
                className={SELECT_CLASSES}
                value={formData.placeType}
                onChange={(e) =>
                  handleChange("placeType", Number(e.target.value))
                }
              >
                {getEnumOptions(VolunteeringPlaceType).map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className={OPTION_CLASSES}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Time Commitment Required?
              </label>
              <select
                className={SELECT_CLASSES}
                value={formData.timeCommitmentRequired ? "true" : "false"}
                onChange={(e) =>
                  handleChange(
                    "timeCommitmentRequired",
                    e.target.value === "true"
                  )
                }
              >
                <option value="true" className={OPTION_CLASSES}>
                  Yes, Required
                </option>
                <option value="false" className={OPTION_CLASSES}>
                  No, Flexible
                </option>
              </select>
            </div>

            <Input
              label="Volunteers Needed"
              type="number"
              value={formData.volunteersNeeded?.toString()}
              onChange={(e) =>
                handleChange("volunteersNeeded", Number(e.target.value))
              }
              min="1"
              required
              className="h-11"
            />
          </div>
        </div>

        {/* Section 3: Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-gray-800 dark:text-gray-200">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Contact Name"
              value={formData.contactName}
              onChange={(e) => handleChange("contactName", e.target.value)}
              required
              className="h-11"
            />
            <Input
              label="Contact Phone"
              value={formData.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              required
              className="h-11"
            />
            <Input
              label="Contact Email"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              required
              className="h-11"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-[1.02]"
        >
          {mutation.isPending
            ? "Publishing..."
            : "Create & Publish Opportunity"}
        </Button>
      </form>
    </Card>
  );
};
