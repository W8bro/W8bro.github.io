Title: Compare PDF-generation methods for the CV site
Type: research
Status: resolved

## Question

Tom wants a downloadable PDF version of the CV that is auto-generated from the built site during the GitHub Actions pipeline (rather than a hand-maintained PDF committed to the repo), so it can't drift out of sync.

Research realistic approaches for generating a PDF from a static HTML page as part of a GitHub Actions workflow. Cover at least: a headless-browser print-to-PDF approach (e.g. Puppeteer or Playwright driving Chromium to print the page with a print stylesheet), and any lighter-weight alternatives (e.g. a GitHub Action that wraps this already). For each, note: setup complexity for a beginner, whether it needs a dedicated print stylesheet, and how it fits as a step in a CI pipeline (runtime, headless browser install cost in CI). Do not make the final recommendation — that's decided with Tom in the follow-up ticket (#05) — but end with a short "if I had to guess" lean plus reasoning.

## Answer

Full findings (with primary-source citations): [research/04-pdf-generation-findings.md](../research/04-pdf-generation-findings.md)

Summary of the comparison:

- **Puppeteer** (`page.pdf()`): headless Chromium via Node.js. Applies `@media print` CSS by default (a print stylesheet is optional but recommended for layout/color control — `-webkit-print-color-adjust` overrides default print color-adjustment). Chromium download on install is ~170-280MB depending on OS; Linux CI needs extra system libraries. No official guidance on caching the browser binary between CI runs.
- **Playwright** (`page.pdf()`): same idea, but Chromium-only (Firefox/WebKit throw on `.pdf()`). Official docs recommend `npx playwright install --with-deps` as the standard CI step, and *explicitly recommend against* caching the browser binary in CI (restore time ≈ download time). Same print-stylesheet story as Puppeteer. No first-party "Playwright GitHub Action" for this — the documented pattern is plain npx commands in a normal workflow.
- **Existing GitHub Actions** wrapping this (e.g. html-to-pdf-action, webpage-to-pdf, html2pdf-action): all are thin community wrappers around Puppeteer, low star counts, none GitHub-verified. Least workflow code to write, but adds a dependency on a third party's maintenance of the underlying Puppeteer/Node/Docker image.
- **Lighter-weight alternatives** (no full browser engine): wkhtmltopdf is open source but its own maintainers now flag it as effectively unmaintained (WebKit frozen since ~2012) and recommend WeasyPrint, Puppeteer, or Prince instead. WeasyPrint (Python, no JS execution, `pip install weasyprint`) is a viable lighter option for a JS-free static page. Pandoc isn't itself a PDF renderer — it just delegates to one of these backends, so it adds a conversion hop rather than replacing a choice. Prince XML and hosted URL-to-PDF APIs (DocRaptor confirmed, PDFShift/API2PDF less verified) are viable but commercial/paid, generally overkill for a personal CV project.

**Non-binding lean:** Playwright or Puppeteer (roughly equivalent for this use case) driving headless Chromium against the already-built local HTML is likely the path of least resistance for a Node/TypeScript beginner project — no external paid service, no separate rendering ecosystem (Python, LaTeX, commercial license) alongside the existing toolchain, and Playwright's docs are explicit and current about the main CI gotcha (installing browsers, and not bothering to cache them). Either way, a dedicated `@media print` stylesheet is worth authoring so the PDF looks intentional rather than a raw page screenshot. Final method choice is deferred to ticket #05.
