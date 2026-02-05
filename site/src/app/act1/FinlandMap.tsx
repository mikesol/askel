"use client";

import { motion } from "framer-motion";
import { FINLAND_OUTLINE_PATH } from "./finlandOutline";
import { PROSPECTS, FilterKey, getProspectPassesFilters } from "./prospectData";

// Finland bounds
const LAT_MIN = 59.5;
const LAT_MAX = 70.5;
const LON_MIN = 19.0;
const LON_MAX = 32.0;

// SVG viewport dimensions
const SVG_WIDTH = 400;
const SVG_HEIGHT = 600;

// Convert lat/lon to SVG coordinates
// Lon maps to X, Lat maps to Y (inverted — higher lat = lower Y)
function latLonToSvg(lat: number, lon: number): { x: number; y: number } {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * SVG_WIDTH;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_HEIGHT;
  return { x, y };
}

// Convert the outline path (which uses lon,lat) to SVG coordinates
function convertOutlinePath(): string {
  return FINLAND_OUTLINE_PATH.replace(
    /([MLZ])\s*([\d.]+),([\d.]+)/g,
    (_match, cmd, lonStr, latStr) => {
      const { x, y } = latLonToSvg(parseFloat(latStr), parseFloat(lonStr));
      return `${cmd} ${x.toFixed(1)},${y.toFixed(1)}`;
    }
  ).replace(/Z/, "Z");
}

export type ProspectVisualState = "alive" | "failing" | "dead" | "melers";

export interface FinlandMapProps {
  currentStage: number; // 0-3 for Act 1 cards
  activeFilters: Set<FilterKey>;
  committedFilters: Set<FilterKey>;
  /** Whether the cascade entrance has completed */
  cascadeComplete?: boolean;
  /** Opacity for fade-out transition */
  mapOpacity?: number;
}

export function getProspectState(
  prospectId: number,
  activeFilters: Set<FilterKey>,
  committedFilters: Set<FilterKey>,
  currentStage: number
): ProspectVisualState {
  const prospect = PROSPECTS[prospectId];

  // On the payoff card (stage 3): Melers pulses, everyone else dies
  if (currentStage === 3) {
    return prospect.isMelers ? "melers" : "dead";
  }

  // Check if prospect fails any committed filter — it's dead
  if (committedFilters.size > 0 && !getProspectPassesFilters(prospect, committedFilters)) {
    return "dead";
  }

  // Check if prospect fails any active (but uncommitted) filter — it's failing
  if (activeFilters.size > 0 && !getProspectPassesFilters(prospect, activeFilters)) {
    return "failing";
  }

  return "alive";
}

const outlinePath = convertOutlinePath();

export function FinlandMap({
  currentStage,
  activeFilters,
  committedFilters,
  cascadeComplete = true,
  mapOpacity = 1,
}: FinlandMapProps) {
  return (
    <motion.div
      className="absolute inset-x-0 top-0 z-10 flex items-start justify-center"
      style={{ height: "75%", opacity: mapOpacity }}
    >
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter for dots */}
          <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Stronger glow for Melers */}
          <filter id="melers-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Finland outline */}
        <path
          d={outlinePath}
          fill="none"
          stroke="white"
          strokeOpacity={0.08}
          strokeWidth={1.5}
        />

        {/* Melers label — shown on payoff card */}
        {currentStage === 3 && (() => {
          const melers = PROSPECTS.find((p) => p.isMelers);
          if (!melers) return null;
          const pos = latLonToSvg(melers.lat, melers.lon);
          return (
            <motion.text
              x={pos.x + 14}
              y={pos.y + 4}
              fill="white"
              fontSize="14"
              fontWeight="500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Melers
            </motion.text>
          );
        })()}

        {/* Prospect dots */}
        {PROSPECTS.map((prospect, i) => {
          const { x, y } = latLonToSvg(prospect.lat, prospect.lon);
          const state = getProspectState(
            prospect.id,
            activeFilters,
            committedFilters,
            currentStage
          );

          if (state === "dead") {
            return (
              <motion.circle
                key={prospect.id}
                cx={x}
                cy={y}
                initial={{ r: 3, opacity: 0.7 }}
                animate={{ r: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.01 }}
                fill="white"
              />
            );
          }

          if (state === "melers") {
            return (
              <motion.circle
                key={prospect.id}
                cx={x}
                cy={y}
                fill="white"
                filter="url(#melers-glow)"
                animate={{
                  r: [4, 8, 4],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          }

          if (state === "failing") {
            return (
              <motion.circle
                key={prospect.id}
                cx={x}
                cy={y}
                animate={{ r: 2.5, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
                fill="#ff6b6b"
              />
            );
          }

          // alive
          return (
            <motion.circle
              key={prospect.id}
              cx={x}
              cy={y}
              fill="white"
              initial={
                !cascadeComplete
                  ? { r: 0, opacity: 0 }
                  : { r: 3, opacity: 0.7 }
              }
              animate={{ r: 3, opacity: 0.7 }}
              transition={
                !cascadeComplete
                  ? {
                      duration: 0.4,
                      delay: i * 0.03,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }
                  : { duration: 0.3 }
              }
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
