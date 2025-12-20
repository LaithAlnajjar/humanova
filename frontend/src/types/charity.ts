// src/types/charity.ts
export interface CharityOpportunity {
  id: string;
  title: string;
  type: 'volunteering' | 'internship';
  hours: number;
  status: 'Open' | 'Closed';
}

export interface CharityVolunteer {
  id: string;
  name: string;
  university: string;
  hoursCompleted: number;
}
