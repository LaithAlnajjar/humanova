import { InternshipType } from './student';

export type OpportunityType = 'volunteering' | 'internship' | 'support';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  location: string;
  skills: string[];
  timeCommitment: string;
  description: string;
  isRemote: boolean;
  major?: 'CS' | 'SE' | 'AI' | 'CIS' | 'CY' | 'BIT';
  internshipType?: InternshipType;
}
