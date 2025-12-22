import { StudentProfile, TrackingLog } from '@/types/student';
import { SupportRequest } from '@/types/pod';

// ===== MOCK DATABASE =====

let MOCK_STUDENT_PROFILE: StudentProfile = {
  id: 'student-01',
  name: 'Ahmad Al-Shareef',
  email: 'ahmad.student@example.com',
  role: 'student',
  faculty: 'King Abdullah II School for Information Technology',
  major: 'CS',
  academicLevel: 3,
  gpa: 3.65,
  studentRating: 4.5,
  softSkills: ['Teamwork', 'Problem Solving', 'Public Speaking'],
  technicalSkills: ['React', 'Node.js', 'Python', 'SQL', 'Docker'],
  internshipHistory: [
    {
      id: 'intern-001',
      company: 'Amazon',
      title: 'Frontend Developer Intern',
      status: 'completed',
      rating: 5,
      type: 'Remote',
    },
    {
      id: 'intern-002',
      company: 'Microsoft',
      title: 'Software Engineer Intern',
      status: 'current',
      type: 'Hybrid',
    },
     {
      id: 'intern-003',
      company: 'Google',
      title: 'Data Science Intern',
      status: 'pending',
      type: 'On-site',
    },
  ],
  trackingLogs: [
    {
      id: 'log-001',
      date: '2025-11-10',
      hours: 4,
      activitySummary: 'Attended a workshop on Advanced React patterns.',
      verified: true,
    },
    {
      id: 'log-002',
      date: '2025-11-12',
      hours: 6,
      activitySummary: 'Volunteered for a community hackathon event.',
      verified: false,
    },
  ],
  portfolio: {
    githubUrl: 'https://github.com/ahmad-alshareef',
    behanceUrl: '',
    cvUrl: '/path/to/cv.pdf',
  },
};

const mockSupportRequests: SupportRequest[] = [
  {
    id: 'req-1',
    podId: 'pod-1',
    category: 'Academic Support',
    description: 'Need help with note-taking in Data Structures lecture.',
    urgency: 'High',
    status: 'Open',
  },
  {
    id: 'req-2',
    podId: 'pod-2',
    category: 'Campus Navigation',
    description: 'I need assistance getting from the library to the science building.',
    urgency: 'Medium',
    status: 'Open',
  },
];

// ===== MOCK SERVICE FUNCTIONS =====

/**
 * Fetches the complete student profile.
 * @returns A promise that resolves to the StudentProfile.
 */
export const getStudentProfile = async (): Promise<StudentProfile> => {
  console.log('Fetching student profile...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_STUDENT_PROFILE;
};

/**
 * Updates the student's profile data.
 * @param updatedProfile - A partial object of the student's profile.
 * @returns A promise that resolves to the updated StudentProfile.
 */
export const updateStudentProfile = async (
  updatedProfile: Partial<StudentProfile>
): Promise<StudentProfile> => {
  console.log('Updating student profile with:', updatedProfile);
  await new Promise(resolve => setTimeout(resolve, 300));
  MOCK_STUDENT_PROFILE = { ...MOCK_STUDENT_PROFILE, ...updatedProfile };
  return MOCK_STUDENT_PROFILE;
};

/**
 * Adds a new training log entry.
 * @param logData - The data for the new tracking log.
 * @returns A promise that resolves to the newly created log.
 */
export const addTrainingLog = async (
  logData: Omit<TrackingLog, 'id' | 'verified'>
): Promise<TrackingLog> => {
  console.log('Adding new training log:', logData);
  await new Promise(resolve => setTimeout(resolve, 250));
  const newLog: TrackingLog = {
    ...logData,
    id: `log-${Date.now()}`,
    verified: false, // All new logs start as unverified
  };
  MOCK_STUDENT_PROFILE.trackingLogs.push(newLog);
  return newLog;
};

/**
 * Toggles the "follow" status of a company.
 * @param companyId - The ID of the company to follow/unfollow.
 * @param isFollowing - The current follow status.
 * @returns A promise that resolves to the new follow status.
 */
export const toggleFollowCompany = async (
  companyId: string,
  isFollowing: boolean
): Promise<boolean> => {
  console.log(`Toggling follow for company ${companyId}. New status: ${!isFollowing}`);
  await new Promise(resolve => setTimeout(resolve, 200));
  // In a real app, this would update a user's followed companies list.
  return !isFollowing;
};

export const getPodSupportRequests = async (): Promise<SupportRequest[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return mockSupportRequests;
};
