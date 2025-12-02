import React from 'react';

const MOCK_CERTS = [
  {
    id: '1',
    title: 'Java Foundations',
    issuer: 'Oracle Academy',
    year: 2024
  },
  {
    id: '2',
    title: 'Backend Internship · Humanova x Globitel',
    issuer: 'Globitel',
    year: 2025
  }
];

export const CertificatesList: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl px-4 py-3 text-xs text-gray-800 dark:text-gray-100">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Certificates
      </p>
      <ul className="space-y-1">
        {MOCK_CERTS.map((cert) => (
          <li key={cert.id} className="flex items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-50">{cert.title}</p>
              <p className="text-[11px] text-gray-600 dark:text-gray-300">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-300">
        File uploads can be wired to your storage backend later (S3, GCS, or local).
      </p>
    </div>
  );
};
