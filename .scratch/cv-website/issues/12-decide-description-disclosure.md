Title: Decide what the CV data's description prose is for, and how the Site discloses it
Type: grilling
Status: resolved
Blocked by: 09, 10

## Question

Every `experience`, `projects` and `education` entry carries a `description` written during
the #01 content inventory, and the schema from #09 validates it — but the Site built in #10
renders none of it. The same is true of `tags`: entries carry eight to twelve each and the
page prints `tags[0]`. Decide what that prose is for, which surface it appears on, and how a
reader reaches it — or decide it is dead weight and remove it.

## Measured baseline

| collection | entries | description rendered? | notes |
|---|---|---|---|
| `projects` | 23 (6 `featured`) | no | 181–837 chars each, ~9 KB of prose total |
| `experience` | 5 | no | 169–206 chars, except Prevas at 752 |
| `education` | 3 | no | one entry has 313 chars, two have none |
| `publications` | 3 | n/a | no description field |

`tags` are rendered at roughly 8% — one of eight-to-twelve per entry, on the collapsed row.

The Site is a single page (`index.astro` → `cv-page.astro`), and `dist/cv.pdf` is a Playwright
print of that same page. There is no second surface: anything not on the page is not in the
PDF either.

## What the prose is for

**Evidence on demand.** Without it the projects band is a list of client names with one tag
each — it asserts a seven-year career without evidencing any of it, and that prose is the only
content on the Site that shows the work actually happened. The alternative considered and
rejected was deleting the field; that was the honest option only if the disclosure never got
built.

The reader is assumed **warm**: the intended route to the Site is a one-pager Tom sends to a
recruiter containing a link, so a visitor has already decided he is interesting before they
arrive. That assumption is what makes progressive disclosure acceptable rather than hostile —
it is a reader who will click, not a five-second scanner.

## Answer

**Decision: click-to-expand disclosure on `projects` and `experience`, built on native
`<details>`, with the PDF forced fully open as the complete record.**

### 1. Scope

- `projects` and `experience` descriptions become disclosable prose on the page.
- `education` prose is **not rendered.** The field stays in the schema and in
  `mdu-msc-robotics.yaml` deliberately — recorded here so it does not read as an oversight
  later.
- The Site stays a **single page.** Per-entry detail routes were considered and rejected: they
  would split the record across URLs and turn `generate-pdf.ts` from a one-URL print into a
  multi-URL crawl-and-concatenate job, for content a recruiter reads for under a minute.

### 2. Mechanism

Native `<details>` / `<summary>`, **nested inside** the existing `.cv-proj` and `.cv-role`
elements rather than replacing them.

Why native over a hand-rolled JS toggle: keyboard handling, screen-reader semantics and
browser find-in-page opening the match all come for free, where the JS route means writing
`aria-expanded` / `aria-controls` and focus management by hand and getting them subtly wrong.
It also makes the print story a single line in the PDF script rather than a new mechanism.

Why nested rather than converting the element: `.cv-proj` and `.cv-role` are working CSS grid
layouts *and* registered reveal targets in `cv-page.ts` (they receive `data-reveal` and a
staggered `transition-delay`). Making them `<details>` means re-solving a solved layout against
an element with its own display behaviour; nesting keeps the blast radius to new CSS. The cost
is one wrapper element and a summary that must be made to span the full row as the click
target.

Behaviour:

- Expand **and collapse** — a row that is open can be closed again.
- **Independent** toggles: opening one row does not close another. An exclusive accordion would
  fight the print path, which wants everything open at once.
- No "expand all" control on the page — it exists to solve a problem independent toggles do not
  have.
- The default marker is replaced with a chevron. **No open/close animation**; a snap matches the
  page's other instant state changes (the projects tabs).

### 3. Default-open state

- **Projects:** `featured` drives it. The six Cherry picks render pre-expanded, because a
  pre-read argument is what that panel is *for*; the All panel is uniformly collapsed. No new
  boolean on `projects` — a second field would be `true` on exactly the same six entries and
  would drift the first time one changed. If a featured project ever needs to start closed, add
  the boolean then.
- **Experience:** a new `expanded` boolean, defaulting false, `true` on the Prevas entry only.
  It is the current role and the one paragraph every reader came for; the ABB summer jobs and
  IKEA are chronology, not argument. Experience has no `featured` equivalent, which is why it
  needs its own field where projects do not.

### 4. What the expanded region contains

**Description paragraphs only.** Tags were considered for it and rejected as visual noise —
twelve chips under a paragraph.

That leaves `tags` deliberately at `tags[0]`, and this is a **conscious close, not a
leftover**: the Skills band already answers "what technologies does this person know"
comprehensively, so per-entry tags were always going to duplicate it. `tags[0]` earns its place
by giving the collapsed row something to say beyond a title. The collapsed row is therefore
unchanged from today — year, title, client · location, `tags[0]` — plus a chevron.

Descriptions may now carry **multiple paragraphs**. The 700+ char entries (SSAB FOCS, ABB CEWE,
Cytiva, Prevas) are currently single unbroken walls; a blank line inside the YAML block scalar
becomes a newline, which the component splits and renders as separate paragraphs. Markdown was
rejected — it pulls a renderer into content that is plain strings today, and bulleted CV prose
reads as a template where paragraphs read as a person.

### 5. The PDF

Delivery is already built and needs no change: `cv-page.astro` has the `/cv.pdf` link, and
`deploy.yml` serves `dist/`, runs the Playwright script and uploads the result.

What changes is its content. **The PDF is the complete record, not a condensed CV** — every
`<details>` is forced open after the existing All-tab click, on the grounds that it is a record
rather than a prose document. Accepted and deliberate consequence: the PDF grows to roughly
8–12 pages.

### 6. Guarding the PDF against silent loss

`generate-pdf.ts` already throws if any `[data-reveal]` element is still at `opacity: 0` under
print media. That guard **cannot see this new failure mode**: collapsed prose is
`display: none`, not transparent, so a CSS or markup change that left every description shut
would produce a green build and a gutted PDF.

So both bands emit a count attribute derived from their collection length, and the script
asserts the number of `<details>` it actually finds matches the number declared, with a
greater-than-zero floor.

- A bare "nothing is collapsed" check was rejected: it passes trivially when a selector change
  means the script finds no `<details>` at all, which is the exact case worth catching.
- A hardcoded expected count was rejected: it drifts the first time a project is added.
- The count comes from the same collection the rows render from, so if the markup or the loop
  breaks, the attribute still declares the full number while the DOM has none — and the build
  fails.
- The query must be **scoped to the visible panel.** The script clicks All first, leaving the
  Cherry picks panel `hidden`; its `<details>` are `display: none` and would otherwise be
  counted twice. This is a direct consequence of the same six projects existing twice in the DOM
  in different open states.

### 7. Surfaces this touches

| file | change |
|---|---|
| `src/content.config.ts` | `expanded` boolean, default false, on `experience` only |
| `src/content/experience/prevas-in-house-developer.yaml` | set `expanded`; paragraph-break the 752-char description |
| `src/content/projects/*.yaml` | paragraph-break the four 700+ char descriptions |
| `src/components/cv-page.astro` | `<details>` inside `.cv-proj` / `.cv-role`; open state bound to `featured` in the Cherry picks panel and to `expanded` in experience; count attribute on both bands |
| `src/styles/cv-page.css` | summary as full-row click target, chevron marker, suppress the default disclosure marker |
| `scripts/generate-pdf.ts` | force every `<details>` open after the All-tab click; the two count assertions |

### 8. Notes for implementation

- Expanding a row changes its height after the IntersectionObserver has already revealed it.
  That is harmless — the observer unobserves each element on first show — but it is worth
  knowing before debugging a layout shift.
- `<details>` works with JavaScript disabled, which keeps it consistent with the page's existing
  stance that the carousel and reveal are enhancements only.
