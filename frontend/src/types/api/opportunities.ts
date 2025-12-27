import {
  AcceptanceMethod,
  AvailabilityType,
  OpportunityStatus,
  TargetGroup,
  VolunteerActivityType,
  VolunteerDaysType,
  VolunteeringPlaceType,
  VolunteeringType,
} from "../enums";

export interface CreateOrUpdateOpportunityRequest {
  title: string;
  description: string;
  activityType: VolunteerActivityType;
  requiresExperience: boolean;
  volunteeringType: VolunteeringType;
  expectedHours: number;
  daysType: VolunteerDaysType;
  startDateUtc: string; // ISO Date String
  endDateUtc?: string | null; // ISO Date String
  country: string;
  governorateOrCity: string;
  placeType: VolunteeringPlaceType;
  volunteersNeeded: number;
  targetGroup: TargetGroup;
  suitableForDisabled: boolean;
  supportAvailable?: string;
  minimumAge?: number;
  timeCommitmentRequired: AvailabilityType; // Mapped from AvailabilityType enum
  requireDocuments?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  provideCertificate: boolean;
  provideVerifiedHours: boolean;
  provideFieldExperience: boolean;
  provideBadge: boolean;
  applyDeadlineUtc: string; // ISO Date String
  acceptanceMethod: AcceptanceMethod;
  autoCloseWhenFull: boolean;
  skills: string[]; // Sending skills as strings (names)
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
  skills?: { id: number; skill: string }[];
  contactName: string;
  contactEmail: string;
}
