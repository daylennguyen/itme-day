/**
 * Motion + Flubber face layer animations (subset: neutral, happy, pleasant).
 * Ported from Chill Component via dnd5e `chill-face-layer-runners.ts` (MIT).
 */
import { animate, type Easing } from "motion/react";
import { interpolate } from "flubber";

import {
  connectHeadTail,
  getKeyframeList,
} from "./chill-cat-face-utils";
import type { ChillFacialExpression } from "./chill-expressions";

type PartAttrs = Record<string, string>;
type LayerRun = { stop: () => void };

const activeRuns = new Map<string, LayerRun>();

function runKey(layer: string, target: string): string {
  return `${layer}:${target}`;
}

function stopLayer(layer: string, selectors: string[]) {
  for (const sel of selectors) {
    const key = runKey(layer, sel);
    activeRuns.get(key)?.stop();
    activeRuns.delete(key);
  }
}

function trackRun(layer: string, selector: string, run: LayerRun) {
  const key = runKey(layer, selector);
  activeRuns.get(key)?.stop();
  activeRuns.set(key, run);
}

function getPathEl(selector: string): SVGPathElement | null {
  return document.querySelector<SVGPathElement>(selector);
}

function applyNonDAttrs(el: SVGPathElement, attrs: PartAttrs) {
  for (const [name, value] of Object.entries(attrs)) {
    if (name === "d") continue;
    el.setAttribute(name, value);
  }
}

function morphPathD(
  el: SVGPathElement,
  fromD: string,
  toD: string,
  duration: number,
  ease: Easing = "easeInOut",
): Promise<void> {
  if (fromD === toD) {
    el.setAttribute("d", toD);
    return Promise.resolve();
  }

  const mix = interpolate(fromD, toD, { maxSegmentLength: 0.1 });
  return new Promise((resolve) => {
    const controls = animate(0, 1, {
      duration: duration / 1000,
      ease,
      onUpdate: (t) => el.setAttribute("d", mix(t)),
      onComplete: resolve,
    });
    const run: LayerRun = {
      stop: () => {
        controls.stop();
        resolve();
      },
    };
    // Caller tracks via trackRun
    void run;
  });
}

async function morphToAttrs(
  el: SVGPathElement,
  attrs: PartAttrs,
  duration: number,
  ease: Easing = "easeInOut",
): Promise<void> {
  const fromD = el.getAttribute("d") ?? "";
  const toD = attrs.d ?? fromD;
  applyNonDAttrs(el, attrs);
  await morphPathD(el, fromD, toD, duration, ease);
}

function startLoop(
  layer: string,
  selector: string,
  el: SVGPathElement,
  keyframes: PartAttrs[],
  segmentMs: number,
  ease: Easing = "easeInOut",
): LayerRun {
  let cancelled = false;
  const connected =
    keyframes.length > 1 ? connectHeadTail(keyframes) : keyframes;

  const loop = async () => {
    if (connected.length <= 1) return;
    while (!cancelled) {
      for (let i = 0; i < connected.length - 1; i++) {
        if (cancelled) return;
        await morphToAttrs(el, connected[i + 1]!, segmentMs, ease);
      }
    }
  };

  void loop();
  const run: LayerRun = { stop: () => { cancelled = true; } };
  trackRun(layer, selector, run);
  return run;
}

async function runOnParts<const Ids extends readonly string[]>(
  layer: string,
  svgId: string,
  partIds: Ids,
  getSelector: (svgId: string, partId: string) => string,
  fn: (el: SVGPathElement, partId: Ids[number]) => Promise<void>,
) {
  stopLayer(
    layer,
    partIds.map((p) => getSelector(svgId, p)),
  );
  await Promise.all(
    partIds.map(async (partId) => {
      const sel = getSelector(svgId, partId);
      const el = getPathEl(sel);
      if (!el) return;
      await fn(el, partId);
    }),
  );
}

export async function runChillEyebrowAnimation(
  svgId: string,
  facialExpression: ChillFacialExpression,
): Promise<void> {
  const partIdList = ["eyebrow-r", "eyebrow-l"] as const;
  const getTargetId = (id: string, partId: string) =>
    `#${id} #face-eyebrow #${partId}`;

  const providers: Record<
    ChillFacialExpression,
    () => Promise<void>
  > = {
    neutral: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "neutral");
      await runOnParts("brow", svgId, partIdList, getTargetId, async (el, partId) => {
        await morphToAttrs(el, keyframeList[0]?.[partId] ?? {}, 500);
      });
    },
    happy: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "happy");
      await runOnParts("brow", svgId, partIdList, getTargetId, async (el, partId) => {
        const first = keyframeList[0]?.[partId] ?? {};
        await morphToAttrs(el, first, 500);
        const seq = keyframeList.map((kf) => kf[partId] ?? {});
        const sel = getTargetId(svgId, partId);
        startLoop("brow", sel, el, seq, 1800 / Math.max(seq.length, 1));
      });
    },
    pleasant: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "pleasant");
      await runOnParts("brow", svgId, partIdList, getTargetId, async (el, partId) => {
        await morphToAttrs(el, keyframeList[0]?.[partId] ?? {}, 500);
      });
    },
  };

  await providers[facialExpression]();
}

export async function runChillMouthAnimation(
  svgId: string,
  facialExpression: ChillFacialExpression,
): Promise<void> {
  const partIdList = ["palate", "jaw"] as const;
  const getTargetId = (id: string, partId: string) =>
    `#${id} #face-mouth #${partId}`;

  const loopMouth = async (
    expression: string,
    segmentMs: number,
    delayMs: number,
  ) => {
    const keyframeList = getKeyframeList(svgId, partIdList, expression);
    await runOnParts("mouth", svgId, partIdList, getTargetId, async (el, partId) => {
      const first = keyframeList[0]?.[partId] ?? {};
      await morphToAttrs(el, first, 500);
      const seq = keyframeList.map((kf) => kf[partId] ?? {});
      if (seq.length <= 1) return;
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
      const sel = getTargetId(svgId, partId);
      startLoop(
        "mouth",
        sel,
        el,
        seq,
        segmentMs / Math.max(seq.length, 1),
        "easeInOut",
      );
    });
  };

  const providers: Record<ChillFacialExpression, () => Promise<void>> = {
    neutral: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "neutral");
      await runOnParts("mouth", svgId, partIdList, getTargetId, async (el, partId) => {
        await morphToAttrs(el, keyframeList[0]?.[partId] ?? {}, 500);
      });
    },
    happy: () => loopMouth("happy", 600, 400),
    pleasant: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "pleasant");
      await runOnParts("mouth", svgId, partIdList, getTargetId, async (el, partId) => {
        await morphToAttrs(el, keyframeList[0]?.[partId] ?? {}, 500);
      });
    },
  };

  await providers[facialExpression]();
}

export async function runChillEyeAnimation(
  svgId: string,
  facialExpression: ChillFacialExpression,
): Promise<void> {
  const partIdList = ["eye-r", "eye-l"] as const;
  const getTargetId = (id: string, partId: string) =>
    `#${id} #face-eye #${partId}`;

  const providers: Record<ChillFacialExpression, () => Promise<void>> = {
    neutral: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "neutral");
      await runOnParts("eye", svgId, partIdList, getTargetId, async (el, partId) => {
        const first = keyframeList[0]?.[partId] ?? {};
        await morphToAttrs(el, first, 500);
        const seq = keyframeList.map((kf) => kf[partId] ?? {});
        if (seq.length <= 1) return;
        await new Promise((r) => setTimeout(r, 3000));
        const sel = getTargetId(svgId, partId);
        startLoop("eye", sel, el, seq, 50);
      });
    },
    happy: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "happy");
      await runOnParts("eye", svgId, partIdList, getTargetId, async (el, partId) => {
        const first = keyframeList[0]?.[partId] ?? {};
        await morphToAttrs(el, first, 500);
        const seq = connectHeadTail(
          keyframeList.map((kf) => kf[partId] ?? {}),
        );
        const sel = getTargetId(svgId, partId);
        startLoop(
          "eye",
          sel,
          el,
          seq,
          1600 / Math.max(seq.length, 1),
        );
      });
    },
    pleasant: async () => {
      const keyframeList = getKeyframeList(svgId, partIdList, "pleasant");
      await runOnParts("eye", svgId, partIdList, getTargetId, async (el, partId) => {
        await morphToAttrs(el, keyframeList[0]?.[partId] ?? {}, 800);
      });
    },
  };

  await providers[facialExpression]();
}

export function stopAllChillFaceAnimations(svgIds: {
  browId: string;
  eyeId: string;
  mouthId: string;
}) {
  stopLayer("brow", [
    `#${svgIds.browId} #face-eyebrow #eyebrow-r`,
    `#${svgIds.browId} #face-eyebrow #eyebrow-l`,
  ]);
  stopLayer("eye", [
    `#${svgIds.eyeId} #face-eye #eye-r`,
    `#${svgIds.eyeId} #face-eye #eye-l`,
  ]);
  stopLayer("mouth", [
    `#${svgIds.mouthId} #face-mouth #palate`,
    `#${svgIds.mouthId} #face-mouth #jaw`,
  ]);
}
