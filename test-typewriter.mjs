import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Intercept console messages
  page.on('console', msg => console.log('BROWSER:', msg.text()));

  await page.goto('http://127.0.0.1:4321/');
  console.log('Navigated to home');

  // Monitor the typed-text element
  for (let i = 0; i < 10; i++) {
    const text = await page.evaluate(() => {
      const el = document.getElementById('typed-text');
      const container = document.getElementById('typewriter-container');
      const isVisible = container ? window.getComputedStyle(container).display !== 'none' : false;
      return { text: el ? el.textContent : 'MISSING', isVisible };
    });
    console.log(`[${i*500}ms] text: "${text.text}", visible: ${text.isVisible}`);
    await new Promise(r => setTimeout(r, 500));
  }

  await browser.close();
})();
