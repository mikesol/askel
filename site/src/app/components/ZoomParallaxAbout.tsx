"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

interface ParallaxImage {
  src: string;
  alt: string;
}

const images: ParallaxImage[] = [
  { src: "/team/askel-team.webp", alt: "Askel team" },
  { src: "/melers/storefront.webp", alt: "Melers storefront" },
  { src: "/melers/washroom.webp", alt: "Washroom operations" },
  { src: "/melers/team-3.webp", alt: "Melers team" },
  { src: "/melers/red-dryer.webp", alt: "Industrial dryer" },
  { src: "/melers/warehouse-1.webp", alt: "Warehouse" },
  { src: "/melers/garments.webp", alt: "Garments" },
];

export function ZoomParallaxAbout() {
  const { language } = useLanguage();
  const t = content[language].about;
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Surrounding images scale up and fade out
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Center image scales up moderately — stays contained
  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 2.5]);

  // Surrounding images fade out as we scroll
  const surroundingOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    [0.85, 0.6, 0]
  );

  // About text fades in around the center image
  const aboutOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const aboutY = useTransform(scrollYProgress, [0.5, 0.8], [40, 0]);

  // Center image border radius animates
  const centerRadius = useTransform(scrollYProgress, [0, 0.6], [0, 16]);

  const scales = [scaleCenter, scale5, scale6, scale5, scale6, scale8, scale9];

  // Positions for surrounding images (index 1-6)
  const positions = [
    "", // index 0: center, default
    "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]",
    "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]",
    "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]",
    "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]",
    "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]",
    "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]",
  ];

  return (
    <section id="about">
      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Parallax images */}
          {images.map(({ src, alt }, index) => {
            const scale = scales[index % scales.length];
            const isCenter = index === 0;

            return (
              <motion.div
                key={src}
                style={{
                  scale,
                  opacity: isCenter ? 1 : surroundingOpacity,
                }}
                className={`absolute top-0 flex h-full w-full items-center justify-center ${positions[index]}`}
              >
                <motion.div
                  className="relative h-[25vh] w-[25vw] overflow-hidden"
                  style={isCenter ? { borderRadius: centerRadius } : undefined}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes={
                      isCenter
                        ? "(max-width: 768px) 80vw, 25vw"
                        : "(max-width: 768px) 50vw, 30vw"
                    }
                    loading="eager"
                  />
                </motion.div>
              </motion.div>
            );
          })}

          {/* About content — emerges below the center image */}
          <motion.div
            style={{ opacity: aboutOpacity, y: aboutY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center pointer-events-none pb-8 sm:pb-12"
          >
            {/* Heading + body */}
            <div className="pointer-events-auto rounded-xl bg-black/70 backdrop-blur-md border border-white/10 px-8 py-6 max-w-2xl mx-6 text-center mb-4">
              <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-widest mb-3">
                {t.label}
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight gradient-text leading-tight">
                {t.heading}
              </h2>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t.body}
              </p>
            </div>

            {/* Team names row */}
            <div className="pointer-events-auto flex gap-6 sm:gap-10 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3">
              {t.team.map((member) => (
                <div key={member.name} className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-white">
                    {member.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[var(--color-text-tertiary)]">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
