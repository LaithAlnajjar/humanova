// src/components/charity/PostOpportunityForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// Placeholder for the actual API call
const postOpportunity = async (data: any) => {
  console.log('Posting opportunity:', data);
  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you would return the response from the server
  return { success: true };
};

export const PostOpportunityForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [volunteersNeeded, setVolunteersNeeded] = useState(1);
  const [datetime, setDatetime] = useState('');
  const [location, setLocation] = useState('');

  const mutation = useMutation({
    mutationFn: postOpportunity,
    onSuccess: () => {
      alert('Opportunity posted successfully!');
      // Reset form or redirect
    },
    onError: () => {
      alert('Failed to post opportunity.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description,
      requiredSkills: skills.split(',').map(s => s.trim()),
      volunteersNeeded,
      datetime,
      location,
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Opportunity Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Beach Cleanup Drive" />
        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the opportunity in detail."
            className="w-full p-2 border rounded-md bg-transparent"
            rows={4}
          />
        </div>
        <Input label="Skills Required (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Communication, Teamwork" />
        <Input label="Number of Volunteers Needed" type="number" value={volunteersNeeded.toString()} onChange={(e) => setVolunteersNeeded(Number(e.target.value))} min="1" />
        <Input label="Date and Time" type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
        <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., City Park" />
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? 'Posting...' : 'Post Opportunity'}
        </Button>
      </form>
    </Card>
  );
};
