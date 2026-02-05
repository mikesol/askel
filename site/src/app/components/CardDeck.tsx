"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";
import { DevPanel } from "./DevPanel";
import { CARDS } from "../data";
import { DeckConfig, SpringPreset } from "../types";
import { FunnelProvider } from "../act1/FunnelContext";
import { Act1MapLayer } from "./Act1MapLayer";

const SPRING_CONFIGS: Record<SpringPreset, { stiffness: number; damping: number }> = {
  snappy: { stiffness: 500, damping: 30 },
  smooth: { stiffness: 300, damping: 25 },
  heavy: { stiffness: 150, damping: 20 },
};

const SWIPE_THRESHOLD_RATIO = 0.15;
const VELOCITY_THRESHOLD = 300; // px/s — a quick flick triggers even with small offset

// Act 1 card indices (0-based)
const ACT1_FIRST = 0;
const ACT1_LAST = 3;

function isAct1(index: number) {
  return index >= ACT1_FIRST && index <= ACT1_LAST;
}

export function CardDeck() {
  return (
    <FunnelProvider>
      <CardDeckInner />
    </FunnelProvider>
  );
}

function CardDeckInner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [config, setConfig] = useState<DeckConfig>({
    skin: "dark",
    spring: "snappy",
    showProgress: true,
  });

  // Track map fade-out when leaving Act 1
  const [mapVisible, setMapVisible] = useState(true);

  const currentIndexRef = useRef(currentIndex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dragProgress = useMotionValue(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    dragProgress.set(currentIndex);
    // Show/hide map based on whether we're in Act 1
    if (isAct1(currentIndex)) {
      setMapVisible(true);
    }
  }, [currentIndex, dragProgress]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);

  // Next card (behind): visible only when dragging left (x < 0), hidden at rest and when dragging right
  const nextScale = useTransform(x, [-200, 0], [1, 0.95]);
  const nextOpacity = useTransform(x, [-200, -5, 0], [1, 0.7, 0]);

  // Previous card (behind): visible only when dragging right (x > 0), hidden at rest and when dragging left
  const prevScale = useTransform(x, [0, 200], [0.95, 1]);
  const prevOpacity = useTransform(x, [0, 5, 200], [0, 0.7, 1]);

  // Subscribe x motion value to update dragProgress in real time
  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 400;
      // Normalize: dragging left (negative x) means going forward
      const fraction = -latestX / (vw * 1.5);
      dragProgress.set(currentIndexRef.current + fraction);
    });
    return unsubscribe;
  }, [x, dragProgress]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
      const threshold = window.innerWidth * SWIPE_THRESHOLD_RATIO;
      const spring = SPRING_CONFIGS[config.spring];

      const swipeLeft = info.offset.x < -threshold || info.velocity.x < -VELOCITY_THRESHOLD;
      const swipeRight = info.offset.x > threshold || info.velocity.x > VELOCITY_THRESHOLD;

      // Swipe left on screen = next card
      if (swipeLeft && currentIndex < CARDS.length - 1) {
        const goingToIndex = currentIndex + 1;
        animate(x, -window.innerWidth * 1.5, {
          type: "spring",
          ...spring,
          onComplete: () => {
            // Fade out map when leaving Act 1
            if (currentIndex === ACT1_LAST && goingToIndex > ACT1_LAST) {
              setMapVisible(false);
            }
            setCurrentIndex(goingToIndex);
            x.set(0);
          },
        });
      }
      // Swipe right on screen = previous card
      else if (swipeRight && currentIndex > 0) {
        const goingToIndex = currentIndex - 1;
        animate(x, window.innerWidth * 1.5, {
          type: "spring",
          ...spring,
          onComplete: () => {
            // Show map when re-entering Act 1
            if (!isAct1(currentIndex) && isAct1(goingToIndex)) {
              setMapVisible(true);
            }
            setCurrentIndex(goingToIndex);
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

  const handleGoToCard = useCallback((index: number) => {
    setCurrentIndex(index);
    setMapVisible(isAct1(index));
    x.set(0);
  }, [x]);

  const showMap = mapVisible && isAct1(currentIndex);

  return (
    <div className="relative h-full w-full touch-none">
      {/* Progress bar — z-30 */}
      {config.showProgress && (
        <ProgressBar
          currentIndex={currentIndex}
          totalCards={CARDS.length}
          dragProgress={dragProgress}
        />
      )}

      {/* Finland map — persistent z-10 layer during Act 1 */}
      <Act1MapLayer
        currentIndex={currentIndex}
        visible={showMap}
      />

      {/* Behind card (previous — visible when dragging right) */}
      {currentIndex > 0 && (
        <div className="absolute inset-0" style={{ zIndex: 20 }}>
          <Card
            key={`behind-prev-${CARDS[currentIndex - 1].id}`}
            card={CARDS[currentIndex - 1]}
            skin={config.skin}
            style={{
              scale: prevScale,
              opacity: prevOpacity,
            }}
            hasChevron={CARDS[currentIndex - 1].hasVerticalReveal}
          />
        </div>
      )}

      {/* Behind card (next — visible when dragging left) */}
      {currentIndex < CARDS.length - 1 && (
        <div className="absolute inset-0" style={{ zIndex: 20 }}>
          <Card
            key={`behind-next-${CARDS[currentIndex + 1].id}`}
            card={CARDS[currentIndex + 1]}
            skin={config.skin}
            style={{
              scale: nextScale,
              opacity: nextOpacity,
            }}
            hasChevron={CARDS[currentIndex + 1].hasVerticalReveal}
          />
        </div>
      )}

      {/* Active card — z-20 */}
      <div className="absolute inset-0" style={{ zIndex: 20 }}>
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
          isActive
          showSwipeHint={currentIndex === 0}
        />
      </div>

      {/* Dev panel — z-40 */}
      <DevPanel
        config={config}
        onConfigChange={setConfig}
        currentIndex={currentIndex}
        totalCards={CARDS.length}
        onGoToCard={handleGoToCard}
      />
    </div>
  );
}

export { type DeckConfig };
export { SPRING_CONFIGS };
