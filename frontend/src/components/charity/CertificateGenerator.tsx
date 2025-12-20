// src/components/charity/CertificateGenerator.tsx
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const volunteers = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const opportunities = [
  { id: '1', title: 'Beach Cleanup' },
  { id: '2', title: 'Food Drive' },
  { id: 'o3', title: 'Winter Clothing Drive' },
];

export const CertificateGenerator = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState('');

  const handleGenerate = () => {
    if (!selectedVolunteer || !selectedOpportunity) {
      alert('Please select a volunteer and an opportunity.');
      return;
    }
    
    // In a real app, you would use a library like jsPDF or react-pdf to generate a certificate.
    alert(`Generating certificate for ${volunteers.find(v => v.id === selectedVolunteer)?.name} for completing ${opportunities.find(o => o.id === selectedOpportunity)?.title}... (This is a placeholder)`);

    console.log({
      volunteer: volunteers.find(v => v.id === selectedVolunteer),
      opportunity: opportunities.find(o => o.id === selectedOpportunity),
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="volunteer" className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Volunteer</label>
          <select
            id="volunteer"
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            className="w-full p-2 border rounded-md bg-transparent mt-1"
          >
            <option value="">-- Select a Volunteer --</option>
            {volunteers.map(volunteer => (
              <option key={volunteer.id} value={volunteer.id}>{volunteer.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="opportunity" className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Opportunity/Initiative</label>
          <select
            id="opportunity"
            value={selectedOpportunity}
            onChange={(e) => setSelectedOpportunity(e.target.value)}
            className="w-full p-2 border rounded-md bg-transparent mt-1"
          >
            <option value="">-- Select an Opportunity --</option>
            {opportunities.map(opportunity => (
              <option key={opportunity.id} value={opportunity.id}>{opportunity.title}</option>
            ))}
          </select>
        </div>

        <Button onClick={handleGenerate} className="w-full">
          Generate PDF Certificate
        </Button>
      </div>
    </Card>
  );
};
