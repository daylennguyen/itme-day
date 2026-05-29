import { mapNumber } from "./chill-map-number";

export type ChillPointerFollowScope = "local" | "viewport";

export type EyePointerMetrics = {
  elementX: number;
  elementY: number;
  elementWidth: number;
  elementHeight: number;
};

/** Expressions whose eye SVG animation conflicts with viewBox panning. */
const EYE_VIEWBOX_FROZEN_EXPRESSIONS = new Set(["excited", "happy"]);

/** Happy morph still allows subtle gaze when tracking the whole login viewport. */
const EYE_VIEWBOX_FROZEN_VIEWPORT = new Set(["excited"]);

/**
 * Pan the Chill eye SVG viewBox so pupils appear to follow the pointer.
 * @see chill-util-cat-face.tsx
 */
export function computeChillEyeViewBox(
  expression: string,
  eyeOffsetRadius: number,
  mouse: EyePointerMetrics,
  followPointerScope: ChillPointerFollowScope = "local",
): string {
  const frozen =
    followPointerScope === "viewport"
      ? EYE_VIEWBOX_FROZEN_VIEWPORT
      : EYE_VIEWBOX_FROZEN_EXPRESSIONS;

  if (frozen.has(expression)) return "0 0 1500 1000";

  const offset = eyeOffsetRadius;
  const { elementX, elementY } = mouse;
  const elementWidth = Math.max(mouse.elementWidth, 1);
  const elementHeight = Math.max(mouse.elementHeight, 1);

  const position = {
    x: elementWidth / 2 - elementX,
    y: elementHeight / 2 - elementY,
  };

  const xRadius = Math.abs(
    mapNumber(
      position.x,
      -elementWidth / 2,
      elementWidth / 2,
      -offset,
      offset,
    ),
  );
  const yRadius = Math.abs(
    mapNumber(
      position.y,
      -elementHeight / 2,
      elementHeight / 2,
      -offset,
      offset,
    ),
  );
  const angle = Math.atan2(position.y, position.x);
  const x = Math.cos(angle) * xRadius;
  const y = Math.sin(angle) * yRadius;
  return `${x} ${y} 1500 1000`;
}
