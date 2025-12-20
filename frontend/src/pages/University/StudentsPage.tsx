// src/pages/University/StudentsPage.tsx
import React from 'react';
import { StudentTable } from '@/components/university/StudentTable';

export const StudentsPage: React.FC = () => {
  return (
    <div className="space-y-6 px-32">
      <StudentTable />
    </div>
  );
};
