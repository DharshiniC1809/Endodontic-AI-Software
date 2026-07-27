/**
 * Page Object Model: AI Diagnostic Results & Case Analysis Screen
 */

const BasePage = require('./BasePage');

class ResultPage extends BasePage {
  // Locators
  get confidenceScoreCard() { return '~confidence-score-card'; }
  get diagnosisTitle() { return '~diagnosis-title-text'; }
  get lesionHeatmapOverlay() { return '~lesion-heatmap-overlay'; }
  get recommendationsList() { return '~recommendations-list'; }
  get exportPdfButton() { return '~export-pdf-button'; }
  get saveCaseButton() { return '~save-case-button'; }
  get shareReportButton() { return '~share-report-button'; }
  get reanalyzeButton() { return '~reanalyze-button'; }

  async getConfidenceScore() {
    return await this.getText(this.confidenceScoreCard);
  }

  async getDiagnosisSummary() {
    return await this.getText(this.diagnosisTitle);
  }

  async exportReportPDF() {
    await this.click(this.exportPdfButton);
    await this.pause(1000);
  }

  async saveCaseToHistory() {
    await this.click(this.saveCaseButton);
    await this.pause(500);
  }
}

module.exports = ResultPage;
