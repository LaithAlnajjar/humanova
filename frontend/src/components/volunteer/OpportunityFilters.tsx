import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

interface Filters {
  category: string;
  location: string;
  hours: string;
  duration: string;
}

interface Props {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onFilter: () => void;
}

const OpportunityFilters: React.FC<Props> = ({ filters, onFilterChange, onFilter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Input
          name="location"
          placeholder="Geographic Location"
          value={filters.location}
          onChange={handleChange}
          className="md:col-span-2"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="input-base w-full dark:bg-gray-800 dark:text-white h-10 px-3"
        >
          <option value="">All Categories</option>
          <option value="Educational">Educational</option>
          <option value="Health">Health</option>
          <option value="Logistical">Logistical</option>
          <option value="Events">Events</option>
        </select>
        <select
          name="duration"
          value={filters.duration}
          onChange={handleChange}
          className="input-base w-full dark:bg-gray-800 dark:text-white h-10 px-3"
        >
          <option value="">All Durations</option>
          <option value="One-day">One-day</option>
          <option value="Continuous">Continuous</option>
        </select>
        <Input
          name="hours"
          type="number"
          placeholder="Max Hours"
          value={filters.hours}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={onFilter}>
          <Search size={18} className="mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default OpportunityFilters;