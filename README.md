# Panda — landing page

Single-page marketing site for the Panda tree-planting app, built with React 19, Vite and Tailwind CSS v4. Deployed to GitHub Pages at <https://munezerodev.github.io/pandawb/>.

## Scripts

```bash
bun install      # install dependencies
bun run dev      # dev server on http://localhost:5174/pandawb/
bun run build    # production build to dist/
bun run preview  # serve the production build
bun run lint     # ESLint
```

Pushing to `main` builds and deploys via `.github/workflows/deploy.yml`.

## Project structure

```
src/
  App.jsx               page composition (section order)
  index.css             Tailwind entry, theme tokens, base reset, keyframes
  sections/             one file per page section (Hero, About, Features, …)
  components/
    layout/             Navbar, Footer
    ui/                 reusable UI pieces (buttons, cards, tabs, counters)
    media/              video player, gallery, lightbox
    goal-report/        pieces used only by the Goal Report section
  hooks/                useIsMobile, useScrollPast, useCountUp, useHashScroll
  data/                 page content (features, goals, nav, footer, notices)
  constants/links.js    external URLs (APK, video, Google Form)
  utils/                small helpers (Dropbox links, device detection, …)
  assets/images/        images grouped by section
  assets/_unused/       assets not currently used on the page
```

## Editing content

- **Text, features, goals, footer links:** edit the files in `src/data/`.
- **Goal Report photos/videos:** paste Dropbox share links into the `videos` / `images` arrays in `src/data/goals.js`. Empty (`null`) slots show "coming soon" tiles.
- **APK, video and form URLs:** `src/constants/links.js`.

## Styling notes

- Colours, fonts and the spacing scale are defined as Tailwind theme tokens in `src/index.css` (e.g. `bg-brand`, `text-ink`, `font-display`).
- Tailwind's Preflight reset is intentionally **not** loaded. The design relies on browser defaults plus the small reset in `@layer base`.
- The mobile/desktop breakpoint is Tailwind's `md` (768px). `useIsMobile()` uses the same breakpoint for the few places where the markup itself differs between mobile and desktop.
