const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:8766/index.html');
  await page.waitForTimeout(2000);

  // Check theme attribute
  const theme = await page.getAttribute('html', 'data-theme');
  console.log('Initial theme:', theme);

  // Check computed background color
  const bg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log('Body background:', bg);

  // Check if semantic tokens are defined
  const tokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      bgBase: style.getPropertyValue('--bg-base'),
      textPrimary: style.getPropertyValue('--text-primary'),
      ink: style.getPropertyValue('--ink'),
      cream: style.getPropertyValue('--cream')
    };
  });
  console.log('CSS Tokens:', tokens);

  // Toggle theme
  await page.click('#themeToggle');
  await page.waitForTimeout(800);

  const newTheme = await page.getAttribute('html', 'data-theme');
  console.log('\nAfter toggle theme:', newTheme);

  const newBg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log('New body background:', newBg);

  const newTokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      bgBase: style.getPropertyValue('--bg-base'),
      textPrimary: style.getPropertyValue('--text-primary'),
      ink: style.getPropertyValue('--ink'),
      cream: style.getPropertyValue('--cream')
    };
  });
  console.log('New CSS Tokens:', newTokens);

  await page.waitForTimeout(5000);
  await browser.close();
})();
