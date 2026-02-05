"use client";

import { useState, useCallback } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";
import { Card } from "./Card";
import { CARDS } from "../data";
import { DeckConfig, SpringPreset } from "../types";

const SPRING_CONFIGS: Record<SpringPreset, { stiffness: number; damping: number }> = {
  snappy: { stiffness: 500, damping: 30 },
  smooth: { stiffness: 300, damping: 25 },
  heavy: { stiffness: 150, damping: 20 },
};

const SWIPE_THRESHOLD_RATIO = 0.3;

export function CardDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState<DeckConfig>({
    skin: "dark",
    spring: "snappy",
    showProgress: true,
  });

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);

  // Behind card reacts to active card's drag
  const behindScale = useTransform(x, [-200, 0, 200], [1, 0.95, 1]);
  const behindOpacity = useTransform(x, [-200, 0, 200], [1, 0.7, 1]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
      const threshold = window.innerWidth * SWIPE_THRESHOLD_RATIO;
      const spring = SPRING_CONFIGS[config.spring];

      // Swipe right = next card (positive offset means finger moved right)
      if (info.offset.x < -threshold && currentIndex < CARDS.length - 1) {
        animate(x, -window.innerWidth * 1.5, {
          type: "spring",
          ...spring,
          onComplete: () => {
            setCurrentIndex((i) => i + 1);
            x.set(0);
          },
        });
      }
      // Swipe left = previous card
      else if (info.offset.x > threshold && currentIndex > 0) {
        animate(x, window.innerWidth * 1.5, {
          type: "spring",
          ...spring,
          onComplete: () => {
            setCurrentIndex((i) => i - 1);
            x.set(0);
          },
        });
      }
      // Snap back
      else {
        animate(x, 0, { type: "spring", ...spring });
      }
    },
    [currentIndex, config.spring, x]
  );

  return (
    <div className="relative h-full w-full">
      {/* Behind card (next) */}
      {currentIndex < CARDS.length - 1 && (
        <Card
          key={`behind-${CARDS[currentIndex + 1].id}`}
          card={CARDS[currentIndex + 1]}
          skin={config.skin}
          style={{
            scale: behindScale,
            opacity: behindOpacity,
          }}
          hasChevron={CARDS[currentIndex + 1].hasVerticalReveal}
        />
      )}

      {/* Active card */}
      <Card
        key={`active-${CARDS[currentIndex].id}`}
        card={CARDS[currentIndex]}
        skin={config.skin}
        style={{
          x,
          rotate,
          scale,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        hasChevron={CARDS[currentIndex].hasVerticalReveal}
      />
    </div>
  );
}

// Export for DevPanel wiring
export type { DeckConfig };
