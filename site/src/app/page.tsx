"use client";

import { useLanguage } from "./components/LanguageProvider";
import { Nav } from "./components/Nav";
import { TypewriterHero } from "./components/TypewriterHero";
import { Footer } from "./components/Footer";
import { WavePathDivider } from "./components/WavePathDivider";
import { WavePathContact } from "./components/WavePath";
import { ZoomParallaxAbout } from "./components/ZoomParallaxAbout";
import { content } from "./content";
import Image from "next/image";

export default function Home() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="relative z-[1]">
      <Nav />

      <main>
        {/* Hero */}
        <TypewriterHero />

        {/* Thesis */}
        <section id="statement" className="relative py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <WavePathDivider className="mb-16 mx-auto" />
            <div>
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                  {t.statement.label}
                </p>
                <h2 className="text-2xl md:text-4xl lg:text-5xl leading-snug text-[var(--color-text-primary)] opacity-80">
                  {t.statement.heading}
                </h2>
                <p className="mt-6 text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                  {t.statement.body}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Teaser */}
        <section className="relative">
          <div className="hr-fade" />
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 lg:pt-32 lg:pb-16">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/melers/laundromat3.webp"
                  alt="Melers Oy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium uppercase tracking-widest mb-4">
                  {t.caseStudy.label}
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text leading-tight">
                  {t.caseStudy.heading}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {t.caseStudy.subtitle}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
                  {t.caseStudy.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold tracking-tight text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="/case-study"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/70 transition-colors"
                >
                  {language === "en" ? "Read the full story" : "Lue koko tarina"}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Team — Zoom Parallax About */}
        <ZoomParallaxAbout />

        {/* Contact */}
        <WavePathContact />
      </main>

      <Footer />
    </div>
  );
}
