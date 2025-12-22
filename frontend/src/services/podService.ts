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

export const getPodSupportRequests = async (): Promise<SupportRequest[]> => {
  // Replace with actual API call
  return Promise.resolve([
    { id: '1', podId: 'pod1', volunteerId: 'vol1', category: 'Academic Support', description: 'Need help with note taking for biology class.', urgency: 'High', status: 'Closed' },
    { id: '2', podId: 'pod1', volunteerId: 'vol2', category: 'Transportation', description: 'Need a ride to a doctor appointment.', urgency: 'Medium', status: 'Closed' },
    { id: '3', podId: 'pod1', category: 'Daily Living', description: 'Grocery shopping assistance.', urgency: 'Low', status: 'Open' },
  ]);
};

export const getCompletedHelpRequests = async (): Promise<SupportRequest[]> => {
    const requests = await getPodSupportRequests();
    return requests.filter(request => request.status === 'Closed');
};
