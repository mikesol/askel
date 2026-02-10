"use client";

import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";
import { motion } from "framer-motion";

type SectionKey = "investors" | "owners" | "operators";

export function AudiencePage({ sectionKey }: { sectionKey: SectionKey }) {
  const { language } = useLanguage();
  const t = content[language][sectionKey];

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6">
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
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
              {t.body}
            </p>
          </motion.div>

          <div className="mt-16 grid sm:grid-cols-2 gap-6">
            {t.points.map((point, i) => (
              <motion.div
                key={point.title}
                className="group p-6 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] hover:border-white/15 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-xs font-medium text-[var(--color-text-tertiary)] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="/#contact"
              className="inline-flex items-center justify-center text-sm font-semibold text-black bg-white hover:bg-white/90 px-6 py-3 rounded-lg transition-all duration-150"
            >
              {content[language].hero.cta1}
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
