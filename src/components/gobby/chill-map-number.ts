/**
 * Ported from Chill Component `common/utils.ts` `mapNumber` (MIT) — lodash `clamp` inlined.
 */
export function mapNumber(
  current: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  const mapped: number =
    ((current - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  return Math.min(
    Math.max(mapped, Math.min(outMin, outMax)),
    Math.max(outMin, outMax),
  );
}
