const { chromium } = require('playwright');

(async () => {
  console.log('🎨 Capturing Both Themes\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:8766/index.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Force DARK theme first
    await page.evaluate(() => {
      window.NobleTheme.setTheme('dark');
    });
    await page.waitForTimeout(800);

    const darkTheme = await page.getAttribute('html', 'data-theme');
    const darkBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log(`🌙 Dark Mode - theme="${darkTheme}", bg=${darkBg}`);
    await page.screenshot({ path: 'screenshots/verified-dark.png', fullPage: false });

    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/verified-dark-collection.png', fullPage: false });

    // Force LIGHT theme
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      window.NobleTheme.setTheme('light');
    });
    await page.waitForTimeout(800);

    const lightTheme = await page.getAttribute('html', 'data-theme');
    const lightBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log(`☀️  Light Mode - theme="${lightTheme}", bg=${lightBg}`);
    await page.screenshot({ path: 'screenshots/verified-light.png', fullPage: false });

    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/verified-light-collection.png', fullPage: false });

    console.log('\n✅ Both themes captured successfully!');
    console.log('📸 Check: verified-dark.png and verified-light.png\n');

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();
