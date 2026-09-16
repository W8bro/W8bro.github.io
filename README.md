# Tom Andersson — CV site

[![CI](https://github.com/W8bro/W8bro.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/W8bro/W8bro.github.io/actions/workflows/deploy.yml)

A single-page CV site, statically generated and deployed to GitHub Pages on every push to
`main`. The same build also renders the printable version.

**[Read it →](https://w8bro.github.io)**  ·  **[Download the PDF →](https://w8bro.github.io/cv.pdf)**

Built by hand rather than from a template — the SSG choice, the deploy pipeline and the PDF
generation were each researched and decided deliberately, and the reasoning is kept in the
[design record](.scratch/cv-website/map.md).

## Stack

Astro 7 · TypeScript · Tailwind CSS 4 · Playwright · GitHub Actions → GitHub Pages

## Decisions worth knowing

- **The CV is data, not markup.** Every role, project and publication is a YAML file in a
  typed content collection, validated at build time — a malformed entry fails the build
  rather than rendering wrong. See [`src/content.config.ts`](src/content.config.ts).
- **The PDF is the site.** [`scripts/generate-pdf.ts`](scripts/generate-pdf.ts) drives the
  built page in headless Chromium and prints it, so the PDF can never drift from the web
  version. It switches to the full project list and asserts nothing is left invisible
  before printing.
- **Webfonts are self-hosted and variable.** Two faces, subset by `unicode-range`, with
  Bodoni's optical-size axis pinned per rule — so the display type is optically correct at
  every size instead of one cut scaled up. No third-party request at runtime. See
  [`src/styles/global.css`](src/styles/global.css).
- **The narrow-panel layout uses a container query**, not a viewport media query: the panel
  is a fraction of the viewport on desktop but full width on mobile, so its own width is the
  only thing worth measuring. See [`src/styles/cv-page.css`](src/styles/cv-page.css).
- **Motion is progressive enhancement.** Reveal-on-scroll and the philosophy carousel are
  layered onto markup that reads correctly without them — which is what the PDF pipeline and
  reduced-motion visitors get. See [`src/scripts/cv-page.ts`](src/scripts/cv-page.ts).

## Layout

```
src/content/        CV data — YAML, one file per role / project / publication
src/data/           Static content: about, skills, links, photos, philosophy
src/components/     The page
src/pages/          Routes
src/scripts/        Client-side behaviour
src/styles/         Global tokens and page styles
public/             Fonts, favicons
scripts/            Build-time tooling (PDF generation)
.github/workflows/  The Pipeline
.scratch/           Design record — how each decision was reached
```

## Development

Requires Node 22.12+.

```sh
npm install
npm run dev          # local dev server
npm run build        # production build to dist/
npm run preview      # serve the build
```

Quality gates:

```sh
npm run check        # astro check — types across .astro and .ts
npm run format:check # prettier
npm run lint:css     # stylelint
npm run lint:ts      # eslint
```

The Pipeline runs `check` and `build`, then generates the PDF against the built site. The
formatting and lint gates are run locally, not in CI.

## Reference

- [CONTEXT.md](CONTEXT.md) — the project's vocabulary, so the same thing is called the same
  thing everywhere
- [Design record](.scratch/cv-website/map.md) — the numbered decisions behind the build,
  written as they were made and kept as a historical record

## Reuse

The code is here to read and learn from. The CV content — the text, the employment history,
the photography — is mine, and not licensed for reuse.
