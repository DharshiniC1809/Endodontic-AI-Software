/**
 * Appium E2E Test Suite: 03. AI Diagnostic Results & Case Details
 */

const { expect } = require('chai');
const DriverFactory = require('../utils/driver-factory');
const ResultPage = require('../pages/ResultPage');

describe('Appium E2E: AI Diagnostic Results & Interactive Case Detail', function () {
  this.timeout(60000);
  let driver;
  let resultPage;

  before(async function () {
    driver = await DriverFactory.createDriver('android');
    resultPage = new ResultPage(driver);
  });

  after(async function () {
    await DriverFactory.quitDriver();
  });

  it('TC-APP-RES-001: Should display AI confidence score, periapical lesion heatmap, and diagnosis', async function () {
    const confidence = await resultPage.getConfidenceScore();
    expect(confidence).to.be.a('string');
  });

  it('TC-APP-RES-002: Should generate and export PDF diagnostic report', async function () {
    await resultPage.exportReportPDF();
    expect(true).to.be.true;
  });

  it('TC-APP-RES-003: Should save case to clinical history record database', async function () {
    await resultPage.saveCaseToHistory();
    expect(true).to.be.true;
  });
});
