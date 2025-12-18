import React, { useState } from 'react';
import { runSoftSkillsTest } from '@/services/volunteerService';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Award, Loader } from 'lucide-react';

const SoftSkillsTestPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; awardedBadge: string | null } | null>(null);

  const handleStartTest = async () => {
    setLoading(true);
    setResult(null);
    // Assuming a logged-in volunteer with id 'vol-1'
    const testResult = await runSoftSkillsTest('vol-1');
    setResult(testResult);
    setLoading(false);
  };

  return (
    <div className="space-y-6 px-32">
      <h1 className="text-2xl font-semibold">Soft Skills Assessment</h1>
      <Card className="p-6 text-center">
        <h2 className="text-lg font-medium">Test your soft skills and earn a badge!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          This is a quick assessment to highlight your communication and teamwork abilities.
        </p>
        <Button
          onClick={handleStartTest}
          disabled={loading}
          className="mt-6"
          size="lg"
        >
          {loading ? <><Loader className="mr-2 animate-spin" /> Taking Test...</> : 'Start Assessment'}
        </Button>

        {result && (
          <div className="mt-8 rounded-xl bg-gray-100 p-6 dark:bg-gray-800">
            <h3 className="text-xl font-bold">Your Score: {result.score}%</h3>
            {result.awardedBadge && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-white">
                <Award size={20} />
                <span className="font-semibold">Badge Unlocked: {result.awardedBadge}</span>
              </div>
            )}
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Your excellent score has been noted on your profile.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SoftSkillsTestPage;