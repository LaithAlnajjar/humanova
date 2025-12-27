import { 
  LoginPayload, 
  RegisterBasePayload, 
  AuthResponse, 
  AuthUser 
} from '@/types/auth';
import { UserProfilePayload } from '@/types/registration';

const API_BASE = '/api/auth';

// Combined payload for the "Complex" registration
export interface ComplexRegisterPayload extends RegisterBasePayload {
  profile: UserProfilePayload;
}

// Helper to handle HTTP errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    // Try to parse JSON error if possible, otherwise use text
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.title || errorJson.message || 'API Error');
    } catch (e) {
      throw new Error(errorText || `HTTP Error ${response.status}`);
    }
  }
  return response.json();
}

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await handleResponse<AuthResponse>(response);

  // Map backend response to frontend AuthUser
  return {
    id: data.userId.toString(),
    name: data.fullName,
    email: data.email,
    role: data.role, // Now an integer (Enum), matches strict typing
    token: data.token,
  };
};

export const register = async (payload: ComplexRegisterPayload): Promise<AuthUser> => {
  // We send the 'profile' object as a "JsonElement" to the backend
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      profile: payload.profile 
    }),
  });

  const data = await handleResponse<AuthResponse>(response);

  return {
    id: data.userId.toString(),
    name: data.fullName,
    email: data.email,
    role: data.role,
    token: data.token,
  };
};

// --- Legacy Adapters (Optional: Keep these if other files still reference mocks) ---
export const mockLogin = login;
export const mockRegister = (payload: any) => register(payload as ComplexRegisterPayload);