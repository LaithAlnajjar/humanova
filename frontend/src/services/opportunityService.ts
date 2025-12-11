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
    isRemote: false,
    major: 'SE',
    internshipType: 'On-site',
  },
    {
    id: '4',
    title: 'Frontend Internship (React)',
    organization: 'Amazon',
    type: 'internship',
    location: 'Remote',
    skills: ['React', 'TypeScript', 'HTML/CSS'],
    timeCommitment: 'Full-time · 6 months',
    description: 'Work on a customer-facing product using modern React and TypeScript.',
    isRemote: true,
    major: 'CS',
    internshipType: 'Remote',
  },
  {
    id: '5',
    title: 'Data Science Internship',
    organization: 'Microsoft',
    type: 'internship',
    location: 'Amman · Hybrid',
    skills: ['Python', 'Pandas', 'SQL'],
    timeCommitment: 'Part-time · 4 months',
    description: 'Analyze user data to derive insights and inform product decisions.',
    isRemote: false,
    major: 'AI',
    internshipType: 'Hybrid',
  },
];

export const fetchOpportunities = async (): Promise<Opportunity[]> => {
  await new Promise((r) => setTimeout(r, 500));
  return MOCK_OPPORTUNITIES;
};
