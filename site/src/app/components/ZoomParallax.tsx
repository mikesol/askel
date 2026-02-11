"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  { src: "/melers/storefront.jpg", alt: "Melers storefront", scale: [2.2, 1] as [number, number] },
  { src: "/melers/team-1.jpeg", alt: "Melers team group photo", scale: [2.8, 1] as [number, number] },
  { src: "/melers/red-dryer.jpg", alt: "Industrial dryer", scale: [3.0, 1] as [number, number] },
  { src: "/melers/garments.jpg", alt: "Garment racks", scale: [2.5, 1] as [number, number] },
  { src: "/melers/team-2.jpeg", alt: "Melers team at work", scale: [3.2, 1] as [number, number] },
  { src: "/melers/warehouse-1.jpg", alt: "Warehouse operations", scale: [2.6, 1] as [number, number] },
  { src: "/melers/washroom.jpg", alt: "Washroom equipment", scale: [3.4, 1] as [number, number] },
  { src: "/melers/team-3.jpeg", alt: "Melers operations team", scale: [2.4, 1] as [number, number] },
  { src: "/melers/warehouse-2.jpg", alt: "Warehouse facility", scale: [3.0, 1] as [number, number] },
];

const positions = [
  { top: "0%", left: "0%", w: "100%", h: "100%" },
  { top: "-12%", left: "3%", w: "32%", h: "28%" },
  { top: "-10%", left: "65%", w: "32%", h: "28%" },
  { top: "28%", left: "-8%", w: "25%", h: "22%" },
  { top: "30%", left: "25%", w: "50%", h: "25%" },
  { top: "28%", left: "78%", w: "25%", h: "22%" },
  { top: "62%", left: "3%", w: "28%", h: "25%" },
  { top: "64%", left: "35%", w: "32%", h: "27%" },
  { top: "62%", left: "70%", w: "28%", h: "25%" },
];

function ZoomImage({
  src,
  alt,
  scaleRange,
  position,
  scrollYProgress,
}: {
  src: string;
  alt: string;
  scaleRange: [number, number];
  position: (typeof positions)[0];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <motion.div
      className="absolute overflow-hidden rounded-lg"
      style={{
        scale,
        top: position.top,
        left: position.left,
        width: position.w,
        height: position.h,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
}

export function ZoomParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-dvh overflow-hidden flex items-center justify-center">
        <div className="relative w-[min(90vw,1200px)] h-[min(70vh,800px)]">
          {images.map((img, i) => (
            <ZoomImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              scaleRange={img.scale}
              position={positions[i]}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
