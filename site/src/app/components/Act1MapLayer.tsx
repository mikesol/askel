"use client";

import { useEffect, useRef } from "react";
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
    commitCurrentFilters,
    undoCommit,
    currentStage,
  } = useFunnel();

  const prevIndexRef = useRef(currentIndex);

  // Handle stage transitions: commit on forward swipe, undo on backward
  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    prevIndexRef.current = currentIndex;

    if (currentIndex < 0 || currentIndex > 3) return;
    if (prevIndex === currentIndex) return;

    const goingForward = currentIndex > prevIndex;

    if (goingForward) {
      // Commit active filters from the stage we're leaving
      // Stage 1 (criteria) and Stage 2 (kill) have toggleable filters
      if (prevIndex === 1 || prevIndex === 2) {
        commitCurrentFilters(prevIndex);
      }
      setStage(currentIndex);
    } else {
      // Going backward — undo commits back to where we're going
      undoCommit(currentIndex);
    }
  }, [currentIndex, setStage, commitCurrentFilters, undoCommit]);

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
