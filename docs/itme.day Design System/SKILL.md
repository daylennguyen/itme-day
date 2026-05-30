---
name: itme-day-design
description: Use this skill to generate well-branded interfaces and assets for itme.day (Daylen Nguyen's personal site + project hub — minimal monochrome "engineer's homepage" with a cute goblin mascot, plus a neon RNG/gaming console world), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `README.md` — full context: content + visual foundations, iconography, index. **Read first.**
- `colors_and_type.css` — color tokens (base monochrome / RNG neon / Gobby earth tones) + semantic type classes; imports Geist + Geist Mono from Google Fonts.
- `assets/gobby.svg` — the goblin mascot (brand heart / avatar / favicon).
- `assets/d20.svg` — violet D20 emblem (the RNG/console world).
- `ui_kits/itme-day/` — interactive recreation of the hub (mascot, Home/RNG tabs, playable D20 console). Copy components from here.
- `preview/` — small design-system specimen cards (colors, type, spacing, components).

## The two worlds — don't blend them
1. **Hub (base):** minimal, monochrome zinc ramp, dark by default, Geist, sentence-case + humble copy, near-flat bordered cards, gentle Motion fades. No accent color.
2. **RNG console:** near-black `#09090b` + radial neon glow, indigo/violet/emerald/rose semantic hues, font-black UPPERCASE, Geist Mono numerals, glassy panels with inset-highlight-over-glow, physics animations. Loud, gamified D&D/casino copy.

Pick the world that matches the surface. Icons are **Lucide** (line, color-coded by role). Emoji only in docs, never in product UI.
