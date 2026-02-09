"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="h-dvh w-full bg-black overflow-hidden relative grain">
      {/* Top navigation bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5">
        <span className="text-[13px] font-medium tracking-[0.25em] uppercase text-white/80">
          Askel
        </span>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          {["About", "Case Studies", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[12px] font-light tracking-[0.15em] uppercase text-white/50 hover:text-white/80 transition-colors duration-300"
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
                className="text-[14px] font-light tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
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
          <h1 className="text-[17px] font-medium tracking-[0.35em] uppercase text-white">
            Askel Ventures
          </h1>

          <div className="hr-fade w-20 mt-6 mb-6" />

          <p className="text-[13px] font-light tracking-[0.2em] uppercase text-white/50 mb-14">
            A New Private Equity Firm
          </p>

          {/* Three CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            {["Investors", "Owners", "Operators"].map((label) => (
              <a
                key={label}
                href="#"
                className="px-8 py-4 text-[14px] font-normal text-white/90 border border-white/[0.15] rounded-lg transition-all duration-300 hover:border-white/30 hover:bg-white/[0.03] text-center min-w-[160px]"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
