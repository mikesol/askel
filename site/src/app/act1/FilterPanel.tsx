"use client";

import { motion } from "framer-motion";
import { FilterKey, FILTER_LABELS } from "./prospectData";
import { useFunnel } from "./FunnelContext";

interface FilterPanelProps {
  filters: FilterKey[];
}

export function FilterPanel({ filters }: FilterPanelProps) {
  const { activeFilters, toggleFilter } = useFunnel();

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 px-1 no-scrollbar"
      style={{ touchAction: "pan-x" }}
    >
      {filters.map((key) => {
        const isActive = activeFilters.has(key);
        return (
          <motion.button
            key={key}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              toggleFilter(key);
            }}
            className={`shrink-0 px-3 rounded-full text-[11px] tracking-wide transition-colors whitespace-nowrap ${
              isActive
                ? "bg-white/20 text-white border border-white/30"
                : "bg-white/[0.06] text-white/50 border border-white/[0.08]"
            }`}
            style={{ minHeight: 44, lineHeight: "44px" }}
            whileTap={{ scale: 0.95 }}
          >
            {FILTER_LABELS[key]}
          </motion.button>
        );
      })}
    </div>
  );
}
