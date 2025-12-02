import React from 'react';
import { motion } from 'framer-motion';
import { staggerChildren, fadeInUp } from '@/lib/animationVariants';

const TESTIMONIALS = [
  {
    name: 'Lina · Computer Science student',
    text: 'I can see all my volunteering hours and internship progress in one dashboard. It finally feels connected.'
  },
  {
    name: 'Omar · Accessibility coordinator',
    text: 'Humanova makes it much easier to match support volunteers with students who need help on campus.'
  },
  {
    name: 'Noor · Charity lead',
    text: 'We reached more students and volunteers in one semester than an entire year before.'
  }
];

export const TestimonialsStrip: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-humanova-cream/60 via-white to-humanova-cream/60 py-10 dark:from-black dark:via-humanova-oliveDark/60 dark:to-black">
      <div className="container">
        <h2 className="mb-4 text-center text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
          Voices from the Humanova community
        </h2>

        <motion.div
          className="grid gap-4 md:grid-cols-3"
          variants={staggerChildren(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TESTIMONIALS.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeInUp}
              className="glass-panel rounded-2xl px-4 py-4 text-xs text-gray-800 dark:text-gray-200"
            >
              <p className="mb-3 leading-relaxed">&ldquo;{item.text}&rdquo;</p>
              <p className="text-[11px] font-semibold text-humanova-olive dark:text-humanova-gold">
                {item.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
