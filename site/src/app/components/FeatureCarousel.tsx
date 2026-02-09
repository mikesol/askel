"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

const CYCLE_MS = 6000;

export function FeatureCarousel() {
  const { language } = useLanguage();
  const t = content[language];

  const steps = [
    { key: "investors" as const, label: t.nav.investors, data: t.investors },
    { key: "owners" as const, label: t.nav.owners, data: t.owners },
    { key: "operators" as const, label: t.nav.operators, data: t.operators },
  ];

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const startRef = useRef(Date.now());

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
    setProgress(0);
    startRef.current = Date.now();
  }, [steps.length]);

  // Auto-cycle
  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (!pausedRef.current) {
        const elapsed = Date.now() - startRef.current;
        const pct = Math.min(elapsed / CYCLE_MS, 1);
        setProgress(pct);
        if (pct >= 1) {
          advance();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [advance]);

  const handleClick = (index: number) => {
    setActive(index);
    setProgress(0);
    startRef.current = Date.now();
    // Brief pause on interaction
    pausedRef.current = true;
    setTimeout(() => {
      pausedRef.current = false;
      startRef.current = Date.now();
      setProgress(0);
    }, 2000);
  };

  const step = steps[active];

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Step indicators */}
        <div className="flex gap-2 sm:gap-4 mb-12">
          {steps.map((s, i) => (
            <button
              key={s.key}
              onClick={() => handleClick(i)}
              className="flex-1 group text-left"
            >
              <div className="relative h-0.5 bg-white/10 rounded-full overflow-hidden mb-3">
                {i === active && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
                {i < active && (
                  <div className="absolute inset-0 bg-[var(--color-accent)] opacity-40" />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  i === active
                    ? "text-white"
                    : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[var(--color-accent)] text-sm font-medium uppercase tracking-widest mb-4">
              {step.data.label}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
              {step.data.heading}
            </h2>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
              {step.data.body}
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {step.data.points.map((point, i) => (
                <motion.div
                  key={point.title}
                  className="group/card relative p-6 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] hover:border-white/[0.12] transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="absolute -left-px -top-px block size-1.5 border-l border-t border-[var(--color-accent)] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  <span className="absolute -right-px -top-px block size-1.5 border-r border-t border-[var(--color-accent)] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  <span className="absolute -bottom-px -left-px block size-1.5 border-b border-l border-[var(--color-accent)] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  <span className="absolute -bottom-px -right-px block size-1.5 border-b border-r border-[var(--color-accent)] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  <h3 className="text-base font-semibold text-white">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
