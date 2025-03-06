import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from './PageObject/LoginPage';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe('Sauce lab testing', () => {

  test.beforeAll(async ({ browser }) => {
    // Create a new browser context and page
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize({ width: 800, height: 600 });

    // Decode the Base64 environment variables for USERNAME and PASSWORD
    const userName = Buffer.from(process.env.USERNAME || '', 'base64').toString('utf-8');
    const pwd = Buffer.from(process.env.PASSWORD || '', 'base64').toString('utf-8');

    // Initialize the LoginPage class and perform login
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    // Perform login action
    await loginPage.login(userName, pwd);

    // Wait for a specific element to ensure the login was successful
    await page.waitForSelector('.inventory_list'); // Adjust this selector to match a page element visible after login
  });
  
  test.afterAll(async() => {
    console.log('Closing session');
    await context.close();
  })

  test('check the title after login', async ({ page }) => {
    // Expect the title to contain "Swag Labs" after login
    await expect(page).toHaveTitle('Single Page Apps for GitHub Pages'); // Adjust the title as per the actual title after login
  });
  test('check the url after login', async ({ page }) => {
    // Expect the title to contain "Swag Labs" after login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Adjust the title as per the actual title after login
  });

});
