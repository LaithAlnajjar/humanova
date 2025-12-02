import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { staggerChildren, fadeInUp } from '@/lib/animationVariants';

type RoleId = 'student' | 'volunteer' | 'charity' | 'company' | 'university' | 'disabled_student';

interface Role {
  id: RoleId;
  label: string;
  description: string;
  accent: string;
}

const ROLES: Role[] = [
  {
    id: 'student',
    label: 'Student',
    description: 'Track your skills, hours, and impact in one place.',
    accent: 'bg-emerald-500'
  },
  {
    id: 'volunteer',
    label: 'Volunteer',
    description: 'Discover meaningful causes and flexible opportunities.',
    accent: 'bg-sky-500'
  },
  {
    id: 'charity',
    label: 'Charity',
    description: 'Post needs, manage volunteers, and measure outcomes.',
    accent: 'bg-rose-500'
  },
  {
    id: 'company',
    label: 'Company',
    description: 'Host internships and CSR programs tied to real impact.',
    accent: 'bg-amber-500'
  },
  {
    id: 'university',
    label: 'University',
    description: 'Connect academic pathways with volunteering and training.',
    accent: 'bg-violet-500'
  },
  {
    id: 'disabled_student',
    label: 'Accessibility',
    description: 'Request tailored assistance and accessible opportunities.',
    accent: 'bg-fuchsia-500'
  }
];

export const RoleSelector: React.FC = () => {
  return (
    <section className="container py-10 sm:py-14">
      <div className="mb-6 flex flex-col gap-2 text-center">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-50">
          Choose how you join Humanova
        </h2>
        <p className="text-sm text-gray-600 sm:text-base dark:text-gray-300">
          Students, volunteers, charities, companies, universities & accessibility support —
          everyone has a dedicated space.
        </p>
      </div>

      <motion.div
        className="grid gap-4 md:grid-cols-3"
        variants={staggerChildren(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {ROLES.map((role) => (
          <motion.div key={role.id} variants={fadeInUp}>
            <Card className="h-full cursor-pointer text-left">
              <div className="mb-3 flex items-center gap-3">
                <span className={`h-8 w-8 rounded-xl ${role.accent} opacity-90`} />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  {role.label}
                </h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">{role.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
