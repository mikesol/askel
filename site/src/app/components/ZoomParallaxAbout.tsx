"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

const images = [
  { src: "/zoom-parallax/team.webp", alt: "Askel team" },
  { src: "/zoom-parallax/Epicenter.webp", alt: "Epicenter Helsinki" },
  { src: "/zoom-parallax/IMG_5394.webp", alt: "Industrial washer" },
  { src: "/zoom-parallax/IMG_5645.webp", alt: "Melers team" },
  { src: "/zoom-parallax/IMG_4841.webp", alt: "Team at Melers facility" },
  { src: "/zoom-parallax/IMG_5637.webp", alt: "Laundry operations" },
  { src: "/zoom-parallax/IMG_4801.webp", alt: "Epicenter event space" },
];

// Mobile: hand-tuned in collage-lab.html (vh offsets, vw sizes).
// Desktop (md+): original reference positions with vh/vw mix.
const positions = [
  // 0: center — offset left so right-side images breathe
  "[&>div]:!h-[28.4vw] [&>div]:!w-[40.9vw] [&>div]:!top-[1.1vw] [&>div]:!-left-[15.7vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw] md:[&>div]:!top-0 md:[&>div]:!left-0",
  // 1: top-right
  "[&>div]:!-top-[16vh] [&>div]:!left-[17.3vw] [&>div]:!h-[26vw] [&>div]:!w-[38vw] md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]",
  // 2: top-left
  "[&>div]:!-top-[19.3vh] [&>div]:!-left-[21.8vw] [&>div]:!h-[35vw] [&>div]:!w-[30vw] md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]",
  // 3: mid-right
  "[&>div]:!-top-[1.8vh] [&>div]:!left-[25vw] [&>div]:!h-[22vw] [&>div]:!w-[28vw] md:[&>div]:!top-0 md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]",
  // 4: bottom-left
  "[&>div]:!top-[17.4vh] [&>div]:!-left-[19vw] [&>div]:!h-[24vw] [&>div]:!w-[32vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]",
  // 5: bottom-center
  "[&>div]:!top-[24.3vh] [&>div]:!left-[16.1vw] [&>div]:!h-[22vw] [&>div]:!w-[30vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]",
  // 6: bottom-right
  "[&>div]:!top-[11.6vh] [&>div]:!left-[24vw] [&>div]:!h-[19.4vw] [&>div]:!w-[32.1vw] md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]",
];

export function ZoomParallaxAbout() {
  const { language } = useLanguage();
  const t = content[language].about;
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 2.5]);

  const scales = [scaleCenter, scale5, scale6, scale5, scale6, scale8, scale9];

  const surroundingOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    [0.85, 0.6, 0]
  );

  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const aboutY = useTransform(scrollYProgress, [0.65, 0.85], [40, 0]);
  const centerRadius = useTransform(scrollYProgress, [0, 0.6], [0, 16]);

  return (
    <section id="about">
      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {images.map(({ src, alt }, index) => {
            const scale = scales[index % scales.length];
            const isCenter = index === 0;

            return (
              <motion.div
                key={index}
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
                    sizes={isCenter ? "(max-width: 768px) 41vw, 25vw" : "(max-width: 768px) 38vw, 35vw"}
                    loading="eager"
                  />
                </motion.div>
              </motion.div>
            );
          })}

          {/* "Our story" label */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="absolute top-16 left-0 right-0 z-30 text-center"
          >
            <p className="text-[var(--color-text-secondary)] text-2xl sm:text-3xl font-semibold uppercase tracking-widest">
              {language === "en" ? "Our Story" : "Tarinamme"}
            </p>
          </motion.div>

          {/* About content */}
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

      {/* Team grid */}
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
