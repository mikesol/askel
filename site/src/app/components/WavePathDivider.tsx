"use client";

import { useRef, useEffect } from "react";

interface WavePathDividerProps {
  className?: string;
}

export function WavePathDivider({ className = "" }: WavePathDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const xRef = useRef(0.2);
  const timeRef = useRef(Math.PI / 2);
  const reqIdRef = useRef<number | null>(null);

  const setPath = (progress: number) => {
    const width = window.innerWidth * 0.7;
    if (pathRef.current) {
      pathRef.current.setAttributeNS(
        null,
        "d",
        `M0 100 Q${width * xRef.current} ${100 + progress * 0.6}, ${width} 100`
      );
    }
  };

  useEffect(() => {
    setPath(0);
  }, []);

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const manageMouseEnter = () => {
    if (reqIdRef.current) {
      cancelAnimationFrame(reqIdRef.current);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e;
    if (pathRef.current) {
      const pathBound = pathRef.current.getBoundingClientRect();
      xRef.current = (clientX - pathBound.left) / pathBound.width;
      progressRef.current += movementY;
      setPath(progressRef.current);
    }
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progressRef.current * Math.sin(timeRef.current);
    progressRef.current = lerp(progressRef.current, 0, 0.025);
    timeRef.current += 0.2;
    setPath(newProgress);
    if (Math.abs(progressRef.current) > 0.75) {
      reqIdRef.current = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    timeRef.current = Math.PI / 2;
    progressRef.current = 0;
  };

  return (
    <div className={`relative h-px w-[70vw] ${className}`}>
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg className="absolute -top-[100px] h-[300px] w-full">
        <path
          ref={pathRef}
          className="fill-none stroke-[var(--color-accent)]"
          strokeWidth={1.5}
          opacity={0.4}
        />
      </svg>
    </div>
  );
}
