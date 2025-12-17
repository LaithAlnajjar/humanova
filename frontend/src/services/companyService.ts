// src/services/companyService.ts
import {
  InternshipPost,
  Applicant,
  Supervisor,
  CompanyStats,
  ApplicationStatus,
} from "../types/company";

// --- Helper to generate unique IDs ---
const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
const uuid = () => `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;


// Mock Database
const mockInternships: InternshipPost[] = [];
const mockApplicants: Applicant[] = [];
const mockSupervisors: Supervisor[] = [
  {
    id: "sup1",
    name: "Dr. Evelyn Reed",
    email: "e.reed@company.com",
    assignedInterns: 2,
  },
  {
    id: "sup2",
    name: "Markus Shaw",
    email: "m.shaw@company.com",
    assignedInterns: 3,
  },
];

// Utility to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCompanyStats = async (): Promise<CompanyStats> => {
  await delay(500);
  return {
    finishedInternships: 12,
    currentInternships: 5,
    pendingApplications: mockApplicants.filter((a) => a.status === "Pending")
      .length,
  };
};

export const postInternship = async (
  post: Omit<InternshipPost, "id" | "postedAt">
): Promise<InternshipPost> => {
  await delay(1000);
  const newPost: InternshipPost = {
    ...post,
    id: uuid(),
    postedAt: new Date(),
  };
  mockInternships.push(newPost);
  return newPost;
};

const mockStudentNames = [
    "John Doe", "Jane Smith", "Peter Jones", "Mary Williams", "David Brown", "Susan Davis", "Michael Miller"
];
const mockStatuses: ApplicationStatus[] = ['Pending', 'Interview', 'Accepted', 'Rejected'];

export const getApplicants = async (): Promise<Applicant[]> => {
  await delay(800);
  // Generate some mock applicants if empty
  if (mockApplicants.length === 0) {
    for (let i = 0; i < 7; i++) {
      mockApplicants.push({
        id: uuid(),
        studentId: uuid(),
        studentName: mockStudentNames[i % mockStudentNames.length],
        internshipId: "int1",
        internshipTitle: "Frontend Developer Intern",
        status: mockStatuses[i % mockStatuses.length],
        applicationDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30), // random date in last 30 days
        resumeUrl: "/path/to/mock-cv.pdf",
      });
    }
  }
  return [...mockApplicants];
};

export const updateApplicationStatus = async (
  applicantId: string,
  status: ApplicationStatus
): Promise<Applicant> => {
  await delay(500);
  const applicant = mockApplicants.find((a) => a.id === applicantId);
  if (!applicant) {
    throw new Error("Applicant not found");
  }
  applicant.status = status;
  return { ...applicant };
};

export const getSupervisors = async (): Promise<Supervisor[]> => {
  await delay(700);
  return [...mockSupervisors];
};

export const addSupervisor = async (
  name: string,
  email: string
): Promise<Supervisor> => {
  await delay(1000);
  const newSupervisor: Supervisor = {
    id: uuid(),
    name,
    email,
    assignedInterns: 0,
  };
  mockSupervisors.push(newSupervisor);
  return newSupervisor;
};

// Mock function for rating a student
export const rateStudent = async (
  studentId: string,
  rating: number,
  feedback: string
): Promise<{ success: boolean }> => {
  await delay(1000);
  console.log(
    `Rated student ${studentId} with ${rating} stars. Feedback: "${feedback}"`
  );
  return { success: true };
};
