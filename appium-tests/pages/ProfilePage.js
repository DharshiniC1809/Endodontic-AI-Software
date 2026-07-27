/**
 * Page Object Model: Profile & Settings Screen
 */

const BasePage = require('./BasePage');

class ProfilePage extends BasePage {
  // Locators
  get editProfileButton() { return '~edit-profile-btn'; }
  get changePasswordButton() { return '~change-password-btn'; }
  get darkModeToggle() { return '~dark-mode-toggle'; }
  get biometricAuthToggle() { return '~biometric-auth-toggle'; }
  get logoutButton() { return '~logout-button'; }
  get confirmLogoutModalBtn() { return '~confirm-logout-modal-btn'; }

  async toggleDarkMode() {
    await this.click(this.darkModeToggle);
  }

  async logout() {
    await this.click(this.logoutButton);
    if (await this.isVisible(this.confirmLogoutModalBtn)) {
      await this.click(this.confirmLogoutModalBtn);
    }
    await this.pause(500);
  }
}

module.exports = ProfilePage;
