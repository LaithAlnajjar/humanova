import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { InternshipRecord, InternshipStatus } from '@/types/student';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';

interface InternshipHistoryProps {
  internships: InternshipRecord[];
}

const TABS: InternshipStatus[] = ['completed', 'current', 'pending'];

export const InternshipHistory: React.FC<InternshipHistoryProps> = ({ internships }) => {
  const [activeTab, setActiveTab] = useState<InternshipStatus>('current');

  const filteredInternships = internships.filter(i => i.status === activeTab);

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Internship History</h2>
        <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                activeTab === tab 
                  ? 'bg-humanova-olive text-white shadow dark:bg-humanova-gold dark:text-black' 
                  : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Internship List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredInternships.length > 0 ? (
          filteredInternships.map(internship => (
            <div key={internship.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{internship.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {internship.company} - <span className="capitalize">{internship.type}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {internship.status === 'completed' && internship.rating && (
                  <span className="text-xs font-bold text-yellow-500">⭐ {internship.rating.toFixed(1)}</span>
                )}
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-gray-500">
            No internships found in the "{activeTab}" category.
          </div>
        )}
      </div>
    </Card>
  );
};
