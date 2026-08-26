Type: wayfinder:map

## Destination

A build spec for Tom's personal CV website: the SSG choice, CV data structure, single-page site layout, and GitHub Actions pipeline design for deploying to GitHub Pages — detailed enough for Tom to hand-implement himself as a learning project, with no ready-to-paste code.

## Notes

- Domain glossary: see [CONTEXT.md](../../CONTEXT.md) (Site, CV data, Pipeline, Build spec).
- Tom is a beginner who has dabbled in "a little of everything," and wants this project to teach him TypeScript specifically. Optimize explanations and spec detail for learning, not speed.
- Spec depth target (agreed): decisions + structure + plain-English pipeline step descriptions, small scaffolding OK, but no ready-to-paste code/config — Tom writes the actual implementation himself.
- Repo will be named `W8bro.github.io` (root-domain GitHub Pages, no base-path config needed).
- No tracker was set up for this repo yet (no `docs/agents/issue-tracker.md`, no git repo), so this map defaults to the local-markdown tracker under `.scratch/`. Run `/setup-matt-pocock-skills` later (once a real GitHub repo exists) to switch to GitHub Issues if preferred.
- When resolving tickets, consult the `grilling`, `domain-modeling`, `research`, and `prototype` skills as their ticket type indicates.

## Decisions so far

- [Research the standard GitHub Actions pattern for deploying to GitHub Pages](issues/06-research-gh-actions-pages-pattern.md): official flow uses configure-pages -> upload-pages-artifact -> deploy-pages across a build job and a deploy job, with repo Pages "Source" set to "GitHub Actions", a permissions block (contents: read, pages: write, id-token: write), push-to-main plus manual triggers, and npm caching via actions/setup-node's cache: 'npm' before install.
- [Compare PDF-generation methods for the CV site](issues/04-compare-pdf-generation-methods.md): headless-browser print-to-PDF (Puppeteer/Playwright) looks like the path of least resistance vs. wrapper Actions or lighter tools (wkhtmltopdf/WeasyPrint/Pandoc/Prince/hosted APIs); final choice deferred to #05.
- [Decide the PDF-generation method](issues/05-decide-pdf-generation-method.md): **Playwright**, via a small hand-written TS script (not a Marketplace Action), plus a dedicated `@media print` stylesheet — runs as a pipeline step after the site build, outputting a PDF into the build directory.
- [Decide the pipeline structure](issues/07-decide-pipeline-structure.md): hand-assembled two-job (build/deploy) pipeline, no `withastro/action` wrapper — build job does checkout → setup-node (npm cache) → `npm ci` → `astro check` → `astro build` → serve `dist/` locally → Playwright PDF script → `configure-pages`/`upload-pages-artifact`; deploy job runs `deploy-pages` against the `github-pages` environment. Adds `public/.nojekyll` and a status badge.
- [Consolidate existing CV content into one inventory](issues/01-consolidate-cv-content.md): inventoried both source PDFs (no LinkedIn export existed); decided full+"cherry picks" project list, flat categorized skills, no exposed contact info, and found real IEEE Xplore/DiVA links for all three publications.
- [Decide the CV data structure/schema](issues/09-decide-cv-data-structure.md): Astro content collections (`experience`, `projects`, `education`, `publications`) defined in `src/content/config.ts`, YAML entry files; `about` and `skills` as plain typed files in `src/data/` since they're singletons, not repeated entries.
- [Compare candidate SSGs for a TypeScript-first CV site](issues/02-compare-ssg-candidates.md): compared Astro, Eleventy, Next.js static export, and SvelteKit static on TS support, add-interactivity-later story, GitHub Pages deploy, and learning curve; non-binding lean toward Astro, final pick deferred to #03.
- [Decide the SSG](issues/03-decide-ssg.md): **Astro** — best TS-authoring coverage (config, typed props, TS-by-default scripts), islands architecture ships zero JS by default and lets interactivity be added later additively, official one-command GitHub Pages action. Runner-up: Eleventy (simpler, but less hands-on TS practice). Open detail to verify later: whether `withastro/action` auto-adds `.nojekyll`.
- [Prototype the single-page site layout](issues/08-prototype-site-layout.md): **Variant C — full-width story scroll** won (alternating full-bleed sections, dot-nav, tabbed "Cherry picks"/"All projects" toggle), with a photo added to the About hero (positioned right of the bio text) per Tom's feedback. Color palette decided: `#5F5449`/`#9B6A6C`/`#B09398`/`#CEDFD9`, mapped to ink/accent/soft-accent/alt-background roles. Prototype file kept as reference at `prototypes/08-layout-prototype.html`.

## Not yet specified

- Typography (font choices) and dark/light mode implementation — layout structure (#08) and the color palette are now settled, but fonts and a dark-mode variant of the palette are still open, left for implementation time rather than this build spec.
- Extracting/cropping the headshot photo (from the consulting CV PDF) into a standalone image asset — a small implementation-time to-do surfaced by #08, not a design decision.

## Out of scope

- Blog, contact form, analytics, i18n — ruled out for v1 (agreed during chartering).
- Custom domain — the `W8bro.github.io` repo already serves at the root domain; a custom domain is a possible future addition, not needed for v1.
- Pipeline quality tooling (lint, broken-link checks, accessibility checks) — v1 pipeline is build-and-deploy only; noted as a fast-follow.
- Building actual interactive TS components (theme toggle, filters, etc.) — v1 only requires that the chosen architecture *supports* adding these later without a rearchitect; building them is deferred.
