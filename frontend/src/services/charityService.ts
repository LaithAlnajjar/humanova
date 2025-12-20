import { CharityStats, Applicant, ApplicationStatus } from '../types/charity';

const mockApplicants: Applicant[] = [
  { id: '1', volunteerName: 'Alice', opportunityTitle: 'Beach Cleanup', status: 'Pending' },
  { id: '2', volunteerName: 'Bob', opportunityTitle: 'Food Drive', status: 'Accepted' },
  { id: '3', volunteerName: 'Charlie', opportunityTitle: 'Beach Cleanup', status: 'Rejected' },
];

// Mock API client
const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    console.log(`Fetching from ${url}`);
    if (url.endsWith('/stats')) {
      return {
        opportunitiesPosted: 12,
        applicationsReceived: 85,
        volunteersAccepted: 23,
        initiativesLaunched: 5,
      } as T;
    }
    if (url.endsWith('/applicants')) {
      return mockApplicants as T;
    }
    return {} as T;
  },
  post: async <T>(url: string, data: any): Promise<T> => {
    console.log(`Posting to ${url}`, data);
    if (url.endsWith('/opportunity')) {
      return { success: true } as T;
    }
    if (url.includes('/update-status')) {
      const { applicantId, status } = data;
      const applicant = mockApplicants.find(a => a.id === applicantId);
      if (applicant) {
        applicant.status = status;
      }
      return { success: true } as T;
    }
    return { success: false } as T;
  }
};

export const getCharityStats = async (): Promise<CharityStats> => {
  return await apiClient.get<CharityStats>('/api/charity/stats');
};

export const getApplicants = async (): Promise<Applicant[]> => {
  return await apiClient.get<Applicant[]>('/api/charity/applicants');
};

export const updateApplicationStatus = async (applicantId: string, status: ApplicationStatus): Promise<{success: boolean}> => {
  return await apiClient.post<{success: boolean}>(`/api/charity/update-status`, { applicantId, status });
};

export const postOpportunity = async (data: any): Promise<{success: boolean}> => {
  return await apiClient.post<{success: boolean}>('/api/charity/opportunity', data);
};
