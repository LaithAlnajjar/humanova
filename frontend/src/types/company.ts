// src/types/company.ts

export interface InternshipPost {
  id: string;
  title: string;
  hours: number;
  requiredMajor: string;
  requiredSkills: string[];
  duration: string; // e.g., "3 Months"
  postedAt: Date;
}

export type ApplicationStatus = 'Pending' | 'Interview' | 'Accepted' | 'Rejected';

export interface Applicant {
  id: string;
  studentId: string;
  studentName: string;
  internshipId: string;
  internshipTitle: string;
  status: ApplicationStatus;
  applicationDate: Date;
  resumeUrl?: string; // Link to student's CV
}

export interface Supervisor {
  id: string;
  name: string;
  email: string;
  assignedInterns: number;
}

export interface CompanyStats {
  finishedInternships: number;
  currentInternships: number;
  pendingApplications: number;
}
