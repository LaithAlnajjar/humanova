import React from 'react';
import { StudentProfile } from '@/types/student';
import { Card } from '@/components/ui/Card';

interface InfoSectionProps {
  profile: StudentProfile;
}

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{value}</p>
  </div>
);

export const InfoSection: React.FC<InfoSectionProps> = ({ profile }) => {
  return (
    <Card>
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-humanova-olive text-2xl font-bold text-white dark:bg-humanova-gold dark:text-black">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">{profile.name}</h1>
          <p className="text-xs text-gray-600 dark:text-gray-300">{profile.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-gray-200 p-4 dark:border-gray-700 sm:grid-cols-4">
        <InfoItem label="Faculty" value={profile.faculty} />
        <InfoItem label="Major" value={profile.major} />
        <InfoItem label="GPA" value={profile.gpa.toFixed(2)} />
        <InfoItem label="Academic Level" value={`Year ${profile.academicLevel}`} />
      </div>
    </Card>
  );
};
