"use client";

import { useRef, useEffect, useCallback } from "react";
import { useLanguage } from "./LanguageProvider";
import { content } from "../content";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function WavePathContact() {
  const { language } = useLanguage();
  const t = content[language].contact;

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0.5, y: 0.5 };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      const cur = currentRef.current;
      const target = mouseRef.current;
      cur.x = lerp(cur.x, target.x, 0.05);
      cur.y = lerp(cur.y, target.y, 0.05);

      const layers = [
        { amplitude: 60, yBase: 200, opacity: 0.15 },
        { amplitude: 40, yBase: 250, opacity: 0.1 },
        { amplitude: 80, yBase: 300, opacity: 0.08 },
      ];

      layers.forEach((layer, i) => {
        const path = pathRefs.current[i];
        if (!path) return;

        const mx = cur.x * 1000;
        const offsetY = (cur.y - 0.5) * layer.amplitude;
        const y = layer.yBase + offsetY;

        const d = `M 0 ${y + 30} Q ${mx * 0.3} ${y - layer.amplitude * 0.5} ${mx * 0.5} ${y} T ${mx} ${y + 10} T ${1000 - (1000 - mx) * 0.3} ${y - 15} L 1000 ${y + 20} L 1000 500 L 0 500 Z`;

        path.setAttribute("d", d);
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background animation commented out
      <div ref={containerRef} className="absolute inset-0 pointer-events-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="waveGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              ref={(el) => { pathRefs.current[i] = el; }}
              fill="url(#waveGrad)"
              opacity={[0.15, 0.1, 0.08][i]}
              filter="url(#waveGlow)"
            />
          ))}
        </svg>
      </div>
      */}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-[var(--color-text-secondary)] text-sm font-medium uppercase tracking-widest mb-4">
          {t.label}
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text leading-tight">
          {t.heading}
        </h2>
        {t.body.split("\n\n").map((paragraph, i) => (
          <p key={i} className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {paragraph}
          </p>
        ))}
        <div className="mt-10">
          <a
            href={t.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm font-semibold text-black bg-white hover:bg-white/90 px-6 py-3 rounded-lg transition-all duration-150"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
