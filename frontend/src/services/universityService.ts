// src/services/universityService.ts
import { UniversityStudent } from '@/types/university';

const students: UniversityStudent[] = [
  {
    id: '1',
    name: 'Ahmed Al-Farsi',
    faculty: 'Engineering',
    major: 'Computer Science',
    level: 4,
    internship: {
      location: 'Tech Solutions Inc.',
      position: 'Software Engineer Intern',
      weeklyHours: 40,
      companyRating: 4.5,
      status: 'Pending',
    },
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    faculty: 'Business',
    major: 'Marketing',
    level: 3,
    internship: {
      location: 'Marketing Pro',
      position: 'Marketing Intern',
      weeklyHours: 30,
      companyRating: 4.2,
      status: 'Approved',
    },
  },
  {
    id: '3',
    name: 'Hassan Al-Balushi',
    faculty: 'Engineering',
    major: 'Mechanical Engineering',
    level: 5,
    internship: {
      location: 'Oman LNG',
      position: 'Mechanical Intern',
      weeklyHours: 40,
      companyRating: 4.8,
      status: 'Rejected',
    },
  },
  {
    id: '4',
    name: 'Salma Al-Habsi',
    faculty: 'Science',
    major: 'Biology',
    level: 2,
    internship: null,
  },
];

export const getStudents = async (): Promise<UniversityStudent[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(students);
    }, 500);
  });
};

export const updateInternshipStatus = async (studentId: string, status: 'Approved' | 'Rejected'): Promise<UniversityStudent> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = students.find(s => s.id === studentId);
      if (student && student.internship) {
        student.internship.status = status;
        resolve(student);
      } else {
        reject(new Error('Student not found or has no internship.'));
      }
    }, 300);
  });
};
