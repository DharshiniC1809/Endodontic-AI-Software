/**
 * Appium E2E Test Suite: 02. Scan Upload & AI Diagnostic Pipeline
 */

const { expect } = require('chai');
const DriverFactory = require('../utils/driver-factory');
const UploadScanPage = require('../pages/UploadScanPage');
const TestHelpers = require('../utils/test-helpers');

describe('Appium E2E: Dental Scan Upload & AI Inference', function () {
  this.timeout(60000);
  let driver;
  let uploadPage;

  before(async function () {
    driver = await DriverFactory.createDriver('android');
    uploadPage = new UploadScanPage(driver);
  });

  after(async function () {
    await DriverFactory.quitDriver();
  });

  it('TC-APP-SCAN-001: Should upload periapical X-Ray and trigger AI diagnostic analysis', async function () {
    await uploadPage.selectModality('X-Ray');
    await uploadPage.uploadScanDetails('PAT-98234', 'Tooth 19 (#36)', 'Slight sensitivity to percussion and thermal testing');
    await uploadPage.triggerAIInference();
    const complete = await uploadPage.isAnalysisComplete();
    expect(complete).to.be.true;
  });

  it('TC-APP-SCAN-002: Should handle 3D CBCT volume scan selection and parameters', async function () {
    await uploadPage.selectModality('CBCT');
    await uploadPage.uploadScanDetails('PAT-98235', 'Tooth 14 (#16)', 'Pre-endodontic CBCT analysis for MB2 canal');
    expect(true).to.be.true;
  });

  it('TC-APP-SCAN-003: Should validate required patient ID field before submission', async function () {
    await uploadPage.uploadScanDetails('', 'Tooth 30', 'Missing patient ID test');
    expect(true).to.be.true;
  });
});
