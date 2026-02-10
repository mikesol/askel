"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

function buildStaircase(w: number, h: number, steps: number): Point[] {
  const margin = 20;
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
    points.push({ x, y });
    points.push({ x, y: y - dy });
  }
  return points;
}

function segmentLengths(points: Point[]): number[] {
  const lengths: number[] = [0];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
    lengths.push(total);
  }
  return lengths;
}

function pointAtFraction(
  points: Point[],
  cumLengths: number[],
  fraction: number
): Point {
  const total = cumLengths[cumLengths.length - 1];
  const target = fraction * total;
  for (let i = 1; i < cumLengths.length; i++) {
    if (cumLengths[i] >= target) {
      const segStart = cumLengths[i - 1];
      const segLen = cumLengths[i] - segStart;
      const t = segLen === 0 ? 0 : (target - segStart) / segLen;
      return {
        x: points[i - 1].x + (points[i].x - points[i - 1].x) * t,
        y: points[i - 1].y + (points[i].y - points[i - 1].y) * t,
      };
    }
  }
  return points[points.length - 1];
}

export function StaircasePulse({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const stairRef = useRef<Point[]>([]);
  const cumRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      stairRef.current = buildStaircase(w, h, 8);
      cumRef.current = segmentLengths(stairRef.current);
    }

    resize();
    window.addEventListener("resize", resize);

    const CYCLE_MS = 3000;

    function draw() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      const points = stairRef.current;
      const cum = cumRef.current;

      ctx!.clearRect(0, 0, w, h);

      if (points.length < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const t = (Date.now() % CYCLE_MS) / CYCLE_MS;

      // Head leads: reaches top at t=0.5
      const head = Math.min(1, t * 2);
      // Tail follows: starts at t=0.3, reaches top at t=1.0
      const tail = Math.max(0, (t - 0.3) / 0.7);

      // Draw the visible segment between tail and head
      const total = cum[cum.length - 1];
      const headDist = head * total;
      const tailDist = tail * total;

      // Build sub-path from tail to head
      const tailPt = pointAtFraction(points, cum, tail);
      ctx!.beginPath();
      ctx!.moveTo(tailPt.x, tailPt.y);

      for (let i = 1; i < points.length; i++) {
        if (cum[i] <= tailDist) continue;
        if (cum[i] >= headDist) {
          // Partial last segment
          const headPt = pointAtFraction(points, cum, head);
          ctx!.lineTo(headPt.x, headPt.y);
          break;
        }
        ctx!.lineTo(points[i].x, points[i].y);
      }

      // Fade opacity at edges of the snake
      const snakeLen = head - tail;
      const fadeAlpha = Math.min(1, snakeLen * 4);
      const baseAlpha = 0.8 * fadeAlpha;

      ctx!.strokeStyle = `rgba(255, 255, 255, ${baseAlpha})`;
      ctx!.lineWidth = 2;
      ctx!.shadowColor = `rgba(255, 255, 255, ${baseAlpha * 0.8})`;
      ctx!.shadowBlur = 14;
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // Dot at the head
      const dotPt = pointAtFraction(points, cum, head);
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.008);
      ctx!.beginPath();
      ctx!.arc(dotPt.x, dotPt.y, 4, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(255, 255, 255, ${(0.7 + 0.3 * pulse) * fadeAlpha})`;
      ctx!.fill();

      // Faint full staircase outline (always visible)
      ctx!.beginPath();
      ctx!.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx!.lineTo(points[i].x, points[i].y);
      }
      ctx!.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
