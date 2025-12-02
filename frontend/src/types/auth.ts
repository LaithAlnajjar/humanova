export type UserRole =
  | 'student'
  | 'volunteer'
  | 'charity'
  | 'company'
  | 'university'
  | 'disabled_student';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterBase {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterPayload extends RegisterBase {
  // حقول إضافية حسب الدور (بشكل مبسط)
  organizationName?: string;
  universityName?: string;
  accessibilityNotes?: string;
}
