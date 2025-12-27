import {
  AcceptanceMethod,
  OpportunityStatus,
  TargetGroup,
  VolunteerActivityType,
  VolunteerDaysType,
  VolunteeringPlaceType,
  VolunteeringType,
  VolunteerSkill, // Import this
} from "../enums";

export interface CreateOrUpdateOpportunityRequest {
  title: string;
  description: string;
  activityType: VolunteerActivityType;
  requiresExperience: boolean;
  volunteeringType: VolunteeringType;
  expectedHours: number;
  daysType: VolunteerDaysType;
  startDateUtc: string;
  endDateUtc?: string | null;
  country: string;
  governorateOrCity: string;
  placeType: VolunteeringPlaceType;
  volunteersNeeded: number;
  targetGroup: TargetGroup;
  suitableForDisabled: boolean;
  supportAvailable?: string;
  minimumAge?: number;
  timeCommitmentRequired: boolean;
  requireDocuments?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  provideCertificate: boolean;
  provideVerifiedHours: boolean;
  provideFieldExperience: boolean;
  provideBadge: boolean;
  applyDeadlineUtc: string;
  acceptanceMethod: AcceptanceMethod;
  autoCloseWhenFull: boolean;
  skills: VolunteerSkill[]; // FIXED: Now strictly typed as Enum array
}

export interface OpportunityResponse {
  id: number;
  title: string;
  description: string;
  status: OpportunityStatus;
  activityType: VolunteerActivityType;
  volunteeringType: VolunteeringType;
  placeType: VolunteeringPlaceType;
  country: string;
  governorateOrCity: string;
  volunteersNeeded: number;
  acceptedCount: number;
  applyDeadlineUtc: string;
  startDateUtc: string;
  publishedUtc?: string;
  skills?: { id: number; skill: VolunteerSkill }[];
  contactName: string;
  contactEmail: string;
}
