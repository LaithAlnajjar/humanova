import { AuthUser } from './auth';

// ===== STUDENT PROFILE =====

export type AcademicLevel = 1 | 2 | 3 | 4 | 5;
export type InternshipStatus = 'completed' | 'current' | 'pending';
export type InternshipType = 'On-site' | 'Remote' | 'Hybrid';

export interface InternshipRecord {
  id: string;
  company: string;
  title: string;
  status: InternshipStatus;
  rating?: number; // From 1 to 5
  type: InternshipType;
}

export interface TrackingLog {
  id: string;
  date: string;
  hours: number;
  activitySummary: string;
  verified: boolean;
}

export interface Portfolio {
  githubUrl?: string;
  behanceUrl?: string;
  cvUrl?: string;
}

export interface StudentProfile extends AuthUser {
  role: 'student';
  faculty: string;
  major: 'CS' | 'SE' | 'AI' | 'CIS' | 'CY' | 'BIT';
  academicLevel: AcademicLevel;
  gpa: number;
  studentRating: number; // Overall rating from 1 to 5
  softSkills: string[];
  technicalSkills: string[];
  internshipHistory: InternshipRecord[];
  trackingLogs: TrackingLog[];
  portfolio: Portfolio;
}

// ===== OPPORTUNITIES (for filtering) =====
export interface OpportunityFilterOptions {
  major: ('CS' | 'SE' | 'AI' | 'CIS' | 'CY' | 'BIT')[];
  type: InternshipType[];
}
