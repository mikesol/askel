"use client";

import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import { Nav } from "./components/Nav";
import { TypewriterHero } from "./components/TypewriterHero";
import { Footer } from "./components/Footer";
import { WavePathDivider } from "./components/WavePathDivider";
// import { FeatureCarousel } from "./components/FeatureCarousel";
// import { TeamGallery } from "./components/TeamGallery";
// import { ZoomParallax } from "./components/ZoomParallax";
// import { CaseTimeline } from "./components/CaseTimeline";
import { WavePathContact } from "./components/WavePath";
import { StaircaseCanvas } from "./components/StaircaseCanvas";
import { content } from "./content";

function PageContent() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      <StaircaseCanvas />
      <div className="relative z-[1]">
      <Nav />

      <main>
        {/* Hero */}
        <TypewriterHero />

        {/* Statement */}
        <section id="statement" className="relative flex min-h-[60vh] flex-col items-center justify-center py-24 lg:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full opacity-[0.07] blur-[30px]"
            style={{ background: "radial-gradient(ellipse at center, var(--color-text-primary), transparent 50%)" }}
          />

          <div className="flex w-[70vw] flex-col items-end">
            <WavePathDivider className="mb-10" />
            <div className="flex w-full flex-col items-end">
              <div className="flex justify-end gap-8">
                <p className="text-[var(--color-text-secondary)] mt-2 text-sm shrink-0">
                  {t.statement.label}
                </p>
                <p className="text-[var(--color-text-primary)] opacity-80 w-3/4 text-2xl md:text-4xl leading-snug">
                  {t.statement.heading}
                </p>
              </div>
              <p className="mt-8 text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl text-right">
                {t.statement.body}
              </p>
            </div>
          </div>
        </section>

        {/* Feature Carousel — replaces 3 separate sections */}
        {/* <FeatureCarousel /> */}

        {/* <div className="hr-fade" /> */}

        {/* About / Team — 3D Gallery */}
        {/* <TeamGallery /> */}

        {/* Zoom Parallax — visual interlude */}
        {/* <ZoomParallax /> */}

        {/* Case Study Timeline */}
        {/* <CaseTimeline /> */}

        {/* <div className="hr-fade" /> */}

        {/* Wave Path + Contact */}
        <WavePathContact />
      </main>

      <Footer />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
