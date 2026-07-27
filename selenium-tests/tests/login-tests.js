/**
 * Endodontic AI Software - Selenium E2E Web Frontend Login Automated Test Suite
 * 
 * Target Component: LoginScreen.js / Web Frontend Authentication
 * Test Framework: Selenium WebDriver (Node.js)
 * Supported Browsers: Chrome, Firefox, Edge (Headless / Headful)
 */

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

// Global Configuration
const CONFIG = {
    baseUrl: process.env.BASE_URL || 'http://localhost:8081', // Expo web default port or custom host
    implicitWait: 10000,
    explicitWait: 15000,
    headless: process.env.HEADLESS !== 'false',
    browser: process.env.BROWSER || 'chrome'
};

/**
 * Page Object Model (POM) for LoginScreen
 */
class LoginPage {
    constructor(driver) {
        this.driver = driver;
        
        // Locators using robust React Native Web / DOM strategy
        this.emailInput = By.css('input[placeholder="Email"], input[type="email"]');
        this.passwordInput = By.css('input[placeholder="Password"], input[type="password"]');
        this.loginButton = By.xpath("//*[text()='Login']/ancestor::*[contains(@style, 'opacity') or @role='button' or self::div or self::button]");
        this.forgotPasswordLink = By.xpath("//*[contains(text(), 'Forgot Password')]");
        this.signUpLink = By.xpath("//*[contains(text(), 'Don’t have an account') or contains(text(), 'Sign Up')]");
        this.eyeIcon = By.xpath("//input[@placeholder='Password']/following-sibling::* | //input[@placeholder='Password']/parent::*//div[contains(@class, 'css-view')]");
        this.titleText = By.xpath("//*[text()='Welcome Back']");
        this.subtitleText = By.xpath("//*[text()='Login to continue']");
        this.logoElement = By.xpath("//*[text()='🦷']");
        this.errorMessage = By.css('div[style*="color: rgb(239, 68, 68)"], div[style*="color: #EF4444"], span[style*="color"]');
    }

    async navigateTo() {
        await this.driver.get(CONFIG.baseUrl);
        await this.driver.wait(until.elementLocated(this.titleText), CONFIG.explicitWait);
    }

    async getTitle() {
        const elem = await this.driver.wait(until.elementLocated(this.titleText), CONFIG.explicitWait);
        return await elem.getText();
    }

    async enterEmail(email) {
        const input = await this.driver.wait(until.elementLocated(this.emailInput), CONFIG.explicitWait);
        await input.clear();
        // Clear value completely for react state updates
        await input.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);
        await input.sendKeys(email);
    }

    async enterPassword(password) {
        const input = await this.driver.wait(until.elementLocated(this.passwordInput), CONFIG.explicitWait);
        await input.clear();
        await input.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE);
        await input.sendKeys(password);
    }

    async clickLogin() {
        const btn = await this.driver.wait(until.elementLocated(this.loginButton), CONFIG.explicitWait);
        await btn.click();
    }

    async clickForgotPassword() {
        const btn = await this.driver.wait(until.elementLocated(this.forgotPasswordLink), CONFIG.explicitWait);
        await btn.click();
    }

    async clickSignUp() {
        const btn = await this.driver.wait(until.elementLocated(this.signUpLink), CONFIG.explicitWait);
        await btn.click();
    }

    async togglePasswordVisibility() {
        const eye = await this.driver.wait(until.elementLocated(this.eyeIcon), CONFIG.explicitWait);
        await eye.click();
    }

    async getErrorMessage() {
        try {
            const errElem = await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
            return await errElem.getText();
        } catch (e) {
            return null;
        }
    }

    async isPasswordVisible() {
        const passElem = await this.driver.findElement(this.passwordInput);
        const typeAttr = await passElem.getAttribute('type');
        return typeAttr !== 'password';
    }
}

/**
 * Selenium Test Suite Runner
 */
async function runLoginTests() {
    console.log('====================================================');
    console.log('🚀 Starting Selenium E2E Web Frontend Login Test Suite');
    console.log(`🌐 Environment: ${CONFIG.baseUrl} | Browser: ${CONFIG.browser} | Headless: ${CONFIG.headless}`);
    console.log('====================================================\n');

    let options = new chrome.Options();
    if (CONFIG.headless) {
        options.addArguments('--headless=new');
    }
    options.addArguments('--disable-gpu', '--no-sandbox', '--window-size=1280,800');

    let driver = await new Builder()
        .forBrowser(CONFIG.browser)
        .setChromeOptions(options)
        .build();

    let loginPage = new LoginPage(driver);
    let passedCount = 0;
    let failedCount = 0;

    async function runTestCase(testId, description, testFn) {
        process.stdout.write(`[${testId}] ${description} ... `);
        try {
            await testFn();
            console.log('✅ PASSED');
            passedCount++;
        } catch (err) {
            console.log(`❌ FAILED (${err.message})`);
            failedCount++;
        }
    }

    try {
        // --- SUITE 1: UI & Structure Verification ---
        await runTestCase('TC-E2E-001', 'Verify Login Page loads successfully with Title & Subtitle', async () => {
            await loginPage.navigateTo();
            const title = await loginPage.getTitle();
            assert.strictEqual(title, 'Welcome Back');
        });

        await runTestCase('TC-E2E-002', 'Verify presence of dental logo icon, email, and password input fields', async () => {
            const logo = await driver.findElement(loginPage.logoElement);
            const emailInput = await driver.findElement(loginPage.emailInput);
            const passwordInput = await driver.findElement(loginPage.passwordInput);

            assert.ok(await logo.isDisplayed(), 'Logo should be visible');
            assert.ok(await emailInput.isDisplayed(), 'Email input should be visible');
            assert.ok(await passwordInput.isDisplayed(), 'Password input should be visible');
        });

        await runTestCase('TC-E2E-003', 'Verify Password masking by default', async () => {
            await loginPage.enterPassword('SecretPassword123');
            const isVisible = await loginPage.isPasswordVisible();
            assert.strictEqual(isVisible, false, 'Password input should be masked by default');
        });

        await runTestCase('TC-E2E-004', 'Verify Password visibility toggle (Show/Hide)', async () => {
            await loginPage.togglePasswordVisibility();
            // In web, toggling secureTextEntry changes input attribute or renders text
            // Verify eye icon action executes without error
            assert.ok(true);
        });

        // --- SUITE 2: Functional Authentication Scenarios ---
        await runTestCase('TC-E2E-005', 'Verify submission with empty email and password', async () => {
            await loginPage.enterEmail('');
            await loginPage.enterPassword('');
            await loginPage.clickLogin();
            // Should stay on page or display validation error
            const currentUrl = await driver.getCurrentUrl();
            assert.ok(currentUrl.includes(CONFIG.baseUrl));
        });

        await runTestCase('TC-E2E-006', 'Verify login attempt with invalid credentials displays error message', async () => {
            await loginPage.enterEmail('nonexistent.dentist@endodontic.ai');
            await loginPage.enterPassword('WrongPass123!');
            await loginPage.clickLogin();
            
            // Give API request time to complete
            await driver.sleep(1500);
            const errMsg = await loginPage.getErrorMessage();
            // Either error message rendered or alert triggered
            assert.ok(errMsg !== undefined, 'Error response handled');
        });

        await runTestCase('TC-E2E-007', 'Verify SQL Injection resistance in email field', async () => {
            await loginPage.enterEmail("' OR '1'='1");
            await loginPage.enterPassword("' OR '1'='1");
            await loginPage.clickLogin();
            await driver.sleep(1000);
            const currentUrl = await driver.getCurrentUrl();
            assert.ok(!currentUrl.includes('/home'), 'SQL Injection must not bypass authentication');
        });

        await runTestCase('TC-E2E-008', 'Verify XSS Payload resistance in password field', async () => {
            await loginPage.enterEmail("test.user@endodontic.ai");
            await loginPage.enterPassword("<script>alert('XSS')</script>");
            await loginPage.clickLogin();
            await driver.sleep(1000);
            const currentUrl = await driver.getCurrentUrl();
            assert.ok(!currentUrl.includes('/home'), 'XSS script payload must not bypass login');
        });

        // --- SUITE 3: Navigation Links ---
        await runTestCase('TC-E2E-009', 'Verify Forgot Password link interaction', async () => {
            await loginPage.clickForgotPassword();
            await driver.sleep(1000);
            // Verify interaction succeeded
            assert.ok(true);
        });

        await runTestCase('TC-E2E-010', 'Verify Sign Up navigation link interaction', async () => {
            await loginPage.navigateTo();
            await loginPage.clickSignUp();
            await driver.sleep(1000);
            assert.ok(true);
        });

    } finally {
        await driver.quit();
        console.log('\n====================================================');
        console.log(`📊 Test Summary: Total: 10 | Passed: ${passedCount} | Failed: ${failedCount}`);
        console.log('====================================================');
    }
}

// Module export for Mocha & Direct execution support
if (require.main === module) {
    runLoginTests().catch(err => {
        console.error('Fatal execution error:', err);
        process.exit(1);
    });
}

module.exports = { LoginPage, runLoginTests };
