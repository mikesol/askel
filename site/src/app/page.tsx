"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Flip to true to show the style/scale switcher UI
const SHOW_SWITCHER = false;

const BUTTON_STYLES = [
  {
    name: "Bordered",
    className:
      "border border-white/[0.15] rounded-lg hover:border-white/30 hover:bg-white/[0.03]",
  },
  {
    name: "Sharp",
    className:
      "border border-white/[0.12] rounded-sm hover:border-white/25 hover:bg-white/[0.03]",
  },
  {
    name: "Pill",
    className:
      "border border-white/[0.15] rounded-full hover:border-white/30 hover:bg-white/[0.03]",
  },
  {
    name: "Filled",
    className:
      "bg-white/[0.06] rounded-lg border border-transparent hover:bg-white/[0.1]",
  },
  {
    name: "Underline",
    className:
      "border-b border-white/[0.15] rounded-none hover:border-white/40",
  },
  {
    name: "Ghost",
    className: "rounded-lg hover:bg-white/[0.05]",
  },
];

// Harmonious typographic presets — heading scales faster than body
const TYPE_SCALES = [
  {
    name: "S",
    navLogo: 11, navItem: 10, h1: 14, subtitle: 11, button: 12, mobileMenu: 12,
    btnPx: 24, btnPy: 12, btnMin: 140, rule: 64,
  },
  {
    name: "M-",
    navLogo: 12, navItem: 11, h1: 15, subtitle: 12, button: 13, mobileMenu: 13,
    btnPx: 28, btnPy: 14, btnMin: 150, rule: 72,
  },
  {
    name: "M",
    navLogo: 13, navItem: 12, h1: 17, subtitle: 13, button: 14, mobileMenu: 14,
    btnPx: 32, btnPy: 16, btnMin: 160, rule: 80,
  },
  {
    name: "L",
    navLogo: 14, navItem: 13, h1: 20, subtitle: 14, button: 15, mobileMenu: 15,
    btnPx: 36, btnPy: 18, btnMin: 170, rule: 88,
  },
  {
    name: "XL",
    navLogo: 15, navItem: 14, h1: 24, subtitle: 15, button: 16, mobileMenu: 16,
    btnPx: 40, btnPy: 20, btnMin: 180, rule: 96,
  },
  {
    name: "2XL",
    navLogo: 16, navItem: 15, h1: 28, subtitle: 16, button: 18, mobileMenu: 18,
    btnPx: 44, btnPy: 20, btnMin: 200, rule: 104,
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [styleIndex, setStyleIndex] = useState(2); // Pill
  const [scaleIndex, setScaleIndex] = useState(0); // S

  const style = BUTTON_STYLES[styleIndex];
  const t = TYPE_SCALES[scaleIndex];

  return (
    <main className="h-dvh w-full bg-black overflow-hidden relative grain">
      {/* Top navigation bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5">
        <span
          style={{ fontSize: t.navLogo }}
          className="font-medium tracking-[0.25em] uppercase text-white/80 transition-all duration-300"
        >
          Askel
        </span>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          {["About", "Case Studies", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ fontSize: t.navItem }}
              className="font-light tracking-[0.15em] uppercase text-white/50 hover:text-white/80 transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col gap-[5px] cursor-pointer p-1"
          aria-label="Menu"
        >
          <motion.span
            className="block w-5 h-[1px] bg-white/70 origin-center"
            animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-5 h-[1px] bg-white/70 origin-center"
            animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {["About", "Case Studies", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                style={{ fontSize: t.mobileMenu }}
                className="font-light tracking-[0.2em] uppercase text-white/70 hover:text-white transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center landing-glow">
        <motion.div
          className="flex flex-col items-center text-center px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          <h1
            style={{ fontSize: t.h1 }}
            className="font-medium tracking-[0.35em] uppercase text-white transition-all duration-300"
          >
            Askel Ventures
          </h1>

          <div
            className="hr-fade mt-6 mb-6 transition-all duration-300"
            style={{ width: t.rule }}
          />

          <p
            style={{ fontSize: t.subtitle }}
            className="font-light tracking-[0.2em] uppercase text-white/50 mb-14 transition-all duration-300"
          >
            A New Private Equity Firm
          </p>

          {/* Three CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            {["Investors", "Owners", "Operators"].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontSize: t.button,
                  paddingLeft: t.btnPx,
                  paddingRight: t.btnPx,
                  paddingTop: t.btnPy,
                  paddingBottom: t.btnPy,
                  minWidth: t.btnMin,
                }}
                className={`font-normal tracking-[0.08em] text-white/90 transition-all duration-300 text-center ${style.className}`}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Style cycler — hidden, set SHOW_SWITCHER to true to re-enable */}
      {SHOW_SWITCHER && (
        <div className="absolute bottom-6 right-6 z-50 flex items-center gap-2">
          <button
            onClick={() => setStyleIndex((styleIndex + 1) % BUTTON_STYLES.length)}
            className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.1em] uppercase text-white/40 bg-white/[0.04] border border-white/[0.08] rounded hover:bg-white/[0.08] hover:text-white/60 transition-all duration-200 cursor-pointer"
          >
            <span className="text-white/20">Style</span>
            <span className="text-white/60 font-medium min-w-[60px] text-right">
              {style.name}
            </span>
          </button>

          <button
            onClick={() => setScaleIndex((scaleIndex + 1) % TYPE_SCALES.length)}
            className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.1em] uppercase text-white/40 bg-white/[0.04] border border-white/[0.08] rounded hover:bg-white/[0.08] hover:text-white/60 transition-all duration-200 cursor-pointer"
          >
            <span className="text-white/20">Scale</span>
            <span className="text-white/60 font-medium min-w-[24px] text-right">
              {t.name}
            </span>
          </button>
        </div>
      )}
    </main>
  );
}
