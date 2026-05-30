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
const GOBBY_FACE = {
  centerX: 941.5,
  centerY: 1014,
  widthU: 700,
} as const;

const GOBBY_FACE_STROKE = "#334E43";

const faceWidthPct = (GOBBY_FACE.widthU / 2048) * 100;
const faceLeftPct = (GOBBY_FACE.centerX / 2048) * 100;
const faceTopPct = (GOBBY_FACE.centerY / 2048) * 100;

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
