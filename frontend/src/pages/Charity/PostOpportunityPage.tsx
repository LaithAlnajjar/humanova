import React from 'react';
import { PostOpportunityForm } from '@/components/charity/PostOpportunityForm';

const PostOpportunityPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Post a New Opportunity</h1>
        <p className="text-muted-foreground text-lg">
          Fill out the form below to create a new volunteer opportunity.
        </p>
      </header>
      <PostOpportunityForm />
    </div>
  );
};

export default PostOpportunityPage;
