import { 
  UserRole, Gender, AvailabilityType, StudyLevel, 
  DisabilityType, AssociationField, StudentSkill, 
  VolunteerSkill, AssistanceType, University 
} from './enums';

export interface CompanyProfileRequest {
  companyName: string;
  commercialRegistrationNumber: string;
  companyAddress: string;
  industry: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonJobLevel: string;
  contactPersonPhone: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  companyDescription?: string;
  employeeCount?: number;
  logoUrl?: string;
}

export interface StudentProfileRequest {
  universityId: number; 
  major: string;
  studyLevel: StudyLevel;
  universityNumber: string;
  phoneNumber: string;
  universityEmail: string;
  skills: StudentSkill[]; 
  gpa?: number;
  bio?: string;
  linkedInUrl?: string;
  photoUrl?: string;
}

export interface DisabledStudentProfileRequest {
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

export interface VolunteerProfileRequest {
  age: number;
  gender: Gender;
  availability: AvailabilityType;
  governorate: string;
  location: string;
  phoneNumber: string;
  skills: VolunteerSkill[];
}

export interface CharityProfileRequest {
  associationId?: number;
  newAssociation?: {
    name: string;
    licenseNumber: string;
    field: AssociationField;
    address: string;
    email: string;
    phoneNumber: string;
    alternativePhoneNumber?: string;
    websiteUrl?: string;
    facebookUrl?: string;
    activitiesDescription?: string;
    logoUrl?: string;
  };
}

export interface UniversityProfileRequest {
  universityId: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  jobTitle?: string;
}

// Union type for the profile payload
export type UserProfilePayload = 
  | CompanyProfileRequest 
  | StudentProfileRequest 
  | DisabledStudentProfileRequest 
  | VolunteerProfileRequest 
  | CharityProfileRequest 
  | UniversityProfileRequest;
