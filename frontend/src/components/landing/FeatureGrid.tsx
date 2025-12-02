import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { fadeInFromLeft, fadeInFromRight } from '@/lib/animationVariants';

export const FeatureGrid: React.FC = () => {
  return (
    <section className="container grid gap-8 py-10 sm:grid-cols-2 sm:py-16">
      <motion.div
        variants={fadeInFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-humanova-cream/60 via-white/40 to-humanova-gold/20 dark:from-humanova-oliveDark/70 dark:via-black/40 dark:to-humanova-gold/10">
          <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
            One ecosystem, shared impact
          </h2>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-200">
            Humanova brings together volunteering, internships, and accessibility support so that
            impact, learning, and inclusion all live in one place.
          </p>
          <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-200">
            <li>• Centralized tracking of hours, skills, and certificates.</li>
            <li>• Verified opportunities from trusted charities & companies.</li>
            <li>• Accessibility-first features for students with disabilities.</li>
          </ul>
        </Card>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={fadeInFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Card>
          <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
            Smart recommendations
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-200">
            Match students and volunteers to opportunities based on interests, skills and time.
          </p>
        </Card>
        <Card>
          <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
            Accessibility by design
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-200">
            Request helpers, organize transport, and coordinate support for students with
            disabilities.
          </p>
        </Card>
        <Card>
          <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
            Real-time dashboards
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-200">
            Universities, companies, and charities get live dashboards of hours, participation, and
            impact.
          </p>
        </Card>
      </motion.div>
    </section>
  );
};
