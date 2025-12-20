// src/components/charity/CampaignManager.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// Placeholder for the actual API call
const uploadCampaignReport = async (data: any) => {
  console.log('Uploading campaign report:', data);
  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you would handle file uploads and save the report
  return { success: true };
};

const initiatives = [
  { id: '1', title: 'Winter Clothing Drive' },
  { id: '2', title: 'Food Aid for Families' },
  { id: '3', title: 'School Renovation Project' },
];

export const CampaignManager = () => {
  const [selectedInitiative, setSelectedInitiative] = useState('');
  const [report, setReport] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);

  const mutation = useMutation({
    mutationFn: uploadCampaignReport,
    onSuccess: () => {
      alert('Campaign report uploaded successfully!');
      // Reset form
      setSelectedInitiative('');
      setReport('');
      setPhotos(null);
    },
    onError: () => {
      alert('Failed to upload campaign report.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInitiative) {
      alert('Please select an initiative.');
      return;
    }
    
    const formData = new FormData();
    formData.append('initiativeId', selectedInitiative);
    formData.append('report', report);
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append('photos', photos[i]);
      }
    }

    // In a real app, you'd pass the formData to the mutation
    mutation.mutate({
      initiativeId: selectedInitiative,
      report,
      photos, // This is just for the console log
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="initiative" className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Initiative</label>
          <select
            id="initiative"
            value={selectedInitiative}
            onChange={(e) => setSelectedInitiative(e.target.value)}
            className="w-full p-2 border rounded-md bg-transparent mt-1"
          >
            <option value="">-- Select an Initiative --</option>
            {initiatives.map(initiative => (
              <option key={initiative.id} value={initiative.id}>{initiative.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="photos" className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Photos</label>
          <input
            id="photos"
            type="file"
            multiple
            onChange={(e) => setPhotos(e.target.files)}
            className="w-full mt-1 text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-humanova-olive/20 file:text-humanova-olive
                       dark:file:bg-humanova-gold/20 dark:file:text-humanova-gold
                       hover:file:bg-humanova-olive/30 dark:hover:file:bg-humanova-gold/30"
          />
        </div>

        <div>
          <label htmlFor="report" className="text-sm font-medium text-gray-700 dark:text-gray-300">Campaign Report</label>
          <textarea
            id="report"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Write a summary of the campaign's progress and impact."
            className="w-full p-2 border rounded-md bg-transparent mt-1"
            rows={6}
          />
        </div>

        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? 'Uploading...' : 'Upload Report'}
        </Button>
      </form>
    </Card>
  );
};
