
export interface PODProfile {
  id: string;
  disabilityType: string;
  needs: string[];
  university: string;
  major: string;
}

export interface VolunteerMatch {
  id: string;
  name: string;
  location: string;
  skills: string[];
}

export interface Rating {
  id:string;
  volunteerId: string;
  rating: number;
  comment: string;
}

export interface SupportRequest {
  id: string;
  podId: string;
  category: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
}
