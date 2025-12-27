// Mapped from C# HumanOvaa.Enums

export enum UserRole {
  Student = 1,
  Volunteer = 2,
  Charity = 3,
  Company = 4,
  University = 5,
  DisabledStudent = 6,
}

export enum Gender {
  Male = 1,
  Female = 2,
}

export enum StudyLevel {
  Year1 = 1,
  Year2 = 2,
  Year3 = 3,
  Year4 = 4,
  Year5 = 5,
  Year6 = 6,
  Year7 = 7,
}

export enum DisabilityType {
  Visual = 1,
  Hearing = 2,
  Mobility = 3,
  Learning = 4,
  Speech = 5,
  Other = 6,
  Physical = 7,
}

export enum AssociationField {
  Educational = 1,
  Health = 2,
  Social = 3,
  Relief = 4,
}

export enum StudentSkill {
  Communication = 1,
  Teamwork = 2,
  Leadership = 3,
  TimeManagement = 4,
  // Technical
  Programming = 101,
  WebDevelopment = 102,
  DataAnalysis = 103,
  UIUX = 104,
  TechnicalSupport = 105,
  Databases = 106,
  CSharp = 107,
}

export enum AssistanceType {
  Accompaniment = 1,
  NoteTaking = 2,
  Transportation = 3,
  AcademicSupport = 4,
  CampusEscort = 5,
  TechnicalSupport = 6,
  ExamAssistance = 7,
}

export enum University {
  // Public
  UniversityOfJordan = 1,
  YarmoukUniversity = 2,
  MutahUniversity = 3,
  JordanUniversityOfScienceAndTechnology = 4,
  HashemiteUniversity = 5,
  AlAlBaytUniversity = 6,
  AlBalqaAppliedUniversity = 7,
  AlHusseinBinTalalUniversity = 8,
  TafilaTechnicalUniversity = 9,
  GermanJordanianUniversity = 10,
  // Private
  AppliedSciencePrivateUniversity = 101,
  AlAhliyyaAmmanUniversity = 102,
  PhiladelphiaUniversity = 103,
  IsraUniversity = 104,
  PetraUniversity = 105,
  AlZaytoonahUniversityOfJordan = 106,
  MiddleEastUniversity = 107,
  JadaraUniversity = 108,
  AmmanArabUniversity = 109,
}

export enum VolunteerActivityType {
  Educational = 0,
  Health = 1,
  Social = 2,
  Relief = 3,
  Logistics = 4,
  Events = 5,
}

export enum VolunteerDaysType {
  FixedDays = 0,
  Flexible = 1,
}

export enum VolunteeringPlaceType {
  AssociationHQ = 0,
  Field = 1,
  Remote = 2,
}

export enum VolunteeringType {
  OneDay = 0,
  MultipleDays = 1,
  Ongoing = 2,
}

export enum VolunteerSkill {
  Communication = 1,
  SocialWork = 2,
  Logistics = 3,
  TechnicalSupport = 4,
  EventManagement = 5,
  Teaching = 6,
  FieldWork = 7,
  Administration = 8,
  Teamwork = 9,
}

export enum TargetGroup {
  Students = 0,
  Graduates = 1,
  Anyone = 2,
}

export enum OpportunityStatus {
  Draft = 0,
  Published = 1,
  Closed = 2,
}

export enum AcceptanceMethod {
  Instant = 0,
  Review = 1,
}

export enum AvailabilityType {
  FullTime = 1,
  PartTime = 2,
  WeekendsOnly = 3,
}

export enum AttendanceType {
  Remote = 0,
  Onsite = 1,
  Hybrid = 2,
}

export enum InternshipDuration {
  OneMonth = 0,
  TwoMonths = 1,
  ThreeMonths = 2,
  MoreThanThree = 3,
}

export enum ReviewMethod {
  FileOnly = 0,
  Interview = 1,
  SimpleTest = 2,
}

export interface InternshipListResponse {
  id: number;
  title: string;
  attendanceType: AttendanceType;
  requiredMajor: string;
  isPaid: boolean;
  deadlineUtc: string;
  seatsAvailable: number;
  acceptedCount: number;
  // Note: Description and CompanyName are NOT in the List projection from backend yet
}

export interface InternshipFilters {
  major?: string;
  attendanceType?: string; // string because selects usually handle strings
  isPaid?: string; // 'true' | 'false' | ''
}
