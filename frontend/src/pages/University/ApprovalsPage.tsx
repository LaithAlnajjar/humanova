// src/pages/University/ApprovalsPage.tsx
import React from 'react';
import { StudentTable } from '@/components/university/StudentTable';

export const ApprovalsPage: React.FC = () => {
  return <StudentTable initialStatusFilter="Pending" />;
};
