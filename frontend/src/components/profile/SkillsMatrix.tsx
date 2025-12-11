import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X } from 'lucide-react';

interface SkillsMatrixProps {
  softSkills: string[];
  technicalSkills: string[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({
  softSkills: initialSoft,
  technicalSkills: initialTech,
}) => {
  const [softSkills, setSoftSkills] = useState(initialSoft);
  const [techSkills, setTechSkills] = useState(initialTech);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (type: 'soft' | 'tech') => {
    if (newSkill.trim() === '') return;

    if (type === 'soft') {
      setSoftSkills([...softSkills, newSkill]);
    } else {
      setTechSkills([...techSkills, newSkill]);
    }
    setNewSkill('');
    // In a real app, you would call a mutation here to update the backend
  };

  const removeSkill = (skillToRemove: string, type: 'soft' | 'tech') => {
    if (type === 'soft') {
      setSoftSkills(softSkills.filter(s => s !== skillToRemove));
    } else {
      setTechSkills(techSkills.filter(s => s !== skillToRemove));
    }
    // In a real app, you would call a mutation here
  };

  return (
    <Card>
      <h2 className="p-4 text-lg font-semibold border-b border-gray-200 dark:border-gray-700">Skills Matrix</h2>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
        {/* Soft Skills */}
        <div>
          <h3 className="mb-2 font-semibold text-humanova-olive dark:text-humanova-gold">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map(skill => (
              <span key={skill} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                {skill}
                <button onClick={() => removeSkill(skill, 'soft')} className="text-blue-500 hover:text-blue-700">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div>
          <h3 className="mb-2 font-semibold text-humanova-olive dark:text-humanova-gold">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {techSkills.map(skill => (
              <span key={skill} className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs text-green-800 dark:bg-green-900/50 dark:text-green-200">
                {skill}
                <button onClick={() => removeSkill(skill, 'tech')} className="text-green-500 hover:text-green-700">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add new skill */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Add a new skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-grow"
          />
          <Button variant="outline" size="sm" onClick={() => addSkill('soft')}>Add Soft</Button>
          <Button variant="outline" size="sm" onClick={() => addSkill('tech')}>Add Tech</Button>
        </div>
      </div>
    </Card>
  );
};
