# Webfonts

The files themselves live in [`public/fonts/`](../public/fonts/).

Self-hosted so the Site has no third-party request at runtime and the PDF the Pipeline
generates renders deterministically. Replaces the `fonts.googleapis.com` `<link>` that
`src/pages/index.astro` used to carry (issue #10).

Both faces are **variable** fonts, and both axes matter:

| File | Axes | Used by |
| --- | --- | --- |
| `bodoni-moda-*.woff2` | `wght` 400–900, `opsz` 6–96 | display type in [`cv-page.astro`](../src/components/cv-page.astro), which pins `opsz` per rule |
| `inter-*.woff2` | `wght` 100–900 | body text |

The `opsz` axis is load-bearing: [`cv-page.astro`](../src/components/cv-page.astro) sets `font-variation-settings: "opsz" N`
on every Bodoni rule. Replacing these with static weight instances silently breaks that —
the rules keep parsing, the typography just reverts to one optical cut.

`-latin` covers ASCII and Latin-1 (including å ä ö); `-latin-ext` covers the rest of
Latin Extended-A/B. The `@font-face` rules in [`src/styles/global.css`](../src/styles/global.css) gate each with
`unicode-range`, so a visitor only downloads the subset their text needs.

## Provenance and updating

Taken from Google Fonts' own `woff2` builds — Bodoni Moda v28, Inter v20 — via the
`css2` API with a modern browser User-Agent (that header decides whether you are served
`woff2` or legacy `ttf`), requesting the weight as a *range* so each subset is one
variable file rather than one file per weight:

```
https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400..700&family=Inter:wght@200..500&display=swap
```

The cyrillic, greek, vietnamese, math and symbol subsets that URL also offers were not
downloaded. To refresh, re-fetch that CSS, take the `latin` and `latin-ext` `src` URLs, and
confirm the axes survived before committing — Google's subsetter can drop them:

```sh
npm run check:fonts    # reads each file's fvar table (run manually)
```

Licensed under the SIL Open Font License 1.1 (`OFL-*.txt`), which permits redistribution
in this form; keep those files alongside the fonts.

## Two things that fail silently

Both are asserted by `npm run verify:fonts`, which renders the built `dist/` in Chromium.
Run it after `astro build`.

**Static instances instead of variable files.** If a future refresh of `public/fonts/`
brings static weight cuts, every `font-variation-settings: "opsz" N` in
[`cv-page.astro`](../src/components/cv-page.astro) keeps parsing and silently does nothing.
Nothing errors; the display type just loses its optical sizing. `check:fonts` guards this by
reading the `fvar` table, and `verify:fonts` proves the axis actually moves by measuring the
same string at `opsz` 8 and 96.

**A preload without `crossorigin`.** The preloads in
[`src/pages/index.astro`](../src/pages/index.astro) *must* carry `crossorigin`, even though
the fonts are same-origin: the CSS Font Loading spec fetches every `@font-face` `src` in
CORS mode, so a non-CORS preload is a different request and the browser downloads each font
twice. This is the reverse of the rule for the stylesheet `<link>` the Site used to have,
where `crossorigin` would have been wrong — which is what makes it easy to get backwards.
`verify:fonts` fails if any font is fetched more than once.
