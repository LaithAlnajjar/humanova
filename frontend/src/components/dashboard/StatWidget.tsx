import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animationVariants';

interface StatWidgetProps {
  label: string;
  value: string;
  helper?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  label,
  value,
  helper
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-panel rounded-2xl px-4 py-3 text-xs text-gray-800 dark:text-gray-100"
    >
      <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-humanova-olive dark:text-humanova-gold">
        {value}
      </p>
      {helper && (
        <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
          {helper}
        </p>
      )}
    </motion.div>
  );
};
