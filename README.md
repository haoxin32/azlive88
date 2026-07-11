# AZLIVE88 — Landing Page

Single-page marketing site for AZLIVE88. React 19 + TypeScript + Vite 8 + Tailwind CSS v4.

## Stack

- **Framework:** React 19, TypeScript, Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), design tokens in `src/styles/globals.css`
- **Icons:** `lucide-react`, imported per-icon (see `src/components/ui/Icon.tsx`)
- **Fonts:** self-hosted, hand-subset `@fontsource-variable/inter` + `@fontsource-variable/orbitron` (see `src/styles/fonts.css`)
- **Lint:** `oxlint`

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run typecheck` | `tsc -b` project-wide type check |
| `npm run lint` | `oxlint` |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Serve the production build locally |

## Content & config

Almost everything that isn't layout lives in `src/config/` and `src/data/` — edit those instead of component code to change copy, links, or data:

- `src/config/site.ts` — site name, URLs (`registerUrl`/`loginUrl`/`siteUrl`), contact, social links, OG image. **Single source of truth** — `index.html` meta, `robots.txt`, `sitemap.xml`, and `site.webmanifest` are all generated from this file at build time by `build-plugins/seoStaticFiles.ts`.
- `src/config/navigation.ts` — header/footer nav
- `src/data/*.ts` — games, stats, benefits, FAQ, testimonials, comparison/service-standards, partners, payments

See `SECURITY.md` and `SECURITY_HEADERS.md` for the security posture and recommended deploy-time headers.

## Placeholder data still to replace before launch

Search `src/config/site.ts` and `src/data/` for values that need real data before this goes live (URLs ending in `.example`, testimonials, demo-labeled content). Nothing fake is presented as verified — see `SECURITY.md` for the policy.
