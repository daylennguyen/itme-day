# itme.day — UI Kit

A high-fidelity, interactive recreation of the **itme.day** hub: the Gobby mascot, a **Home** tab listing project links, and an **RNG** tab housing the neon *RNG Probability Console* with a fully playable **D20 roller**. Built from the source repos (`daylennguyen/itme-day` + `itmedotday/rng-react-components`), not from screenshots.

## Run it
Open `index.html`. No build step — React + Babel + Lucide load from CDN; styles come from `../../colors_and_type.css`.

## What's interactive
- **Tabs** — Home / RNG with a spring-y sliding pill indicator.
- **Mascot** — tap Gobby for a springy bounce + a random mood blurb (cosmetic stand-in for the production anime.js face-morph).
- **Game nav** — switch between Dice / Coin / Wheel / D20, all interactive.
- **Text FX** — a live RuneScape-style text renderer: type a message, pick a colour (incl. rainbow / inverted) and an effect (wave, shake, glow, flash, scroll, slide, mirror…), see it render in RuneScape UF, and copy the `effect:colour:text` chat-code tag. Effects stack (rainbow + wave).
- **D20 roller** — set the Difficulty Class (±), watch the win-chance recompute (`roll ≥ DC`), hit **ROLL D20**: the die shakes, settles on 1–20, and the stat header (wins / losses / ratio / streak) plus the WIN / MISS / NAT 1 / NAT 20 badge update live.

## Files
| File | Role |
|---|---|
| `index.html` | Shell — fonts, CDN scripts, base CSS, mounts `<App>` |
| `Icons.jsx` | `Ico` (Lucide wrapper) + `Reveal` (safe mount fade) |
| `GobbyMascot.jsx` | Tappable goblin avatar with idle bob |
| `HubHome.jsx` | Home tab — eyebrow/title + project link cards |
| `D20Console.jsx` | RNG tab — game nav + interactive D20 console + placeholders |
| `RngGames.jsx` | Coin Flip, Dice Slider, RNG Wheel consoles |
| `TextFX.jsx` | Text FX tab — live colour + effect text renderer |
| `App.jsx` | Hub shell — mascot + Home/RNG tabs + footer |

## Fidelity notes
- Colors, type, radii, the console glow, and copy are lifted from source. The stat headers, controls, tracks, coin faces, and badges mirror the real `rng-react-components` source.
- The Gobby face is animated in production (Chill-Component port); here the static SVG (face baked in) carries the brand with a lighter tap animation.
- Coin Flip, Dice Slider, and RNG Wheel are cosmetic recreations — for production, use the real components from `@itme.day/rng-react-components`.

## Source
- Hub: https://github.com/daylennguyen/itme-day
- RNG components: https://github.com/itmedotday/rng-react-components · Storybook: https://itmedotday.github.io/rng-react-components/
