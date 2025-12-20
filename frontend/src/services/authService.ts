import { LoginPayload, RegisterPayload, UserRole } from '@/types/auth';

export const mockLogin = async (payload: LoginPayload) => {
  // Mock بسيط: بنستنى شوي وبعدين بنرجع user وهمي
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (!payload.email || !payload.password) {
    throw new Error('Missing credentials');
  }

  let role: UserRole = 'student';
  const emailPrefix = payload.email.split('@')[0];
  const allRoles: UserRole[] = ['student', 'volunteer', 'charity', 'company', 'university', 'disabled_student'];

  if (allRoles.includes(emailPrefix as UserRole)) {
    role = emailPrefix as UserRole;
  }

  return {
    id: 'u-1',
    name: 'Nadia Humanova',
    email: payload.email,
    role: role
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
