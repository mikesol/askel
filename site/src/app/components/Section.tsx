"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, label, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <motion.div
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && (
          <p className="text-[var(--color-accent)] text-sm font-medium uppercase tracking-widest mb-4">
            {label}
          </p>
        )}
        {children}
      </motion.div>
    </section>
  );
}
