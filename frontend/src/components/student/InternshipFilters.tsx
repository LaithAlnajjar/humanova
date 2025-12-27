import React from "react";
import { Search } from "lucide-react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";

interface Props {
  filters: {
    major: string;
    attendanceType: string;
    isPaid: string;
  };
  onFilterChange: (filters: any) => void;
}

const SELECT_CLASSES =
  "h-11 w-full rounded-xl border border-gray-200 bg-white/50 px-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white";

const InternshipFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-4 mb-6 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Major (e.g. CS)"
            value={filters.major}
            onChange={(e) => handleChange("major", e.target.value)}
            className={`${SELECT_CLASSES} pl-10`}
          />
        </div>

        <select
          value={filters.attendanceType}
          onChange={(e) => handleChange("attendanceType", e.target.value)}
          className={SELECT_CLASSES}
        >
          <option value="">All Attendance Types</option>
          <option value="0">Remote</option>
          <option value="1">Onsite</option>
          <option value="2">Hybrid</option>
        </select>

        <select
          value={filters.isPaid}
          onChange={(e) => handleChange("isPaid", e.target.value)}
          className={SELECT_CLASSES}
        >
          <option value="">Any Payment</option>
          <option value="true">Paid Only</option>
          <option value="false">Unpaid</option>
        </select>

        {/* Clear Button */}
        <button
          onClick={() =>
            onFilterChange({ major: "", attendanceType: "", isPaid: "" })
          }
          className="text-sm text-gray-500 hover:text-primary-600 underline"
        >
          Clear Filters
        </button>
      </div>
    </Card>
  );
};

export default InternshipFilters;
