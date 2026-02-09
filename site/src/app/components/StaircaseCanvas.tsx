"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

function buildStaircase(w: number, h: number, steps: number): Point[] {
  const margin = 40;
  const startX = margin;
  const startY = h - margin;
  const endX = w - margin;
  const endY = margin;

  const dx = (endX - startX) / steps;
  const dy = (startY - endY) / steps;

  const points: Point[] = [{ x: startX, y: startY }];
  for (let i = 0; i < steps; i++) {
    const x = startX + dx * (i + 1);
    const y = startY - dy * i;
    // horizontal segment end
    points.push({ x, y });
    // vertical segment end
    points.push({ x, y: y - dy });
  }
  return points;
}

function totalLength(points: Point[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

function pointAtProgress(points: Point[], progress: number): Point {
  const total = totalLength(points);
  let target = progress * total;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const seg = Math.sqrt(dx * dx + dy * dy);
    if (target <= seg) {
      const t = seg === 0 ? 0 : target / seg;
      return {
        x: points[i - 1].x + dx * t,
        y: points[i - 1].y + dy * t,
      };
    }
    target -= seg;
  }
  return points[points.length - 1];
}

export function StaircaseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smoothProgress = useRef(0);
  const targetProgress = useRef(0);
  const staircase = useRef<Point[]>([]);
  const rafId = useRef(0);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      targetProgress.current = v;
    });
    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      staircase.current = buildStaircase(w, h, 10);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      const points = staircase.current;

      // lerp toward target
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * 0.1;

      ctx!.clearRect(0, 0, w, h);

      if (points.length < 2) {
        rafId.current = requestAnimationFrame(draw);
        return;
      }

      const progress = Math.max(0, Math.min(1, smoothProgress.current));
      const total = totalLength(points);
      let drawn = progress * total;

      // draw staircase path up to progress
      ctx!.beginPath();
      ctx!.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length && drawn > 0; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const seg = Math.sqrt(dx * dx + dy * dy);
        if (drawn >= seg) {
          ctx!.lineTo(points[i].x, points[i].y);
          drawn -= seg;
        } else {
          const t = seg === 0 ? 0 : drawn / seg;
          ctx!.lineTo(
            points[i - 1].x + dx * t,
            points[i - 1].y + dy * t
          );
          drawn = 0;
        }
      }
      ctx!.strokeStyle = "rgba(0, 212, 170, 0.3)";
      ctx!.lineWidth = 1.5;
      ctx!.shadowColor = "rgba(0, 212, 170, 0.4)";
      ctx!.shadowBlur = 6;
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // blinking dot at path head
      const head = pointAtProgress(points, progress);
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.005);

      // outer glow
      ctx!.beginPath();
      ctx!.arc(head.x, head.y, 5, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(0, 212, 170, ${0.15 * pulse})`;
      ctx!.fill();

      // bright core
      ctx!.beginPath();
      ctx!.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(0, 212, 170, ${0.4 + 0.3 * pulse})`;
      ctx!.fill();

      rafId.current = requestAnimationFrame(draw);
    }

    rafId.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
