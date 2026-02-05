"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CRITERIA_FILTERS, KILL_FILTERS, FilterKey } from "./prospectData";
import { FilterPanel } from "./FilterPanel";
import { KillDetailModal } from "./KillDetailModal";
import { CriteriaDetailModal } from "./CriteriaDetailModal";
import { useFunnel } from "./FunnelContext";

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

function WhyButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-14 left-4 z-[70] pointer-events-auto"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <motion.div
        className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20"
        animate={{
          borderColor: [
            "rgba(255,255,255,0.2)",
            "rgba(255,255,255,0.5)",
            "rgba(255,255,255,0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[11px] text-white/70 tracking-wide uppercase">
          Why?
        </span>
      </motion.div>
    </motion.button>
  );
}

function SearchOverlay() {
  return (
    <div>
      <p className="text-[15px] text-white/80 leading-relaxed font-light">
        For our first acquisition, we analyzed dozens of businesses using
        agencies, webscrapers, and old-fashioned networking.
      </p>
    </div>
  );
}

function CriteriaOverlay() {
  const [modalOpen, setModalOpen] = useState(false);
  const { activeFilters } = useFunnel();

  const hasActiveCriteria = CRITERIA_FILTERS.some((f) =>
    activeFilters.has(f)
  );

  return (
    <>
      {hasActiveCriteria && (
        <WhyButton onClick={() => setModalOpen(true)} />
      )}

      <div className="space-y-4">
        <p className="text-[15px] text-white/80 leading-relaxed font-light">
          Below are several criteria from our search list. Tap them to see the
          outcomes.
        </p>
        <FilterPanel filters={CRITERIA_FILTERS} />
      </div>

      <CriteriaDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        activeFilters={activeFilters}
      />
    </>
  );
}

function KillOverlay() {
  const [modalOpen, setModalOpen] = useState(false);
  const { activeFilters } = useFunnel();

  const hasActiveKill = KILL_FILTERS.some((f) => activeFilters.has(f));

  return (
    <>
      {hasActiveKill && (
        <WhyButton onClick={() => setModalOpen(true)} />
      )}

      <div className="space-y-4">
        <p className="text-[15px] text-white/80 leading-relaxed font-light">
          Our most important criteria are the &ldquo;kill questions&rdquo; that
          we ask before we engage with a seller.
        </p>
        <FilterPanel filters={KILL_FILTERS} />
      </div>

      <KillDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        activeFilters={activeFilters}
      />
    </>
  );
}

function PayoffOverlay() {
  return (
    <div className="space-y-3">
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
          A laundry business in Turku.
        </p>
      </motion.div>
    </div>
  );
}
