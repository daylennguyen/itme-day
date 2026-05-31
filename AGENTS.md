## Learned User Preferences

- Gobby mascot source of truth is dnd5e login (`../dnd5e/apps/web/src/app/login`); sync with `npm run sync:gobby`.
- Git commits in this repo should use `19427299+daylennguyen@users.noreply.github.com` (local git config overrides global GoDaddy email).
- Production hub UI follows the redesign mock (`docs/itme.day Design System/redesign/`), not the README-only "Projects" copy pattern.
- App shell uses three tabs: Home, RNG, and Text FX, with a sliding Motion tab indicator.
- RNG tab demos should match each component's Default Storybook story props from `@itme.day/rng-react-components`.

## Learned Workspace Facts

- Next.js personal project hub for Daylen Nguyen; production at `https://itme.day/` (Vercel project `itme-day`).
- Design system defines two visual worlds (hub vs RNG console) in `docs/itme.day Design System/`; production tokens live in `src/styles/design-tokens.css`.
- Gobby face stack uses anime.js + remeda in `src/components/gobby/` (ported from dnd5e login, not Motion/Flubber).
- `@itme.day/rng-react-components` ships Tailwind v4 CSS; copy to `public/rng-react-components.css` via `scripts/copy-rng-styles.mjs` (unwraps `@layer` for the v3 host).
- App loads dual Tailwind stacks (v3 globals + v4 RNG bundle); Gobby face overlay uses inline `transform: translate(-50%, -50%)` instead of `-translate-x/y-1/2` classes.
- Motion is used for page UI (tabs, cards, hero); Gobby path morphing stays on anime.js.
