/**
 * Page Object Model: Case History & Reports List Screen
 */

const BasePage = require('./BasePage');

class HistoryReportsPage extends BasePage {
  // Locators
  get searchInput() { return '~history-search-input'; }
  get filterDropdown() { return '~history-filter-dropdown'; }
  get caseCardsList() { return '~case-card-item'; }
  get reportDownloadButton() { return '~report-download-btn'; }
  get exportAllButton() { return '~export-all-history-btn'; }

  async searchPatient(query) {
    await this.typeText(this.searchInput, query);
    await this.pause(500);
  }

  async filterBySeverity(severity = 'High') {
    await this.click(this.filterDropdown);
    // Click severity item
    await this.pause(300);
  }

  async getCaseCount() {
    const cards = await this.findElements(this.caseCardsList);
    return cards.length;
  }
}

module.exports = HistoryReportsPage;
