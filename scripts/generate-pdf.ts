import { chromium } from 'playwright';

const SITE = process.env.SERVE_SITE_URL ?? 'http://localhost:8008';
const OUT = 'dist/cv.pdf';

async function run() {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage();
        await page.goto(SITE, { waitUntil: 'networkidle' });

        // The projects section is tabbed: "Cherry picks" is shown by default and the full
        // list sits behind the "All" tab with the `hidden` attribute. The PDF should carry
        // the whole record, so switch tabs before printing.
        //
        // This is done here rather than in a `@media print` rule on purpose. Tailwind's
        // preflight ships `[hidden]{display:none!important}` inside `@layer base`, and for
        // !important declarations the cascade layer order is inverted — a layered
        // !important beats an unlayered one, and Astro's scoped component styles are
        // unlayered. So a print rule cannot win against that `hidden` attribute, while
        // clicking the tab exercises the same path a reader would.
        const allTab = page.locator('[data-tab="all"]');
        if (await allTab.count()) {
            await allTab.first().click();
            await page.waitForSelector('[data-panel="all"]:not([hidden])');
        }

        // The page fades sections in on scroll, so anything never scrolled to is still at
        // opacity 0. `@media print` forces those visible (see cv-page.astro), but assert it
        // here too — a blank CV is worse than a failed build.
        await page.emulateMedia({ media: 'print' });
        const hidden = await page.evaluate(
            () =>
                [...document.querySelectorAll('[data-reveal]')].filter(
                    (el) => Number(getComputedStyle(el).opacity) === 0,
                ).length,
        );
        if (hidden > 0) {
            throw new Error(
                `${hidden} element(s) are still at opacity 0 under print media; the PDF would be missing text. ` +
                    'Check the @media print reveal override in cv-page.astro.',
            );
        }
        await page.emulateMedia({ media: null });

        await page.pdf({ path: OUT, format: 'A4', printBackground: true });
        console.log(`wrote ${OUT}`);
    } finally {
        await browser.close();
    }
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
