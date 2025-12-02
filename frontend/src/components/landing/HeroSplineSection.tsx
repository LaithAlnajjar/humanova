import React, { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const tooltipText =
  'Just like this friendly bot simplifies tasks, Humanova transforms complex data into clear, human-centric insights.';

export const HeroSplineSection: React.FC = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleToggle = () => setIsTooltipOpen((prev) => !prev);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="grid gap-10 md:grid-cols-[1.05fr,1fr] items-center">
        {/* Left: Text */}
        <motion.div
          className="space-y-4 md:space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-emerald-300/80">
            AI-powered. Human-centered.
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Humanova:
            <span className="block text-emerald-300">The future of AI</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-xl">
            An AI-powered web app that turns complex, messy datasets into clear,
            accessible insights for students, universities, charities and
            companies — with a special focus on accessibility and inclusion.
          </p>

          <motion.div
            className="flex flex-wrap gap-3 pt-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Button asChild className="px-4 py-2 text-xs md:text-sm">
              <Link to="/auth/register">Get started with Humanova</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="px-4 py-2 text-xs md:text-sm border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/10"
            >
              <Link to="/opportunities">Explore opportunities</Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-3 flex items-center gap-3 text-[11px] md:text-xs text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-6 w-6 rounded-full bg-emerald-500/15 border border-emerald-400/50 flex items-center justify-center text-[10px] text-emerald-200">
              AI
            </div>
            <p>
              Humanova blends analytics + accessibility, so your AI feels less
              “robotic” and more genuinely helpful.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Animated fake 3D card بدل Spline مؤقتًا */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="relative w-full max-w-md mx-auto rounded-3xl glass-panel overflow-hidden cursor-pointer outline-none"
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label="Interactive 3D Humanova bot card"
            tabIndex={0}
            style={{ transformPerspective: 900 }}
          >
            <motion.div
              className="relative aspect-[4/3] w-full flex items-center justify-center"
              animate={{
                rotateX: [16, 20, 16],
                rotateY: [-18, -26, -18],
                translateY: [0, -6, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <div className="relative h-28 w-28">
                <div className="absolute inset-0 rounded-full border border-humanova-olive/70 shadow-[0_0_40px_rgba(16,185,129,0.4)]" />
                <div className="absolute inset-3 rounded-full border border-humanova-gold/80 opacity-80" />
                <div className="absolute inset-5 rounded-full border border-dashed border-emerald-300/70" />
                <div className="absolute inset-8 rounded-[22px] bg-gradient-to-br from-white via-humanova-cream/90 to-humanova-gold/80 flex items-center justify-center shadow-[0_10px_30px_rgba(15,23,42,0.45)]">
                  <span className="text-lg font-semibold text-humanova-olive">
                    🤖
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] text-slate-200/90 border border-emerald-500/40">
              Click the bot to see how it relates to Humanova.
            </div>

            <AnimatePresence>
              {isTooltipOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="absolute top-3 right-3 max-w-xs rounded-2xl bg-slate-950/95 px-4 py-3 text-[11px] md:text-xs text-slate-100 shadow-xl border border-emerald-400/40"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-300/90 mb-1">
                    Meet the Humanova bot
                  </p>
                  <p className="text-[11px] md:text-xs leading-relaxed">
                    {tooltipText}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTooltipOpen(false);
                    }}
                    className="mt-2 text-[10px] text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
                  >
                    Got it, hide message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-3 text-[10px] md:text-[11px] text-slate-400 max-w-sm mx-auto">
            The cute, minimalist 3D-style robot represents how Humanova&apos;s AI
            quietly works in the background — floating, friendly, and always
            ready to simplify your next decision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSplineSection;
