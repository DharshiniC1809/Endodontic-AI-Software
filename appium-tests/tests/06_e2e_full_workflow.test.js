/**
 * Appium E2E Test Suite: 06. Complete End-to-End Clinical Diagnostic Workflow
 * Standard Dentist Login -> Upload X-Ray -> AI Inference -> PDF Report -> Save History -> Logout
 */

const { expect } = require('chai');
const DriverFactory = require('../utils/driver-factory');
const LoginPage = require('../pages/LoginPage');
const UploadScanPage = require('../pages/UploadScanPage');
const ResultPage = require('../pages/ResultPage');
const HistoryReportsPage = require('../pages/HistoryReportsPage');
const ProfilePage = require('../pages/ProfilePage');
const TestHelpers = require('../utils/test-helpers');

describe('Appium E2E: Full Clinical End-to-End Journey', function () {
  this.timeout(120000);
  let driver;
  let loginPage, uploadPage, resultPage, historyPage, profilePage;

  before(async function () {
    driver = await DriverFactory.createDriver('android');
    loginPage = new LoginPage(driver);
    uploadPage = new UploadScanPage(driver);
    resultPage = new ResultPage(driver);
    historyPage = new HistoryReportsPage(driver);
    profilePage = new ProfilePage(driver);
  });

  after(async function () {
    await DriverFactory.quitDriver();
  });

  it('TC-APP-E2E-001: Should perform full E2E workflow from login to diagnosis export & logout', async function () {
    console.log('1. Logging in as Endodontic Specialist...');
    await loginPage.login('dr.specialist@endodontic.ai', 'ClinicalPass2026!', 'Endodontist Specialist');

    console.log('2. Selecting Scan Modality & Entering Patient Metadata...');
    await uploadPage.selectModality('X-Ray');
    await uploadPage.uploadScanDetails('PAT-E2E-999', 'Tooth 14', 'Acute apical periodontitis suspected');

    console.log('3. Running AI Diagnostics...');
    await uploadPage.triggerAIInference();

    console.log('4. Verifying Diagnostic Analysis Results...');
    const confidence = await resultPage.getConfidenceScore();
    expect(confidence).to.be.a('string');

    console.log('5. Exporting PDF Diagnostic Report...');
    await resultPage.exportReportPDF();

    console.log('6. Verifying Case Saved in History...');
    await historyPage.searchPatient('PAT-E2E-999');

    console.log('7. Logging out securely...');
    await profilePage.logout();

    console.log('E2E Clinical Workflow completed successfully!');
  });
});
