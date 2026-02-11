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
  { src: "/zoom-parallax/team.webp", alt: "Askel team" },
  { src: "/zoom-parallax/Epicenter.webp", alt: "Epicenter Helsinki" },
  { src: "/zoom-parallax/IMG_5394.webp", alt: "Industrial washer" },
  { src: "/zoom-parallax/IMG_5645.webp", alt: "Melers team" },
  { src: "/zoom-parallax/IMG_4841.webp", alt: "Team at Melers facility" },
  { src: "/zoom-parallax/IMG_5637.webp", alt: "Laundry operations" },
  { src: "/zoom-parallax/IMG_4801.webp", alt: "Epicenter event space" },
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

  // "Our story" label fades out as parallax begins
  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // About text fades in below the center image
  const aboutOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const aboutY = useTransform(scrollYProgress, [0.65, 0.85], [40, 0]);

  // Center image border radius animates
  const centerRadius = useTransform(scrollYProgress, [0, 0.6], [0, 16]);

  const scales = [scaleCenter, scale5, scale6, scale5, scale6, scale8, scale9];

  // Positions for surrounding images (index 1-6)
  // Layout: flex center at (808, 498) on 1615×844 viewport.
  // Formula: top = 498 - h/2 + offset, left = 808 - w/2 + offset.
  // Inspired by reference: tall portrait left, wide landscape top, staggered bottom.
  // All bounding boxes verified — no overlaps, 15-60px gaps.
  const positions = [
    "", // 0: center (361-637 × 606-1010)
    "[&>div]:!-top-[30vh] [&>div]:!left-[3vw] [&>div]:!h-[22vh] [&>div]:!w-[30vw]",
    "[&>div]:!-top-[14vh] [&>div]:!-left-[23vw] [&>div]:!h-[34vh] [&>div]:!w-[15vw]",
    "[&>div]:!-top-[3vh] [&>div]:!left-[26vw] [&>div]:!h-[22vh] [&>div]:!w-[20vw]",
    "[&>div]:!top-[28vh] [&>div]:!-left-[24vw] [&>div]:!h-[20vh] [&>div]:!w-[22vw]",
    "[&>div]:!top-[29vh] [&>div]:!-left-[1vw] [&>div]:!h-[18vh] [&>div]:!w-[20vw]",
    "[&>div]:!top-[28vh] [&>div]:!left-[20vw] [&>div]:!h-[19vh] [&>div]:!w-[15vw]",
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
                className={`absolute top-0 flex h-full w-full items-center justify-center pt-[18vh] ${positions[index]}`}
              >
                <motion.div
                  className={`relative overflow-hidden rounded-xl ${
                    isCenter
                      ? "w-[60vw] h-[40vw] sm:w-[25vw] sm:h-[17vw]"
                      : "h-[25vh] w-[25vw]"
                  }`}
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

          {/* "Our story" label — rendered after images so it stacks on top */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute top-16 left-0 right-0 z-30 text-center"
          >
            <p className="text-[var(--color-text-secondary)] text-2xl sm:text-3xl font-semibold uppercase tracking-widest">
              {language === "en" ? "Our Story" : "Tarinamme"}
            </p>
          </motion.div>

          {/* About content — emerges below the center image */}
          <motion.div
            style={{ opacity: aboutOpacity, y: aboutY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center pointer-events-none pb-8 sm:pb-12"
          >
            {/* Heading + body — no "About" label, leads with heading */}
            <div className="pointer-events-auto rounded-xl bg-black/70 backdrop-blur-md border border-white/10 px-8 py-6 max-w-2xl mx-6 text-center mb-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight gradient-text leading-tight">
                {t.heading}
              </h2>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t.body}
              </p>
            </div>

            {/* Team names row with better descriptions */}
            <div className="pointer-events-auto flex gap-6 sm:gap-10 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3">
              {t.team.map((member) => (
                <div key={member.name} className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-white">
                    {member.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[var(--color-text-tertiary)]">
                    {member.role}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-[var(--color-text-tertiary)] opacity-70 mt-0.5">
                    {member.ventures.join(" · ")}
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
