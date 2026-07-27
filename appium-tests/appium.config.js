/**
 * Appium Configuration & Capabilities Setup
 * Supporting Android (UiAutomator2), iOS (XCUITest), and Web/Expo Emulation
 */

const path = require('path');

const APPIUM_HOST = process.env.APPIUM_HOST || '127.0.0.1';
const APPIUM_PORT = parseInt(process.env.APPIUM_PORT || '4723', 10);

// Android Capabilities (UiAutomator2)
const androidCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
  'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '13.0',
  'appium:app': process.env.ANDROID_APP_PATH || path.join(__dirname, '../frontend/android/app/build/outputs/apk/debug/app-debug.apk'),
  'appium:appPackage': 'com.endodontic.ai',
  'appium:appActivity': '.MainActivity',
  'appium:autoGrantPermissions': true,
  'appium:newCommandTimeout': 300,
  'appium:noReset': false
};

// iOS Capabilities (XCUITest)
const iosCapabilities = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15 Pro',
  'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '17.0',
  'appium:app': process.env.IOS_APP_PATH || path.join(__dirname, '../frontend/ios/build/Build/Products/Debug-iphonesimulator/EndodonticAI.app'),
  'appium:bundleId': 'com.endodontic.ai',
  'appium:autoAcceptAlerts': true,
  'appium:newCommandTimeout': 300
};

// Expo / Web Mobile Emulation Capabilities
const webMobileCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  browserName: 'Chrome',
  'appium:newCommandTimeout': 300
};

module.exports = {
  server: {
    host: APPIUM_HOST,
    port: APPIUM_PORT,
    path: '/'
  },
  capabilities: {
    android: androidCapabilities,
    ios: iosCapabilities,
    webMobile: webMobileCapabilities
  },
  timeouts: {
    implicit: 10000,
    pageLoad: 30000,
    script: 30000
  }
};
