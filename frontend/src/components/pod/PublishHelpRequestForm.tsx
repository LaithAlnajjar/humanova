import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { podService } from "../../services/podService";
import { CreateAssistanceRequest } from "../../types/api/pod";
import {
  AssistanceType,
  AssistanceDuration,
  DisabilityType,
} from "../../types/enums";
import {
  Calendar,
  Clock,
  MapPin,
  HandHelping,
  UploadCloud,
  FileText,
} from "lucide-react";

const SELECT_CLASSES =
  "w-full h-11 rounded-xl border border-gray-200 bg-white/50 px-4 pr-10 text-sm outline-none focus:border-humanova-olive focus:ring-2 focus:ring-humanova-olive/20 dark:border-gray-600 dark:bg-black/40 dark:text-white";

// Helper for Enums
const getEnumOptions = (enumObj: any) =>
  Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(),
      value: enumObj[key],
    }));

export const PublishHelpRequestForm = () => {
  const navigate = useNavigate();

  // Fetch pre-filled data
  const { data: profile } = useQuery({
    queryKey: ["pod-profile-info"],
    queryFn: podService.getProfileInfo,
  });

  const [formData, setFormData] = useState<Partial<CreateAssistanceRequest>>({
    disabilityType: DisabilityType.Physical,
    duration: AssistanceDuration.OneTime,
    requiredDays: "",
    expectedHours: 2,
    startDateUtc: "",
    endDateUtc: "",
    preferredTimes: "",
    assistanceTypes: [],
    allowAutoMatching: true,
    conditionSummary: "",
    additionalNotes: "",
    volunteerInstructions: "",
    universityName: "",
    faculty: "",
    specificLocation: "",
    medicalReportUrl: "", // Placeholder URL inputs
    scheduleFileUrl: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        universityName: profile.university || "",
        faculty: profile.major || "",
      }));
    }
  }, [profile]);

  const mutation = useMutation({
    mutationFn: async (data: CreateAssistanceRequest) => {
      const res = await podService.createDraft(data);
      await podService.submit(res.id);
      return res;
    },
    onSuccess: () => {
      alert("Request Submitted! We are looking for a volunteer.");
      navigate("/dashboard/disabled-student");
    },
    onError: (err: Error) => alert(err.message),
  });

  const toggleAssistanceType = (type: number) => {
    setFormData((prev) => {
      const types = prev.assistanceTypes || [];
      return {
        ...prev,
        assistanceTypes: types.includes(type)
          ? types.filter((t) => t !== type)
          : [...types, type],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDateUtc || !formData.requiredDays) {
      alert("Start Date and Required Days are mandatory.");
      return;
    }

    const payload = {
      ...formData,
      startDateUtc: new Date(formData.startDateUtc).toISOString(),
      endDateUtc: formData.endDateUtc
        ? new Date(formData.endDateUtc).toISOString()
        : undefined,
    } as CreateAssistanceRequest;

    mutation.mutate(payload);
  };

  const handleChange = (key: string, val: any) =>
    setFormData((p) => ({ ...p, [key]: val }));

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="p-3 bg-humanova-cream dark:bg-humanova-olive/20 rounded-full text-humanova-olive">
          <HandHelping size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Request Assistance
          </h2>
          <p className="text-sm text-gray-500">
            Provide details so we can match you with the right volunteer.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Needs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <MapPin size={18} /> Location & Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="University"
              value={formData.universityName}
              onChange={(e) => handleChange("universityName", e.target.value)}
              required
            />
            <Input
              label="Faculty / College"
              value={formData.faculty}
              onChange={(e) => handleChange("faculty", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Disability Category
              </label>
              <select
                className={SELECT_CLASSES}
                value={formData.disabilityType}
                onChange={(e) =>
                  handleChange("disabilityType", Number(e.target.value))
                }
              >
                {getEnumOptions(DisabilityType).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Specific Location"
              placeholder="e.g. Building A, Lab 3"
              value={formData.specificLocation || ""}
              onChange={(e) => handleChange("specificLocation", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Condition Summary (Optional)"
              placeholder="Briefly describe your needs..."
              value={formData.conditionSummary || ""}
              onChange={(e) => handleChange("conditionSummary", e.target.value)}
            />
          </div>
        </div>

        {/* 2. Assistance Types */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-2">
            What kind of help do you need?
          </label>
          <div className="flex flex-wrap gap-3">
            {getEnumOptions(AssistanceType).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleAssistanceType(Number(opt.value))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  formData.assistanceTypes?.includes(Number(opt.value))
                    ? "bg-humanova-olive text-white border-humanova-olive shadow-md scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-humanova-olive/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {formData.assistanceTypes?.length === 0 && (
            <p className="text-xs text-red-500">
              Please select at least one type.
            </p>
          )}
        </div>

        {/* 3. Schedule */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Clock size={18} /> Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Start Date/Time"
              type="datetime-local"
              value={formData.startDateUtc}
              onChange={(e) => handleChange("startDateUtc", e.target.value)}
              required
            />
            <Input
              label="End Date (Optional)"
              type="datetime-local"
              value={formData.endDateUtc || ""}
              onChange={(e) => handleChange("endDateUtc", e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium mb-1">
                Frequency
              </label>
              <select
                className={SELECT_CLASSES}
                value={formData.duration}
                onChange={(e) =>
                  handleChange("duration", Number(e.target.value))
                }
              >
                {getEnumOptions(AssistanceDuration).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Required Days"
              placeholder="e.g. Mon, Wed, Thu"
              value={formData.requiredDays || ""}
              onChange={(e) => handleChange("requiredDays", e.target.value)}
              required
            />
            <Input
              label="Hours per Session"
              type="number"
              step="0.5"
              value={formData.expectedHours}
              onChange={(e) =>
                handleChange("expectedHours", Number(e.target.value))
              }
              required
            />
          </div>
          <div>
            <Input
              label="Preferred Times"
              placeholder="e.g. Mornings 9-11 AM"
              value={formData.preferredTimes || ""}
              onChange={(e) => handleChange("preferredTimes", e.target.value)}
            />
          </div>
        </div>

        {/* 4. Documents & Instructions */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText size={18} /> Documents & Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Medical Report URL (Optional)"
              placeholder="https://..."
              value={formData.medicalReportUrl || ""}
              onChange={(e) => handleChange("medicalReportUrl", e.target.value)}
            />
            <Input
              label="Schedule File URL (Optional)"
              placeholder="https://..."
              value={formData.scheduleFileUrl || ""}
              onChange={(e) => handleChange("scheduleFileUrl", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Instructions for Volunteer
            </label>
            <textarea
              className={`${SELECT_CLASSES} h-24 py-3`}
              placeholder="Please meet me at the main gate. I need help navigating to the 3rd floor..."
              value={formData.volunteerInstructions || ""}
              onChange={(e) =>
                handleChange("volunteerInstructions", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              className={`${SELECT_CLASSES} h-20 py-3`}
              placeholder="Any other details..."
              value={formData.additionalNotes || ""}
              onChange={(e) => handleChange("additionalNotes", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <input
              type="checkbox"
              id="autoMatch"
              className="w-5 h-5 text-humanova-olive rounded focus:ring-humanova-olive"
              checked={formData.allowAutoMatching}
              onChange={(e) =>
                handleChange("allowAutoMatching", e.target.checked)
              }
            />
            <label
              htmlFor="autoMatch"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              <strong>Allow Auto-Matching:</strong> Automatically assign a
              verified volunteer if they match my schedule.
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-12 text-lg"
        >
          {mutation.isPending
            ? "Submitting Request..."
            : "Submit Assistance Request"}
        </Button>
      </form>
    </Card>
  );
};
