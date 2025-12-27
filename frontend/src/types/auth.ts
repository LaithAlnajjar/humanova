import { UserRole } from './enums';

// Maps to C# LoginRequest
export interface LoginPayload {
  email: string;
  password: string;
}

// Maps to C# RegisterBaseRequest
// Used for the initial/simple registration step
export interface RegisterBasePayload {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

// Maps to C# LoginResponse
export interface AuthResponse {
  userId: number;
  fullName: string;
  email: string;
  role: UserRole;
  token: string;
}

// The frontend user object stored in context
export interface AuthUser {
  id: string; // Converted from userId (number)
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export { UserRole }; // Re-export for backward compatibility