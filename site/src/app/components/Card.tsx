"use client";

import { motion, MotionValue } from "framer-motion";
import { CardData, CardSkin } from "../types";

const SKIN_CLASSES: Record<CardSkin, string> = {
  dark: "bg-[#0a0a0a] border border-white/[0.08] text-white",
  stark: "bg-white text-black",
  depth: "bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.05)] border border-white/20",
  glass: "bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] text-white",
};

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
  isRevealed?: boolean;
  hasChevron?: boolean;
}

export function Card({
  card,
  skin,
  style,
  drag,
  dragConstraints,
  onDragEnd,
  isRevealed,
  hasChevron,
}: CardProps) {
  return (
    <motion.div
      className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl select-none ${SKIN_CLASSES[skin]}`}
      style={style}
      drag={drag}
      dragConstraints={dragConstraints}
      dragElastic={0.7}
      onDragEnd={onDragEnd}
    >
      {isRevealed ? (
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-bold opacity-60">REVEALED</span>
          <span className="text-sm opacity-40">{card.segmentLabel}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl font-bold">{card.id + 1}</span>
          <span className="text-sm opacity-50">{card.segmentLabel}</span>
        </div>
      )}
      {hasChevron && !isRevealed && (
        <div className="absolute bottom-8 flex flex-col items-center opacity-30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="text-xs mt-1">swipe up</span>
        </div>
      )}
    </motion.div>
  );
}
