import React, { useState } from 'react';
import { Opportunity } from '@/types/opportunity';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OpportunityModal } from '@/components/opportunities/OpportunityModal';

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    organization: 'TechCorp',
    type: 'internship',
    location: 'Riyadh, Saudi Arabia',
    skills: ['React', 'Node.js', 'TypeScript'],
    timeCommitment: 'Full-time, 3 months',
    description: 'Work on our flagship product and gain hands-on experience with modern web technologies.',
    isRemote: false,
    internshipType: 'Summer',
  },
  {
    id: '2',
    title: 'Frontend Developer Intern',
    organization: 'Innovate Inc.',
    type: 'internship',
    location: 'Remote',
    skills: ['Vue.js', 'JavaScript', 'CSS'],
    timeCommitment: 'Part-time, 4 months',
    description: 'Join our design system team to build beautiful and reusable UI components.',
    isRemote: true,
    internshipType: 'Part-time',
  },
  {
    id: '3',
    title: 'Community Garden Helper',
    organization: 'Green Earth',
    type: 'volunteering',
    location: 'Jeddah, Saudi Arabia',
    skills: ['Gardening', 'Teamwork'],
    timeCommitment: '5 hours/week',
    description: 'Help us maintain our community garden and grow fresh produce for local families.',
    isRemote: false,
  },
  {
    id: '4',
    title: 'Event Planning Volunteer',
    organization: 'Hope Foundation',
    type: 'volunteering',
    location: 'Dammam, Saudi Arabia',
    skills: ['Event Management', 'Communication'],
    timeCommitment: '10 hours/month',
    description: 'Assist in organizing our annual charity gala to raise funds for underprivileged children.',
    isRemote: false,
  },
  {
    id: '5',
    title: 'Research Assistant',
    organization: 'National University',
    type: 'internship', // University projects can be classified as internships for now
    location: 'Riyadh, Saudi Arabia',
    skills: ['Research', 'Data Analysis', 'Python'],
    timeCommitment: '10 hours/week',
    description: 'Support a research project on the impact of AI in education.',
    isRemote: false,
    major: 'CS',
  },
];

export const OpportunitiesPage: React.FC = () => {
  const [selected, setSelected] = useState<Opportunity | null>(null);

  return (
    <div className="container py-10">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          Explore Our Opportunity Types
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Here are some examples of the diverse opportunities available on Humanova. Sign up to apply!
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_OPPORTUNITIES.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            onOpen={() => setSelected(opp)}
            // Public view should not have actions
            showActions={false}
          />
        ))}
      </div>

      <OpportunityModal
        opportunity={selected}
        onClose={() => setSelected(null)}
        showActions={false}
      />
    </div>
  );
};