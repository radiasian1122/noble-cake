/**
 * Quick Noble Cake 2026 Features Demo
 * Simplified test focusing on key interactive elements
 */

const { chromium } = require('playwright');

(async () => {
  console.log('🎨 Noble Cake 2026 Design Demo\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
    console.log('✅ Page loaded\n');
    await page.waitForTimeout(1500);

    // Feature showcase
    console.log('🖱️  Custom cursor with matcha accent');
    await page.mouse.move(720, 450);
    await page.waitForTimeout(500);

    console.log('🎨 Dynamic gradient responding to mouse');
    await page.mouse.move(300, 200);
    await page.waitForTimeout(300);
    await page.mouse.move(1100, 700);
    await page.waitForTimeout(300);

    console.log('✍️  Variable typography hover effects');
    await page.hover('h1');
    await page.waitForTimeout(800);

    console.log('🛒 Testing Add to Cart with animations');
    await page.locator('.btn--solid').first().click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/demo-hero.png', fullPage: false });

    console.log('📦 Scrolling to show bento grid layout');
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/demo-collection.png', fullPage: false });

    console.log('🛠️  Testing configurator with progress');
    await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    // Select options
    await page.locator('#optSize button').nth(1).click();
    await page.waitForTimeout(400);
    await page.locator('#optSponge button').nth(1).click();
    await page.waitForTimeout(400);
    await page.locator('#optCentre button').nth(2).click();
    await page.waitForTimeout(400);

    await page.screenshot({ path: 'screenshots/demo-configurator.png', fullPage: false });

    console.log('🎮 Opening cart drawer');
    await page.locator('#basketBtn').click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'screenshots/demo-cart.png', fullPage: false });

    console.log('📱 Mobile responsive check');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('#drawerX').click();
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/demo-mobile.png', fullPage: true });

    console.log('\n✅ Demo complete! Screenshots saved.');
    console.log('📸 View screenshots in ./screenshots/ directory\n');

    console.log('Browser staying open for 15 seconds for manual exploration...');
    await page.waitForTimeout(15000);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();
