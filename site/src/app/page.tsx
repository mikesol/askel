"use client";

import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import { Nav } from "./components/Nav";
import { TypewriterHero } from "./components/TypewriterHero";
import { Footer } from "./components/Footer";
import { WavePathDivider } from "./components/WavePathDivider";
import { StaircasePulse } from "./components/StaircasePulse";
// import { FeatureCarousel } from "./components/FeatureCarousel";
// import { TeamGallery } from "./components/TeamGallery";
// import { ZoomParallax } from "./components/ZoomParallax";
// import { CaseTimeline } from "./components/CaseTimeline";
import { WavePathContact } from "./components/WavePath";
// import { StaircaseCanvas } from "./components/StaircaseCanvas";
import { content } from "./content";

function PageContent() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      {/* <StaircaseCanvas /> */}
      <div className="relative z-[1]">
      <Nav />

      <main>
        {/* Hero */}
        <TypewriterHero />

        {/* Statement */}
        <section id="statement" className="relative py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <WavePathDivider className="mb-16 mx-auto" />
            <div className="flex gap-12 lg:gap-20 items-start">
              <StaircasePulse className="hidden md:block w-48 lg:w-64 h-64 lg:h-80 shrink-0" />
              <div className="flex-1">
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
