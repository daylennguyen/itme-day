# itme.day — Design System

The personal brand + product design system for **[itme.day](https://itme.day)**, the website and project hub of **Daylen Nguyen**, a software development engineer. The vibe in one line: a tidy, monochrome engineer's homepage with a **cute green goblin** ("Gobby") for a heart, and a separate **neon "gaming console"** world for the RNG / dice toys.

This system gives a design agent everything needed to build on-brand interfaces and assets for itme.day — colors, type, fonts, the mascot, UI-kit components, and tone.

---

## What this brand is

itme.day is a **minimal project link hub**: one page that lists outbound links to the things Daylen is building (e.g. *Gobby*, an AI dungeon master for solo D&D). It runs on Next.js + Tailwind + shadcn/ui primitives, ships dark by default, and uses the **Geist** typeface. The homepage centerpiece is the **Gobby goblin mascot** — an animated SVG face you tap to cycle expressions.

Sitting beside the hub is a second, louder surface: the **RNG Probability Console**, powered by the open-source `@itme.day/rng-react-components` library — dice slider, coin flip, RNG wheel, and a D20 roller rendered in a glassy neon "provably-fair gaming" aesthetic. The two worlds are intentionally different: the hub is calm and monochrome; the console is dark, saturated, and animated.

### Products / surfaces represented
| Surface | What it is | Aesthetic |
|---|---|---|
| **itme.day hub** | Personal homepage — mascot + tabbed list of project links | Minimal monochrome, Geist, dark-default |
| **RNG Probability Console** | Suite of RNG/gaming components (dice, coin, wheel, D20) | Dark neon glass, indigo/emerald/rose |
| **Gobby** | Mascot + linked project (AI dungeon master) | Goblin earth tones, hand-drawn cute |

### Sources used to build this system
These were provided by the user. The reader may not have access, but they are recorded here so you can go deeper:
- **GitHub — `daylennguyen/itme-day`** (private): the hub app. Next.js 15, Tailwind v3, shadcn/ui. Key files: `src/app/globals.css` (color tokens), `src/app/page.tsx`, `src/components/gobby/*`, `src/components/ui/*`, `src/data/projects.ts`. → https://github.com/daylennguyen/itme-day
- **GitHub — `itmedotday/rng-react-components`** (public): the RNG component library + Storybook. Key files: `src/App.tsx`, `src/components/{DiceSlider,CoinFlip,RngWheel,D20Roll}/*`, `src/assets/d20.svg`. → https://github.com/itmedotday/rng-react-components · Storybook: https://itmedotday.github.io/rng-react-components/ · npm: `@itme.day/rng-react-components`
- Two screenshots: the Gobby avatar, and the D20 Roll console screen.

**Explore those repos further** to build higher-fidelity work — especially the RNG component source for exact animation timings and the `gobby/` folder for the Chill-Component face-morph internals.

---

## CONTENT FUNDAMENTALS

How copy is written across itme.day.

**Voice.** Understated, first-person, lowercase-leaning, faintly playful. The author refers to himself as **"I"** and addresses no one in particular — this is a personal homepage, not a marketing site. No exclamation marks, no hype, no growth-speak. Example homepage copy:
- Eyebrow: `itme.day`
- Title: `Projects`
- Subtitle: *"A minimal list of things I am building."*
- Project blurb: *"AI dungeon master for solo D&D play."*

**Casing.** Two registers, used deliberately:
- *Hub register* — **sentence case** everywhere except the eyebrow. Titles are short nouns ("Projects", "Random generators"). Eyebrows are lowercase brand/section tags in `UPPERCASE` letter-spacing treatment (`itme.day`, `RNG`).
- *Console register* — **LOUD UPPERCASE**, font-black, wide tracking. Titles shout: `RNG PROBABILITY CONSOLE`, `D20 ROLL CONSOLE`, button `ROLL D20`, badges `NAT 1` / `MISS` / `WIN`. Stat labels are tiny uppercase (`WINS`, `LOSSES`, `WIN RATIO`, `WIN STREAK`).

**Tone by surface.** The hub is quiet and humble ("a minimal list of things"). The console is gamified and confident ("A high-fidelity probability suite simulating true mathematical random distributions with dynamic console physics."), leaning on D&D / casino vocabulary: *provably fair, difficulty class (DC), win chance, roll over/under, nat 1, streak*.

**Length.** Ruthlessly short. One eyebrow, one title, one sentence of subtext per section — never a paragraph. Project cards are a title + a single clause + a "Visit" button.

**Emoji.** Used sparingly and only as **decorative section markers in docs/READMEs** (🎲 🪙 🎡 ✨ 🚀), never inside the product UI. In-product "icons" are line icons (Lucide) and the goblin, not emoji.

**Microcopy patterns.** Button verbs are plain and imperative: `Visit`, `Roll D20`, `Flip`. Outcome words are single tokens: `WIN`, `MISS`, `NAT 1`. Definitions are spelled out inline for newcomers (`DC = Difficulty Class`).

---

## VISUAL FOUNDATIONS

The brand runs **two coordinated visual systems** plus a mascot. Don't blend them — pick the world that matches the surface.

### Palette
- **Base (hub).** A strict **neutral/zinc monochrome** ramp. Dark is the default: page `#121212`, card `#1a1a1a`, text `#fafafa`, muted text `#a3a3a3`, hairline borders `#2e2e2e`. Light mode exists (white page, `#171717` ink, `#e5e5e5` borders) but the site ships `<html class="dark">`. There is **no brand accent color in the hub** — emphasis comes from contrast and weight, not hue.
- **RNG console.** Near-black `#09090b` ground, **zinc** glass surfaces (`#18181b` / `#27272a`), and saturated neon roles: **indigo `#6366f1`** = primary/active, **violet `#8b5cf6`** = dice/D20, **emerald `#10b981`** = win, **rose `#f43f5e` / `#e11d48`** = loss, **orange `#fb923c`** = streak/flame. Color is *semantic* — green means you won, red means you lost.
- **Gobby goblin.** Warm storybook earth tones: leafy green skin `#849B49` over shadow green `#324D29`, parchment `#E6D5B8` portrait disc ringed in brown `#7B5E3D`, a `#8B5B33` tunic, a teal `#4C6F70` beanie, and a dark teal `#334E43` "ink" used for the facial strokes.

### Type
**Geist** (sans) + **Geist Mono** for everything in the hub and console — a clean, modern, slightly technical grotesque. Weights run the full range; the console leans on **900 (black)**. Headings are tracked **tight** (`-0.02em`); uppercase eyebrows and console labels are tracked **wide** (`0.05–0.1em`). All numerics — stats, percentages, DC values — are set in **Geist Mono** for tabular calm. The goblin / D&D world adds two **self-hosted fantasy faces**: **OptimusPrinceps** (regal titling serif) and **RuneScape UF** (pixel display) — accent use only.

### Text colours & effects
A RuneScape-style chat **text-effect system** powers the goblin/D&D side. Colour codes — *Red, Purple, Green, Cyan, Yellow, White* (existing) and *Orange, Pink, Brown, Blue, Inverted, Grey, Rainbow* (new) — are tokenised as `--fx-*` in `colors_and_type.css` and rendered in **RuneScape UF**. Animated effects: **Wave / Wave2 / Wave3** (per-char vertical bob, increasing amplitude/rotation), **Shake / Shake2** (jitter), **Glow1–5** (pulsing text-shadow), **Flash1–5** (two-colour blink), **Rainbow** (per-char hue cycle), **Scroll / Scroll2** (marquee R→L / L→R), **Slide / Slide2** (text slides down / up), **Mirror** (horizontal flip). See `preview/fx-colors.html` and `preview/fx-effects.html` for live specimens.

### Backgrounds
- Hub: **flat solid** color (`#121212`), no texture, no imagery, no gradient. Calm.
- Console: a near-black field with a **multi-stop radial glow** — a cool indigo bloom from top-center, faint emerald from bottom-left, faint rose from bottom-right (`--rng-backdrop`). The console card itself gets a soft outer **neon edge-glow**.
- No photography anywhere. No stock imagery. The only "art" is the goblin and the geometric D20.

### Corner radii
Soft but not pill-y. Tokens: `--radius: 0.5rem` (8px) base; buttons `rounded-md` (6px); cards `rounded-xl` (12px); the console tab-bar and console panel go larger at `rounded-2xl` (16px). The goblin sits in a perfect circle.

### Cards & elevation
- Hub cards: `1px` border in `--border`, `--card` fill, a **very subtle** drop `shadow` — almost flat. They rely on the border, not the shadow.
- Console panels: glassy `zinc-900/60` with `backdrop-blur`, a `zinc-800/80` border, and layered shadows — an outer `0 4px 20px rgba(0,0,0,.4)` plus, when active, an **inset top highlight + colored glow** (`inset 0 1px 1px rgba(255,255,255,.1), 0 0 10px rgba(99,102,241,.2)`). This inset-highlight-over-glow is the console's signature.

### Borders, transparency & blur
Hairline `1px` borders everywhere; in the console they're often **semi-transparent** (`/60`–`/80`) so the glow reads through. Blur is reserved for the console glass (`backdrop-blur`); the hub uses none. Selection color in the console is tinted indigo (`bg-indigo-500/30`).

### Animation
Physics-first and friendly, never gratuitous.
- Hub: **Motion** (motion.dev) springs — header and cards **fade + rise** (`opacity 0→1`, `y 16→0`, ~0.35–0.45s, staggered `0.08s * index`). The tab indicator is a shared-layout pill that **slides** between tabs (`spring`, stiffness 500, damping 35).
- Mascot: **anime.js** path-morphing — the goblin face cycles expressions (neutral → happy → surprised → sad → angry → excited → derpy) on tap, and the eyes **track the pointer**. Respects `prefers-reduced-motion`.
- Console: **react-spring** physics for dice rolls, coin flips, wheel spins; the flame/dice icons gently `animate-pulse`.

### Hover / press states
- Hub buttons: hover = slight **opacity/levels shift** (`primary/90`, `secondary/80`, accent fill on ghost/outline). Focus = a 2px `ring` offset against the background. No scale on press.
- Console tabs/buttons: inactive text **brightens** on hover (zinc-500 → zinc-400); active gains the indigo tint + glow. Outcome badges flash their semantic color.

### Layout rules
Centered, narrow, generous vertical rhythm. The hub column is `max-w-2xl`, padded `px-6 py-16`, stacked with `gap-10`. The console is `max-w-4xl`, centered, with a header / tab-bar / panel / footer vertical stack. Everything is single-column and comfortably whitespaced — nothing is dense.

---

## ICONOGRAPHY

- **Primary icon set: [Lucide](https://lucide.dev) line icons** (the React app imports from `lucide-react`). Thin ~1.5px strokes, rounded joins, no fill. Seen in use: `ShieldCheck` (provably-fair badge), `Activity` (dice slider), `Coins` (coin flip), `Flame` (RNG wheel, tinted rose, pulsing), `Dices` (D20, tinted violet, pulsing), `Trophy` (wins, emerald), `XCircle` (losses, rose), `Percent` (ratio, emerald). Icons are small (`w-3.5`–`w-5`), paired with uppercase labels, and **color-coded to their semantic role**. → Load Lucide from CDN; this is the closest/correct match and matches the source exactly.
- **Mascot art: `assets/gobby.svg`** — a hand-drawn cute goblin bust (cream portrait disc, green skin, teal beanie, brown tunic), viewBox `0 0 2048 2048`. In production an animated face (eyes/brows/mouth, dark-teal `#334E43` stroke) is layered on top via the Chill-Component port; the static SVG is the body. Use it as the brand avatar / favicon / hero.
- **Geometric art: `assets/d20.svg`** — a faceted purple icosahedron (D20) built from violet gradient triangles (`#ddd6fe`→`#8b5cf6`, `#5b21b6` edges). The emblem of the RNG/console world.
- **Emoji:** docs/README decoration only (🎲🪙🎡✨🚀) — never in product UI.
- **No custom icon font, no PNG sprite.** Everything is SVG (Lucide inline SVGs + the two brand SVGs).

> Substitution note: Lucide is linked from CDN rather than bundled — it's the exact set the source uses, so no visual substitution was made.

---

## Index — what's in this system

| File / folder | What it is |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography, index |
| `SKILL.md` | Agent-Skills entry point (for Claude Code) |
| `colors_and_type.css` | All color tokens (base / RNG / Gobby) + semantic type classes + font imports. **Canonical spec** — production mirror: `src/styles/design-tokens.css` (sync via `node scripts/sync-design-tokens.mjs`) |
| `assets/gobby.svg` | Gobby goblin mascot (body; face animated in-app) |
| `assets/d20.svg` | Purple D20 icosahedron emblem |
| `preview/` | Design-system cards (swatches, type specimens, components) shown in the Design System tab |
| `ui_kits/itme-day/` | UI kit recreation of the hub + RNG console (`index.html` + JSX components) |

### Fonts
**Geist** & **Geist Mono** load from **Google Fonts** (free, OFL) via `@import` in `colors_and_type.css` — the system typefaces for both the hub and the console. CDN delivery is fine; no local files needed.

Two **self-hosted fantasy display faces** (user-uploaded, in `fonts/`) give the goblin / D&D world its voice — accent use only, never body or UI chrome:
- **OptimusPrinceps** (`--font-titling` / `.titling`) — an elegant Trajan-like titling serif for regal fantasy headings ("The Goblin's Dungeon").
- **RuneScape UF** (`--font-fantasy` / `.fantasy-display`) — a pixel display face for playful goblin/D&D moments ("You roll a nat 20!").

If you need Geist self-hosted too, pull the WOFF2s from the Google Fonts API or the `geist` npm package.
