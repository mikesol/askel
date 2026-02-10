"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";
import { AuroraBackground } from "./AuroraBackground";

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
    <AuroraBackground>
      <motion.div
        className="relative z-10 text-center max-w-4xl px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="gradient-text">{t.prefix}</span>{" "}
          <span className="relative inline-block min-w-[3ch]">
            <span ref={displayRef} className="text-white" />
            <span className="animate-pulse text-white">|</span>
          </span>
          <br />
          <span className="gradient-text">{t.suffix}</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
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
    </AuroraBackground>
  );
}
