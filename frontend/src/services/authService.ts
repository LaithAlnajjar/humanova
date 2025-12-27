import {
  LoginPayload,
  RegisterBasePayload,
  AuthResponse,
  AuthUser,
  UserRole,
} from "@/types/auth";
import { UserProfilePayload } from "@/types/registration";

// 1. Point to the API Root (not just /auth) so we can hit /profile too
const API_ROOT = "http://localhost:5022/api";

export interface ComplexRegisterPayload extends RegisterBasePayload {
  profile: UserProfilePayload;
}

// Helper: Map Enum ID to the API Endpoint Slug
const getRoleSlug = (role: UserRole): string => {
  switch (role) {
    case UserRole.Student:
      return "student";
    case UserRole.Company:
      return "company";
    case UserRole.Volunteer:
      return "volunteer";
    case UserRole.Charity:
      return "charity";
    case UserRole.University:
      return "university";
    case UserRole.DisabledStudent:
      return "disabled-student";
    default:
      return "student";
  }
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.title || errorJson.message || "API Error");
    } catch (e) {
      throw new Error(errorText || `HTTP Error ${response.status}`);
    }
  }
  return response.json();
}

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
  const response = await fetch(`${API_ROOT}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await handleResponse<any>(response);

  return {
    // 2. SAFETY FIX: Check all possible casings for the ID
    id: (data.userId || data.id || data.UserId || 0).toString(),
    name: data.fullName,
    email: data.email,
    role: data.role,
    token: data.token,
  };
};

export const register = async (
  payload: ComplexRegisterPayload
): Promise<AuthUser> => {
  // --- STEP 1: Create Base User ---
  const baseResponse = await fetch(`${API_ROOT}/auth/register-base`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    }),
  });

  const baseData = await handleResponse<any>(baseResponse);
  const token = baseData.token;

  // --- STEP 2: Create Specific Profile ---
  // We use the token from Step 1 to authorize this request
  if (payload.profile) {
    const roleSlug = getRoleSlug(payload.role);

    const profileResponse = await fetch(`${API_ROOT}/profile/${roleSlug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use the new token!
      },
      body: JSON.stringify(payload.profile),
    });

    if (!profileResponse.ok) {
      console.error("User created, but profile failed.");
      // Optional: Throw error or allow partial registration
    }
  }

  return {
    // SAFETY FIX REPEATED HERE
    id: (baseData.userId || baseData.id || baseData.UserId || 0).toString(),
    name: baseData.fullName,
    email: baseData.email,
    role: baseData.role,
    token: baseData.token,
  };
};

// Legacy Adapters
export const mockLogin = login;
export const mockRegister = (payload: any) =>
  register(payload as ComplexRegisterPayload);
