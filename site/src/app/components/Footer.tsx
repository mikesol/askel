"use client";

import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

export function Footer() {
  const { language } = useLanguage();
  const t = content[language].footer;

  return (
    <footer className="border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-semibold text-white tracking-tight mb-2">
              {t.company}
            </p>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              {t.tagline}
            </p>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
              {t.location}
            </p>
          </div>

          {/* Link columns */}
          {t.columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text-tertiary)] hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hr-fade mt-12 mb-6" />

        <p className="text-xs text-[var(--color-text-tertiary)]">
          &copy; {new Date().getFullYear()} {t.copyright}
        </p>
      </div>
    </footer>
  );
}
