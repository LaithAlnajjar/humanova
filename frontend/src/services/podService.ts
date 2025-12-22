import { PODProfile, VolunteerMatch, Rating, SupportRequest } from '../types/pod';

const API_URL = '/api/pod';

export const getPODProfile = async (id: string): Promise<PODProfile> => {
  // Replace with actual API call
  return Promise.resolve({
    id,
    disabilityType: 'Visual Impairment',
    needs: ['Note-taking', 'Transportation'],
    university: 'Example University',
    major: 'Computer Science',
  });
};

export const updatePODProfile = async (profile: PODProfile): Promise<PODProfile> => {
  // Replace with actual API call
  return Promise.resolve(profile);
};

export const getVolunteerMatches = async (id: string): Promise<VolunteerMatch[]> => {
  // Replace with actual API call
  return Promise.resolve([
    { id: '1', name: 'John Doe', location: 'Nearby', skills: ['Note-taking'] },
    { id: '2', name: 'Jane Smith', location: 'City Center', skills: ['Transportation'] },
  ]);
};

export const submitRating = async (rating: Rating): Promise<Rating> => {
  // Replace with actual API call
  return Promise.resolve(rating);
};

export const createSupportRequest = async (supportRequest: Omit<SupportRequest, 'id' | 'podId' | 'status'>): Promise<SupportRequest> => {
  // Replace with actual API call
  console.log('Submitting support request:', supportRequest);
  return Promise.resolve({
    id: new Date().toISOString(),
    podId: 'pod1', // Assuming a logged in POD user
    ...supportRequest,
    status: 'Open',
  });
};
