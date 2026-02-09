"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

const GalleryCanvas = dynamic(() => import("./TeamGalleryCanvas"), {
  ssr: false,
});

export function TeamGallery() {
  const { language } = useLanguage();
  const t = content[language].about;

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <p className="text-[var(--color-accent)] text-sm font-medium uppercase tracking-widest mb-4">
          {t.label}
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
          {t.heading}
        </h2>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          {t.body}
        </p>
      </div>

      <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-tertiary)]">
              Loading gallery...
            </div>
          }
        >
          <GalleryCanvas team={t.team} />
        </Suspense>
      </div>
    </section>
  );
}
