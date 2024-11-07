// pages/CartPage.js
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  async verifyProductInCart(expectedName, expectedPrice) {
    const cartProductName = await this.cartItems.locator('.inventory_item_name').textContent();
    const cartProductPrice = await this.cartItems.locator('.inventory_item_price').textContent();
    return cartProductName === expectedName && cartProductPrice === expectedPrice;
  }

  async logout() {
    await this.page.locator('#react-burger-menu-btn').click(); // Opens the menu
    await this.page.locator('#logout_sidebar_link').click();    // Clicks logout
  }
}

module.exports = CartPage;
