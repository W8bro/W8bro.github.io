Title: Prototype the single-page site layout
Type: prototype
Status: resolved

## Question

Raise the fidelity of the site-structure discussion by producing a rough, cheap layout prototype (an outline or rough HTML/CSS stub is fine) for the single-page CV site with anchored sections: About, Experience, Education, Skills, Projects, Publications. Cover section order, nav/anchor behavior, and roughly how each section is laid out. This doesn't need real content or final styling — it's something for Tom to react to and adjust, feeding into the "Not yet specified" visual-design questions later.

## Answer

**Winner: Variant C — full-width story scroll**, with one adjustment Tom asked for: a photo added to the About hero (originally omitted in favor of big typography; added as a circular photo sitting beside the intro text, matching the section's larger visual scale rather than a small document-style avatar) — positioned to the **right** of the bio text, per Tom's follow-up.

Three variants were prototyped and are still all present in the file for reference:
- A — classic single-column resume (sticky top nav, document-style, cherry-picks + collapsible "all projects")
- B — sidebar dashboard (persistent sidebar, card-grid projects)
- **C — full-width story scroll (chosen)**: alternating full-bleed sections, big typography, a minimal dot-nav on the right edge, and a tabbed toggle between "Cherry picks" and "All projects" instead of a collapsible list. Now includes a photo in the About hero per Tom's feedback.

Prototype file (kept as the primary source, not deleted): [prototypes/08-layout-prototype.html](../prototypes/08-layout-prototype.html) — open directly in a browser, flip variants via the bottom bar, arrow keys, or `?variant=A|B|C`.

**Follow-up carried forward (not a blocker)**: #01 flagged that a headshot photo exists in the consulting CV PDF but wasn't extracted as a standalone image file. Now that the chosen layout (C) actually wants a photo, this becomes a real to-do for implementation: crop/export that headshot into a usable image asset.

**Feeds the "Not yet specified" visual-design fog**: the section *structure* is now settled (full-width alternating blocks, dot-nav, tabbed projects), but colors, fonts, and dark/light mode are still open — to be decided during implementation, not as part of this build spec.

**Update — color palette decided**: Tom supplied a 4-color palette: `#5F5449` (warm dark brown), `#9B6A6C` (dusty rose), `#B09398` (soft rose-mauve), `#CEDFD9` (pale sage). Applied to the prototype as:
- `--ink` (`#5F5449`) — headings/primary text
- `--muted` — translucent tint of ink, for secondary text/meta lines
- `--accent` (`#9B6A6C`) — links, active dot-nav dot, active project tab, featured badges
- `--accent-soft` (`#B09398`) — borders/dividers and tag-chip backgrounds (translucent)
- `--bg-alt` (`#CEDFD9`) — alternating full-width section background (variant C's `.block.alt`)
- `--bg` stays white — assumed as the base/page background since only 4 accent/neutral tones were given, not a full palette including a base; flag to Tom to confirm or override.

Not yet checked: text/background contrast ratios (WCAG) — worth a quick check at implementation time, not blocking for a personal CV site.
