// scripts/test_mobile_admin.js
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function testMobile() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots-360');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=360,780'],
    defaultViewport: {
      width: 360,
      height: 780,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    }
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  console.log('📱 Navigating to /admin at 360px width...');
  await page.goto('https://shivamwatersolution.in/admin', { waitUntil: 'networkidle2' });

  // 1. Capture Login Screen
  await page.screenshot({ path: path.join(screenshotsDir, '1_login_360.png') });
  console.log('📸 1. Login screen captured.');

  // 2. Perform Login
  await page.type('input[type="password"]', '9925645826');
  await page.click('button.al-btn');
  console.log('🔑 Clicked login button, waiting for dashboard...');

  await page.waitForSelector('.adm-product-card', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));

  // 3. Capture Dashboard List View at 360px
  await page.screenshot({ path: path.join(screenshotsDir, '2_dashboard_list_360.png') });
  console.log('📸 2. Dashboard Product List captured.');

  // 4. Test opening Product Editor for first product (FLONIX RELAX)
  const firstCard = await page.$('.adm-product-card');
  if (firstCard) {
    await firstCard.click();
    await page.waitForSelector('.adm-editor-tabs-bar', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotsDir, '3_editor_basic_360.png') });
    console.log('📸 3. Editor Basic Info tab captured.');

    // Switch to Images Tab
    const tabs = await page.$$('.adm-tab-btn');
    if (tabs.length >= 2) {
      await tabs[1].click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(screenshotsDir, '4_editor_images_360.png') });
      console.log('📸 4. Editor Images tab captured.');
    }

    // Switch to Specs Tab
    if (tabs.length >= 3) {
      await tabs[2].click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(screenshotsDir, '5_editor_specs_360.png') });
      console.log('📸 5. Editor Specs tab captured.');
    }

    // Switch to SEO Tab
    if (tabs.length >= 4) {
      await tabs[3].click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(screenshotsDir, '6_editor_seo_360.png') });
      console.log('📸 6. Editor SEO tab captured.');
    }
  }

  await browser.close();
  console.log('🎉 Mobile 360px testing finished! Screenshots saved in screenshots-360/');
}

testMobile().catch(console.error);
