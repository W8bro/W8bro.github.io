Title: Decide the SSG
Type: grilling
Status: resolved
Blocked by: 02

## Question

Using the findings from "Compare candidate SSGs for a TypeScript-first CV site" (#02), walk Tom through the tradeoffs and decide which SSG to build the site with. Record the choice and the reasoning (including how it satisfies the TypeScript-learning goal and the "add interactivity later" requirement).

## Answer

**Decision: Astro.**

Reasoning, weighed against the findings in #02:

- **TypeScript-learning goal**: Astro is the only candidate where TS touches everything Tom will actually author day-to-day — config (`astro.config.ts`), typed component `Props` interfaces, and `<script>` blocks (TS by default, zero setup). Eleventy's TS support is real but limited to config/build logic, giving less hands-on typed-authoring practice; Next.js has the deepest TS integration but bundles it with React's whole component/hook model, which is more than a beginner needs to learn at once; SvelteKit's TS is native at the language level but wrapped in a full app-framework surface (routing, ssr/csr flags) for a single-page site.
- **"Add interactivity later without a rearchitect" requirement**: Astro's islands architecture is the most additive of the four — v1 ships zero client JS by default, and a future interactive component (e.g. a theme toggle) is added later as a same-file, opt-in `client:*` directive or even a plain typed `<script>` block, with no framework/hook model required just to get there.
- **Beginner overhead**: `.astro` files are HTML-first with a TS "fence" at the top — no required router or hydration concepts for a purely static site. Framework concepts (islands) only need to be learned at the point interactivity is actually added, which matches the "no rearchitect" goal directly.
- **GitHub Pages deploy**: Astro has an official one-command GitHub Action (`withastro/action`), and Tom's root-domain repo (`W8bro.github.io`) needs no `base` path config — the simplest deploy story of the four.
- **Runner-up**: Eleventy, if Tom ever wants a structurally simpler starting point — but it was passed over here specifically because it gives less hands-on TypeScript practice toward the stated learning goal.

**Open detail to verify during implementation** (not a blocker, just a known gap in the research): whether the official `withastro/action` automatically adds the `.nojekyll` file Astro's `_astro/` output directory needs on GitHub Pages, or whether that has to be added by hand — flagged as unconfirmed from primary sources in #02 (see [withastro/astro#14247](https://github.com/withastro/astro/issues/14247)). Worth a quick check when #07 (pipeline structure) is being finalized.

