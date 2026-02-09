"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

const navLinks = [
  { key: "investors" as const, href: "#investors" },
  { key: "owners" as const, href: "#owners" },
  { key: "operators" as const, href: "#operators" },
  { key: "about" as const, href: "#about" },
  { key: "caseStudy" as const, href: "#case-study" },
  { key: "contact" as const, href: "#contact" },
];

export function Nav() {
  const { language, toggleLanguage } = useLanguage();
  const t = content[language].nav;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" className="text-lg font-semibold text-white tracking-tight">
          Askel
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white px-3 py-2 rounded-md transition-colors duration-150"
            >
              {t[link.key]}
            </a>
          ))}
        </div>

        {/* Right side: lang toggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white px-3 py-2 rounded-md transition-colors duration-150 cursor-pointer"
          >
            {t.langToggle}
          </button>
          <a
            href="#contact"
            className="text-sm font-semibold text-black bg-white hover:bg-white/90 px-4 py-2 rounded-lg transition-all duration-150"
          >
            {t.cta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Menu"
        >
          <span
            className={`w-5 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-[var(--color-border-subtle)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white py-2 transition-colors"
                >
                  {t[link.key]}
                </a>
              ))}
              <div className="hr-fade my-2" />
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={toggleLanguage}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white cursor-pointer"
                >
                  {t.langToggle}
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold text-black bg-white px-4 py-2 rounded-lg"
                >
                  {t.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
