/** Face overlay in user units of `gobby.svg` (viewBox 0 0 2048 2048). Synced from dnd5e gobby-mascot.tsx */
export const GOBBY_FACE = {
  centerX: 941.5,
  centerY: 1014,
  widthU: 700,
} as const;

/** Eyes, mouth, eyebrows — same in light and dark (matches `/gobby.svg` accent). */
export const GOBBY_FACE_STROKE = "#334E43";

const GOBBY_SVG_VIEWBOX = 2048;

/** Percentage-based overlay position for the animated face on top of `gobby.svg`. */
export function getGobbyFaceOverlayStyle(): {
  left: string;
  top: string;
  width: string;
  transform: string;
} {
  return {
    left: `${(GOBBY_FACE.centerX / GOBBY_SVG_VIEWBOX) * 100}%`,
    top: `${(GOBBY_FACE.centerY / GOBBY_SVG_VIEWBOX) * 100}%`,
    width: `${(GOBBY_FACE.widthU / GOBBY_SVG_VIEWBOX) * 100}%`,
    transform: "translate(-50%, -50%)",
  };
}
