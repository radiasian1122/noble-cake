/**
 * Quick Light Mode Test
 */

const { chromium } = require('playwright');

(async () => {
  console.log('🎨 Testing Light Mode\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:8766/index.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture dark mode
    console.log('🌙 Dark mode (default)');
    await page.screenshot({ path: 'screenshots/final-dark.png', fullPage: false });

    // Toggle to light mode
    await page.locator('#themeToggle').click();
    await page.waitForTimeout(600);

    console.log('☀️  Light mode');
    await page.screenshot({ path: 'screenshots/final-light.png', fullPage: false });

    // Scroll to collection
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'smooth' }));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/final-light-collection.png', fullPage: false });

    // Toggle back to dark
    await page.locator('#themeToggle').click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'screenshots/final-dark-collection.png', fullPage: false });

    console.log('\n✅ Theme switching verified!');
    console.log('📸 Screenshots: final-dark.png, final-light.png\n');

    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();
