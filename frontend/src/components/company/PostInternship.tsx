import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { internshipService } from "../../services/internshipService";
import { CreateInternshipRequest } from "../../types/api/internships";
import {
  AttendanceType,
  InternshipDuration,
  ReviewMethod,
  StudyLevel,
  StudentSkill,
  VolunteerSkill,
} from "../../types/enums";

// --- STYLING CONSTANTS ---
const SELECT_CLASSES =
  "w-full h-11 rounded-xl border border-gray-200 bg-white/50 px-4 pr-10 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-humanova-olive focus:ring-2 focus:ring-humanova-olive/20 dark:border-gray-600 dark:bg-black/40 dark:text-white dark:focus:border-humanova-gold dark:focus:ring-humanova-gold/20";
const OPTION_CLASSES =
  "bg-white text-gray-900 dark:bg-gray-800 dark:text-white";

// Helper to get Enum options
const getEnumOptions = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(),
      value: enumObj[key as keyof typeof enumObj],
    }));
};

export const PostInternship = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Partial<CreateInternshipRequest>>({
    title: "",
    description: "",
    attendanceType: AttendanceType.Onsite,
    requiredMajor: "",
    minimumGpa: 2.0,
    duration: InternshipDuration.ThreeMonths,
    weeklyHours: 40,
    minStudyLevel: StudyLevel.Year3,
    maxStudyLevel: StudyLevel.Year4,
    country: "Jordan",
    locationText: "Amman",
    companyAddressUrl: "",
    isPaid: false,
    employmentPossible: true,
    requireCv: true,
    requireLinkedIn: true,
    requireCoverLetter: false,
    supervisorName: "",
    supervisorJobLevel: "",
    supervisorEmail: "",
    seatsAvailable: 3,
    deadlineUtc: "",
    reviewMethod: ReviewMethod.Interview,
    onlyPartnerUniversities: false,
    autoCloseWhenFull: true,
    generalSkills: [],
    technicalSkills: [],
    allowedUniversityIds: [],
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateInternshipRequest) => {
      const draft = await internshipService.createDraft(data);
      await internshipService.publish(draft.id);
      return draft;
    },
    onSuccess: () => {
      alert("Internship Posted & Published Successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-internships"] });
    },
    onError: (err: Error) => {
      alert(`Failed to post internship: ${err.message}`);
    },
  });

  const handleChange = (field: keyof CreateInternshipRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (
    listKey: "generalSkills" | "technicalSkills",
    skillValue: number
  ) => {
    setFormData((prev) => {
      const list = prev[listKey] as number[];
      if (list.includes(skillValue)) {
        return { ...prev, [listKey]: list.filter((s) => s !== skillValue) };
      }
      return { ...prev, [listKey]: [...list, skillValue] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.deadlineUtc) {
      alert("Please set a deadline.");
      return;
    }

    const payload = {
      ...formData,
      deadlineUtc: new Date(formData.deadlineUtc).toISOString(),
    } as CreateInternshipRequest;

    mutation.mutate(payload);
  };

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Post New Internship
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Role Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Internship Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Attendance Type
              </label>
              <select
                className={SELECT_CLASSES}
                value={formData.attendanceType}
                onChange={(e) =>
                  handleChange("attendanceType", Number(e.target.value))
                }
              >
                {getEnumOptions(AttendanceType).map((opt) => (
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
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className={`${SELECT_CLASSES} min-h-[100px] py-3 h-auto`}
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>
        </div>

        {/* 2. Requirements & Logistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Required Major"
              value={formData.requiredMajor}
              onChange={(e) => handleChange("requiredMajor", e.target.value)}
              required
            />
            <Input
              label="Min GPA (0-4)"
              type="number"
              step="0.1"
              value={formData.minimumGpa?.toString()}
              onChange={(e) =>
                handleChange("minimumGpa", Number(e.target.value))
              }
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium">Duration</label>
              <select
                className={SELECT_CLASSES}
                value={formData.duration}
                onChange={(e) =>
                  handleChange("duration", Number(e.target.value))
                }
              >
                {getEnumOptions(InternshipDuration).map((opt) => (
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
              <label className="block text-sm font-medium">
                Technical Skills
              </label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-xl bg-white/50 dark:bg-black/40">
                {getEnumOptions(StudentSkill)
                  .filter((s) => Number(s.value) > 100)
                  .map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => toggleSkill("technicalSkills", s.value)}
                      className={`px-3 py-1 text-xs rounded-full transition ${
                        formData.technicalSkills?.includes(s.value)
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                General Skills
              </label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-xl bg-white/50 dark:bg-black/40">
                {getEnumOptions(VolunteerSkill).map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => toggleSkill("generalSkills", s.value)}
                    className={`px-3 py-1 text-xs rounded-full transition ${
                      formData.generalSkills?.includes(s.value)
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Supervisor & Application */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Supervisor & Application
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Supervisor Name"
              value={formData.supervisorName}
              onChange={(e) => handleChange("supervisorName", e.target.value)}
              required
            />
            <Input
              label="Supervisor Email"
              type="email"
              value={formData.supervisorEmail}
              onChange={(e) => handleChange("supervisorEmail", e.target.value)}
              required
            />
            <Input
              label="Deadline"
              type="datetime-local"
              value={formData.deadlineUtc}
              onChange={(e) => handleChange("deadlineUtc", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPaid}
                onChange={(e) => handleChange("isPaid", e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Paid Internship</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.employmentPossible}
                onChange={(e) =>
                  handleChange("employmentPossible", e.target.checked)
                }
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Employment Possible</span>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-12 text-lg"
        >
          {mutation.isPending
            ? "Publishing..."
            : "Publish Internship Opportunity"}
        </Button>
      </form>
    </Card>
  );
};
