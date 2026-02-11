"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";
import { useIsMobile } from "../hooks/useIsMobile";

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

// Desktop: all 7 images, positions tuned for ~1615×844 viewport
const desktopPositions = [
  "", // center
  "[&>div]:!-top-[30vh] [&>div]:!left-[3vw] [&>div]:!h-[22vh] [&>div]:!w-[30vw]",
  "[&>div]:!-top-[14vh] [&>div]:!-left-[23vw] [&>div]:!h-[34vh] [&>div]:!w-[15vw]",
  "[&>div]:!-top-[3vh] [&>div]:!left-[26vw] [&>div]:!h-[22vh] [&>div]:!w-[20vw]",
  "[&>div]:!top-[28vh] [&>div]:!-left-[24vw] [&>div]:!h-[20vh] [&>div]:!w-[22vw]",
  "[&>div]:!top-[29vh] [&>div]:!-left-[1vw] [&>div]:!h-[18vh] [&>div]:!w-[20vw]",
  "[&>div]:!top-[28vh] [&>div]:!left-[20vw] [&>div]:!h-[19vh] [&>div]:!w-[15vw]",
];

// Mobile: 4 surrounding images in quadrants, tuned for ~390×844 viewport
const mobilePositions = [
  "", // center
  "[&>div]:!-top-[24vh] [&>div]:!-left-[8vw] [&>div]:!h-[18vh] [&>div]:!w-[36vw]",
  "[&>div]:!-top-[22vh] [&>div]:!left-[24vw] [&>div]:!h-[22vh] [&>div]:!w-[22vw]",
  "[&>div]:!top-[20vh] [&>div]:!-left-[12vw] [&>div]:!h-[16vh] [&>div]:!w-[34vw]",
  "[&>div]:!top-[22vh] [&>div]:!left-[20vw] [&>div]:!h-[18vh] [&>div]:!w-[26vw]",
];

// Which images to show on mobile (center + 4 surrounding, skip far-offscreen ones)
const mobileImageIndices = [0, 1, 3, 5, 6];

export function ZoomParallaxAbout() {
  const { language } = useLanguage();
  const t = content[language].about;
  const container = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  // Desktop: 7 images with full scale range
  const desktopScales = [scaleCenter, scale5, scale6, scale5, scale6, scale8, scale9];

  // Mobile: 5 images with tighter scales
  const mobileScales = [scaleCenter, scale5, scale5, scale6, scale6];

  const visibleImages = isMobile
    ? mobileImageIndices.map((i) => images[i])
    : images;
  const activePositions = isMobile ? mobilePositions : desktopPositions;
  const activeScales = isMobile ? mobileScales : desktopScales;

  return (
    <section id="about">
      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Parallax images */}
          {visibleImages.map(({ src, alt }, index) => {
            const scale = activeScales[index];
            const isCenter = index === 0;

            return (
              <motion.div
                key={src}
                style={{
                  scale,
                  opacity: isCenter ? 1 : surroundingOpacity,
                }}
                className={`absolute top-0 flex h-full w-full items-center justify-center pt-[18vh] ${activePositions[index]}`}
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
            className="absolute inset-x-0 bottom-0 flex flex-col items-center pointer-events-none pb-4"
          >
            <div className="pointer-events-auto rounded-xl bg-black/70 backdrop-blur-md border border-white/10 px-5 py-4 sm:px-8 sm:py-6 max-w-2xl mx-6 text-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight gradient-text leading-tight">
                {t.heading}
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t.body.split("\n\n")[0]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team grid — 1 col mobile, 2x2 desktop */}
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
          {t.team.map((member) => (
            <div key={member.name} className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--color-accent)] mt-1">
                {member.role}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
                {member.tags.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
