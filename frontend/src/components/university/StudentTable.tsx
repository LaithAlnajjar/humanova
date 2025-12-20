// src/components/university/StudentTable.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudents, updateInternshipStatus } from '@/services/universityService';
import { UniversityStudent } from '@/types/university';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Check, X, Filter } from 'lucide-react';
import clsx from 'clsx';

const statusStyles = {
  Approved: 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-300',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-300',
};

interface StudentTableProps {
  initialStatusFilter?: 'Pending' | 'Approved' | 'Rejected' | null;
}

export const StudentTable: React.FC<StudentTableProps> = ({ initialStatusFilter = null }) => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ faculty: '', major: '', level: '', status: initialStatusFilter || '' });
  const [showFilters, setShowFilters] = useState(true);

  const { data: students = [], isLoading } = useQuery<UniversityStudent[]>({
    queryKey: ['universityStudents'],
    queryFn: getStudents,
  });

  const mutation = useMutation({
    mutationFn: ({ studentId, status }: { studentId: string; status: 'Approved' | 'Rejected' }) =>
      updateInternshipStatus(studentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universityStudents'] });
    },
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const levelMatch = filters.level ? student.level === parseInt(filters.level, 10) : true;
      const facultyMatch = filters.faculty ? student.faculty.toLowerCase().includes(filters.faculty.toLowerCase()) : true;
      const majorMatch = filters.major ? student.major.toLowerCase().includes(filters.major.toLowerCase()) : true;
      const statusMatch = filters.status ? student.internship?.status === filters.status : true;
      return levelMatch && facultyMatch && majorMatch && statusMatch;
    });
  }, [students, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="h-64 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Student Internship Overview</h2>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={18} className="mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              name="faculty"
              placeholder="Filter by Faculty"
              value={filters.faculty}
              onChange={handleFilterChange}
            />
            <Input
              name="major"
              placeholder="Filter by Major"
              value={filters.major}
              onChange={handleFilterChange}
            />
            <Input
              name="level"
              type="number"
              placeholder="Filter by Level"
              value={filters.level}
              onChange={handleFilterChange}
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="input-base w-full dark:bg-gray-800 dark:text-white h-10 px-3"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-sm uppercase text-gray-500 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Student</th>
              <th scope="col" className="px-6 py-3">Internship</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4">
                  <p className="font-bold">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.faculty} - {student.major} (Level {student.level})</p>
                </td>
                <td className="px-6 py-4">
                  {student.internship ? (
                    <>
                      <p className="font-semibold">{student.internship.position}</p>
                      <p className="text-sm text-gray-500">{student.internship.location}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {student.internship.weeklyHours} hrs/week | Rating: {student.internship.companyRating}/5
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400 italic">No internship</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  {student.internship ? (
                    <span className={`px-2 py-1 text-sm rounded-full ${clsx(statusStyles[student.internship.status])}`}>
                      {student.internship.status}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {student.internship && student.internship.status === 'Pending' && (
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="!rounded-full !p-2 h-auto w-auto bg-green-500/20 text-green-500 hover:bg-green-500/30"
                        onClick={() => mutation.mutate({ studentId: student.id, status: 'Approved' })}
                        disabled={mutation.isPending}
                      >
                        <Check size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="!rounded-full !p-2 h-auto w-auto bg-red-500/20 text-red-500 hover:bg-red-500/30"
                        onClick={() => mutation.mutate({ studentId: student.id, status: 'Rejected' })}
                        disabled={mutation.isPending}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <p className="p-8 text-center text-gray-500">No students found matching your criteria.</p>
        )}
      </div>
    </Card>
  );
};
