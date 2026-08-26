Title: Decide the PDF-generation method
Type: grilling
Status: resolved
Blocked by: 04

## Question

Using the findings from "Compare PDF-generation methods for the CV site" (#04), walk Tom through the tradeoffs and decide how the pipeline will auto-generate the downloadable PDF from the built site. Record the choice and reasoning.

## Answer

**Decision: a small hand-written TypeScript script using Playwright, plus a dedicated `@media print` stylesheet.**

- **Tool: Playwright** (not Puppeteer) — functionally equivalent for this use case (both drive headless Chromium via `page.pdf()`), chosen for Playwright's official, current CI documentation, which is explicit about the beginner pitfalls (`npx playwright install --with-deps`, and explicit official guidance not to bother caching the browser binary between runs).
- **Own script, not a Marketplace Action** — the researched Marketplace wrappers (LukaszLapaj's html-to-pdf-action, misaelnieto's webpage-to-pdf, ntdesmond/html2pdf-action) are all thin, low-star, unverified-publisher wrappers around Puppeteer. Writing a small script instead means: no dependency on a stranger's pinned versions/maintenance, and real hands-on TypeScript practice — it becomes a pipeline step that runs the script against the built HTML output and writes a PDF file next to it.
- **Dedicated print stylesheet** — `page.pdf()` works without one, but defaults to Chromium's browser print rendering (muted colors, default margins) rather than a deliberate design. A scoped `@media print` stylesheet is the difference between an intentional PDF and a webpage screenshot, and is a good bounded piece of CSS to write and learn from.

Net shape for the pipeline (detail for #07): after the site build step, a script step runs Playwright against the built local HTML (e.g. via a `file://` path or a short-lived local static server), applies the print stylesheet, and outputs a PDF into the build directory so it gets uploaded/deployed alongside the rest of the static site.

