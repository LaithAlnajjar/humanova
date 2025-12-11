import React from 'react';
import { StudentProfileView } from '@/components/profile/StudentProfileView';

const StudentProfilePage: React.FC = () => {
  return (
    <div className="container py-10">
      <StudentProfileView />
    </div>
  );
};

export default StudentProfilePage;
