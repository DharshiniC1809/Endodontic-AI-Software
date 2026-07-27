/**
 * Mobile Test Helper Utilities for Appium E2E Automation
 * Provides touch gestures, element assertions, screenshot handling, and network mock helpers.
 */

const fs = require('fs');
const path = require('path');

class TestHelpers {
  /**
   * Wait for element to be displayed on screen with custom timeout
   */
  static async waitForElement(driver, accessibilityIdOrSelector, timeoutMs = 10000) {
    if (driver.isMock) return true;
    const element = await driver.$(accessibilityIdOrSelector);
    await element.waitForDisplayed({ timeout: timeoutMs });
    return element;
  }

  /**
   * Perform touch swipe gesture (Scroll Down)
   */
  static async swipeDown(driver) {
    if (driver.isMock) return true;
    const { height, width } = await driver.getWindowSize();
    const startX = width / 2;
    const startY = height * 0.8;
    const endY = height * 0.2;

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerMove', duration: 600, x: startX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }
    ]);
  }

  /**
   * Perform Pull-to-Refresh gesture
   */
  static async pullToRefresh(driver) {
    if (driver.isMock) return true;
    const { height, width } = await driver.getWindowSize();
    const startX = width / 2;
    const startY = height * 0.3;
    const endY = height * 0.7;

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerMove', duration: 800, x: startX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }
    ]);
  }

  /**
   * Capture screenshot on test failure or reporting checkpoint
   */
  static async captureScreenshot(driver, testName) {
    const screenshotsDir = path.join(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(screenshotsDir, `${testName}_${timestamp}.png`);
    
    if (driver && typeof driver.saveScreenshot === 'function') {
      await driver.saveScreenshot(filePath);
      console.log(`[Screenshot Captured]: ${filePath}`);
    }
    return filePath;
  }

  /**
   * Generate realistic test scan image path for E2E uploads
   */
  static getSampleScanPath() {
    const sampleDir = path.join(__dirname, '../assets/samples');
    if (!fs.existsSync(sampleDir)) {
      fs.mkdirSync(sampleDir, { recursive: true });
    }
    const sampleFile = path.join(sampleDir, 'sample_periapical_xray.png');
    if (!fs.existsSync(sampleFile)) {
      // Create lightweight dummy PNG image buffer
      const dummyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      fs.writeFileSync(sampleFile, Buffer.from(dummyPngBase64, 'base64'));
    }
    return sampleFile;
  }
}

module.exports = TestHelpers;
