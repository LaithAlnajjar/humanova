import React, { useState, useEffect } from 'react';
import { getVolunteerMatches } from '@/services/podService';
import { VolunteerMatch } from '@/types/pod';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const VolunteerMatcher: React.FC = () => {
  const [matches, setMatches] = useState<VolunteerMatch[]>([]);

  useEffect(() => {
    // Fetch matches - using a placeholder for user ID
    getVolunteerMatches('current-user').then(setMatches);
  }, []);

  return (
    <div className="space-y-4">
      {matches.length > 0 ? (
        matches.map((match) => (
          <Card key={match.id} className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{match.name}</h3>
              <p className="text-sm text-gray-500">{match.location}</p>
              <div className="flex gap-2 mt-2">
                {match.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-gray-200 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button>Request Help</Button>
          </Card>
        ))
      ) : (
        <p>No volunteer matches found.</p>
      )}
    </div>
  );
};
