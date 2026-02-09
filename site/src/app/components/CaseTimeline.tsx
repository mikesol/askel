"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

export function CaseTimeline() {
  const { language } = useLanguage();
  const t = content[language].caseStudy;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  return (
    <section id="case-study" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[var(--color-accent)] text-sm font-medium uppercase tracking-widest mb-4">
            {t.label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {t.heading}
          </h2>
          <p className="text-sm text-[var(--color-accent)] mt-2">
            {t.subtitle}
          </p>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.body}
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {t.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col justify-between p-5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-accent)]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mt-16 ml-4 sm:ml-0">
          {/* Vertical line track */}
          <div className="absolute left-0 sm:left-4 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full origin-top"
              style={{
                scaleY: scrollYProgress,
                height: "100%",
                background:
                  "linear-gradient(to bottom, var(--color-accent), rgba(0, 212, 170, 0.3))",
              }}
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {t.timeline.map((entry, i) => (
              <TimelineEntry
                key={entry.title}
                title={entry.title}
                body={entry.body}
                index={i}
                scrollYProgress={scrollYProgress}
                total={t.timeline.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  title,
  body,
  index,
  scrollYProgress,
  total,
}: {
  title: string;
  body: string;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const entryStart = index / total;
  const entryEnd = (index + 0.5) / total;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, entryStart - 0.05), entryStart + 0.05],
    [0.3, 1]
  );

  const dotScale = useTransform(
    scrollYProgress,
    [Math.max(0, entryStart - 0.02), entryStart + 0.02],
    [0.5, 1]
  );

  return (
    <motion.div
      className="relative pl-8 sm:pl-14"
      style={{ opacity }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dot */}
      <motion.div
        className="absolute left-0 sm:left-4 top-1 w-2.5 h-2.5 -translate-x-1/2 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-primary)]"
        style={{ scale: dotScale }}
      />

      <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-1">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
        {body}
      </p>
    </motion.div>
  );
}
