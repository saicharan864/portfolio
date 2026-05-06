const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('response', response => {
            if (!response.ok()) {
                console.log('404 URL:', response.url());
            }
        });
        page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.error('PAGE REQUEST FAILED:', request.url(), request.failure().errorText));

        await page.goto('http://localhost:8000', { waitUntil: 'load' });
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 100;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
        await new Promise(r => setTimeout(r, 2000));


        await browser.close();
        console.log("Done checking.");
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
