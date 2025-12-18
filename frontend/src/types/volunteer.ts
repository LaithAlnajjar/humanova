export interface Volunteer {
  id: string;
  name: string;
  age: number;
  university?: string;
  coreSkills: string[];
  commitment: 'Full-time' | 'Part-time' | 'Weekends';
  stats: {
    totalHours: number;
    generalRating: number;
  };
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  entity: string; // Association/NGO
  category: 'Educational' | 'Health' | 'Logistical' | 'Events';
  location: string;
  hours: number;
  duration: 'One-day' | 'Continuous';
  description: string;
}

export interface Application {
  id: string;
  opportunity: VolunteerOpportunity;
  status: 'Accepted' | 'Rejected' | 'Pending' | 'Completed';
  appliedAt: Date;
}

export type VolunteerBadge = 'Distinguished Volunteer' | 'Active' | 'Committed';