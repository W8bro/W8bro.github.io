// stagger by position among revealing siblings, capped so long lists don't crawl
function staggerDelays(targets: HTMLElement[]) {
    const countByParent = new Map<Element, number>();
    targets.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const i = countByParent.get(parent) ?? 0;
        countByParent.set(parent, i + 1);
        el.style.transitionDelay = `${Math.min(i * 55, 330)}ms`;
    });
}

// The observer's -12% bottom rootMargin leaves anything in the last screenful of the
// DOCUMENT unable to ever fire — the footer colophon stayed at opacity 0 forever. So
// once the reader reaches the end, nothing may stay hidden. Also covers short pages.
function watchTail(targets: HTMLElement[], reveal: (el: Element) => void) {
    const revealTail = () => {
        const doc = document.documentElement;
        if (
            window.innerHeight + Math.ceil(window.scrollY) <
            doc.scrollHeight - 2
        )
            return;
        targets.forEach(reveal);
    };
    window.addEventListener("scroll", revealTail, { passive: true });
    window.addEventListener("resize", revealTail);
    // Not synchronous: at first paint the photographs have no intrinsic size, so
    // scrollHeight can equal innerHeight and this would reveal everything at once.
    if (document.readyState === "complete") requestAnimationFrame(revealTail);
    else
        window.addEventListener("load", () =>
            requestAnimationFrame(revealTail),
        );
}

function initReveal() {
    const root = document.querySelector<HTMLElement>(".cv");
    if (!root) return;

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

    staggerDelays(targets);

    // added last, so the page is never briefly blank while the above runs
    root.classList.add("reveal-ready");

    // references `io` below; safe because nothing calls it until the observer fires
    const reveal = (el: Element) => {
        el.classList.add("is-in");
        io.unobserve(el);
    };

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                reveal(e.target); // reveal once; never re-hide on scroll up
            });
        },
        {
            // threshold 0, not a fraction: an element straddling the rootMargin dead
            // zone can have too little of itself inside the root to ever fire — that
            // hid the "Download CV" button on load. The rootMargin is already the delay.
            rootMargin: "0px 0px -12% 0px",
            threshold: 0,
        },
    );
    targets.forEach((el) => io.observe(el));

    watchTail(targets, reveal);
}

function initTabs() {
    const tabs = document.querySelectorAll<HTMLButtonElement>("[data-tab]");
    const panels = document.querySelectorAll<HTMLElement>("[data-panel]");
    tabs.forEach((t) =>
        t.addEventListener("click", () => {
            tabs.forEach((o) => o.classList.toggle("is-on", o === t));
            panels.forEach(
                (p) => (p.hidden = p.dataset.panel !== t.dataset.tab),
            );
            panels.forEach((p) => {
                if (p.hidden) return;
                p.querySelectorAll("[data-reveal]").forEach((el) =>
                    el.classList.add("is-in"),
                );
            });
        }),
    );
}

// Enhancement only: without this the markup renders as a static list, which is what
// the PDF pipeline and reduced-motion users get.
function initCarousel() {
    const principles = document.querySelector<HTMLElement>("[data-principles]");
    const stillness = matchMedia("(prefers-reduced-motion: reduce)");
    if (!principles || stillness.matches) return;

    const slides = [
        ...principles.querySelectorAll<HTMLElement>(".cv-principle"),
    ];
    if (slides.length <= 1) return;

    const dotBox = principles.querySelector<HTMLElement>(".cv-principle-dots");
    const dots = [
        ...(dotBox?.querySelectorAll<HTMLButtonElement>("button") ?? []),
    ];

    principles.classList.add("is-live");
    if (dotBox) dotBox.hidden = false;

    const DWELL = 4500;
    let at = 0;
    let timer = 0;
    let held = false;
    let onScreen = false;

    const goTo = (n: number) => {
        at = (n + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle("is-on", i === at));
        dots.forEach((d, i) => d.classList.toggle("is-on", i === at));
    };

    const run = () => {
        clearInterval(timer);
        if (held || !onScreen) return;
        timer = window.setInterval(() => goTo(at + 1), DWELL);
    };

    goTo(0);

    // pause while a visitor is reading or tabbing through
    const hold = (on: boolean) => {
        held = on;
        run();
    };
    principles.addEventListener("pointerenter", () => hold(true));
    principles.addEventListener("pointerleave", () => hold(false));
    principles.addEventListener("focusin", () => hold(true));
    principles.addEventListener("focusout", () => hold(false));
    document.addEventListener("visibilitychange", () => hold(document.hidden));

    dots.forEach((d, i) =>
        d.addEventListener("click", () => {
            goTo(i);
            run();
        }),
    );

    // don't burn a timer while the panel is off-screen
    new IntersectionObserver(
        (entries) => {
            onScreen = entries[0]?.isIntersecting ?? false;
            run();
        },
        { threshold: 0.2 },
    ).observe(principles);
}

initReveal();
initTabs();
initCarousel();
