"use client";

import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

export function Nav() {
  const { language, toggleLanguage } = useLanguage();
  const t = content[language].nav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" className="text-lg font-semibold text-white tracking-tight">
          Askel
        </a>

        {/* Right side: lang toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white px-3 py-2 rounded-md transition-colors duration-150 cursor-pointer"
          >
            {t.langToggle}
          </button>
          <a
            href="#contact"
            className="text-sm font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] px-4 py-2 rounded-lg transition-all duration-150"
          >
            {language === "en" ? "Get In Touch" : "Ota yhteyttä"}
          </a>
        </div>
      </div>
    </nav>
  );
}
