"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

import type { ChillFacialExpression } from "./chill-util-cat-face";

/** Defer anime.js + path morphing so `/gobby.svg` can paint first (FCP). */
const ChillUtilCatFace = dynamic(
  () =>
    import("./chill-util-cat-face").then((mod) => mod.ChillUtilCatFace),
  { ssr: false, loading: () => null },
);

type GobbyMascotProps = {
  className?: string;
  /** Inner square frame (defaults to large login size when omitted). */
  frameClassName?: string;
  /** Login form hover: closed-eye smile (Chill `pleasant`). */
  smiley?: boolean;
  /** Hub tap: cycle expression and run callback (mood label, pop animation). */
  onTap?: () => void;
};

/**
 * Face overlay in % of the square mascot frame (`gobby.svg` viewBox 0 0 2048 2048).
 */
const GOBBY_VIEWBOX = 2048;

const GOBBY_FACE = {
  centerX: 941.5,
  centerY: 1014,
  widthU: 700,
} as const;

/** Cream portrait disc in `gobby.svg` (`<circle cx="1024" cy="1080" r="820" />`). */
const GOBBY_PORTRAIT = {
  centerX: 1024,
  centerY: 1080,
  radius: 820,
} as const;

const GOBBY_FACE_STROKE = "#334E43";

const toViewBoxPct = (units: number) => (units / GOBBY_VIEWBOX) * 100;

const faceWidthPct = toViewBoxPct(GOBBY_FACE.widthU);
const faceLeftPct = toViewBoxPct(GOBBY_FACE.centerX);
const faceTopPct = toViewBoxPct(GOBBY_FACE.centerY);

const portraitSizePct = toViewBoxPct(GOBBY_PORTRAIT.radius * 2);
const portraitLeftPct = toViewBoxPct(GOBBY_PORTRAIT.centerX - GOBBY_PORTRAIT.radius);
const portraitTopPct = toViewBoxPct(GOBBY_PORTRAIT.centerY - GOBBY_PORTRAIT.radius);

const GOBBY_EXPRESSION_CYCLE: ChillFacialExpression[] = [
  "neutral",
  "happy",
  "surprised",
  "sad",
  "angry",
  "excited",
  "derpy",
];

export function GobbyMascot({
  className,
  frameClassName,
  smiley = false,
  onTap,
}: GobbyMascotProps) {
  const [expression, setExpression] =
    useState<ChillFacialExpression>("neutral");

  const cycleExpression = useCallback(() => {
    setExpression((prev) => {
      const i = GOBBY_EXPRESSION_CYCLE.indexOf(prev);
      const next =
        i >= 0
          ? GOBBY_EXPRESSION_CYCLE[(i + 1) % GOBBY_EXPRESSION_CYCLE.length]!
          : GOBBY_EXPRESSION_CYCLE[0]!;
      return next;
    });
  }, []);

  const handleTap = () => {
    if (smiley) return;
    cycleExpression();
    onTap?.();
  };

  const frame = (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full",
        frameClassName ?? "max-w-[12rem] sm:max-w-[13rem]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          left: `${portraitLeftPct}%`,
          top: `${portraitTopPct}%`,
          width: `${portraitSizePct}%`,
          height: `${portraitSizePct}%`,
          background:
            "radial-gradient(circle, rgba(132,155,73,0.4) 0%, rgba(132,155,73,0.15) 55%, transparent 72%)",
          boxShadow: "0 0 32px 10px rgba(132,155,73,0.2)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- local static SVG */}
      <img
        src="/gobby.svg"
        alt=""
        width={2048}
        height={2048}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-contain"
      />
      <div
        className="pointer-events-none absolute z-10"
        style={{
          left: `${faceLeftPct}%`,
          top: `${faceTopPct}%`,
          width: `${faceWidthPct}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <ChillUtilCatFace
          className="h-full w-full"
          strokeColor={GOBBY_FACE_STROKE}
          followPointer={onTap ? "local" : "viewport"}
          eyeOffsetRadius={18}
          facialExpression={smiley ? "pleasant" : expression}
          interactive={false}
        />
      </div>
    </div>
  );

  const label = `Gobby mascot, ${expression} expression. Tap to change.`;

  if (onTap && !smiley) {
    return (
      <button
        type="button"
        className={cn(
          "flex w-full cursor-pointer justify-center border-0 bg-transparent p-0",
          className,
        )}
        onClick={handleTap}
        aria-label={label}
      >
        {frame}
      </button>
    );
  }

  return (
    <div
      className={cn("flex w-full justify-center", className)}
      role="img"
      aria-label={label}
    >
      {frame}
    </div>
  );
}
