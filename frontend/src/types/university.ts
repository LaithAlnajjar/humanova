// src/types/university.ts
export interface UniversityStudent {
  id: string;
  name: string;
  faculty: string;
  major: string;
  level: number;
  internship: {
    location: string;
    position: string;
    weeklyHours: number;
    companyRating: number;
    status: 'Pending' | 'Approved' | 'Rejected';
  } | null;
}
