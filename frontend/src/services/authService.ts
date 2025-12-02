import { LoginPayload, RegisterPayload } from '@/types/auth';

export const mockLogin = async (payload: LoginPayload) => {
  // Mock بسيط: بنستنى شوي وبعدين بنرجع user وهمي
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (!payload.email || !payload.password) {
    throw new Error('Missing credentials');
  }

  return {
    id: 'u-1',
    name: 'Nadia Humanova',
    email: payload.email,
    role: 'student' as const
  };
};

export const mockRegister = async (payload: RegisterPayload) => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (!payload.email || !payload.password || !payload.name) {
    throw new Error('Missing required fields');
  }

  return {
    id: 'u-registered',
    ...payload
  };
};
