"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

/** Defer Motion + Flubber face so `/gobby.svg` can paint first (FCP). */
const ChillUtilCatFace = dynamic(
  () =>
    import("./chill-util-cat-face").then((mod) => mod.ChillUtilCatFace),
  { ssr: false, loading: () => null },
);

type GobbyMascotProps = {
  className?: string;
  /** Inner square frame (defaults to homepage size when omitted). */
  frameClassName?: string;
  /** Closed-eye smile (Chill `pleasant`). */
  smiley?: boolean;
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

/** Full-color `/gobby.svg` with Chill-style stacked SVG face + Motion on the head. */
export function GobbyMascot({
  className,
  frameClassName,
  smiley = false,
}: GobbyMascotProps) {
  return (
    <div
      className={cn("flex w-full justify-center", className)}
      role="img"
      aria-label="Gobby mascot"
    >
      <div
        className={cn(
          "relative mx-auto aspect-square w-full cursor-pointer",
          frameClassName ?? "max-w-[16rem]",
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
          className="pointer-events-auto absolute z-10 cursor-pointer touch-manipulation -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${faceLeftPct}%`,
            top: `${faceTopPct}%`,
            width: `${faceWidthPct}%`,
          }}
        >
          <ChillUtilCatFace
            className="h-full w-full"
            strokeColor={GOBBY_FACE_STROKE}
            followPointer="viewport"
            eyeOffsetRadius={18}
            facialExpression={smiley ? "pleasant" : undefined}
            interactive={!smiley}
          />
        </div>
      </div>
    </div>
  );
}
