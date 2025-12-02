import React, { useState } from 'react';

interface Props {
  initialSkills?: string[];
}

export const SkillsEditor: React.FC<Props> = ({ initialSkills = [] }) => {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [value, setValue] = useState('');

  const addSkill = () => {
    const trimmed = value.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((prev) => [...prev, trimmed]);
    setValue('');
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="glass-panel rounded-2xl px-4 py-3 text-xs text-gray-800 dark:text-gray-100">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Skills
      </p>
      <div className="flex flex-wrap gap-1">
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => removeSkill(skill)}
            className="group inline-flex items-center gap-1 rounded-full bg-humanova-cream/80 px-2 py-0.5 text-[10px] text-humanova-olive hover:bg-humanova-cream dark:bg-humanova-oliveDark/70 dark:text-gray-50"
          >
            <span>{skill}</span>
            <span className="text-[9px] text-humanova-olive/80 group-hover:text-red-500 dark:text-gray-200 dark:group-hover:text-red-400">
              ✕
            </span>
          </button>
        ))}
        {skills.length === 0 && (
          <span className="text-[11px] text-gray-500 dark:text-gray-300">
            No skills added yet. Start with what you&apos;re comfortable sharing.
          </span>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-xl border border-white/60 bg-white/80 px-2 py-1.5 text-[11px] text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
          placeholder="e.g. Java, Public speaking, Accessibility"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          type="button"
          className="rounded-xl bg-humanova-olive px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-humanova-oliveDark dark:bg-humanova-gold dark:text-black"
          onClick={addSkill}
        >
          Add
        </button>
      </div>
    </div>
  );
};
