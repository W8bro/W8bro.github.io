# Design prototype — kept for reference

`variant-c9-guard.astro` is the winning variant from [issue #10](../../../.scratch/cv-website/issues/10-prototype-visual-design.md),
kept as the reference copy of the design that was locked in. The other ten variants
(A, B, D and C/C2–C8) were deleted once C9 was chosen.

**This is not part of the Site.** Nothing outside this directory imports it, so it does not
appear in `astro build` output. The live implementation is
[`src/components/cv-page.astro`](../cv-page.astro), which is C9 promoted properly: semantic
class names, colour tokens moved to `global.css`, optional photography via
`src/data/photos.ts`, links from `src/data/links.ts`, and a `@media print` block for the
PDF the Pipeline generates.

## Where it differs from the shipped page

Read `cv-page.astro` for anything you actually want to change. The reference copy still has
prototype-isms:

- `c9-` class prefix, and ids prefixed `c9-`
- placeholder photography from `picsum.photos` instead of `photos.ts`
- invented Spotify entries in its local `LINKS` array
- no print stylesheet
- a "Download CV" link pointing at `#` rather than `/cv.pdf`

The design decisions themselves — the pinned Bodoni `opsz` values, the nav `z-index`, the
measured container-query threshold on the CTA, the reveal-on-scroll shape — are the same in
both, and are commented in `cv-page.astro`.

## Mounting it, if you want to compare side by side

It takes a `data` prop and renders a whole page, so it needs its own route:

```astro
---
// src/pages/reference.astro — delete when you are done comparing
import { loadCVData } from '../components/prototype/cv-data';
import VariantC9 from '../components/prototype/variant-c9-guard.astro';
import '../styles/global.css';
const data = await loadCVData();
---
<html lang="en"><head><meta charset="utf-8" /></head>
  <body><VariantC9 data={data} /></body>
</html>
```

The webfonts it needs (Bodoni Moda with the `opsz` axis, plus Inter) come with the
`global.css` import in that snippet — they are self-hosted from `public/fonts/` and declared
there. Drop the import and it falls back to system faces, and the typography will not
represent the design.

A route added under `src/pages/` **does** get built and deployed, so remove it afterwards.
