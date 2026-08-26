Title: Research the standard GitHub Actions pattern for deploying to GitHub Pages
Type: research
Status: resolved

## Question

Research the current recommended (2025/2026-era) GitHub Actions pattern for building a static site and deploying it to GitHub Pages using the official flow (as opposed to the older gh-pages-branch-push approach). Cover: the relevant official actions (e.g. actions/configure-pages, actions/upload-pages-artifact, actions/deploy-pages), the required repository Pages setting ("GitHub Actions" as the source), required permissions block in the workflow, typical trigger (push to main, or manual dispatch), and where dependency caching (npm) typically fits in the job. Summarize as a plain-English step list (build job → deploy job), not as ready-to-paste YAML — this feeds a beginner's learning spec, not a copy-paste template.

## Answer

The current official pattern is "deploy from GitHub Actions" (not a `gh-pages` branch push). One-time manual setup plus a two-job workflow:

**One-time setup (in the GitHub UI, not the workflow file):**
1. In repo Settings > Pages, change "Source" from "Deploy from a branch" to "GitHub Actions."

**Trigger:**
2. Run automatically on push to the default branch (e.g. `main`), plus allow manual runs via `workflow_dispatch`.
3. Use a `concurrency` group so a second deploy queues instead of racing an in-progress one.

**Build job:**
4. Check out the repo.
5. Set up Node, with `actions/setup-node`'s built-in `cache: 'npm'` turned on (this is where npm dependency caching fits — it caches npm's download cache keyed on the lockfile hash, placed before install).
6. Install dependencies (`npm ci`).
7. Run the site's build command to produce the static output folder.
8. Run `actions/configure-pages` to gather Pages metadata/config.
9. Run `actions/upload-pages-artifact`, pointed at the actual build-output folder, to package and upload it as a deployment artifact.

**Deploy job:**
10. Runs only after the build job succeeds (`needs: build`).
11. Declares the special `github-pages` deployment environment.
12. Has the `pages: write` and `id-token: write` permissions (plus `contents: read` for checkout) — no stored secret/PAT needed, since `id-token: write` enables OIDC-based auth for the deploy.
13. Runs `actions/deploy-pages`, which publishes the uploaded artifact and outputs the live `page_url`.

Net effect: every push to the default branch rebuilds from source and republishes live — no committed build output, no `gh-pages` branch to maintain.

Full findings with primary-source citations: [research/06-gh-actions-pages-findings.md](../research/06-gh-actions-pages-findings.md)

