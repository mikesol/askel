"use client";

export function StaircasePulse({ className = "" }: { className?: string }) {
  const steps = 8;
  const margin = 20;
  const w = 200;
  const h = 300;
  const startX = margin;
  const startY = h - margin;
  const dx = (w - 2 * margin) / steps;
  const dy = (h - 2 * margin) / steps;

  // Build a filled staircase path: go up the stairs, then close along bottom-right
  let d = `M ${startX} ${startY}`;
  for (let i = 0; i < steps; i++) {
    const x = startX + dx * (i + 1);
    const y = startY - dy * i;
    d += ` H ${x} V ${y - dy}`;
  }
  // Close: go right to edge, down to bottom, back to start
  d += ` H ${w - margin} V ${startY} Z`;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={d} fill="rgba(255, 255, 255, 0.25)" />
      </svg>
    </div>
  );
}
