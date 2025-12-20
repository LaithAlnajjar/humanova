import React from 'react';
import { PostInitiativeForm } from '@/components/charity/PostInitiativeForm';

const PostInitiativePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Post a New Initiative</h1>
        <p className="text-muted-foreground text-lg">
          Share your new initiative, such as a renovation, clothing drive, or food aid campaign.
        </p>
      </header>
      <PostInitiativeForm />
    </div>
  );
};

export default PostInitiativePage;
