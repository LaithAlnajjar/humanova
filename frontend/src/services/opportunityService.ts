import { Opportunity } from '@/types/opportunity';

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'On-campus accessibility buddy',
    organization: 'Humanova x Hashemite University',
    type: 'support',
    location: 'Zarqa · On campus',
    skills: ['Communication', 'Patience'],
    timeCommitment: '2h / week',
    description:
      'Support a fellow student with mobility or vision challenges in getting to classes and labs.',
    isRemote: false
  },
  {
    id: '2',
    title: 'STEM mentoring for school students',
    organization: 'Future Coders NGO',
    type: 'volunteering',
    location: 'Amman · Hybrid',
    skills: ['Java', 'Teaching', 'Problem solving'],
    timeCommitment: '4h / week',
    description:
      'Lead a small group of school students through basic programming and problem-solving sessions.',
    isRemote: true
  },
  {
    id: '3',
    title: 'Backend internship — Java / Spring Boot',
    organization: 'Globitel',
    type: 'internship',
    location: 'Amman Business Park · On site',
    skills: ['Java', 'Spring Boot', 'REST APIs'],
    timeCommitment: 'Full-time · 3 months',
    description:
      'Join the engineering team to build and maintain APIs with Java and Spring Boot in a real product.',
    isRemote: false
  }
];

export const fetchOpportunities = async (): Promise<Opportunity[]> => {
  await new Promise((r) => setTimeout(r, 500));
  return MOCK_OPPORTUNITIES;
};
