"use client";

import { motion } from "framer-motion";
import { CRITERIA_FILTERS, KILL_FILTERS } from "./prospectData";
import { FilterPanel } from "./FilterPanel";

interface CardOverlayProps {
  cardType: string;
}

export function CardOverlay({ cardType }: CardOverlayProps) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
      {/* Gradient fade from transparent to black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 85%)",
        }}
      />

      {/* Content panel */}
      <div
        className="relative z-10 px-6 pointer-events-auto"
        style={{ paddingBottom: "max(32px, env(safe-area-inset-bottom))" }}
      >
        {cardType === "act1-search" && <SearchOverlay />}
        {cardType === "act1-criteria" && <CriteriaOverlay />}
        {cardType === "act1-kill" && <KillOverlay />}
        {cardType === "act1-payoff" && <PayoffOverlay />}
      </div>
    </div>
  );
}

function SearchOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <p className="text-[15px] text-white/80 leading-relaxed font-light">
        We analyzed dozens of businesses before making a move. Most died at the
        first filter.
      </p>
    </motion.div>
  );
}

function CriteriaOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <p className="text-[15px] text-white/80 leading-relaxed font-light">
        €500k revenue. 20% margins. Service industry. Owner-operated. The
        scruffier, the better.
      </p>
      <FilterPanel filters={CRITERIA_FILTERS} />
    </motion.div>
  );
}

function KillOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <p className="text-[15px] text-white/80 leading-relaxed font-light">
        Four questions every deal must survive. Most don&apos;t make it past
        two.
      </p>
      <FilterPanel filters={KILL_FILTERS} />
    </motion.div>
  );
}

function PayoffOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-3"
    >
      <p className="text-[15px] text-white/80 leading-relaxed font-light">
        After months of filtering, one business made it through.
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="space-y-1"
      >
        <p className="text-[22px] text-white font-medium tracking-wide">
          Melers
        </p>
        <p className="text-[13px] text-white/40 font-light">
          A dry cleaner in Turku.
        </p>
      </motion.div>
    </motion.div>
  );
}
