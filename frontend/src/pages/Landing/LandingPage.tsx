// src/pages/Landing/LandingPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { HeroSplineSection } from "@/components/landing/HeroSplineSection";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/hooks/lib/animationVariants";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
      {/* Hero with Spline Robot */}
      <HeroSplineSection />

      {/* Feature grid for roles */}
      <section className="max-w-6xl mx-auto px-4 pb-16 md:pb-20">
        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeInUp} className="space-y-2 max-w-2xl">
            <h2 className="text-xl md:text-2xl font-semibold">
              Built around every role on campus.
            </h2>
            <p className="text-sm md:text-base text-slate-300">
              Humanova keeps the experience soft and accessible whether you are
              a student, volunteer, charity, company partner, or part of a
              university team — with extra care for students with disabilities.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
          >
            {[
              {
                title: "Students",
                body: "Discover volunteering, training, and accessibility support with clear expectations and human-first explanations.",
              },
              {
                title: "Volunteers & charities",
                body: "Coordinate helpers, log hours, and match with students or causes that truly need your skills.",
              },
              {
                title: "Companies & universities",
                body: "Offer internships and programs, track impact, and make your pipelines more inclusive and transparent.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="glass-panel rounded-2xl p-4 md:p-5 space-y-2 border border-emerald-500/20"
              >
                <p className="text-sm font-semibold text-emerald-200">
                  {item.title}
                </p>
                <p className="text-xs md:text-sm text-slate-200">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-10 md:pb-12">
        <motion.div
          className="glass-panel rounded-3xl px-4 py-5 md:px-6 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
              Start in a few clicks
            </p>
            <h3 className="text-base md:text-lg font-semibold">
              Bring Humanova to your campus or organization.
            </h3>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Create an account as a student, volunteer, charity, company or
              university. You can always add accessibility preferences later —
              carefully and privately.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild className="px-4 py-2 text-xs md:text-sm">
              <Link to="/auth/register">Create your profile</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
