# Research: Deploying a Static Site to GitHub Pages via GitHub Actions (2025/2026 pattern)

This note captures the current, officially-recommended way to build a static site and deploy it to
GitHub Pages using the "deploy from GitHub Actions" flow — as opposed to the older pattern of pushing
built output to a `gh-pages` branch and pointing Pages at that branch. It's written for a learning
project (beginner TypeScript, static site, GitHub Pages target) and feeds ticket #07, which will design
the actual pipeline. Every claim below is sourced directly from GitHub's own docs or the official
action repos' READMEs — no secondhand blog posts.

## 1. `actions/configure-pages` — what it does and why it's used

This action runs as the first step of the **build** job. It enables GitHub Pages metadata detection
and configuration for the repository, and exposes information (like the computed base URL/origin) that
static site generators need to produce correct absolute paths. GitHub's own starter workflow for
static sites calls it right after checkout, before packaging the build output. It's also the piece
that lets GitHub's "starter workflow" templates auto-configure popular static site generators (Jekyll,
Next.js, etc.) "out of the box."

Source: https://github.com/actions/configure-pages (README, main branch)

## 2. `actions/upload-pages-artifact` — what it uploads and its constraints

This action packages a directory of already-built static files into a deployment artifact and uploads
it, so a separate deploy job can pick it up later in the same workflow run.

- **Default input directory:** `_site/` (via the `path` input) — for most non-Jekyll setups you'll
  override this to point at your actual build output folder (e.g. `dist/`, `build/`).
- **Artifact name:** defaults to `github-pages` (overridable via `name`, though the deploy action
  expects this default name unless you change both sides).
- **Format/size limits:** produces a gzip-compressed tar archive; hard cap is under 10GB, but GitHub
  recommends staying under roughly 1GB in practice, since larger uploads risk hitting the 10-minute
  deployment timeout.
- **Retention:** artifact expires after 1 day by default (`retention-days` input).
- Hidden files (dotfiles) are excluded by default unless `include-hidden-files: true` is set.

Source: https://github.com/actions/upload-pages-artifact (README, main branch)

## 3. `actions/deploy-pages` — output and environment requirement

This action runs in the **deploy** job and takes the artifact produced by `upload-pages-artifact` (by
default, the artifact named `github-pages`) and publishes it live to GitHub Pages.

- **Output:** `page_url` — the final published URL of the site. This is typically wired into the job's
  `environment.url` field so the deployment shows a clickable link in the GitHub UI.
- **Permissions:** requires the job to have at minimum `pages: write` and `id-token: write` (the latter
  is for OIDC-based authentication of the deployment, not a personal token).
- **Environment requirement:** the deploying job must declare an `environment:` block, and the
  environment name must be `github-pages` (this is the default GitHub Pages uses to enforce
  branch/deployment protection rules). Example from the README:
  ```
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  ```
- It also sets an environment variable (`GITHUB_PAGES=true`) during deployment so build tooling can
  detect it's running for a Pages deploy.

Source: https://github.com/actions/deploy-pages (README, main branch)

## 4. Required repository setting: Source = "GitHub Actions"

In the repository's **Settings > Pages**, under "Build and deployment", the "Source" dropdown must be
switched from the default **"Deploy from a branch"** to **"GitHub Actions"**. GitHub's docs state this
explicitly as a required step (step 4 in the "using a custom workflow" walkthrough):

> "Under 'Build and deployment', under 'Source', select **GitHub Actions**."

Without this setting, Pages will keep expecting a branch to serve from and won't watch for
Actions-based deployments at all. Note that GitHub Pages doesn't pin itself to one specific workflow
file — it just serves whatever the most recent successful deployment to the `github-pages` environment
published.

Sources:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 5. Required `permissions` block, and why each entry is needed

GitHub's documentation and starter workflow both use this permissions block (typically set at the
workflow level, though it can be scoped to the deploy job):

```
permissions:
  contents: read
  pages: write
  id-token: write
```

- `contents: read` — lets the workflow check out the repository's code (needed for the build job to
  read source files).
- `pages: write` — the minimum permission `deploy-pages` needs to actually publish to GitHub Pages.
- `id-token: write` — allows the job to request an OpenID Connect (OIDC) token, which is how
  `deploy-pages` authenticates the deployment securely without a stored secret/PAT.

Source: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
(permissions block confirmed verbatim in GitHub's official starter workflow, see topic 6 below)

## 6. Triggers and `concurrency`

GitHub's official starter workflow (`pages/static.yml`) triggers on:

- `push` to the default branch (expressed as `branches: [$default-branch]`, which GitHub's template
  engine substitutes with the repo's actual default branch, e.g. `main`)
- `workflow_dispatch` — allows manually running the deployment from the Actions tab

It also includes a `concurrency` block:

```
concurrency:
  group: "pages"
  cancel-in-progress: false
```

This groups all Pages-deployment workflow runs under one concurrency key ("pages") so that if a new
run starts while another is still in progress, they queue rather than deploy simultaneously and race
each other. `cancel-in-progress: false` means an in-flight deployment is allowed to finish rather than
being killed by a newer push — the newer run just waits its turn.

Source: https://github.com/actions/starter-workflows/blob/main/pages/static.yml (GitHub's official
"Deploy static content to Pages" starter workflow)

## 7. Where npm dependency caching fits

Caching is handled by `actions/setup-node`'s built-in `cache` input, not a separate `actions/cache`
step (that's what it uses under the hood, but it's wrapped for you). It's placed in the **build** job,
after checkout and after the `setup-node` step itself, and *before* `npm install`/`npm ci` runs:

```
- uses: actions/checkout@v7
- uses: actions/setup-node@v7
  with:
    node-version: 24
    cache: 'npm'
- run: npm ci
```

Details:
- Supports `npm` (keys off `package-lock.json` or `npm-shrinkwrap.json`), `yarn`, and `pnpm`.
- It does **not** cache `node_modules` itself — it caches npm's own download cache, so `npm ci` still
  re-links `node_modules` but skips re-downloading packages when the lockfile hash matches.
- For non-standard layouts, `cache-dependency-path` can point at a lockfile in a subdirectory.
- As of recent `setup-node` versions, if `package.json` declares a `packageManager` field for npm,
  caching can even switch on automatically.

Source: https://github.com/actions/setup-node (README, main branch)

## 8. Overall two-job structure

The recommended shape (confirmed by both the docs' "custom workflow" walkthrough and the official
starter workflow) is:

**Build job:**
1. Check out the repository (`actions/checkout`).
2. Set up Node with npm caching enabled (`actions/setup-node`, `cache: 'npm'`).
3. Install dependencies (`npm ci`, preferred over `npm install` in CI for reproducibility).
4. Run the static site generator's build command (e.g. `npm run build`), producing a build-output
   folder.
5. Run `actions/configure-pages` to let Pages metadata be gathered/injected.
6. Run `actions/upload-pages-artifact`, pointing `path` at the actual build-output folder, to package
   and upload the artifact.

**Deploy job:**
1. Declared with `needs: build` so it only runs after the build job succeeds.
2. Declares `environment: { name: github-pages, url: <page_url output> }`.
3. Has the `pages: write` / `id-token: write` permissions (workflow-level permissions can cover this,
   or they can be repeated at job level).
4. Runs `actions/deploy-pages`, which picks up the artifact uploaded by the build job and publishes it,
   producing the `page_url` output.

Note: GitHub's simplest starter workflow (`pages/static.yml`, quoted in section 6) actually collapses
this into a *single* job because it has no real build step (it just uploads a static folder as-is).
For a project with an actual build step (TypeScript compiling to a static bundle), the two-job
build/deploy split is the pattern to use so the deploy environment/permissions are scoped only to the
job that needs them, and so the build tooling's dependencies/toolchain don't need Pages-specific
permissions.

Sources:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/actions/starter-workflows/blob/main/pages/static.yml

---

## Plain-English step list (for ticket #07 to consume)

This is the sequence ticket #07 should design around. No YAML, no copy-paste code — just the order of
operations and what each step is responsible for.

**One-time setup (done by hand in the GitHub UI, not in the workflow file):**
1. In the repository's Settings, under Pages, change the "Source" setting from "Deploy from a branch"
   to "GitHub Actions."

**Trigger:**
2. The workflow should run automatically whenever a commit lands on the repository's default branch
   (e.g. `main`), and also be runnable manually from the Actions tab (for re-deploying without a new
   commit).
3. Only one deployment should be allowed to be "in progress" at a time; if a second push comes in
   while a deployment is still running, it should wait its turn rather than race or cancel the one
   already running.

**Build job (produces the finished static files):**
4. Check out the repository's code.
5. Set up the Node.js toolchain, and turn on its built-in npm caching so repeated runs don't
   re-download the same dependencies every time (this reads the lockfile to decide whether the cache
   is still valid).
6. Install the project's dependencies.
7. Run the project's build command — whatever produces the final static HTML/CSS/JS output folder.
8. Let the Pages configuration step gather the metadata it needs about the site.
9. Package the build-output folder into a deployment artifact and upload it so the next job can use
   it. This step needs to be told which folder holds the actual built site.

**Deploy job (publishes the artifact that the build job produced):**
10. This job only starts once the build job has finished successfully.
11. This job needs to declare that it's deploying into the special "github-pages" deployment
    environment — that's what unlocks the Pages-specific permissions and protections.
12. This job needs permission to publish to Pages and to prove its identity to GitHub (via a
    short-lived token), separate from ordinary repository read access.
13. The deploy step takes the previously uploaded artifact and publishes it live; when it finishes, it
    reports back the final URL of the site, which shows up as the "deployment" link in the GitHub UI.

**Net effect:** every push to the default branch rebuilds the site from source and republishes it
live, with no manually-committed build output ever living in the repository (no `gh-pages` branch to
maintain), and with GitHub's own security model (environments + OIDC token) gating who/what is allowed
to publish.
