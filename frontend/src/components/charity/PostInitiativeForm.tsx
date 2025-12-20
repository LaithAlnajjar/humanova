// src/components/charity/PostInitiativeForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

// Placeholder for the actual API call
const postInitiative = async (data: any) => {
  console.log('Posting initiative:', data);
  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you would return the response from the server
  return { success: true };
};

export const PostInitiativeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetGoal, setTargetGoal] = useState('');
  const [endDate, setEndDate] = useState('');

  const mutation = useMutation({
    mutationFn: postInitiative,
    onSuccess: () => {
      alert('Initiative posted successfully!');
      // Reset form or redirect
    },
    onError: () => {
      alert('Failed to post initiative.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description,
      targetGoal,
      endDate,
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Initiative Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Winter Clothing Drive" />
        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the initiative in detail."
            className="w-full p-2 border rounded-md bg-transparent"
            rows={4}
          />
        </div>
        <Input label="Target Goal" value={targetGoal} onChange={(e) => setTargetGoal(e.target.value)} placeholder="e.g., 500 jackets or $10,000" />
        <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? 'Posting...' : 'Post Initiative'}
        </Button>
      </form>
    </Card>
  );
};
