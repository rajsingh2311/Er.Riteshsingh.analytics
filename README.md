# Ritesh Analytics Portfolio

Personal portfolio of **Er. Ritesh Singh**, Data Analyst & Business Analyst in Noida.

**Live site:** https://riteshsingh.is-a.dev

Built with React + TypeScript + Vite, styled with Tailwind CSS + shadcn/ui, with interactive Three.js 3D scenes.

## Features

- Hero with a 3D analyst-at-desk scene (live Power BI-style dashboard, analyst point-of-view camera)
- Sections: About, Capabilities, Experience, Education, Certifications, Projects, Skills, Contact
- 3D scene in every section, with HD zoom (buttons, double-click, Ctrl/Shift + scroll, or click then scroll)
- Readable text everywhere: titles sit above and controls below each 3D area, never on top of the model
- Auto-fit 3D camera, so models are never cut off on any screen size
- Lighter 3D rendering on phones; 3D is skipped for visitors with "reduce motion" turned on
- Resume preview and download, contact form, light/dark theme

## Tech stack

React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, React Router (HashRouter), Three.js.

## Run locally

```bash
npm install
```

```bash
npm run dev
```

Build for production (output in `dist/`):

```bash
npm run build
```

```bash
npm run test
```

## Deployment

Deployment is automatic. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch, served by GitHub Pages at **riteshsingh.is-a.dev** (custom domain from [is-a.dev](https://is-a.dev)).

- Do not run `npm run deploy` and do not edit `gh-pages` by hand.
- Pushes to `3d-update` build a preview to the `preview-3d` branch without touching the live site.
- The workflow refuses to publish if any SEO or domain file below is missing.
- `backup-2026-11-21` is a snapshot of the live code for rollback.

## Protected files (do not remove or rename)

| File | Purpose |
|---|---|
| `public/CNAME` (`riteshsingh.is-a.dev`) | Custom domain |
| `index.html` `<head>` | Title, description, canonical URL, Open Graph/Twitter tags, Person + WebSite JSON-LD, favicon links |
| `index.html` `#root` | `.boot-loader` loading screen and `.seo-snap` readable copy for search engines |
| `public/robots.txt`, `public/sitemap.xml` | Search engine crawling |
| `public/a22aab7b988a3783ebbf5359398b95ea.txt` | Bing IndexNow key |
| `public/google5e0b10acc3991084.html`, `google5e0b10acc3991084.html` | Google Search Console verification |
| `public/favicon.ico`, `favicon.svg`, `favicon-48x48.png`, `favicon-192x192.png`, `apple-touch-icon.png` | Site icon in browsers and search results |
| `.github/workflows/deploy.yml` | Build and publish |
| `vite.config.ts` (`base: "./"`) and `HashRouter` | Routing on GitHub Pages |

## Editing in Google AI Studio

The project is also linked to Google AI Studio (Settings → GitHub). AI Studio does **not** pull changes made directly on GitHub, so sync it before pushing from AI Studio, or it may overwrite newer GitHub changes.

## Project structure

- `src/components` – section and UI components
- `src/components/three` – Three.js 3D scenes (hero workspace, section stages, tech-stack arena)
- `src/pages` – route-level pages
- `src/hooks` – shared hooks (e.g. `useShouldRender3D`)
- `public/` – static files served as-is (everything here is publicly downloadable)

## License

This repository is for personal portfolio use.
