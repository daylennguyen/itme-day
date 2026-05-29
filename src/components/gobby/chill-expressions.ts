/** Subset of Chill facial expressions shipped on itme.day. */
export const CHILL_SUBSET_EXPRESSIONS = [
  "neutral",
  "happy",
  "pleasant",
] as const;

export type ChillFacialExpression = (typeof CHILL_SUBSET_EXPRESSIONS)[number];

export const CHILL_TAP_CYCLE: ChillFacialExpression[] = [
  "neutral",
  "happy",
  "pleasant",
];

export function isChillFacialExpression(
  value: string,
): value is ChillFacialExpression {
  return (CHILL_SUBSET_EXPRESSIONS as readonly string[]).includes(value);
}
