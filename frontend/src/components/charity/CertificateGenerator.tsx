import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

// --- STYLING CONSTANTS ---
const SELECT_CLASSES =
  "w-full h-11 rounded-xl border border-gray-200 bg-white/50 px-4 pr-10 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-humanova-olive focus:ring-2 focus:ring-humanova-olive/20 dark:border-gray-600 dark:bg-black/40 dark:text-white dark:focus:border-humanova-gold dark:focus:ring-humanova-gold/20";

const OPTION_CLASSES =
  "bg-white text-gray-900 dark:bg-gray-800 dark:text-white";

const volunteers = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

const opportunities = [
  { id: "1", title: "Beach Cleanup" },
  { id: "2", title: "Food Drive" },
  { id: "o3", title: "Winter Clothing Drive" },
];

export const CertificateGenerator = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState("");

  const handleGenerate = () => {
    if (!selectedVolunteer || !selectedOpportunity) {
      alert("Please select a volunteer and an opportunity.");
      return;
    }

    alert(
      `Generating certificate for ${
        volunteers.find((v) => v.id === selectedVolunteer)?.name
      } for completing ${
        opportunities.find((o) => o.id === selectedOpportunity)?.title
      }... (This is a placeholder)`
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        Issue Certificates
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="volunteer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Select Volunteer
          </label>
          <select
            id="volunteer"
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            className={SELECT_CLASSES}
          >
            <option value="" className={OPTION_CLASSES}>
              -- Select a Volunteer --
            </option>
            {volunteers.map((volunteer) => (
              <option
                key={volunteer.id}
                value={volunteer.id}
                className={OPTION_CLASSES}
              >
                {volunteer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="opportunity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Select Opportunity/Initiative
          </label>
          <select
            id="opportunity"
            value={selectedOpportunity}
            onChange={(e) => setSelectedOpportunity(e.target.value)}
            className={SELECT_CLASSES}
          >
            <option value="" className={OPTION_CLASSES}>
              -- Select an Opportunity --
            </option>
            {opportunities.map((opportunity) => (
              <option
                key={opportunity.id}
                value={opportunity.id}
                className={OPTION_CLASSES}
              >
                {opportunity.title}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={handleGenerate}
          className="w-full bg-primary-600 hover:bg-primary-700 text-black font-bold py-3 rounded-lg shadow-lg transform transition hover:scale-[1.02]"
        >
          Generate PDF Certificate
        </Button>
      </div>
    </Card>
  );
};
