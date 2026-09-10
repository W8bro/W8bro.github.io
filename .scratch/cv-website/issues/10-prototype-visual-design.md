Title: Prototype the Site's visual design language
Type: prototype
Status: resolved — **C9 won and is now the Site.** Folded into `cv-page.astro`,
`global.css` and `scripts/generate-pdf.ts`. The prototype directory is still on disk but no
longer referenced by any page; capturing it to a throwaway branch and deleting it from main
is the one remaining step, and it needs Tom (no commits were made).

## Question

#08 settled the Site's *structure* (full-width alternating blocks, dot-nav, tabbed
"Cherry picks"/"All projects") and left typography and dark/light mode in the "Not yet
specified" list. This ticket raises the fidelity of that remaining fog: what should the
Site actually *look* like?

Four variants, each committing hard to **one** idiom drawn from Tom's curated design
collection (`../PixelStash/DESIGN-LANGUAGE.md`), rendered on the existing `/` route
against the real CV data — all 23 projects, 5 positions, 3 publications, 6 skill
categories. Structure from #08 is preserved in every variant; only the design language
changes.

## How to look at it

```
astro dev --background     # then open the URL it prints (4321, or the next
                           # free port if PixelStash's dev server has it)
```

Flip variants with the floating bottom bar, the `←`/`→` arrow keys, or `?variant=`.
The cycle order is `c9, c8, c7, c6, c5, c, c2, c3, c4, a, b, d` and it defaults to `c9`; the order and the
per-variant page ground both come from `VARIANTS` in `prototype/cv-data.ts`, which is the
only place to edit when adding one. The bar is deliberately high-contrast so it never reads as part of
the design being judged.

Dev-only: `index.astro` reaches the prototype through a dynamic import guarded by
`import.meta.env.DEV`, so Vite drops the whole subtree — four variants, their styles and
the webfont links — from `astro build`. Verified: `dist/` is one page and one stylesheet,
with no prototype markers, so the Pipeline still ships exactly the Site it shipped before.
`astro check` passes with 0 errors.

## The four variants

Each is annotated at the top of its file with the Images it was built from and the
measurement that justifies each choice.

| | Idiom | Layout system | Colour | Voice |
|---|---|---|---|---|
| **A** | swiss-technical | `exposed-grid` | **none** | Anton / Inter / JetBrains Mono |
| **B** | dark-cinematic | `full-bleed-single-image` | `#d866e6` on `#181a3b` | Outfit |
| **C** | photographic-editorial | full-bleed photo → bands, one split | salmon-terracotta `#c56a4c` | Bodoni Moda / Inter |
| **D** | illustrated-world | banded + card-carousel | `#e7553d` on `#0e1145` | Poppins |

- **A — exposed grid.** `natura-architecture-studio` + `atelier-meridien-gallery`. Cream
  page plane on a near-black surround, with the hairline column grid left visible and
  running past the plane onto the surround; a monumental compressed wordmark; a numbered
  mono index in place of a dot-nav; one cell deliberately overhanging the page frame.
  Projects are a ruled index, not cards. **No accent colour at all** — both references
  measure under 1% chromatic, which is the collection's "eleven of thirty carry no
  Accent" case taken literally.
- **B — prism.** `fancy-prism-hero` + `privee-creator-token`. Near-black, one CSS prism
  refracting a spectrum, the whole viewport ringed by the prism's own glow bezel. Headline
  at poster scale in a light weight, pushed low into a genuinely dark bottom third under
  wide-tracked all-caps micro-nav. Skills become Privée's frosted-glass widget of stacked
  labelled rows on an inset card, with an orange-to-magenta sun disc bleeding past the
  card edge.
- **C — poster margin.** `nature-conservation-hero-01` + `wooden-cabin-booking`. One
  full-bleed photograph; the wordmark set enormous in salmon-terracotta and rotated ninety
  degrees to climb the whole left edge; a narrow hairline-divided right rail. Experience is
  Wooden's split band — photograph left carrying a huge tight-tracked light headline,
  charcoal stepper panel right, frosted-glass chips, a hard white square button, and one
  photo masked into a tilted organic blob that breaks the strict rounded-rect grid.
- **D — KRAI.** `gravity-krai-kamchatka`. Deep indigo carrying one continuous
  gradient-illustrated world (hand-authored inline SVG: sunset-lit volcanic cones, still
  lake with reflection, pines — no photography, which is the reference's own imagery tag).
  Oversized bold wordmark with a gold asterisk low in the hero, numbered section labels on
  hairline rules, and a three-up carousel whose active card scales up, each card carrying
  its own small icon scene (robot arm, furnace, waveform).

## Two deliberate departures from the collection's dominant habits

The design language says to build as stacked bands or one full-bleed image, and to reach
for a split or a card grid only with a reason. Both departures here are carried by the
named reference itself:

- **A uses `exposed-grid`** (4 designs of 30) because that visible grid *is* Natura.
- **D uses `card-carousel`** — the lowest value in any vocabulary in the corpus, 2 designs
  of 30 — because Gravity is one of those two. No other variant is allowed cards.

## Open question for Tom: the #08 palette

#08 locked a Tom-supplied palette (`#5F5449` warm brown, `#9B6A6C` dusty rose, `#B09398`
rose-mauve, `#CEDFD9` pale sage) and that is what `src/styles/global.css` currently
carries. **None of these four variants uses it**, because the taste file governs colour
where it speaks, and it says to pick one signal and commit or use none — the collection's
own commitments are `#e7553d`, `#d72b2b`, `#fed302`, saturated where they land.

Worth noting: `#9B6A6C` and variant C's salmon-terracotta are the same neighbourhood, just
at different commitment. **C is the variant Tom's own palette already points at**, with
the accent pushed harder and the pale sage dropped. If Tom wants the #08 palette kept, C is
the cheapest reconciliation; A is the other easy one, since it has no accent to argue with.

`#CEDFD9` pale sage is the one colour with no support in the collection at all — cyan is 0
of 30 designs and green is 1, and that one is a food subject.

## Placeholder imagery (variant C only)

No photographs exist in this repo — #08's "extract the headshot from the consulting CV PDF"
is still open. C pulls four deterministic **grayscale** frames from picsum and duotones them
in CSS into the earth/gold range the collection actually photographs in. The *grade* is
therefore real even though the subjects are not; swap the `PHOTO` constant at the top of
`variant-c-editorial.astro` for real assets. If C wins, the headshot to-do becomes a
blocker and wants industrial photography (mills, robot cells, furnaces) rather than a
portrait, since the hero is a full-bleed frame.

A and B need no photography at all. D needs none by definition — its world is vector.

## Round 2 — Tom picked C, so three siblings of C

Tom chose **C** (photographic-editorial) and asked for three more built on it, varying the
imagery and the typefaces and playing with concepts like D's assignment carousel.

The important finding: **`discover-nature-tours` is photographic-editorial AND carries
`card-carousel`.** So the carousel is already attested inside C's own idiom and did not
have to be imported from Gravity — which matters, because the design language records that
`photographic-editorial` never meets `illustrated-world` in any Reference. Blending D into
C would have been the one Style pair the collection never makes. C2 needs no blend at all.

Every sibling is anchored in a real photographic-editorial Reference rather than invented
variation, and each uses typefaces no other variant here uses:

| | Reference | Structure | Colour | Voice |
|---|---|---|---|---|
| **C2** Discover | `discover-nature-tours` | full-bleed → white commerce surface → card carousel | olive `#575826` | Playfair Display / DM Sans |
| **C3** Slider | `b-slider-spring` + `b-slider-winter` | full-bleed slider, one slide per domain | **none** | Cormorant Garamond / Parisienne / Inter |
| **C4** Stock | `poveda-bali-travel` + `makalu-expedition` | banded sections as coloured paper stock | blue `#3979c7` | Jost / Marcellus |

- **C2 — assignment carousel.** The didone wordmark pushed to full bleed and cropped by
  both edges, with the photograph revealed from the ridge down so the landscape cuts
  through the letterforms. Picture-in-picture panel, slide pagination, scroll pictogram.
  Then Discover's abrupt drop into a white commerce surface: inline Client/Years/Domain
  filters with a round dark search button, then a row of rounded assignment cards
  overflowing off the right edge — each with a domain badge, a year chip, a clamped
  description and "Read more →". The Cherry-picks/All toggle swaps which rail is on rails.
  **Imagery is colour here, not C's duotone**: Discover measures 24.7% chromatic, the most
  colourful design in the family.
- **C3 — double-exposure slider.** The corpus holds this design *twice*, and the design
  language reads the pair as "the template revealing itself across two captures" — a twin
  "with only the season, the photograph and the word swapped". So the slider is the whole
  concept, and the corpus itself shows how it varies. Here the swapped word is a **domain**:
  STEEL, RESEARCH, POWER, ROBOTICS, LIFE SCIENCE, SECURE. Figure and canopy are multiplied
  over the page's own white so the photograph has no frame and its blown-out background is
  the negative space. Script accent over wide-tracked serif capitals, ornamental arrow rule.
  **The slide counts and client lists are derived from the real client names**, and an
  unmatched-assignment warning renders in the page if any project matches no domain, so the
  numbers cannot silently drift from the CV data.
  Colour: **none** — these two frames measure 1.1% and 1.7% chromatic, the most achromatic
  photographic work in the collection. This is deliberately the cold opposite of C, so the
  choice is a real one rather than three warm variants. `script-accent` reaches only 3
  designs in the whole corpus and these are 2 of them.
- **C4 — coloured paper stock.** Answers C's full-bleed hero with the family's *other*
  structural habit: `banded-sections`, the collection's leading layout system at 11 designs.
  Poveda's stack of coloured stock (five grounds, closing on a dark one), its centred
  three-up photo cards with outlined pill buttons, and its tall shot split against a text
  column. Makalu supplies the giant V-shaped notches cutting the photographs into peak
  silhouettes, the Roman numeral badges in diamond holders, the hexagon chips, and the
  diamond ornament rail down the right margin as a scroll indicator (wired to an
  IntersectionObserver).
  Colour: `#3979c7`, measured off Makalu — the single cool-accented design in the whole
  photographic-editorial family. Warm leads cool 16 designs to 7, so one cool sibling of
  four is close to the corpus' own proportion, and it gives real palette range.
  The paper stocks are kept as eucalyptus **greys** and warm oatmeal, not sage greens:
  Poveda measures only 3.7% chromatic and green is 1 design of 30.

### Where the siblings disagree, which is the point

- **Colour**: C commits to terracotta, C2 to olive, C4 to a cool blue, C3 to nothing at all.
  Two of the four therefore sit near the #08 palette's dusty rose, and two do not.
- **Imagery**: C duotones to earth, C2 runs colour, C3 double-exposes to near-white, C4
  hazes and cools. Any of them would want different photography commissioned.
- **Structure**: C and C2 open full-bleed; C3 makes the hero a slider; C4 abandons the
  full-bleed hero for banded stock.
- **The assignment list** is a ruled editorial list in C, a card carousel in C2, a quiet
  serif index in C3, and a hexagon-chipped record under a three-up in C4.

## Round 3 — C5, variant C revised

Tom picked **the original C** over its three siblings, with four specific notes. C5 is C
with exactly those four changes and nothing else; **C is deliberately left untouched
beside it** so the two can be compared directly.

1. **"ANDERSSON" was hard to read.** The cause was not size — it was the typeface's own
   optical-size axis. Bodoni Moda is a didone, so at display sizes its `opsz` axis picks a
   high-contrast design whose hairlines nearly vanish, and rotating the wordmark ninety
   degrees puts those hairlines across the reader's eye at the worst angle. Fixed by
   `font-weight: 700` **and** by pinning `font-variation-settings: "opsz" 14`, which makes
   Bodoni render its sturdier *text* design at display size. Same typeface, as asked —
   just its heavier, lower-contrast cut.
2. **The section headings** (Selected work / Capability / Education / Published) get the
   same treatment at `wght 700 / opsz 18`, and assignment titles (`500 / opsz 18`), the
   terracotta year numerals and the skills categories (`600 / opsz 16`) come up with them.
   Side-by-side crops of "Selected work" in C and C5 are the clearest evidence this was a
   weight problem and not a size one.
3. **Contrast, which Tom did not name but which was half the problem.** The reference gets
   its legibility from a dark jungle behind the salmon wordmark; the placeholder frame here
   is a pale sunlit mountain, so the terracotta washed out no matter how heavy it was. The
   poster margin now carries its own left-edge scrim — the same "warmly graded and faded so
   overlaid text stays legible" move the reference already uses, applied where it is needed.
   With real photography chosen for a dark left edge, this scrim could be dialled back.
4. **The role stepper is gone.** All five positions are listed in the charcoal panel with
   hairline dividers and a count in the corner, instead of one at a time behind ← →
   buttons. This is straightforwardly better for a CV: the old panel hid four of five jobs
   behind an interaction nobody would discover.
5. **The tilted organic blob is gone**, so the panel is now a strict rounded-rectangle grid.
   Worth flagging: that blob was the one element the Wooden reference used to break its own
   grid on purpose. Removing it makes the interface more uniform and quieter than the
   reference is — a defensible choice, but it is a step away from the evidence rather than
   toward it, and it is the one change here that costs something.

Verified in the DOM rather than by eye: C5 renders 5 roles with none hidden, 0 blobs, 0
stepper buttons; C still has its 1 blob and 1 arrow pair, so the comparison is intact.

## Round 4 — C6, C5 revised again

Tom's notes on C5: the dark left fade was unwelcome and was blocking the top-left nav
links, the video thumbnail above "Download CV" should go, and the assignment text was
*still* hard to read though the typeface was right. C6 is C5 with those three changes;
C5 and C are both kept beside it.

1. **The left-edge scrim is gone.** Legibility is recovered the way the reference actually
   gets it rather than by covering the layout: `nature-conservation-hero-01` sets a *light*
   salmon wordmark on a *dark* warm-graded jungle, so C6 grades the whole hero frame evenly
   deeper and moves the wordmark to a lighter salmon (`--terra-lift`). No band down one
   edge, nothing over the navigation, and it is closer to the evidence than the scrim was.

2. **A real interaction bug, not just a visual one.** Tom said the fade "blocks the links up
   in the top left" — it did, and removing the gradient would only have hidden the symptom.
   `.c*-margin` is a full-height column that comes *after* the nav in the DOM at the same
   `z-index: 2`, so it was winning the paint order and swallowing clicks. Measured with
   `elementFromPoint` on each nav link:

   | variant | Tom | Experience | Projects | Skills |
   |---|---|---|---|---|
   | C (original) | **dead** | ok | ok | ok |
   | C5 | **dead** | **dead** | **dead** | **dead** |
   | C6 | ok | ok | ok | ok |

   So the bug was latent in C from the start — the margin column only overlapped the first
   link there — and C5's wider scrim spread it across all four. Fixed in C6 by lifting the
   nav to `z-index: 4` and marking the poster margin `pointer-events: none`, since nothing
   in it is interactive. **Whichever variant wins, carry this fix across**; C and C5 still
   have it.

3. **The video thumbnail is gone** from the right-hand rail, which is now bio, stats,
   ghost button. Worth flagging: that thumbnail *is* in the reference — "a small video
   thumbnail and a ghost button" — so the rail is one element short of what Nature does. It
   also pointed at nothing real, which is probably why it read as clutter rather than as
   content.

4. **The assignment list, properly this time.** C5 raised the weight to 500 and that was not
   enough, because weight was not the whole problem: Bodoni Moda's `opsz` axis was still set
   for display use, keeping the extreme thin/thick contrast that makes a didone tiring in a
   23-item list. C6 pins the list titles to **`opsz` 8 — the text extreme of the axis** — at
   `wght` 600. That flattens the stroke contrast and opens the letterforms while remaining
   the same typeface, which is the lever that actually mattered. The muted client and tag
   lines were also sitting at 45–60% ink; they are lifted to 62–80%, and the year numerals
   go to a deeper terracotta.

   The general lesson for implementation: **this design leans on a variable font's optical-
   size axis, not just its weight.** Section headings want `opsz` ~18 for display drama;
   body-scale lists want `opsz` ~8 for reading. Any hand-off that drops the
   `font-variation-settings` will silently look like C again.

## Round 5 — C7, expected to be the last

Two notes from Tom, both applied:

1. **The Capability category labels** (Programming, Software & Tools, Frameworks &
   Architecture, Communication Protocols, Domain, Languages) are now `wght 700` with the
   `opsz` axis pinned to **8**. Same fix as the assignment list in round 4, for the same
   reason: these labels sit at body scale, so Bodoni's display cut was wrong for them.
2. **A new "Elsewhere" band**, placed after Education and Published and added to the hero
   nav. It reuses the assignment-row idiom — platform label in terracotta where the year
   normally sits, heavy Bodoni title, a one-line note, `↗` at the right — so it reads as
   native rather than bolted on.

Verified structurally rather than by eye: section order is about → experience → projects →
skills → papers → **elsewhere**, four link rows resolve to `open.spotify.com` ×2,
`github.com` and `www.diva-portal.org`, and all five nav links are hit-testable at scroll
top (the round-4 z-index fix still holds with the extra item).

### The link data is placeholder, and it needs a home

The four entries are invented titles on real domains — Tom supplies the actual links. Two
things to decide when this is folded in:

- **Where the data lives.** It is defined locally in the variant file only so the prototype
  does not touch `content.config.ts`. Properly it should be `src/data/links.ts` (matching
  the #09 decision that singletons live there) or a `links` content collection if the list
  is going to grow and want per-entry files.
- **Whether it reopens #01.** That ticket decided the Site exposes no contact info. Public
  profile links are not quite contact details, but this band moves in that direction, so
  it is worth a deliberate call about which platforms belong there.

## Round 6 — C8

1. **Text fades in as each section enters view.** Built as progressive enhancement rather
   than a plain scroll animation: the hiding rule is scoped to `.reveal-ready`, a class only
   the script adds, so with JS off or broken every word is still on the page. The rise uses
   the independent `translate` property, **not** `transform` — the rotated wordmark already
   owns `transform: rotate(180deg)`, and animating transform would have flattened it.
   Elements are marked in JS by selector rather than in the markup, so the diff against C7
   is small. Staggered by position among revealing siblings, capped at 330ms so the 23-row
   list does not crawl. Revealed once and then unobserved, so scrolling back up does not
   re-hide anything. `prefers-reduced-motion: reduce` disables the whole effect.
   Rows inside a tab panel that was `display: none` never intersect, so the tab handler
   reveals them on switch — otherwise "All 23" would have opened to a blank list.
2. **Education added to the nav**, between Skills and Elsewhere, pointing at the
   Education/Published band (Education is its left column, so the anchor lands on it).
   Nav is now Tom · Experience · Projects · Skills · Education · Elsewhere.
3. **"See work" softened.** It was a hard white slab against frosted-glass chips; it now
   uses the same frosted treatment, kept distinct by a brighter hairline and a terracotta
   arrow that nudges right on hover.

Measured rather than eyeballed — 64 elements marked for reveal, and:

| check | result |
|---|---|
| far row before scroll | `opacity: 0` (hidden) |
| far row after scrolling into view | `opacity: 0.98` (revealed) |
| rotated wordmark transform during reveal | `matrix(-1, 0, 0, -1, 0, 0)` — rotation intact |
| JS disabled | `reveal-ready` absent, 0 marked, far row `opacity: 1` |
| `prefers-reduced-motion: reduce` | far row `opacity: 1` |
| nav order | Tom, Experience, Projects, Skills, Education, Elsewhere |

A bug caught in the process: `.c8-inputs span` also matched the new arrow `<span>` inside
the button, wrapping it in its own chip. Scoped to `.c8-inputs > span`.

**A second bug, caught by Tom after the fact.** The observer's `rootMargin: "0px 0px -12%
0px" ` makes the bottom 12% of the viewport a dead zone — good for timing, but anything in
the final screenful of the *document* can then never satisfy it. The footer colophon
(`W8BRO.GITHUB.IO` and the typeface line) sat at `opacity: 0` permanently, even at maximum
scroll. Fixed with a tail sweep: once the reader has actually reached the end of the page,
nothing is allowed to still be hidden. It also covers a viewport too tall to scroll at all.
Re-verified that the reveal is still staged rather than all-on — 5 of 64 elements revealed
at page top.

Lesson for the fold-in: a negative bottom `rootMargin` needs an end-of-document catch, or
the last thing on the page never appears.

### The C line has now drifted from Wooden in three places

Worth recording, because each was a reasonable call on its own and the total is larger than
any of them:

- the tilted organic blob (round 3) — Wooden's one deliberate break of its own grid;
- the video thumbnail (round 4) — "a small video thumbnail and a ghost button" is in
  Nature's description;
- the hard white square (round 6) — "a hard white Book now square", whose contrast against
  the frosted inputs is the point of it there.

C8 is a quieter, more uniform page than either reference. That is a defensible house style
and it is what Tom asked for each time; it is simply no longer as close to the saved
evidence as variant C was. If the page ever feels too even, these three are the deliberate
places where the tension was removed.

## Round 7 — C9

Tom liked the softened "See work" button but found that on a narrow window it wrapped onto
a second line and sat under the 2013 / Present / 5 roles chips. It now hides instead.

**Done with a container query, not a media query.** The button should react to the width of
the panel it lives in, not the window: the split band is a fraction of the viewport on
desktop but goes full width below 960px, so a viewport breakpoint would be wrong in one of
those two states. `.c9-split-l` becomes the query container.

**The threshold is measured, not guessed.** The row needs `chips 272px + button 130px +
three 0.6rem gaps 29px = 431px` of panel content box. Ramping the viewport 1600 -> 320 in
10px steps: fine at 435px of inner width, wraps at 425px (viewport 500 vs 490). The query
fires at 470px, leaving ~39px of headroom so the button goes just *before* it would wrap
rather than on the same frame, and absorbing any chip-width change from a different webfont
load. An `@supports not (container-type: inline-size)` media-query fallback is included.

Nothing is lost by hiding it — "See work" points at `#c9-projects`, which the nav also links
to as "Projects", so the destination stays reachable at every width.

Verified by sweeping 129 viewport widths from 1600 to 320:

| | C8 | C9 |
|---|---|---|
| widths where the button wraps under the chips | **18** (first at vw 490) | **0** |
| widths where it overlaps a chip | 0 | 0 |
| widths where it is hidden | 0 | 22 (vw 530 and below) |

### Two bugs found while verifying this round, both mine

1. **A race in the round-6 footer fix.** `revealTail()` was called synchronously at init,
   but at first paint the photographs have no intrinsic size, so `scrollHeight` can still
   equal `innerHeight` — the function then concluded the page was already fully scrolled
   and revealed every element at once. It happened to win the timing in C8's original test
   run and lose it in C9's, which is the worst kind of bug to ship. Now deferred to `load`
   plus a `requestAnimationFrame`. **Fixed in both C8 and C9.**
2. **A cross-variant rename miss.** C9 is generated from C8 by rewriting `c8-` to `c9-`,
   which does not match `.c8.reveal-ready` — no hyphen. C9's reveal CSS was therefore
   targeting a class that does not exist in its own subtree, so its fade-in did nothing at
   all while still looking plausible (everything simply rendered at opacity 1). Caught only
   because the automated check asserted "hidden below the fold" rather than trusting a
   screenshot. All twelve variant files are now audited for stray cross-variant selectors;
   all clean.

The general lesson for the fold-in: **assert the pre-condition, not just the post-condition.**
"the text is visible after scrolling" passes whether or not the reveal ever worked; only
"the text is hidden before scrolling" catches a dead animation.

## Locked in — what actually changed

`astro dev` and `astro build` now both render C9; the `?variant=` switcher is gone from the
route. Verified on the built output served from `dist/`, not just in dev.

| file | change |
|---|---|
| `src/components/cv-page.astro` | replaced wholesale with the C9 design (886 lines) |
| `src/styles/global.css` | design tokens; #08's four-colour palette retired |
| `src/data/links.ts` | new — the Elsewhere section's data |
| `src/data/photos.ts` | new — hero/split photo config, both `null` for now |
| `src/pages/index.astro` | prototype block removed; real `<title>`/description; two webfont families instead of twelve |
| `scripts/generate-pdf.ts` | switches to the "All" tab, asserts no hidden text, fails loudly |

Promotion decisions worth knowing:

- **Photography is optional by design.** `photos.ts` ships `src: null`, and the template
  renders `<img>` only when a path is set, so the hero falls back to its warm graded ground
  rather than a broken image. That is a legitimate look, not a placeholder — and it means no
  third-party image requests on the live Site. The two webfont hosts that were the last
  externals are gone too, now that the fonts are self-hosted; the Site makes no external
  request.
- **The Elsewhere band renders only when `links` is non-empty**, and its nav item is gated
  the same way. It currently holds one entry, GitHub. The two Spotify links are a `TODO` in
  `links.ts`: inventing playlist names on a public CV would have been making things up.
- **`links` lives in `src/data/`**, matching #09's decision that singletons go there rather
  than in a content collection. Promote it to a collection if it grows enough to want
  per-entry files.
- The colophon (`Bodoni Moda 600-700, opsz pinned / Inter`) was prototype scaffolding and is
  gone; the footer now carries the year and name.

### The PDF needed real work, and found a real trap

The Pipeline builds `dist/cv.pdf` by loading this page in headless Chromium and calling
`page.pdf()`, **which does not scroll**. Every faded-in element would still have been at
`opacity: 0`, so the PDF would have come out largely blank. `@media print` now forces them
visible, and `generate-pdf.ts` asserts it and throws rather than shipping a blank CV.

The trap: the projects section is tabbed, and the full list sits behind `hidden`. A
`@media print` rule could not override that, because **Tailwind preflight ships
`[hidden]{display:none!important}` inside `@layer base`, and for `!important` declarations
cascade layers invert** — a layered `!important` beats an unlayered one, and Astro's scoped
component styles are unlayered. So the PDF script clicks the "All" tab instead, which
exercises the same path a reader would. Result: 8 pages with all 23 assignments, up from 6.

**Keep this in mind for any future `!important` in a component style block** — it will lose
to Tailwind preflight, silently.

### Two more of my own bugs, found by verifying the built output

1. **The "Download CV" button was invisible on page load.** It sat 3px inside an observer
   root shrunk 12% at the bottom — 7% of its own 41px height, just under the
   `threshold: 0.08` I had set. The primary call to action never fired. Fixed by dropping to
   `threshold: 0`; the negative `rootMargin` already supplies the reveal delay, and a
   fractional threshold combined with a dead zone is simply a trap. Fixed in the Site and in
   variants C8/C9 so the prototype record matches what shipped.
2. The round-6/7 bugs (first-paint race, dead C9 selectors) are described above and were
   already fixed before this fold-in.

### Verified on the built site

| check | result |
|---|---|
| `astro check` | 0 errors, 0 warnings, 0 hints |
| `astro build` output | 1 page, 1 stylesheet, no prototype markers |
| reveal staged on load | 5 of 61 revealed, last row `opacity: 0` |
| Download CV visible on load | yes |
| everything visible at page bottom | 0 still hidden, both footer spans at 1 |
| JS disabled | 0 elements marked, all text at `opacity: 1` |
| `prefers-reduced-motion: reduce` | all text at `opacity: 1` |
| CTA wrap sweep, 1600 -> 320px | 0 wraps, hidden at 22 widths |
| `font-variation-settings` rules in bundle | 15 |
| PDF | 8 pages, assertion passes, all 23 assignments |
| external requests | none (webfonts self-hosted; re-checked by `npm run verify:fonts`) |

## Still open

- **Real photography.** The hero wants a frame that is dark on the left, where the rotated
  wordmark sits; the current even deep grade compensates for that and can be dialled back
  once a frame is chosen. Set the paths in `src/data/photos.ts`.
- **The two Spotify links** in `src/data/links.ts`.
- ~~**Self-host the webfonts** to drop the two third-party hosts. The `opsz` axis must
  survive the switch — a static-instance subset would break the legibility work.~~
  **Done.** `public/fonts/` + `@font-face` in `global.css`; the Google `<link>` and both
  `preconnect`s are gone and the Site now makes no external request at all. The axis did
  survive: requesting the weight as a *range* (`wght@6..96,400..700`) rather than four
  discrete weights returns one variable file per subset with `opsz` 6–96 intact, verified by
  reading `fvar`. Two guards added because both failure modes are silent — `npm run
  check:fonts` (axes present) and `npm run verify:fonts` (fonts load once each from our own
  origin, `opsz` measurably moves), both in the Pipeline. Details in `docs/webfonts.md`.
- **`Outokumpu Stainless AB` vs `Outokumpu stainless AB`** in three project files; one
  client renders as two anywhere they are grouped.
- **Tailwind is now barely used** — the page is hand-written CSS and only preflight is doing
  work (and its `!important` rules actively fight component styles, see above). Worth
  deciding whether to keep the dependency.
- **Nothing further on the prototype.** Tom chose to keep only the winner: the ten losing
  variants (A, B, D, C, C2-C8) and the switcher/stage harness were deleted rather than
  captured to a branch, so they no longer exist anywhere. What remains is
  `src/components/prototype/variant-c9-guard.astro` plus the `cv-data.ts` loader it needs
  and a README, kept purely as a readable reference copy of the design that shipped. It is
  imported by nothing and does not appear in build output. The rationale for every decision
  in the C line is recorded in this ticket, which is now the primary source.

## Superseded: folding the winner in

The prototype has done its job; this is what promoting it involves. **The variant code was
written under prototype constraints — no tests, no error handling, no abstraction — so it
gets rewritten, not copied.**

1. Rebuild `cv-page.astro` in C9's structure and move its tokens into
   `src/styles/global.css`, replacing the #08 palette (see the palette question above —
   C9's terracotta supersedes `#9B6A6C`, and `#CEDFD9` pale sage is dropped).
2. **Carry the nav z-index / `pointer-events` fix.** It is a real hit-testing bug, not a
   style choice.
3. **Keep the `font-variation-settings`.** This design depends on Bodoni Moda's optical-size
   axis, not only its weight: `opsz` ~18 for the display headings, `opsz` 8 for everything
   at body scale. Dropping them silently regresses the legibility work of rounds 3–5.
4. Self-host the webfonts (Bodoni Moda + Inter) instead of the Google Fonts `<link>` the
   prototype uses, and check the `@media print` sheet #05 calls for — a full-bleed
   photographic hero and a dark charcoal split panel both need print treatment.
5. Keep the reveal as progressive enhancement — the `.reveal-ready` scoping and the
   `prefers-reduced-motion` branch are the parts that make it safe, and both are easy to
   drop in a rewrite. Also keep `translate` rather than `transform` for the rise.
6. Keep the container query for the "See work" button, and re-measure its 470px
   threshold if the chip labels or the typeface change — the number is derived from the
   rendered widths of those three chips.
7. Commission or shoot real photography. C9 needs a hero frame that is **dark on the left**,
   because that is where the rotated wordmark sits; the current even deep grade is
   compensating for a bright placeholder and can be dialled back once the real frame is
   chosen. Industrial subjects (mills, robot cells, furnaces) suit the earth/gold grade.
8. Then move the whole variant set to a throwaway branch as the primary source and delete
   `src/components/prototype/` plus the dev-only block in `index.astro` from main.

## A CV-data bug this round surfaced

C3 groups assignments by client, which exposed a real inconsistency in the CV data — not a
design problem:

- `src/content/projects/2022-outokumpu-ppms-labview-port.yaml` → `Outokumpu Stainless AB`
- `2022-outokumpu-personnel-tools.yaml` and `2023-outokumpu-cold-rolling-mill-dynamic.yaml`
  → `Outokumpu stainless AB` (lower-case s)

One client renders as two in any design that groups or de-duplicates by client name. Left
unedited on purpose — it is Tom's CV data and which casing is right is his call (the
company's own styling looks like the capitalised form). Worth deciding before implementation,
and worth considering whether `client` should become a controlled value in the collection
schema rather than free text.

## Answer

_Not yet decided._ The interesting feedback is usually "the hero from B with the project
list from A", which is the actual design. Once a variant wins: fold it into
`cv-page.astro` and `global.css` properly (this code was written under prototype
constraints — no tests, no error handling, no abstraction), then move the full set of
variants to a throwaway branch as the primary source and drop
`src/components/prototype/` plus the two prototype lines in `index.astro` from main.

## Files

- `src/components/prototype/variant-c9-guard.astro` — **the winner**
- `src/components/prototype/variant-c8-reveal.astro` — kept for comparison
- `src/components/prototype/variant-c7-final.astro` — kept for comparison
- `src/components/prototype/variant-c6-clear.astro` — kept for comparison
- `src/components/prototype/variant-c5-heavy.astro` — kept for comparison
- `src/components/prototype/variant-c-editorial.astro` — the chosen direction, kept for comparison
- `src/components/prototype/variant-c2-discover.astro`
- `src/components/prototype/variant-c3-slider.astro`
- `src/components/prototype/variant-c4-stock.astro`
- `src/components/prototype/variant-a-swiss.astro`
- `src/components/prototype/variant-b-cinematic.astro`
- `src/components/prototype/variant-d-illustrated.astro`
- `src/components/prototype/prototype-stage.astro` — mounts them all, keyed off VARIANTS
- `src/components/prototype/prototype-switcher.astro` — the floating bar
- `src/components/prototype/cv-data.ts` — shared data load and the VARIANTS list
  (sharing data is deliberate; sharing layout is not)
- `src/pages/index.astro` — two dev-only lines at the top
