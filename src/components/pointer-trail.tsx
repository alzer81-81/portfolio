"use client";

import { useEffect, useRef, useState } from "react";

type Block = {
  alpha: number;
  color: string;
  fadeEnd: number;
  holdUntil: number;
  maxAlpha: number;
  x: number;
  y: number;
};

const DESKTOP_COLS = 32;
const MOBILE_COLS = 12;
const TRAIL_OPACITIES = [0.42, 0.32, 0.24, 0.18, 0.13, 0.09];
const HOLD_MS = 650;
const FADE_MS = 1400;

const hexToRgb = (value: string) => {
  const hex = value.trim().replace(/^#/, "");
  const normalised =
    hex.length === 3
      ? hex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : hex;
  const parsed = Number.parseInt(normalised, 16);

  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255] as const;
};

export function PointerTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blocksRef = useRef<Block[]>([]);
  const trailQueueRef = useRef<Block[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastHoveredRef = useRef<number | null>(null);
  const colorPointerRef = useRef(0);
  const squareSizeRef = useRef(0);
  const colsRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  const isAllowedSurface = (target: Element | null) => {
    if (!target) return false;

    if (target.closest(".project-feature")) {
      return false;
    }

    return Boolean(
      target.closest(
        ".homepage-hero, .homepage-disciplines, .homepage-about-preview, .my-story-page, .contact-page, .illustrations-page",
      ),
    );
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    const updateEnabled = () => {
      setEnabled(mediaQuery.matches);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    let trailColors = TRAIL_OPACITIES.map(
      (alpha) => `rgba(17, 17, 17, ${alpha})`,
    );

    const resolveColors = () => {
      const raw =
        getComputedStyle(document.body).getPropertyValue("color").trim() ||
        getComputedStyle(document.documentElement)
          .getPropertyValue("color")
          .trim() ||
        "#111111";

      if (raw.startsWith("rgb")) {
        const [r, g, b] = raw.match(/\d+/g)?.map(Number) ?? [17, 17, 17];
        trailColors = TRAIL_OPACITIES.map(
          (alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`,
        );
        return;
      }

      if (raw.startsWith("#")) {
        const [r, g, b] = hexToRgb(raw);
        trailColors = TRAIL_OPACITIES.map(
          (alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`,
        );
      }
    };

    const setupGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = width < 768 ? MOBILE_COLS : DESKTOP_COLS;
      const squareSize = width / cols;
      const rows = Math.ceil(height / squareSize);

      canvas.width = width;
      canvas.height = height;

      colsRef.current = cols;
      squareSizeRef.current = squareSize;
      trailQueueRef.current = [];
      lastHoveredRef.current = null;
      colorPointerRef.current = 0;

      const blocks: Block[] = [];
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          blocks.push({
            x: x * squareSize,
            y: y * squareSize,
            alpha: 0,
            color: trailColors[0],
            maxAlpha: 0,
            holdUntil: 0,
            fadeEnd: 0,
          });
        }
      }

      blocksRef.current = blocks;
    };

    const activateBlock = (index: number) => {
      const block = blocksRef.current[index];
      if (!block) return;

      const now = performance.now();
      const opacity = TRAIL_OPACITIES[colorPointerRef.current];
      block.color = trailColors[colorPointerRef.current];
      colorPointerRef.current =
        (colorPointerRef.current + 1) % TRAIL_OPACITIES.length;

      block.maxAlpha = opacity;
      block.alpha = opacity;
      block.holdUntil = now + HOLD_MS;
      block.fadeEnd = block.holdUntil + FADE_MS;

      trailQueueRef.current.push(block);
      if (trailQueueRef.current.length > TRAIL_OPACITIES.length) {
        const old = trailQueueRef.current.shift();
        if (old) {
          old.alpha = 0;
          old.maxAlpha = 0;
          old.holdUntil = 0;
          old.fadeEnd = 0;
        }
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const squareSize = squareSizeRef.current;
      const cols = colsRef.current;
      if (!squareSize || !cols) return;

      const target = document.elementFromPoint(event.clientX, event.clientY);
      if (!isAllowedSurface(target)) {
        lastHoveredRef.current = null;
        return;
      }

      const xIndex = Math.floor(event.clientX / squareSize);
      const yIndex = Math.floor(event.clientY / squareSize);
      const index = yIndex * cols + xIndex;

      if (index === lastHoveredRef.current) return;
      lastHoveredRef.current = index;
      activateBlock(index);
    };

    const draw = (time: number) => {
      const squareSize = squareSizeRef.current;
      const strokeInset = Math.max(1, squareSize * 0.08);
      const strokeSize = Math.max(0, squareSize - strokeInset * 2);
      const strokeWidth = Math.max(0.45, squareSize * 0.012);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blocksRef.current.forEach((block) => {
        if (block.alpha <= 0) return;

        if (time > block.holdUntil) {
          const progress = Math.min(1, (time - block.holdUntil) / FADE_MS);
          block.alpha = block.maxAlpha * (1 - progress);
        }

        if (block.alpha <= 0.001) {
          block.alpha = 0;
          return;
        }

        ctx.globalAlpha = 1;
        ctx.strokeStyle = block.color;
        ctx.lineWidth = strokeWidth;
        ctx.strokeRect(
          block.x + strokeInset,
          block.y + strokeInset,
          strokeSize,
          strokeSize,
        );
      });

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      setupGrid();
    };

    resolveColors();
    setupGrid();
    frameRef.current = requestAnimationFrame(draw);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-trail" aria-hidden="true">
      <canvas ref={canvasRef} className="pointer-trail__canvas" />
    </div>
  );
}
