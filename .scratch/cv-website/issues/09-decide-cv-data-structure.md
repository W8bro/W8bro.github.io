Title: Decide the CV data structure/schema
Type: grilling
Status: resolved
Blocked by: 01, 03

## Question

Using the content inventory from #01 and the SSG choice from #03, decide the concrete shape of the CV data: the TypeScript types/schema for each section (About, Experience, Education, Skills, Projects, Publications — where Publications are simply title + IEEE Xplore link), and the file format/location idiomatic to the chosen SSG (e.g. Markdown with frontmatter, a typed content-collection, or plain TS/JSON data files). Record the final schema and file layout.

## Answer

**Decision: Astro content collections, schema in `src/content/config.ts`, YAML entry files.**

**Collections** (one small YAML file per entry, validated against a schema):
- **`experience`**: `company`, `role`, `startDate`, `endDate` ("Present" allowed), `location` (optional), `description`, `tags` (optional) — covers the two Prevas roles, the MDU research-engineer stint, the two ABB Robotics summer jobs, and IKEA.
- **`projects`**: `title`, `client`, `startDate`, `endDate`, `location` (optional), `description`, `tags`, `featured` (boolean) — the `featured` flag (per #01) lets the same ~20 entries populate both the full chronological list and the "Cherry picks" subset.
- **`education`**: `institution`, `degree`, `field`, `startDate`, `endDate`, `description` (optional) — one entry today (MDU M.Sc.), kept as a collection for extensibility.
- **`publications`**: `title`, `venue`, `year`, `url` — no special-casing needed; works for the two IEEE Xplore links and the one DiVA link from #01 alike.

**Plain typed data files** (not collections — singletons, not repeated entries):
- `src/data/about.ts` — `{ bio: string }` (placeholder text per #01, Tom to rewrite).
- `src/data/skills.ts` — `{ category: string, items: string[] }[]`, matching the flat categorized grouping decided in #01.

**File layout:**
```
src/
  content/
    config.ts
    experience/*.yaml
    projects/*.yaml
    education/*.yaml
    publications/*.yaml
  data/
    about.ts
    skills.ts
```

**Why YAML over JSON**: purely a hand-editing ergonomics choice (no trailing-comma footguns, more forgiving across ~25+ entries) — has zero effect on the TypeScript/schema-validation side either way.

**Implementation-time caveat**: Astro's content-collections API has evolved across versions (the Content Layer API landed in Astro 5) — verify the exact current syntax against Astro's own docs when actually writing `config.ts`, rather than relying on this spec's terminology being 1:1 with whatever the installed version's docs show.
