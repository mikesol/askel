"use client";

import { useRef } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function CaseStudyPage() {
  const { language } = useLanguage();
  const t = content[language].caseStudy;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[var(--color-text-secondary)] text-sm font-medium uppercase tracking-widest mb-4">
              {t.label}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-text leading-[1.1]">
              {t.heading}
            </h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              {t.subtitle}
            </p>
            {t.body.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Photos */}
          <motion.div
            className="mt-12 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/zoom-parallax/IMG_4841.webp"
                alt="Team at Melers facility"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/zoom-parallax/IMG_5394.webp"
                alt="Girbau industrial washer"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/zoom-parallax/IMG_5562.webp"
                alt="Girbau washing machines"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/zoom-parallax/IMG_5637.webp"
                alt="Laundry carts and operations"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {t.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col justify-between p-5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div ref={containerRef} className="relative mt-20">
            {/* Vertical track */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10">
              <motion.div
                className="w-full origin-top"
                style={{
                  scaleY: scrollYProgress,
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.3))",
                }}
              />
            </div>

            <div className="space-y-14">
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

          {/* CTA */}
          <motion.div
            className="mt-20 border-t border-white/10 pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="/#contact"
              className="inline-flex items-center justify-center text-sm font-semibold text-black bg-white hover:bg-white/90 px-6 py-3 rounded-lg transition-all duration-150"
            >
              {t.cta.heading}
            </a>
            <div className="mt-8">
              <p className="text-lg font-semibold text-white">{t.cta.company}</p>
              {t.cta.body.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
                {t.cta.location}
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
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
      className="relative pl-14"
      style={{ opacity }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="absolute left-4 top-1 w-2.5 h-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-[var(--color-bg-primary)]"
        style={{ scale: dotScale }}
      />

      <p className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      {body.split("\n\n").map((paragraph, i) => (
        <p key={i} className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
          {paragraph}
        </p>
      ))}
    </motion.div>
  );
}
