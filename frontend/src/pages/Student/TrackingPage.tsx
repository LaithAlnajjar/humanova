import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentProfile, addTrainingLog } from '@/services/studentService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { TrackingLog } from '@/types/student';

const TARGET_HOURS = 120;

export const TrackingPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [summary, setSummary] = useState('');

  const { data: profile, isLoading } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: getStudentProfile,
  });

  const mutation = useMutation({
    mutationFn: (newLog: Omit<TrackingLog, 'id' | 'verified'>) => addTrainingLog(newLog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
      // Reset form
      setDate(new Date().toISOString().split('T')[0]);
      setHours('');
      setSummary('');
    },
    onError: (error) => {
      alert(`Failed to add log: ${(error as Error).message}`);
    }
  });

  const totalHours = useMemo(() => {
    return profile?.trackingLogs.reduce((acc, log) => acc + log.hours, 0) ?? 0;
  }, [profile]);

  const progressPercentage = useMemo(() => {
    return (totalHours / TARGET_HOURS) * 100;
  }, [totalHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hoursNum = parseFloat(hours);
    if (!date || isNaN(hoursNum) || hoursNum <= 0 || summary.trim() === '') {
      alert('Please fill out all fields correctly.');
      return;
    }
    mutation.mutate({ date, hours: hoursNum, activitySummary: summary });
  };
  
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Training Log
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Log your training and volunteering hours to track your progress towards your goal.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <Card>
            <h2 className="p-4 text-lg font-semibold border-b border-gray-700">Add New Log</h2>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <Input
                label="Date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
              <Input
                label="Hours Completed"
                type="number"
                placeholder="e.g., 4"
                value={hours}
                onChange={e => setHours(e.target.value)}
                required
                min="0.5"
                step="0.5"
              />
              <Input
                label="Activity Summary"
                placeholder="What did you do?"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                required
              />
              <Button type="submit" disabled={mutation.isLoading} className="w-full">
                {mutation.isLoading ? 'Submitting...' : 'Submit Log'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Logs Column */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="p-4 text-lg font-semibold border-b border-gray-700">Progress & History</h2>
            {/* Progress Bar */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-bold text-humanova-gold">Total Hours: {totalHours.toFixed(1)} / {TARGET_HOURS}</p>
                <p className="text-sm font-bold">{Math.round(progressPercentage)}%</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-humanova-gold h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
            
            {/* History Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-800/50 text-xs uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Hours</th>
                    <th scope="col" className="px-6 py-3">Summary</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {profile?.trackingLogs.slice().reverse().map(log => (
                    <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="px-6 py-4">{new Date(log.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-bold">{log.hours}</td>
                      <td className="px-6 py-4">{log.activitySummary}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          log.verified 
                            ? 'bg-green-900/70 text-green-300' 
                            : 'bg-yellow-900/70 text-yellow-300'
                        }`}>
                          {log.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             {profile?.trackingLogs.length === 0 && (
                <p className="p-8 text-center text-sm text-gray-500">No logs submitted yet.</p>
             )}
          </Card>
        </div>
      </div>
    </>
  );
};
