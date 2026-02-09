"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { CardData, CardSkin } from "../types";
import { CardOverlay } from "../act1/CardOverlay";
import { Act2Overlay } from "../act2/Act2Overlay";

const SKIN_CLASSES: Record<CardSkin, string> = {
  dark: "bg-[#0a0a0a] border border-white/[0.08] text-white",
  stark: "bg-white text-black",
  depth: "bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.05)] border border-white/20",
  glass: "bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] text-white",
  act1: "bg-transparent text-white",
  act2: "bg-transparent text-white",
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
  showSwipeHint?: boolean;
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
  showSwipeHint,
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
  const isAct1 = card.cardType?.startsWith("act1-");
  const isAct2 = card.cardType?.startsWith("act2-");
  const isActCard = isAct1 || isAct2;
  const effectiveSkin = isAct1 ? "act1" : isAct2 ? "act2" : skin;

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl select-none ${SKIN_CLASSES[effectiveSkin]}`}
      style={style}
      drag={drag}
      dragConstraints={dragConstraints}
      dragElastic={0.7}
      onDragEnd={onDragEnd}
    >
      {/* Act 1 cards: transparent overlay with narrative text */}
      {isAct1 && card.cardType && (
        <CardOverlay cardType={card.cardType} />
      )}

      {/* Act 2 cards: transparent overlay with narrative text */}
      {isAct2 && card.cardType && (
        <Act2Overlay cardType={card.cardType} />
      )}

      {/* Non-act cards: standard content */}
      {!isActCard && (
        <>
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
        </>
      )}

      {/* Swipe hint on first card */}
      {showSwipeHint && (
        <motion.div
          className={`absolute flex items-center gap-2 text-white/70 ${isActCard ? "top-[77%]" : "bottom-10"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-[11px] tracking-[0.15em] uppercase">Swipe to explore</span>
        </motion.div>
      )}
    </motion.div>
  );
}
