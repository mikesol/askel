"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

export function Footer() {
  const { language } = useLanguage();
  const t = content[language].footer;
  const [jumping, setJumping] = useState(false);

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

        <p className="text-center text-xs text-[var(--color-text-tertiary)] mt-10 select-none">
          Almost like a Hedgefund, but maybe closer to a Hedgehog{" "}
          <span
            role="button"
            className="inline-block cursor-pointer transition-transform"
            style={jumping ? { animation: "steve-jump 0.5s ease" } : undefined}
            onClick={() => {
              setJumping(false);
              requestAnimationFrame(() => setJumping(true));
            }}
            onAnimationEnd={() => setJumping(false)}
          >
            🦔
          </span>{" "}
          this is Steve. We love him.
        </p>
      </div>

      <style jsx>{`
        @keyframes steve-jump {
          0% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-40px) rotate(-15deg); }
          50% { transform: translateY(-50px) rotate(10deg) scale(1.3); }
          70% { transform: translateY(-20px) rotate(-5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </footer>
  );
}
