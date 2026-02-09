"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";
import { Nav } from "./components/Nav";
import { TypewriterHero } from "./components/TypewriterHero";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
import { content } from "./content";

function PageContent() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
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

        {/* For Investors */}
        <Section id="investors" label={t.investors.label}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {t.investors.heading}
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.investors.body}
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.investors.points.map((point) => (
              <FeatureCard
                key={point.title}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>
        </Section>

        <div className="hr-fade" />

        {/* For Sellers */}
        <Section id="owners" label={t.owners.label}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {t.owners.heading}
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.owners.body}
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.owners.points.map((point) => (
              <FeatureCard
                key={point.title}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>
        </Section>

        <div className="hr-fade" />

        {/* For Operators */}
        <Section id="operators" label={t.operators.label}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {t.operators.heading}
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.operators.body}
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.operators.points.map((point) => (
              <FeatureCard
                key={point.title}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>
        </Section>

        <div className="hr-fade" />

        {/* About / Team */}
        <Section id="about" label={t.about.label}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {t.about.heading}
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.about.body}
          </p>
          <div className="mt-12 border-t border-[var(--color-border-subtle)] pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.about.team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-white">
                    {member.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {member.role}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {member.ventures.map((v) => (
                      <span
                        key={v}
                        className="text-[10px] text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)] rounded-full px-2 py-0.5"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <div className="hr-fade" />

        {/* Case Study */}
        <Section id="case-study" label={t.caseStudy.label}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {t.caseStudy.heading}
          </h2>
          <p className="text-sm text-[var(--color-accent)] mt-2">
            {t.caseStudy.subtitle}
          </p>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.caseStudy.body}
          </p>
          {/* Stats grid — 21st.dev inspired left-aligned stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {t.caseStudy.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col justify-between p-5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-accent)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        <div className="hr-fade" />

        {/* Contact */}
        <Section id="contact" label={t.contact.label}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {t.contact.body}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-6">
            <a
              href={`mailto:${t.contact.email}`}
              className="inline-flex items-center justify-center text-sm font-semibold text-black bg-white hover:bg-white/90 px-6 py-3 rounded-lg transition-all duration-150"
            >
              {t.contact.cta}
            </a>
            <div className="flex flex-col gap-1">
              <a
                href={`mailto:${t.contact.email}`}
                className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
              >
                {t.contact.email}
              </a>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                {t.contact.location}
              </p>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="group relative p-6 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] hover:border-white/[0.12] transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Corner accents — inspired by 21st.dev Features 10 */}
      <span className="absolute -left-px -top-px block size-1.5 border-l border-t border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute -right-px -top-px block size-1.5 border-r border-t border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute -bottom-px -left-px block size-1.5 border-b border-l border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute -bottom-px -right-px block size-1.5 border-b border-r border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
