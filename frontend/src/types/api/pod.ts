import {
  AssistanceDuration,
  AssistanceRequestStatus,
  AssistanceType,
  DisabilityType,
} from "../enums";

export interface CreateAssistanceRequest {
  disabilityType: DisabilityType;
  conditionSummary?: string;

  assistanceTypes: AssistanceType[]; // List<AssistanceType>

  duration: AssistanceDuration;
  requiredDays: string;
  expectedHours: number;

  universityName: string; // [Required]
  faculty: string; // [Required]
  specificLocation?: string;

  startDateUtc: string; // DateTime
  endDateUtc?: string; // DateTime?
  preferredTimes?: string;

  medicalReportUrl?: string;
  scheduleFileUrl?: string;

  additionalNotes?: string;
  volunteerInstructions?: string;

  allowAutoMatching: boolean;
}

export interface AssistanceRequestResponse {
  id: number;
  status: AssistanceRequestStatus;
  assistanceTypes: AssistanceType[];
  universityName: string;
  startDateUtc: string;
  // Add other fields if needed for list display
}

export interface DisabledProfileInfo {
  fullName: string;
  university: string;
  major: string;
  phone: string;
  email: string;
}

export interface DisabledStudentProfileCreateRequest {
  universityId: number;
  major: string;
  phoneNumber: string;
  email: string;
  disabilityType: DisabilityType;
  conditionSummary: string;
  preferredTime?: string;
  preferredPlace?: string;
  assistanceNeeds: AssistanceType[];
  photoUrl?: string;
  additionalNotes?: string;
}

// Re-export as PODProfileType for component compatibility if needed, or update component
export type PODProfile = DisabledStudentProfileCreateRequest;
