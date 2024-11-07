// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  retries: 2, // Retry failed tests up to 2 times
  use: {
    headless: true, // Set to false if you want to see the browser while testing
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
