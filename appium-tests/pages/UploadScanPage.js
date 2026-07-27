/**
 * Page Object Model: Upload Scan & AI Selection Screen
 */

const BasePage = require('./BasePage');

class UploadScanPage extends BasePage {
  // Locators
  get selectXRayButton() { return '~select-xray-button'; }
  get selectCBCTButton() { return '~select-cbct-button'; }
  get cameraCaptureButton() { return '~camera-capture-button'; }
  get fileGalleryPicker() { return '~file-gallery-picker'; }
  get patientIdInput() { return '~patient-id-input'; }
  get toothNumberSelector() { return '~tooth-number-selector'; }
  get clinicalNotesInput() { return '~clinical-notes-input'; }
  get runAIAnalysisButton() { return '~run-ai-analysis-button'; }
  get scanPreviewImage() { return '~scan-preview-image'; }
  get progressIndicator() { return '~ai-processing-loader'; }

  async selectModality(type = 'X-Ray') {
    if (type === 'CBCT') {
      await this.click(this.selectCBCTButton);
    } else {
      await this.click(this.selectXRayButton);
    }
  }

  async uploadScanDetails(patientId, toothNum, notes) {
    await this.typeText(this.patientIdInput, patientId);
    if (await this.isVisible(this.toothNumberSelector)) {
      await this.typeText(this.toothNumberSelector, toothNum);
    }
    await this.typeText(this.clinicalNotesInput, notes);
  }

  async triggerAIInference() {
    await this.click(this.runAIAnalysisButton);
    await this.pause(1500);
  }

  async isAnalysisComplete() {
    if (this.driver.isMock) return true;
    return !(await this.isVisible(this.progressIndicator));
  }
}

module.exports = UploadScanPage;
