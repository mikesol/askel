"use client";

import { useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFunnel } from "./FunnelContext";

export function DotCounter() {
  const { survivingCount, totalCount } = useFunnel();
  const [displayValue, setDisplayValue] = useState(totalCount);

  const springValue = useSpring(totalCount, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    springValue.set(survivingCount);
  }, [survivingCount, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <div className="flex items-center gap-1.5 text-white/50 text-[13px] tracking-wide font-light">
      <span className="text-white/90 tabular-nums">{displayValue}</span>
      <span>/</span>
      <span>{totalCount}</span>
      <span className="ml-1 text-white/30">remaining</span>
    </div>
  );
}
