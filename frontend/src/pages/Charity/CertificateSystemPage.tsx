import React from 'react';
import { CertificateGenerator } from '@/components/charity/CertificateGenerator';

const CertificateSystemPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Certificate System</h1>
        <p className="text-muted-foreground text-lg">
          Generate and issue PDF certificates to your volunteers.
        </p>
      </header>
      <CertificateGenerator />
    </div>
  );
};

export default CertificateSystemPage;
