# Gobby mascot (Chill Component port)

Animated face overlay for `/gobby.svg`, ported from [Chill Component](https://chillcomponent.codlin.me/en/components/util-cat-face/) (MIT) via dnd5e login.

## File map

| File | Role |
|---|---|
| `gobby-mascot.tsx` | Public entry — static body + dynamic face overlay (inline face position) |
| `chill-util-cat-face.tsx` | Stacked SVG hosts + anime.js wrapper motion |
| `chill-face-layer-runners.ts` | Auto-generated brow/eye/mouth path morph runners |
| `chill-cat-face-utils.ts` | Keyframe extraction from hidden `<defs>` (remeda) |
| `chill-face-static-markup.ts` | SVG path templates |
| `chill-eye-view-box.ts` | Eye gaze viewBox math |
| `chill-map-number.ts` | Numeric helpers |
| `use-prefers-reduced-motion.ts` | Disables viewport eye tracking when reduced motion |

## Stack

- **anime.js** — path morphing and expression loops (`chill-face-layer-runners.ts`)
- **remeda** — keyframe list utilities (`chill-cat-face-utils.ts`)
- **Motion** (elsewhere in app) — homepage header/card fades only, not this folder

dnd5e login also has `login-gobby-stack.tsx` (grid + `gobbySmiley` on form hover). itme-day uses `GobbyMascot` directly on the homepage unless you add a login route.

## Sync from dnd5e

```bash
npm run sync:gobby
npm test
```

Copies everything under `dnd5e/apps/web/src/app/login/` listed above plus `public/gobby.svg`.

To refresh generated runners upstream:

```bash
# in dnd5e repo
node apps/web/scripts/chill-generate-animate.mjs
# then in itme-day
npm run sync:gobby
```

## Usage

```tsx
import { GobbyMascot } from "@/components/gobby/gobby-mascot";

<GobbyMascot className="mx-auto" />
<GobbyMascot smiley /> // closed-eye pleasant (login hover pattern)
```

One mascot per page — animations query the DOM by SVG id.

## Upstream chain

Chill Component (MIT) → dnd5e login → itme-day `src/components/gobby/`
