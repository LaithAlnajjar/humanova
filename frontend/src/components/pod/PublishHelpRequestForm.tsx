import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { createSupportRequest } from '@/services/podService';

export const PublishHelpRequestForm = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const mutation = useMutation({
    mutationFn: createSupportRequest,
    onSuccess: () => {
      alert('Help request posted successfully!');
      // Reset form
      setCategory('');
      setDescription('');
      setUrgency('Medium');
    },
    onError: () => {
      alert('Failed to post help request.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      category,
      description,
      urgency,
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Academic Support, Daily Living" />
        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your request in detail."
            className="w-full p-2 border rounded-md bg-transparent"
            rows={4}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="urgency" className="text-sm font-medium text-gray-700 dark:text-gray-300">Urgency</label>
          <select
            id="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as 'Low' | 'Medium' | 'High')}
            className="w-full p-2 border rounded-md bg-transparent"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? 'Posting...' : 'Post Help Request'}
        </Button>
      </form>
    </Card>
  );
};
