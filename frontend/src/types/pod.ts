import { DisabilityType, AssistanceType } from "./enums";

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
