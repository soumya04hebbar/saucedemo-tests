// pages/ProductsPage.js
const fs = require('fs');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.firstProduct = page.locator('.inventory_item').first();
    this.firstProductName = this.firstProduct.locator('.inventory_item_name');
    this.firstProductPrice = this.firstProduct.locator('.inventory_item_price');
    this.addToCartButton = this.firstProduct.locator('.btn_inventory');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async verifyOnProductsPage() {
    await this.page.waitForSelector('.inventory_list'); // Verifies user is on Products page
  }

  async getFirstProductInfo() {
    const name = await this.firstProductName.textContent();
    const price = await this.firstProductPrice.textContent();
    fs.writeFileSync('product-info.txt', `Product: ${name}\nPrice: ${price}`); // Stores info in file
    return { name, price };
  }

  async addFirstProductToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

module.exports = ProductsPage;
