"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { SEGMENTS } from "../data";

interface ProgressBarProps {
  currentIndex: number;
  totalCards: number;
  dragProgress: MotionValue<number>;
}

export function ProgressBar({ currentIndex, totalCards, dragProgress }: ProgressBarProps) {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-50 flex gap-[2px] px-4"
      style={{ paddingTop: "max(8px, env(safe-area-inset-top))" }}
    >
      {SEGMENTS.map((segment, segIndex) => (
        <SegmentBar
          key={segIndex}
          segIndex={segIndex}
          count={segment.count}
          totalCards={totalCards}
          currentIndex={currentIndex}
          dragProgress={dragProgress}
        />
      ))}
    </div>
  );
}

interface SegmentBarProps {
  segIndex: number;
  count: number;
  totalCards: number;
  currentIndex: number;
  dragProgress: MotionValue<number>;
}

function SegmentBar({ segIndex, count, totalCards, currentIndex, dragProgress }: SegmentBarProps) {
  // Calculate which cards belong to this segment
  let segStart = 0;
  for (let i = 0; i < segIndex; i++) {
    segStart += SEGMENTS[i].count;
  }
  const segEnd = segStart + count;

  // Transform dragProgress (0 to totalCards-1) into fill fraction for this segment (0 to 1)
  const fillFraction = useTransform(dragProgress, (progress: number) => {
    if (progress >= segEnd) return 1;
    if (progress < segStart) return 0;
    return (progress - segStart) / count;
  });

  const widthPercent = `${(count / totalCards) * 100}%`;

  return (
    <div
      className="relative h-[2px] rounded-full bg-white/[0.15] overflow-hidden"
      style={{ width: widthPercent }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 bg-white rounded-full"
        style={{ width: useTransform(fillFraction, (f: number) => `${f * 100}%`) }}
      />
    </div>
  );
}
