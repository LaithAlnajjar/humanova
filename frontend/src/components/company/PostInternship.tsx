// src/components/company/PostInternship.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postInternship } from '../../services/companyService';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const PostInternship = () => {
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState(120);
  const [major, setMajor] = useState('');
  const [skills, setSkills] = useState('');
  const [duration, setDuration] = useState('');

  const mutation = useMutation({
    mutationFn: postInternship,
    onSuccess: () => {
      alert('Internship posted successfully!');
      // Reset form or redirect
    },
    onError: () => {
      alert('Failed to post internship.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      hours,
      requiredMajor: major,
      requiredSkills: skills.split(',').map(s => s.trim()),
      duration,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
        <h1 className="text-2xl font-semibold">Post New Internship</h1>
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Internship Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Frontend Developer Intern" />
                <Input label="Total Hours" type="number" value={hours.toString()} onChange={(e) => setHours(Number(e.target.value))} />
                <Input label="Required Major" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="e.g., Computer Science" />
                <Input label="Required Skills (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., React, TypeScript, Figma" />
                <Input label="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 3 Months" />
                <Button type="submit" disabled={mutation.isPending} className="w-full">
                    {mutation.isPending ? 'Posting...' : 'Post Internship'}
                </Button>
            </form>
        </Card>
    </div>
  );
};

export default PostInternship;
