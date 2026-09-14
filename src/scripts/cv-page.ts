 // ---------- reveal on scroll ----------
    const root = document.querySelector<HTMLElement>(".cv");

    if (root) {
        const REVEAL = [
            ".cv-kicker",
            ".cv-word",
            ".cv-rail > *",
            ".cv-huge",
            ".cv-sub",
            ".cv-principles",
            ".cv-inputs",
            ".cv-panel-head",
            ".cv-role",
            ".cv-band-head",
            ".cv-proj", 
            ".cv-skills > div",
            ".cv-foot > *",
        ].join(", ");

        const targets = [...root.querySelectorAll<HTMLElement>(REVEAL)];
        targets.forEach((el) => el.setAttribute("data-reveal", ""));

        // stagger by position among revealing siblings, capped so long lists don't crawl
        const seen = new Map<Element, number>();
        targets.forEach((el) => {
            const parent = el.parentElement;
            if (!parent) return;
            const i = seen.get(parent) ?? 0;
            seen.set(parent, i + 1);
            el.style.transitionDelay = `${Math.min(i * 55, 330)}ms`;
        });

        // added last, so the page is never briefly blank while the above runs
        root.classList.add("reveal-ready");

        const show = (el: Element) => {
            el.classList.add("is-in");
            io.unobserve(el);
        };

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (!e.isIntersecting) return;
                    show(e.target); // reveal once; never re-hide on scroll up
                });
            },
            {
                // threshold 0, deliberately: with a fractional threshold an element that
                // straddles the rootMargin dead zone can have too little of itself inside
                // the root to ever fire. That hid the "Download CV" button on load - it sat
                // 3px inside a root shrunk by 12%, i.e. 7% of its own height. The negative
                // rootMargin already provides the "reveal just after it comes up" delay.
                rootMargin: "0px 0px -12% 0px",
                threshold: 0,
            },
        );
        targets.forEach((el) => io.observe(el));

        // The bottom rootMargin above makes the last 12% of the viewport a dead zone,
        // which is nice for timing but means anything sitting in the final screenful of
        // the DOCUMENT can never satisfy the observer - the footer colophon stayed at
        // opacity 0 forever. So: once the reader has actually reached the end of the page,
        // nothing is allowed to still be hidden. Also covers a page too short to scroll.
        const revealTail = () => {
            const doc = document.documentElement;
            if (window.innerHeight + Math.ceil(window.scrollY) < doc.scrollHeight - 2) return;
            targets.forEach(show);
        };
        window.addEventListener("scroll", revealTail, { passive: true });
        window.addEventListener("resize", revealTail);
        // NOT called synchronously: at first paint the photographs have no intrinsic size
        // yet, so scrollHeight can still equal innerHeight - revealTail would then decide
        // the page was already fully scrolled and reveal everything at once. Wait until
        // layout has settled, which also covers a page genuinely too short to scroll.
        if (document.readyState === "complete") requestAnimationFrame(revealTail);
        else window.addEventListener("load", () => requestAnimationFrame(revealTail));
    }

    const tabs = document.querySelectorAll<HTMLButtonElement>("[data-tab]");
    const panels = document.querySelectorAll<HTMLElement>("[data-panel]");
    tabs.forEach((t) =>
        t.addEventListener("click", () => {
            tabs.forEach((o) => o.classList.toggle("is-on", o === t));
            panels.forEach((p) => (p.hidden = p.dataset.panel !== t.dataset.tab));
            panels.forEach((p) => {
                if (p.hidden) return;
                p.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
            });
        }),
    );


     // ---------- work-philosophy carousel ----------
    // Enhancement only: without this the markup renders as a static list, which is what
    // the PDF pipeline and reduced-motion users get.
    const principles = document.querySelector<HTMLElement>("[data-principles]");
    const stillness = matchMedia("(prefers-reduced-motion: reduce)");

    if (principles && !stillness.matches) {
        const slides = [...principles.querySelectorAll<HTMLElement>(".cv-principle")];
        const dotBox = principles.querySelector<HTMLElement>(".cv-principle-dots");
        const dots = [...(dotBox?.querySelectorAll<HTMLButtonElement>("button") ?? [])];

        if (slides.length > 1) {
            principles.classList.add("is-live");
            if (dotBox) dotBox.hidden = false;

            const DWELL = 4500;
            let at = 0;
            let timer = 0;
            let held = false;
            let seen = false;

            const show = (n: number) => {
                at = (n + slides.length) % slides.length;
                slides.forEach((s, i) => s.classList.toggle("is-on", i === at));
                dots.forEach((d, i) => d.classList.toggle("is-on", i === at));
            };

            const run = () => {
                clearInterval(timer);
                if (held || !seen) return;
                timer = window.setInterval(() => show(at + 1), DWELL);
            };

            show(0);

            // pause while a visitor is reading or tabbing th
            const hold = (on: boolean) => { held = on; run(); };
            principles.addEventListener("pointerenter", () => hold(true));
            principles.addEventListener("pointerleave", () => hold(false));
            principles.addEventListener("focusin", () => hold(true));
            principles.addEventListener("focusout", () => hold(false));
            document.addEventListener("visibilitychange", () => hold(document.hidden));

            dots.forEach((d, i) =>
                d.addEventListener("click", () => { show(i); run(); })
            );

            // don't burn a timer while the panel is off-screen
            new IntersectionObserver(
                ([entry]) => { seen = entry.isIntersecting; run(); },
                { threshold: 0.2 }
            ).observe(principles);
        }
    }
