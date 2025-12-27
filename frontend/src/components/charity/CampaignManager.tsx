import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

// --- STYLING CONSTANTS ---
const SELECT_CLASSES =
  "w-full h-11 rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 pr-10 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-humanova-olive focus:ring-2 focus:ring-humanova-olive/20 dark:border-gray-600 dark:bg-black/40 dark:text-white dark:focus:border-humanova-gold dark:focus:ring-humanova-gold/20";

const OPTION_CLASSES =
  "bg-white text-gray-900 dark:bg-gray-800 dark:text-white";

// Placeholder for the actual API call
const uploadCampaignReport = async (data: any) => {
  console.log("Uploading campaign report:", data);
  // Simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // In a real app, you would handle file uploads and save the report
  return { success: true };
};

const initiatives = [
  { id: "1", title: "Winter Clothing Drive" },
  { id: "2", title: "Food Aid for Families" },
  { id: "3", title: "School Renovation Project" },
];

export const CampaignManager = () => {
  const [selectedInitiative, setSelectedInitiative] = useState("");
  const [report, setReport] = useState("");
  const [photos, setPhotos] = useState<FileList | null>(null);

  const mutation = useMutation({
    mutationFn: uploadCampaignReport,
    onSuccess: () => {
      alert("Campaign report uploaded successfully!");
      // Reset form
      setSelectedInitiative("");
      setReport("");
      setPhotos(null);
    },
    onError: () => {
      alert("Failed to upload campaign report.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInitiative) {
      alert("Please select an initiative.");
      return;
    }

    const formData = new FormData();
    formData.append("initiativeId", selectedInitiative);
    formData.append("report", report);
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }
    }

    // In a real app, you'd pass the formData to the mutation
    mutation.mutate({
      initiativeId: selectedInitiative,
      report,
      photos, // This is just for the console log
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Campaign Documentation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="initiative"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Select Initiative
          </label>
          <select
            id="initiative"
            value={selectedInitiative}
            onChange={(e) => setSelectedInitiative(e.target.value)}
            className={SELECT_CLASSES}
          >
            <option value="" className={OPTION_CLASSES}>
              -- Select an Initiative --
            </option>
            {initiatives.map((initiative) => (
              <option
                key={initiative.id}
                value={initiative.id}
                className={OPTION_CLASSES}
              >
                {initiative.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="photos"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Upload Photos
          </label>
          <input
            id="photos"
            type="file"
            multiple
            onChange={(e) => setPhotos(e.target.files)}
            className="w-full text-sm text-gray-500
                        file:mr-4 file:py-2.5 file:px-4
                        file:rounded-xl file:border-0
                        file:text-sm file:font-semibold
                        file:bg-humanova-olive/10 file:text-humanova-olive
                        dark:file:bg-humanova-gold/10 dark:file:text-humanova-gold
                        hover:file:bg-humanova-olive/20 dark:hover:file:bg-humanova-gold/20
                        transition-all cursor-pointer"
          />
        </div>

        <div>
          <label
            htmlFor="report"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Campaign Report
          </label>
          <textarea
            id="report"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Write a summary of the campaign's progress and impact."
            className={`${SELECT_CLASSES} min-h-[120px] h-auto py-3`}
            rows={6}
          />
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary-600 hover:bg-primary-700 text-black font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-[1.02]"
        >
          {mutation.isPending ? "Uploading..." : "Upload Report"}
        </Button>
      </form>
    </Card>
  );
};
