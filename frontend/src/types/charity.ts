export interface CharityStats {
  opportunitiesPosted: number;
  applicationsReceived: number;
  volunteersAccepted: number;
  initiativesLaunched: number;
}

export interface Charity {
  id: string;
  name: string;
  email: string;
  // Add other charity-specific fields here
}

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected';

export interface Applicant {
  id: string;
  volunteerName: string;
  opportunityTitle: string;
  status: ApplicationStatus;
}