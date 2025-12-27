import {
  AttendanceType,
  InternshipDuration,
  OpportunityStatus,
  ReviewMethod,
  StudentSkill,
  StudyLevel,
  VolunteerSkill, // Reused from Volunteer Enums as per C# DTO
} from "../enums";

export interface CreateInternshipRequest {
  title: string;
  description: string;
  attendanceType: AttendanceType;
  requiredMajor: string;
  minimumGpa?: number;
  duration: InternshipDuration;
  weeklyHours: number;
  minStudyLevel: StudyLevel;
  maxStudyLevel: StudyLevel;
  country: string;
  locationText?: string;
  companyAddressUrl?: string;
  isPaid: boolean;
  employmentPossible: boolean;
  requireCv: boolean;
  requireLinkedIn: boolean;
  requireCoverLetter: boolean;
  supervisorName: string;
  supervisorJobLevel: string;
  supervisorEmail: string;
  seatsAvailable: number;
  deadlineUtc: string; // ISO Date String
  reviewMethod: ReviewMethod;
  onlyPartnerUniversities: boolean;
  autoCloseWhenFull: boolean;

  // Lists
  generalSkills: VolunteerSkill[];
  technicalSkills: StudentSkill[];
  allowedUniversityIds: number[];
}

export interface InternshipResponse {
  id: number;
  title: string;
  description: string;
  status: OpportunityStatus;
  attendanceType: AttendanceType;
  requiredMajor: string;
  isPaid: boolean;
  seatsAvailable: number;
  acceptedCount: number;
  deadlineUtc: string;
  // Add other fields as needed for list/details views
}
