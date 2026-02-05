"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { CardData, CardSkin } from "../types";

const SKIN_CLASSES: Record<CardSkin, string> = {
  dark: "bg-[#0a0a0a] border border-white/[0.08] text-white",
  stark: "bg-white text-black",
  depth: "bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.05)] border border-white/20",
  glass: "bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] text-white",
};

const REVEAL_THRESHOLD = 0.2; // 20% of viewport height

interface CardProps {
  card: CardData;
  skin: CardSkin;
  style?: {
    x?: MotionValue<number>;
    rotate?: MotionValue<number>;
    scale?: MotionValue<number> | number;
    opacity?: MotionValue<number> | number;
  };
  drag?: boolean | "x" | "y";
  dragConstraints?: { left: number; right: number; top: number; bottom: number };
  onDragEnd?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => void;
  hasChevron?: boolean;
  isActive?: boolean;
}

export function Card({
  card,
  skin,
  style,
  drag,
  dragConstraints,
  onDragEnd,
  hasChevron,
  isActive,
}: CardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const y = useMotionValue(0);
  const revealOpacity = useTransform(y, [0, -100], [0, 1]);
  const frontOpacity = useTransform(y, [0, -100], [1, 0]);

  const handleRevealDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
      const threshold = window.innerHeight * REVEAL_THRESHOLD;
      if (info.offset.y < -threshold && !isRevealed) {
        animate(y, -window.innerHeight * 0.4, {
          type: "spring",
          stiffness: 300,
          damping: 30,
          onComplete: () => setIsRevealed(true),
        });
      } else if (info.offset.y > threshold && isRevealed) {
        animate(y, 0, {
          type: "spring",
          stiffness: 300,
          damping: 30,
          onComplete: () => setIsRevealed(false),
        });
      } else {
        animate(y, isRevealed ? -window.innerHeight * 0.4 : 0, {
          type: "spring",
          stiffness: 300,
          damping: 30,
        });
      }
    },
    [isRevealed, y]
  );

  const handleTapReveal = useCallback(() => {
    if (isRevealed) {
      animate(y, 0, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => setIsRevealed(false),
      });
    }
  }, [isRevealed, y]);

  const canReveal = card.hasVerticalReveal && isActive;

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl select-none ${SKIN_CLASSES[skin]}`}
      style={style}
      drag={drag}
      dragConstraints={dragConstraints}
      dragElastic={0.7}
      onDragEnd={onDragEnd}
    >
      {/* Revealed back face */}
      {canReveal && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
          style={{ opacity: revealOpacity }}
        >
          <span className="text-4xl font-bold opacity-60">REVEALED</span>
          <span className="text-sm opacity-40 mt-2">{card.segmentLabel}</span>
        </motion.div>
      )}

      {/* Front face */}
      <motion.div
        className="flex flex-col items-center gap-2"
        style={canReveal ? { opacity: frontOpacity } : undefined}
      >
        <span className="text-6xl font-bold">{card.id + 1}</span>
        <span className="text-sm opacity-50">{card.segmentLabel}</span>
      </motion.div>

      {/* Vertical drag layer for reveal cards */}
      {canReveal && (
        <motion.div
          className="absolute inset-0 z-10"
          drag="y"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.5}
          style={{ y }}
          onDragEnd={handleRevealDragEnd}
          onTap={handleTapReveal}
        />
      )}

      {/* Chevron hint */}
      {hasChevron && !isRevealed && (
        <motion.div
          className="absolute bottom-8 flex flex-col items-center opacity-30"
          style={canReveal ? { opacity: frontOpacity } : undefined}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="text-xs mt-1">swipe up</span>
        </motion.div>
      )}
    </motion.div>
  );
}
