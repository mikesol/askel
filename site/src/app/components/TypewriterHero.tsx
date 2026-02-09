"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

function useTypewriter(words: readonly string[]) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const animate = useCallback(
    (time: number) => {
      if (!displayRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const word = words[indexRef.current];
      const isDeleting = deletingRef.current;
      const delay = isDeleting ? 40 : 60;
      const pauseDelay = 2500;

      if (time - lastTimeRef.current < delay) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = time;

      if (!isDeleting) {
        charRef.current++;
        displayRef.current.textContent = word.slice(0, charRef.current);

        if (charRef.current === word.length) {
          // Pause at end of word
          deletingRef.current = true;
          lastTimeRef.current = time + pauseDelay;
        }
      } else {
        charRef.current--;
        displayRef.current.textContent = word.slice(0, charRef.current);

        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % words.length;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [words]
  );

  useEffect(() => {
    indexRef.current = 0;
    charRef.current = 0;
    deletingRef.current = false;
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return displayRef;
}

export function TypewriterHero() {
  const { language } = useLanguage();
  const t = content[language].hero;
  const displayRef = useTypewriter(t.words);

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background grid treatment */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-tertiary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0, 212, 170, 0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="gradient-text">{t.prefix}</span>{" "}
          <span className="relative inline-block min-w-[3ch]">
            <span ref={displayRef} className="text-[var(--color-accent)]" />
            <span className="animate-pulse text-[var(--color-accent)]">|</span>
          </span>
          <br />
          <span className="gradient-text">{t.suffix}</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center text-sm font-semibold text-black bg-white hover:bg-white/90 px-6 py-3 rounded-lg transition-all duration-150"
          >
            {t.cta1}
          </a>
          <a
            href="#statement"
            className="inline-flex items-center justify-center text-sm font-medium text-white border border-[var(--color-border-subtle)] hover:border-white/20 hover:bg-white/[0.04] px-6 py-3 rounded-lg transition-all duration-150"
          >
            {t.cta2}
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="w-5 h-8 rounded-full border border-[var(--color-border-subtle)] flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
