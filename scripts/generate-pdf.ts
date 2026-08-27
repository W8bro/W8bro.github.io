import { chromium } from 'playwright';

async function run() {

    const browser = await chromium.launch();
    try {
        const page = await browser.newPage();
        await page.goto(process.env.SERVE_SITE_URL ?? 'http://localhost:8008', { waitUntil: 'networkidle' });
        await page.pdf({ path: "dist/cv.pdf", format: 'A4', printBackground: true });
    }
    finally {
        await browser.close();
    }
}

run();