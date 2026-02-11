"use client";

import React, { ReactNode } from "react";

interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function AuroraBackground({
  className = "",
  children,
}: AuroraBackgroundProps) {
  return (
    <div
      className={`relative flex flex-col h-[100vh] items-center justify-center bg-black ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(100deg, var(--black) 0%, var(--black) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--black) 16%)",
              "repeating-linear-gradient(100deg, var(--gray-700) 10%, var(--gray-500) 15%, var(--gray-600) 20%, var(--gray-400) 25%, var(--gray-700) 30%)",
            ].join(", "),
            backgroundSize: "300%, 200%",
            backgroundPosition: "50% 50%, 50% 50%",
            filter: "blur(10px)",
            maskImage:
              "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
          }}
        >
          <div
            className="absolute inset-0 animate-aurora mix-blend-difference"
            style={{
              backgroundImage: [
                "repeating-linear-gradient(100deg, var(--black) 0%, var(--black) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--black) 16%)",
                "repeating-linear-gradient(100deg, var(--gray-700) 10%, var(--gray-500) 15%, var(--gray-600) 20%, var(--gray-400) 25%, var(--gray-700) 30%)",
              ].join(", "),
              backgroundSize: "200%, 100%",
              backgroundAttachment: "fixed",
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
