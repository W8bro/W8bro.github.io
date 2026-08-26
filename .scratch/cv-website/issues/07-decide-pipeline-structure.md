Title: Decide the pipeline structure
Type: grilling
Status: resolved
Blocked by: 03, 05, 06

## Question

Combine the SSG choice (#03), the PDF-generation method (#05), and the standard GitHub Actions/Pages pattern (#06) into a concrete, plain-English description of the pipeline: what triggers it, what the build job does (install, typecheck/build, generate PDF), what the deploy job does, and any caching. Walk Tom through any remaining tradeoffs (e.g. one job vs two, whether to add a status badge) and record the final step-by-step description as the Pipeline design.

## Answer

**Decision: hand-assembled two-job pipeline (no `withastro/action` wrapper), with a status badge.**

### One-time manual setup (not workflow code)

1. Add an empty `public/.nojekyll` file to the repo — Astro copies `public/`'s contents untouched into the build output, so this resolves the open `.nojekyll` question carried over from #03 for all three other SSGs it's also required for; cheap insurance regardless of whether `withastro/action` would have handled it, since we're not using that action.
2. In the GitHub repo's Settings → Pages, set **Source** to "GitHub Actions" (per #06).

### Trigger

- Push to the default branch (`main`)
- Manual `workflow_dispatch`
- A `concurrency` group so an overlapping run queues instead of racing an in-progress deploy

### Job 1 — `build`

1. Check out the repo.
2. Set up Node, with `actions/setup-node`'s built-in `cache: 'npm'` enabled.
3. Install dependencies (`npm ci`).
4. Type-check (`astro check`) — fails the job on type errors, since `astro build` alone won't catch every TS issue on its own the way `astro check` does.
5. Build the site (`astro build`) → produces the static output in `dist/`.
6. Install Playwright's Chromium browser only (`npx playwright install --with-deps chromium`) — no browser-binary caching, per Playwright's own CI guidance that restoring the cache is about as slow as re-downloading.
7. Serve the built `dist/` folder locally on a local port (a lightweight static-file-server command) — needed because the PDF script must load the site over `http://`, not a raw `file://` path, for asset/link paths to resolve correctly.
8. Run the PDF-generation script: Playwright opens the locally served site, applies the `@media print` stylesheet, and writes a PDF (e.g. `dist/cv.pdf`) into the build output.
9. Stop the local server.
10. Run `actions/configure-pages` to gather Pages metadata.
11. Run `actions/upload-pages-artifact`, pointed at `dist/` (now including the generated PDF), to package it as the deployment artifact.

### Job 2 — `deploy`

- `needs: build`
- Declares the `github-pages` deployment environment (gives a real deployment history in GitHub's UI)
- Permissions: `contents: read`, `pages: write`, `id-token: write` (OIDC — no stored secret needed)
- Runs `actions/deploy-pages`, which publishes the artifact and outputs the live `page_url`

### Extra

- Add a GitHub Actions workflow-status badge to the repo's `README.md` (GitHub generates a badge URL per workflow automatically — a single markdown image link, no workflow change needed).
