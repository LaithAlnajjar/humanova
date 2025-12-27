import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export const HeroSplineSection: React.FC = () => {
  const [isSplineLoading, setIsSplineLoading] = useState(true);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="grid gap-10 md:grid-cols-[1.05fr,1fr] items-center">
        {/* ======================= */}
        {/* LEFT COLUMN: Text Copy  */}
        {/* ======================= */}
        <motion.div
          className="space-y-4 md:space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-emerald-300/80">
            AI-powered. Human-centered.
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white">
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
            <Button
              asChild
              className="px-4 py-2 text-xs md:text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Link to="/auth/register">Get started with Humanova</Link>
            </Button>
          </motion.div>

          {/* AI Badge / Caption */}
          <motion.div
            className="mt-3 flex items-center gap-3 text-[11px] md:text-xs text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-6 w-6 rounded-full bg-emerald-500/15 border border-emerald-400/50 flex items-center justify-center text-[10px] text-emerald-200 font-bold">
              AI
            </div>
            <p>
              Interact with the 3D bot on the right—it's your new AI companion.
            </p>
          </motion.div>
        </motion.div>

        {/* =========================== */}
        {/* RIGHT COLUMN: Spline Robot  */}
        {/* =========================== */}
        <motion.div
          className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Loading Spinner (Visible while Spline loads) */}
          {isSplineLoading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                <p className="text-[10px] text-emerald-500/60 tracking-wider uppercase animate-pulse">
                  Loading 3D Scene...
                </p>
              </div>
            </div>
          )}

          {/* Actual Spline Scene */}
          {/* We use a container with a fixed height/width to ensure the canvas doesn't collapse */}
          <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Spline
              scene="https://prod.spline.design/oz0GTrHyYyuopXsA/scene.splinecode"
              onLoad={() => setIsSplineLoading(false)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSplineSection;
