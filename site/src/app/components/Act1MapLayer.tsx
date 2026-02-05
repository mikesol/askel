"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FinlandMap } from "../act1/FinlandMap";
import { useFunnel } from "../act1/FunnelContext";

interface Act1MapLayerProps {
  currentIndex: number;
  visible: boolean;
}

export function Act1MapLayer({ currentIndex, visible }: Act1MapLayerProps) {
  const {
    activeFilters,
    committedFilters,
    cascadeComplete,
    setCascadeComplete,
    setStage,
    commitAndAdvance,
    undoCommit,
    currentStage,
  } = useFunnel();

  // Sync card index to funnel stage
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex <= 3) {
      setStage(currentIndex);
    }
  }, [currentIndex, setStage]);

  // Trigger cascade completion after initial dot animation
  useEffect(() => {
    if (currentIndex === 0 && !cascadeComplete) {
      const timer = setTimeout(() => {
        setCascadeComplete(true);
      }, 94 * 30 + 400); // 94 dots * 30ms stagger + 400ms spring
      return () => clearTimeout(timer);
    }
  }, [currentIndex, cascadeComplete, setCascadeComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FinlandMap
            currentStage={currentStage}
            activeFilters={activeFilters}
            committedFilters={committedFilters}
            cascadeComplete={cascadeComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
