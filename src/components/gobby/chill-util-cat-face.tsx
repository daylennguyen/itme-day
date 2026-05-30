"use client";

/**
 * React port of Chill Component `util-cat-face` (stacked SVGs + anime.js path morphing).
 * SVG markup strings: `chill-face-static-markup.ts` (generated from upstream Vue templates).
 * Animation logic: `chill-face-layer-runners.ts` (generated from upstream `<script setup>`).
 *
 * @see https://chillcomponent.codlin.me/en/components/util-cat-face/
 * @see https://gitlab.com/side_project/chill-component (MIT)
 */
import anime from "animejs";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import {
  runChillEyebrowAnimation,
  runChillEyeAnimation,
  runChillMouthAnimation,
} from "./chill-face-layer-runners";
import {
  CHILL_EYE_SVG,
  CHILL_EYEBROW_SVG,
  CHILL_MOUTH_SVG,
} from "./chill-face-static-markup";
import {
  type ChillPointerFollowScope,
  computeChillEyeViewBox,
} from "./chill-eye-view-box";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type ChillFacialExpression =
  | "neutral"
  | "excited"
  | "happy"
  | "sad"
  | "angry"
  | "surprised"
  | "derpy"
  | "speechless"
  | "pleasant"
  | "confidence";

export type ChillUtilCatFaceProps = {
  className?: string;
  facialExpression?: ChillFacialExpression;
  strokeColor?: string;
  eyeOffsetRadius?: number;
  /** `local` = pointer over the face only; `viewport` = track pointer anywhere on the page. */
  followPointer?: ChillPointerFollowScope;
  interactive?: boolean;
  initialExpression?: ChillFacialExpression;
};

function buildSvgHtml(
  template: string,
  id: string,
  stroke: string,
  viewBox = "0 0 1500 1000",
) {
  return template
    .replace(/__ID__/g, id)
    .replace(/__STROKE__/g, stroke)
    .replace(/__VIEWBOX__/g, viewBox);
}

function useStableDomId(prefix: string) {
  const rid = useId();
  return useMemo(
    () => `${prefix}${rid.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [prefix, rid],
  );
}

function runWrapperMotion(
  el: HTMLElement | null,
  expression: ChillFacialExpression,
): void {
  if (!el) return;
  anime.remove(el);

  const loops: ChillFacialExpression[] = [
    "excited",
    "happy",
    "sad",
    "angry",
    "surprised",
    "derpy",
  ];

  const startExpression = (): void => {
    switch (expression) {
      case "neutral":
        break;
      case "excited":
        anime({
          targets: el,
          keyframes: [{ rotate: 5 }, { rotate: -5 }],
          easing: "easeInOutCubic",
          direction: "alternate",
          duration: 600,
          loop: true,
        });
        break;
      case "happy":
        anime({
          targets: el,
          keyframes: [
            { translateY: 5, easing: "easeInCubic" },
            { translateY: -5, easing: "easeOutCubic" },
          ],
          direction: "alternate",
          duration: 600,
          loop: true,
        });
        break;
      case "sad":
        anime({
          targets: el,
          keyframes: [{ translateY: 1 }, { translateY: -1 }],
          easing: "linear",
          direction: "alternate",
          duration: 100,
          loop: true,
        });
        break;
      case "angry":
        anime({
          targets: el,
          keyframes: [
            { translateY: 5, easing: "easeInOutCirc" },
            { translateY: -5, easing: "easeInOutCirc" },
          ],
          direction: "alternate",
          duration: 1200,
          loop: true,
        });
        break;
      case "surprised":
        anime({
          targets: el,
          keyframes: [{ translateX: 2 }, { translateX: -2 }],
          easing: "linear",
          direction: "alternate",
          duration: 100,
          loop: true,
        });
        break;
      case "derpy":
        anime({
          targets: el,
          keyframes: [
            { scaleX: 0.9, scaleY: 1.1, easing: "easeInOutCirc" },
            { scaleX: 1.1, scaleY: 0.9, easing: "easeInOutCirc" },
          ],
          direction: "alternate",
          duration: 1200,
          loop: true,
        });
        break;
      default:
        break;
    }
  };

  void (async () => {
    const reset = anime({
      targets: el,
      rotate: 0,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 200,
    });
    await reset.finished;

    if (expression === "neutral" || !loops.includes(expression)) {
      return;
    }
    startExpression();
  })();
}

export function ChillUtilCatFace({
  className,
  facialExpression: controlled,
  strokeColor = "currentColor",
  eyeOffsetRadius = 40,
  followPointer = "local",
  interactive = true,
  initialExpression = "neutral",
}: ChillUtilCatFaceProps) {
  const browId = useStableDomId("b");
  const eyeId = useStableDomId("e");
  const mouthId = useStableDomId("m");

  const faceRef = useRef<HTMLDivElement>(null);
  const browHost = useRef<HTMLDivElement>(null);
  const eyeHost = useRef<HTMLDivElement>(null);
  const mouthHost = useRef<HTMLDivElement>(null);
  const eyeSvgRef = useRef<SVGSVGElement | null>(null);

  const [internal, setInternal] = useState<ChillFacialExpression>(initialExpression);
  const isControlled = controlled !== undefined;
  const expression = isControlled ? controlled : internal;
  const reducedMotion = usePrefersReducedMotion();
  const trackViewportPointer =
    followPointer === "viewport" && !reducedMotion;

  const [mouse, setMouse] = useState({
    elementX: 0,
    elementY: 0,
    elementWidth: 1,
    elementHeight: 1,
  });

  const viewBoxStr = useMemo(
    () =>
      computeChillEyeViewBox(
        expression,
        eyeOffsetRadius,
        mouse,
        followPointer,
      ),
    [expression, eyeOffsetRadius, mouse, followPointer],
  );

  useLayoutEffect(() => {
    if (!browHost.current) return;
    browHost.current.innerHTML = buildSvgHtml(CHILL_EYEBROW_SVG, browId, strokeColor);
  }, [browId, strokeColor]);

  useLayoutEffect(() => {
    if (!mouthHost.current) return;
    mouthHost.current.innerHTML = buildSvgHtml(CHILL_MOUTH_SVG, mouthId, strokeColor);
  }, [mouthId, strokeColor]);

  useLayoutEffect(() => {
    if (!eyeHost.current) return;
    eyeHost.current.innerHTML = buildSvgHtml(
      CHILL_EYE_SVG,
      eyeId,
      strokeColor,
      "0 0 1500 1000",
    );
    eyeSvgRef.current = eyeHost.current.querySelector("svg");
  }, [eyeId, strokeColor]);

  useEffect(() => {
    const svg = eyeSvgRef.current;
    if (!svg) return;
    svg.setAttribute("viewBox", viewBoxStr);
  }, [viewBoxStr]);

  useEffect(() => {
    void runChillEyebrowAnimation(browId, expression);
  }, [browId, expression]);

  useEffect(() => {
    void runChillMouthAnimation(mouthId, expression);
  }, [mouthId, expression]);

  useEffect(() => {
    void runChillEyeAnimation(eyeId, expression);
  }, [eyeId, expression]);

  useEffect(() => {
    runWrapperMotion(faceRef.current, expression);
  }, [expression]);

  const updateMouseFromClient = useCallback((clientX: number, clientY: number) => {
    const svg = eyeSvgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    setMouse({
      elementX: clientX - r.left,
      elementY: clientY - r.top,
      elementWidth: Math.max(r.width, 1),
      elementHeight: Math.max(r.height, 1),
    });
  }, []);

  const onEyePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (trackViewportPointer) return;
      updateMouseFromClient(e.clientX, e.clientY);
    },
    [trackViewportPointer, updateMouseFromClient],
  );

  useEffect(() => {
    if (!trackViewportPointer) return;

    let raf = 0;
    const onWindowPointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updateMouseFromClient(e.clientX, e.clientY);
      });
    };

    window.addEventListener("pointermove", onWindowPointerMove, {
      passive: true,
    });
    return () => {
      window.removeEventListener("pointermove", onWindowPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [trackViewportPointer, updateMouseFromClient]);

  const cycle: ChillFacialExpression[] = useMemo(
    () => ["neutral", "happy", "surprised", "sad", "neutral"],
    [],
  );

  const bumpHappy = useCallback(() => {
    if (!interactive || isControlled) return;
    setInternal("happy");
  }, [interactive, isControlled]);

  const releaseHover = useCallback(() => {
    if (!interactive || isControlled) return;
    setInternal("neutral");
  }, [interactive, isControlled]);

  const tapCycle = useCallback(() => {
    if (!interactive || isControlled) return;
    setInternal((prev) => {
      const i = cycle.indexOf(prev);
      const next = i >= 0 ? cycle[(i + 1) % cycle.length]! : "neutral";
      return next;
    });
  }, [interactive, isControlled, cycle]);

  return (
    <div
      ref={faceRef}
      className={cn(
        "relative aspect-[3/2] w-full touch-manipulation",
        className,
      )}
      onPointerEnter={interactive && !isControlled ? bumpHappy : undefined}
      onPointerLeave={interactive && !isControlled ? releaseHover : undefined}
      onPointerDown={
        interactive && !isControlled
          ? (e) => {
              if (e.button === 0) tapCycle();
            }
          : undefined
      }
      role="presentation"
      data-facial-expression={expression}
    >
      <div
        ref={browHost}
        className="absolute left-0 top-0 h-full w-full"
        aria-hidden
      />
      <div
        ref={eyeHost}
        className="absolute left-0 top-0 h-full w-full"
        aria-hidden
        onPointerMove={onEyePointerMove}
      />
      <div
        ref={mouthHost}
        className="absolute left-0 top-0 h-full w-full"
        aria-hidden
      />
    </div>
  );
}
