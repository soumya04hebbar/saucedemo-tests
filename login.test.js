// tests/login.test.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test.describe('Saucedemo Add to Cart Test', () => {
  let loginPage, productsPage, cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigate(); // Navigate to site
  });

  test('should login, add product to cart, verify in cart, and logout', async ({ page }) => {
    // Step 2: Login to the site
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 3: Verify successful login by checking if user is on Products page
    await productsPage.verifyOnProductsPage();

    // Step 4: Get the first product name and price, and store it in a text file
    const productInfo = await productsPage.getFirstProductInfo();

    // Step 5: Click on the "Add to Cart" button for the first product
    await productsPage.addFirstProductToCart();

    // Step 6: Go to cart and verify the product is in the cart
    await productsPage.goToCart();
    const isProductInCart = await cartPage.verifyProductInCart(productInfo.name, productInfo.price);
    expect(isProductInCart).toBeTruthy();

    // Step 7: Logout
    await cartPage.logout();
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // Cleanup after test execution
  });
});
