import {
  Volunteer,
  VolunteerOpportunity,
  Application,
  VolunteerBadge,
} from "@/types/volunteer";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockVolunteers: Volunteer[] = [
  {
    id: "vol-1",
    name: "Ali Ahmed",
    age: 22,
    university: "University of Knowledge",
    coreSkills: ["Communication", "Teamwork", "First Aid"],
    commitment: "Weekends",
    stats: {
      totalHours: 120,
      generalRating: 4.8,
    },
  },
];

const mockOpportunities: VolunteerOpportunity[] = [
  {
    id: "opp-1",
    title: "Teach English to Orphans",
    entity: "Hope Foundation",
    category: "Educational",
    location: "City Center",
    hours: 40,
    duration: "Continuous",
    description: "A fulfilling role to teach basic English skills to children.",
  },
  {
    id: "opp-2",
    title: "Beach Cleanup Drive",
    entity: "Green Earth Org",
    category: "Events",
    location: "Public Beach",
    hours: 8,
    duration: "One-day",
    description: "Join us for a one-day event to clean our beautiful beaches.",
  },
  {
    id: "opp-3",
    title: "Hospital Patient Support",
    entity: "City General Hospital",
    category: "Health",
    location: "City Hospital",
    hours: 60,
    duration: "Continuous",
    description:
      "Assist patients with non-medical needs and provide companionship.",
  },
];

const mockApplications: Application[] = [
  {
    id: "app-1",
    opportunity: mockOpportunities[0],
    status: "Accepted",
    appliedAt: new Date("2025-11-10"),
  },
  {
    id: "app-2",
    opportunity: mockOpportunities[1],
    status: "Completed",
    appliedAt: new Date("2025-10-05"),
  },
];

export const getVolunteerProfile = async (id: string): Promise<Volunteer> => {
  await delay(500);
  const volunteer = mockVolunteers.find((v) => v.id === id);
  if (!volunteer) throw new Error("Volunteer not found");
  return volunteer;
};

export const getOpportunities = async (): Promise<VolunteerOpportunity[]> => {
  await delay(700);
  return mockOpportunities;
};

export const getApplications = async (
  volunteerId: string
): Promise<Application[]> => {
  await delay(600);
  console.log(`Fetching applications for volunteer ${volunteerId}`);
  return mockApplications;
};

export const applyForOpportunity = async (
  volunteerId: string,
  opportunityId: string
): Promise<Application> => {
  await delay(1000);
  const opportunity = mockOpportunities.find((o) => o.id === opportunityId);
  if (!opportunity) throw new Error("Opportunity not found");

  const newApplication: Application = {
    id: `app-${Date.now()}`,
    opportunity,
    status: "Pending",
    appliedAt: new Date(),
  };
  mockApplications.push(newApplication);
  console.log(`Volunteer ${volunteerId} applied for ${opportunity.title}`);
  return newApplication;
};

export const getBadges = async (
  volunteerId: string
): Promise<VolunteerBadge[]> => {
  await delay(300);
  console.log(`Fetching badges for volunteer ${volunteerId}`);
  // Mock logic: give badges based on hours
  const volunteer = mockVolunteers.find((v) => v.id === "vol-1");
  const badges: VolunteerBadge[] = [];
  if (volunteer && volunteer.stats.totalHours > 100)
    badges.push("Distinguished Volunteer");
  if (volunteer && volunteer.stats.totalHours > 50) badges.push("Committed");
  badges.push("Active");
  return badges;
};

export const runSoftSkillsTest = async (
  volunteerId: string
): Promise<{ score: number; awardedBadge: VolunteerBadge | null }> => {
  await delay(1500);
  console.log(`Running soft skills test for ${volunteerId}`);
  const score = Math.floor(Math.random() * (95 - 75 + 1) + 75); // Random score between 75-95
  const awardedBadge: VolunteerBadge | null =
    score > 90 ? "Distinguished Volunteer" : null;
  return { score, awardedBadge };
};
