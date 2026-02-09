"use client";

import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import { Nav } from "./components/Nav";
import { TypewriterHero } from "./components/TypewriterHero";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
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
        <Section id="statement" label={t.statement.label}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight max-w-3xl">
            {t.statement.heading}
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.statement.body}
          </p>
        </Section>

        <div className="hr-fade" />

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
