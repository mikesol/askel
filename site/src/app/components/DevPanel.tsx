"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeckConfig, CardSkin, SpringPreset } from "../types";

interface DevPanelProps {
  config: DeckConfig;
  onConfigChange: (config: DeckConfig) => void;
  currentIndex: number;
  totalCards: number;
  onGoToCard: (index: number) => void;
}

const SKINS: { value: CardSkin; label: string }[] = [
  { value: "dark", label: "Dark" },
  { value: "stark", label: "Stark" },
  { value: "depth", label: "Depth" },
  { value: "glass", label: "Glass" },
];

const SPRINGS: { value: SpringPreset; label: string }[] = [
  { value: "snappy", label: "Snappy" },
  { value: "smooth", label: "Smooth" },
  { value: "heavy", label: "Heavy" },
];

export function DevPanel({ config, onConfigChange, currentIndex, totalCards, onGoToCard }: DevPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTap={toggle}
          />
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-[100] w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors text-xs font-mono"
        style={{ opacity: isOpen ? 0.8 : 0.3 }}
      >
        ~
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-16 right-6 z-[100] w-64 rounded-xl bg-black/90 backdrop-blur border border-white/10 p-4 font-mono text-xs text-white/60"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* Skin */}
            <div className="mb-3">
              <div className="text-white/40 mb-1.5 uppercase tracking-wider" style={{ fontSize: "10px" }}>
                Skin
              </div>
              <div className="flex gap-1">
                {SKINS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => onConfigChange({ ...config, skin: s.value })}
                    className={`flex-1 px-1 py-1 rounded text-center transition-colors ${
                      config.skin === s.value
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Spring */}
            <div className="mb-3">
              <div className="text-white/40 mb-1.5 uppercase tracking-wider" style={{ fontSize: "10px" }}>
                Spring
              </div>
              <div className="flex gap-1">
                {SPRINGS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => onConfigChange({ ...config, spring: s.value })}
                    className={`flex-1 px-1 py-1 rounded text-center transition-colors ${
                      config.spring === s.value
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress toggle */}
            <div className="mb-3 flex items-center justify-between">
              <div className="text-white/40 uppercase tracking-wider" style={{ fontSize: "10px" }}>
                Progress
              </div>
              <button
                onClick={() => onConfigChange({ ...config, showProgress: !config.showProgress })}
                className={`px-2 py-0.5 rounded transition-colors ${
                  config.showProgress
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/40"
                }`}
              >
                {config.showProgress ? "ON" : "OFF"}
              </button>
            </div>

            {/* Go to card */}
            <div>
              <div className="text-white/40 mb-1.5 uppercase tracking-wider" style={{ fontSize: "10px" }}>
                Card ({currentIndex + 1}/{totalCards})
              </div>
              <input
                type="range"
                min={0}
                max={totalCards - 1}
                value={currentIndex}
                onChange={(e) => onGoToCard(Number(e.target.value))}
                className="w-full accent-white/50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
