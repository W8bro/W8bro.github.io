Title: Optimise the Site's imagery (WebP/AVIF + correct dimensions)
Type: task
Status: open

## Question

The Site now ships two photographs (#10, variant C9): a full-bleed hero and the split
experience band. Both were dropped into `public/` as the full-resolution Unsplash originals,
and Astro serves `public/` byte-for-byte with no processing. Move them to a modern format
and a sensible size.

## Measured baseline

| file | size | dimensions |
|---|---|---|
| `public/photos/rene-reichelt-Mountain.jpg` (hero) | 1751 KB | 3000×2000 |
| `public/photos/sebastien-marchand-LongRoad.jpg` (split) | 2151 KB | 3069×2048 |
| **page image payload** | **3902 KB** | |
| `dist/cv.pdf` | 4294 KB | 8 pages |

For reference, the #10 prototype requested these frames at **1900×1200** and **1400×1600**
and looked correct, so the extra pixels currently buy nothing.

## What the measurement actually says — the ticket title is only half right

Re-encoded with sharp at the dimensions the design displays:

| variant | hero | split | combined |
|---|---|---|---|
| original JPEG | 1751 KB | 2151 KB | 3902 KB |
| mozjpeg q82, resized | 417 KB | 293 KB | **710 KB** |
| WebP q80, resized | 443 KB | 320 KB | 763 KB |
| WebP q80 greyscale, resized | 429 KB | 302 KB | 731 KB |
| AVIF q55 greyscale, resized | 263 KB | 177 KB | **440 KB** |

Three things fall out of that:

1. **Almost all of the win is the resize, not the format.** Going from the 3000px originals
   to the ~1900px the design uses is roughly an 80% saving on its own.
2. **WebP is not a win over JPEG here.** At matched dimensions, WebP q80 came out *slightly
   larger* than mozjpeg q82 (763 KB vs 710 KB). Quality scales are not comparable across
   formats so treat this as indicative rather than exact, but "convert to WebP" is clearly
   not where the bytes are. Photographic content with fine noise — snow, gravel, pine
   needles — is close to WebP's weak spot.
3. **AVIF is the actual format win**, at roughly 60% of WebP for these two frames.

There is also a quirk specific to this design: `.cv-photo img` is composited with
`mix-blend-mode: luminosity`, so **the browser discards the source colour entirely** and
only luminance survives. Chroma artefacts are therefore invisible by construction, which
means quality can be pushed harder than a normal photo budget would allow. Greyscale
sources save less than expected (WebP already codes near-neutral chroma cheaply), so the
value here is licence to lower quality, not to strip colour.

## Options

**A. Pre-process by hand, keep files in `public/`.** Run sharp/squoosh once, commit the
results, update the two paths in `src/data/photos.ts`. No code change beyond strings.
Cheapest, and it fixes the dimensions — which is most of the problem. Downside: manual step
repeated for every future image, and no automatic format negotiation, so picking AVIF means
either accepting no fallback or hand-writing a `<picture>`.

**B. Move to `src/assets/` and use `astro:assets` (recommended).** Astro resizes, converts
and hashes at build time, and emits `<picture>` with AVIF/WebP plus a fallback when asked.
It is the reason `sharp` is already in the tree. This is the approach that keeps paying off
when the real photography lands.

**C. Do nothing.** Defensible only briefly — see sequencing below.

## Code impact of option B

- `src/data/photos.ts` currently types `src: string | null`. Under `astro:assets` the value
  becomes an `ImageMetadata` from a static import (`import hero from '../assets/hero.jpg'`),
  so the `Photo` interface changes shape. The `src: null` fallback path — which renders the
  graded ground alone and must keep working — needs to stay expressible.
- `cv-page.astro` renders a plain `<img>`; it becomes `<Image>` (or `getImage()` if a
  `<picture>` is wanted). **The `mix-blend-mode: luminosity` duotone must survive**: the
  selector is `.cv-photo img`, and `<Image>` does render an `<img>`, so it should — verify
  it visually, because losing the blend silently reverts the whole earth/gold grade.
- Keep `loading="eager"` on the hero and `lazy` on the split; `<Image>` defaults to lazy.
- Sizing: the hero is full-bleed and the split panel is roughly 970×820 CSS px at a 1440
  viewport. ~1900px wide covers 2× on the hero; the prototype's 1400px was enough for the
  split.

## PDF considerations

`scripts/generate-pdf.ts` prints the page through Chromium, so the images are embedded at
whatever resolution is served — which is why `cv.pdf` is currently 4.2 MB. Shrinking the
sources shrinks the PDF.

Do not over-shrink for print, though: A4 is ~8.27in wide, so a 1900px-wide hero is about
230 dpi across the page — fine. Dropping below ~1200px would start to look soft in print
while saving little. Chromium supports AVIF, so format choice does not break the PDF.

## Acceptance criteria

- Page image payload under ~600 KB (from 3902 KB).
- `cv.pdf` comfortably under 1.5 MB (from 4294 KB).
- The duotone still renders — the hero must not appear in raw colour.
- `npm run check` and `npm run build` clean; the PDF step still passes its
  no-hidden-text assertion.
- `photos.ts` still supports "no photo set", falling back to the graded ground.

## Sequencing note

Both current images are **placeholders**: Unsplash frames standing in until real
photography exists (#10, still open — the hero wants a frame that is dark on the left,
where the rotated wordmark sits). Optimising placeholders is arguably wasted effort, but the
*mechanism* is not: whatever is built here applies unchanged to the real photographs, and
the current 3.9 MB would otherwise ship to the live Site in the meantime. Doing option B now
means the real photos need no manual preparation later.

## Answer

_Not yet decided._
