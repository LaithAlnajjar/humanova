// src/pages/University/ApprovalsPage.tsx
import React from 'react';
import { StudentTable } from '@/components/university/StudentTable';

export const ApprovalsPage: React.FC = () => {
  return (
    <div className="space-y-6 px-32">
      <StudentTable initialStatusFilter="Pending" />
    </div>
  );
};
