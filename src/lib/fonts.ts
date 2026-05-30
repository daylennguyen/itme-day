import localFont from "next/font/local";

/** Self-hosted from public/fonts/ (RuneScape UF — Text FX + goblin accent). */
export const runescapeUF = localFont({
  src: "../../public/fonts/runescape_uf__1_.ttf",
  variable: "--font-runescape",
  display: "swap",
});

/** Self-hosted from public/fonts/ (OptimusPrinceps — fantasy titling). */
export const optimusPrinceps = localFont({
  src: "../../public/fonts/OptimusPrinceps.ttf",
  variable: "--font-titling-face",
  display: "swap",
});
