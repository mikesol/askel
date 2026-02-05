"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useFunnel } from "./FunnelContext";

export function DotCounter() {
  const { survivingCount, totalCount } = useFunnel();

  const springValue = useSpring(totalCount, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    springValue.set(survivingCount);
  }, [survivingCount, springValue]);

  const display = useTransform(springValue, (v) => Math.round(v));

  return (
    <div className="flex items-center gap-1.5 text-white/50 text-[13px] tracking-wide font-light">
      <motion.span className="text-white/90 tabular-nums">
        {/* Render animated number */}
        <motion.span>{display}</motion.span>
      </motion.span>
      <span>/</span>
      <span>{totalCount}</span>
      <span className="ml-1 text-white/30">remaining</span>
    </div>
  );
}
