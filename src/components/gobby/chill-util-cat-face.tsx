"use client";

/**
 * Chill Component `util-cat-face` port — stacked SVGs + Motion/Flubber path morphing.
 * @see https://chillcomponent.codlin.me/en/components/util-cat-face/
 * @see https://gitlab.com/side_project/chill-component (MIT)
 */
import { motion } from "motion/react";
import {
  type PointerEvent as ReactPointerEvent,
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
  stopAllChillFaceAnimations,
} from "./chill-face-motion-runners";
import {
  CHILL_EYE_SVG,
  CHILL_EYEBROW_SVG,
  CHILL_MOUTH_SVG,
} from "./chill-face-static-markup";
import {
  CHILL_TAP_CYCLE,
  type ChillFacialExpression,
} from "./chill-expressions";
import {
  type ChillPointerFollowScope,
  computeChillEyeViewBox,
} from "./chill-eye-view-box";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export type { ChillFacialExpression } from "./chill-expressions";

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

const WRAPPER_NEUTRAL = { rotate: 0, x: 0, y: 0, scaleX: 1, scaleY: 1 };
const WRAPPER_HAPPY = { y: [5, -5] };

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

  const browHost = useRef<HTMLDivElement>(null);
  const eyeHost = useRef<HTMLDivElement>(null);
  const mouthHost = useRef<HTMLDivElement>(null);
  const eyeSvgRef = useRef<SVGSVGElement | null>(null);

  const [internal, setInternal] =
    useState<ChillFacialExpression>(initialExpression);
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
    browHost.current.innerHTML = buildSvgHtml(
      CHILL_EYEBROW_SVG,
      browId,
      strokeColor,
    );
  }, [browId, strokeColor]);

  useLayoutEffect(() => {
    if (!mouthHost.current) return;
    mouthHost.current.innerHTML = buildSvgHtml(
      CHILL_MOUTH_SVG,
      mouthId,
      strokeColor,
    );
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
    if (reducedMotion) {
      stopAllChillFaceAnimations({ browId, eyeId, mouthId });
      return;
    }
    void runChillEyebrowAnimation(browId, expression);
    void runChillMouthAnimation(mouthId, expression);
    void runChillEyeAnimation(eyeId, expression);
    return () => {
      stopAllChillFaceAnimations({ browId, eyeId, mouthId });
    };
  }, [browId, eyeId, mouthId, expression, reducedMotion]);

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
    (e: ReactPointerEvent<HTMLDivElement>) => {
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
      const i = CHILL_TAP_CYCLE.indexOf(prev);
      const next =
        i >= 0 ? CHILL_TAP_CYCLE[(i + 1) % CHILL_TAP_CYCLE.length]! : "neutral";
      return next;
    });
  }, [interactive, isControlled]);

  const wrapperAnimate =
    reducedMotion || expression !== "happy"
      ? WRAPPER_NEUTRAL
      : WRAPPER_HAPPY;

  const wrapperTransition =
    expression === "happy" && !reducedMotion
      ? {
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut" as const,
        }
      : { duration: 0.2, type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <motion.div
      className={cn(
        "relative aspect-[3/2] w-full touch-manipulation",
        className,
      )}
      animate={wrapperAnimate}
      transition={wrapperTransition}
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
    </motion.div>
  );
}
