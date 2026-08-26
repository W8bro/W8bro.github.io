Title: Compare candidate SSGs for a TypeScript-first CV site
Type: research
Status: resolved

## Question

Research and compare static site generator candidates for a personal CV site, against these constraints:

- Tom is a beginner ("a little of everything," no strong ecosystem pull) who explicitly wants to learn TypeScript through this project.
- The site should use TypeScript for CV data/config now, with the *option* to add interactive component(s) later (e.g. a theme toggle or filter) without a rearchitect — an islands-style architecture is a plus but not mandatory if another path to "add interactivity later" exists.
- Must deploy cleanly to GitHub Pages via GitHub Actions.
- Should be realistically learnable by a beginner without becoming a full framework-app project (this is a CV site, not a SPA).

Compare at least: Astro, Eleventy (11ty), Next.js (static export), SvelteKit (static adapter), and note if any other candidate is clearly a strong fit. For each, cover: native/plugin TypeScript support, how it handles adding interactive components later, GitHub Pages deploy story (official docs/actions available), and rough learning curve for a beginner. Do not make the final recommendation — that's decided with Tom in the follow-up ticket (#03) — but end with a short "if I had to guess" lean plus your reasoning.

## Answer

Full findings, citations, and per-candidate detail: [research/02-ssg-candidates-findings.md](../research/02-ssg-candidates-findings.md)

| Dimension | Astro | Eleventy (11ty) | Next.js (static export) | SvelteKit (adapter-static) |
|---|---|---|---|---|
| TypeScript support | Native everywhere: `.astro`/`.ts`/`.tsx`, typed `Props` interface per component, `astro.config.ts`, `<script>` blocks are TS by default | First-party since v3.0 (Node type-stripping or `tsx`), `eleventy.config.ts`, `.11ty.ts` templates — but no component-props typing (no single-file component model); TS mostly touches config/build logic |Deepest/most opinionated: built into `create-next-app`, auto tsconfig, typed routes/`PageProps` — but bundled with React/JSX conventions | Native at the language level (Svelte 5 `<script lang="ts">`, no preprocessor for type-only syntax), first-party scaffolding, typed `$props()` |
| Adding interactivity later | True islands: static by default, opt-in per component via `client:load/idle/visible`, or just a plain TS `<script>` — no rearchitect | No hydration model at all — a plain `<script>` tag, same as classic static HTML (simplest, but no built-in TS build step for it) | React Server/Client Component split — needs `'use client'` + hooks; means learning React itself, highest new-concept cost | Any `.svelte` component (runes `$state`/`$props`) hydrates automatically, no directive needed — but prerendered pages ship hydration JS by default unless `csr` is explicitly disabled |
| GitHub Pages deploy | Official `withastro/action`; no `base` needed for root `user.github.io` repos; `.nojekyll` handling not confirmed from official docs (open GitHub issue) | Official docs walk through an Actions workflow; `--pathprefix` explicitly removed for root repos (Tom's case); `.nojekyll` need not explicit in docs but standard practice | Official template repo with modern `configure-pages`→`upload-pages-artifact`→`deploy-pages` workflow; long list of static-export-unsupported features (none critical for a CV site) | No single official action; docs walk through `adapter-static` + a sample workflow; explicitly requires `.nojekyll` in `static/` (Jekyll drops the leading-underscore `_app` dir otherwise) |
| Beginner learning curve | Low: HTML-first with a JS/TS frontmatter fence; hydration/islands only need learning once interactivity is actually added | Lowest: plain templating (Nunjucks/Markdown/HTML), no component model, no router; TS learning is decoupled from the framework | Highest: full React (JSX, hooks) plus Next's App Router conventions on top of TS, even for a one-page static site | Middle: cleaner single-file component syntax than JSX and a small rune vocabulary, but still a full app framework (routing, `+page`/`+layout`, ssr/csr/prerender flags) for one route |

Other candidates given a lighter pass (see findings file for detail): **Hugo** (Go templates, no TS in the templating layer — doesn't serve the TS-learning goal), **Zola** (Rust/Tera, no TS at all), **Gatsby** (React-based but effectively in maintenance mode as of 2026, dated deploy story), **plain Vite + TS** (`vanilla-ts` template — simplest possible, most TS-forward, but no templating/component structure at all).

Non-binding lean from the research pass (final choice deferred to ticket #03, to be made with Tom): Astro looks like the strongest fit on paper — its TS integration touches everything a beginner would write, it ships zero JS by default, and adding one interactive island later is a pure addition with no rearchitect. Eleventy is a close second on simplicity but gives less hands-on TS practice day to day. Next.js and SvelteKit both bring more framework overhead (React's hook model, or SvelteKit's full routing/SSR/CSR framework) than a one-page static CV strictly needs.

