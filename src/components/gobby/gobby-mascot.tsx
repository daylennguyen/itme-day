"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

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
};

/**
 * Face overlay in % of the square mascot frame (`gobby.svg` viewBox 0 0 2048 2048).
 * Avoid the old merged-SVG `(200 * 8.0833) / 2048` box (~79% wide) — wrong for `ChillUtilCatFace`.
 * Constants below match the DevTools-measured sweet spot (login, ~416px img):
 * `wRatio≈0.342`, `hRatio≈0.228`, `cxRel≈0.460`, `cyRel≈0.495`.
 */
const GOBBY_FACE = {
  centerX: 941.5,
  centerY: 1014,
  widthU: 700,
} as const;

/** Eyes, mouth, eyebrows — same in light and dark (matches `/gobby.svg` accent). */
const GOBBY_FACE_STROKE = "#334E43";

const faceWidthPct = (GOBBY_FACE.widthU / 2048) * 100;
const faceLeftPct = (GOBBY_FACE.centerX / 2048) * 100;
const faceTopPct = (GOBBY_FACE.centerY / 2048) * 100;

/** Tap anywhere to step through; each expression sticks until the next tap. */
const GOBBY_EXPRESSION_CYCLE: ChillFacialExpression[] = [
  "neutral",
  "happy",
  "surprised",
  "sad",
  "angry",
  "excited",
  "derpy",
];

/** Login mascot: full-color `/gobby.svg` with Chill Component-style stacked SVG face + anime.js on the head. */
export function GobbyMascot({
  className,
  frameClassName,
  smiley = false,
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

  useEffect(() => {
    if (smiley) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      cycleExpression();
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [smiley, cycleExpression]);

  return (
    <div
      className={cn("flex w-full justify-center", className)}
      role="img"
      aria-label={`Gobby mascot, ${expression} expression. Tap anywhere to change.`}
    >
      <div
        className={cn(
          "relative mx-auto aspect-square w-full",
          frameClassName ?? "max-w-[12rem] sm:max-w-[13rem]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local static SVG; avoids bundling 170+ path SVG */}
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
            // Inline only: v3 (globals) + v4 (rng-react-components.css) both define
            // `-translate-x/y-1/2`, which stacks transform + translate and shifts the face ~50% left.
            transform: "translate(-50%, -50%)",
          }}
        >
          <ChillUtilCatFace
            className="h-full w-full"
            strokeColor={GOBBY_FACE_STROKE}
            followPointer="viewport"
            eyeOffsetRadius={18}
            facialExpression={smiley ? "pleasant" : expression}
            interactive={false}
          />
        </div>
      </div>
    </div>
  );
}
