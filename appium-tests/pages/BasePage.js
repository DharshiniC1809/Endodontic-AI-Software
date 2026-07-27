/**
 * Base Page Object Model for Mobile Appium Tests
 */

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async findElement(selector) {
    return await this.driver.$(selector);
  }

  async findElements(selector) {
    return await this.driver.$$(selector);
  }

  async click(selector) {
    const el = await this.findElement(selector);
    await el.click();
  }

  async typeText(selector, text) {
    const el = await this.findElement(selector);
    await el.setValue(text);
  }

  async getText(selector) {
    const el = await this.findElement(selector);
    return await el.getText();
  }

  async isVisible(selector) {
    try {
      const el = await this.findElement(selector);
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }

  async pause(ms = 500) {
    await this.driver.pause(ms);
  }
}

module.exports = BasePage;
