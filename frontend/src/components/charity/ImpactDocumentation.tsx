// src/components/charity/ImpactDocumentation.tsx
import React from 'react';
import { Card } from '../ui/Card';

// Mock data for impact
const impactData = {
  volunteersEngaged: 150,
  hoursContributed: 2500,
  fundsRaised: 75000,
  peopleHelped: 500,
};

export const ImpactDocumentation = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Our Impact</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-humanova-olive dark:text-humanova-gold">
            {impactData.volunteersEngaged}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Volunteers Engaged</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-humanova-olive dark:text-humanova-gold">
            {impactData.hoursContributed.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Hours Contributed</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-humanova-olive dark:text-humanova-gold">
            ${impactData.fundsRaised.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Funds Raised</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-humanova-olive dark:text-humanova-gold">
            {impactData.peopleHelped}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">People Helped</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Recent Campaign Highlight</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Our 'Winter Clothing Drive' successfully collected over 300 jackets for those in need, thanks to the amazing efforts of our volunteers.
        </p>
      </div>
    </Card>
  );
};
