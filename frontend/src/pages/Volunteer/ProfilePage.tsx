import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getVolunteerProfile, getBadges } from "@/services/volunteerService";
import { Volunteer, VolunteerBadge } from "@/types/volunteer";
import { Card } from "@/components/ui/Card";
import {
  User,
  Award,
  BarChart2,
  Clock,
  ListChecks,
  XCircle,
  Clock as ClockIcon,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
}> = ({ icon, label, value }) => (
  <Card className="p-4 flex flex-col items-center justify-center text-center">
    {icon}
    <p className="mt-2 text-lg font-semibold">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </Card>
);

const ProfilePage: React.FC = () => {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery<Volunteer>({
    queryKey: ["volunteerProfile"],
    // Assuming a logged-in volunteer with id 'vol-1'
    queryFn: () => getVolunteerProfile("vol-1"),
  });

  const { data: badges, isLoading: badgesLoading } = useQuery<VolunteerBadge[]>(
    {
      queryKey: ["volunteerBadges"],
      queryFn: () => getBadges("vol-1"),
    }
  );

  if (profileLoading || badgesLoading) {
    return <div className="p-6">Loading volunteer profile...</div>;
  }

  if (profileError || !profile) {
    return <div className="p-6 text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="space-y-6 px-32">
      <h1 className="text-2xl font-semibold">My Volunteer Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-gray-200 p-4 dark:bg-gray-700">
                <User size={60} />
              </div>
              <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {profile.university || "No university specified"}
              </p>
              <p className="text-sm text-gray-500">{profile.age} years old</p>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-6">
            <StatCard
              icon={<Clock size={32} />}
              label="Total Hours"
              value={profile.stats.totalHours}
            />
            <StatCard
              icon={<BarChart2 size={32} />}
              label="General Rating"
              value={profile.stats.generalRating}
            />
          </div>
          <Card className="p-6 flex-grow">
            <h3 className="font-semibold mb-3">Commitment</h3>
            <p className="text-lg">{profile.commitment}</p>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.coreSkills.map((skill) => (
                <span key={skill} className="badge">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">My Badges</h3>
            <div className="flex flex-wrap gap-4">
              {badges?.length ? (
                badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="rounded-full bg-yellow-400 p-3 text-white">
                      <Award size={24} />
                    </div>
                    <p className="mt-2 text-sm font-medium">{badge}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No badges earned yet.</p>
              )}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Opportunity History</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/50">
                <CheckCircle className="mx-auto h-8 w-8 text-blue-500" />
                <p className="mt-2 text-xl font-bold">5</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/50">
                <ClockIcon className="mx-auto h-8 w-8 text-yellow-500" />
                <p className="mt-2 text-xl font-bold">2</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/50">
                <XCircle className="mx-auto h-8 w-8 text-red-500" />
                <p className="mt-2 text-xl font-bold">1</p>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/50">
                <ListChecks className="mx-auto h-8 w-8 text-green-500" />
                <p className="mt-2 text-xl font-bold">8</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link to="/dashboard/volunteer/history">
                <Button variant="outline">View Full History</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
