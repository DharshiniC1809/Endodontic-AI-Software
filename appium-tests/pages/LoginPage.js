/**
 * Page Object Model: Login & Signup Screens
 */

const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  // Locators
  get emailInput() { return '~email-input'; }
  get passwordInput() { return '~password-input'; }
  get loginButton() { return '~login-button'; }
  get signupTab() { return '~signup-tab-button'; }
  get forgotPasswordLink() { return '~forgot-password-link'; }
  get errorMessageText() { return '~error-message-text'; }
  get userRoleSelector() { return '~user-role-picker'; }
  get rememberMeCheckbox() { return '~remember-me-checkbox'; }

  // Signup locators
  get fullNameInput() { return '~full-name-input'; }
  get confirmPasswordInput() { return '~confirm-password-input'; }
  get registerButton() { return '~register-button'; }

  async login(email, password, role = 'Dentist') {
    await this.typeText(this.emailInput, email);
    await this.typeText(this.passwordInput, password);
    if (await this.isVisible(this.userRoleSelector)) {
      await this.click(this.userRoleSelector);
    }
    await this.click(this.loginButton);
    await this.pause(1000);
  }

  async signup(fullName, email, password, confirmPassword) {
    if (await this.isVisible(this.signupTab)) {
      await this.click(this.signupTab);
    }
    await this.typeText(this.fullNameInput, fullName);
    await this.typeText(this.emailInput, email);
    await this.typeText(this.passwordInput, password);
    await this.typeText(this.confirmPasswordInput, confirmPassword);
    await this.click(this.registerButton);
    await this.pause(1000);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessageText);
  }
}

module.exports = LoginPage;
