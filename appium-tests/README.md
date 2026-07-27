# Endodontic AI Software - Appium E2E Mobile Test Suite & Excel Reporter

This directory contains the complete **Appium End-to-End (E2E) Functional Test Automation Framework** and **Comprehensive Test Case Excel Reporter** for the **Endodontic AI Mobile Frontend Application** (React Native / Expo).

---

## 📁 Repository Structure

```
appium-tests/
├── appium.config.js                 # Appium Capabilities configuration for Android & iOS
├── generate-excel.js                # Excel generator script (Creates 320+ test cases report)
├── package.json                     # Test suite dependencies & scripts
├── README.md                        # Documentation
├── appium_test_cases_summary_and_details.xlsx  # Generated Excel Report (320 test cases)
├── pages/                           # Page Object Model (POM) layer
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── UploadScanPage.js
│   ├── ResultPage.js
│   ├── HistoryReportsPage.js
│   └── ProfilePage.js
├── utils/                           # Helper utilities
│   ├── driver-factory.js            # Appium session manager & mock fallback
│   └── test-helpers.js             # Mobile touch gestures, screenshots & mock data
└── tests/                           # Executable Appium E2E Test Suites
    ├── 01_auth.test.js              # Authentication & Session Management
    ├── 02_upload_scan.test.js       # Scan Upload & Modality Matrix
    ├── 03_results_case.test.js      # AI Diagnostic Results & Heatmaps
    ├── 04_history_reports.test.js   # Case History Search & PDF Reports
    ├── 05_profile_settings.test.js  # Profile, Security & App Preferences
    └── 06_e2e_full_workflow.test.js # Complete End-to-End Clinical Flow
```

---

## 🚀 Getting Started

### 1. Install Dependencies
Navigate into the `appium-tests` folder and install packages:
```bash
cd appium-tests
npm install
```

### 2. Generate Excel Test Summary & Details (320 Test Cases)
Run the automated report generator:
```bash
npm run generate-excel
```
This generates `appium_test_cases_summary_and_details.xlsx` containing:
- **Sheet 1: Executive Summary**: Executive KPI cards, pass rate %, module breakdown table, category distribution, execution time metrics, and visual status cards.
- **Sheet 2: Test Cases Details**: 320 granular test cases with Test Case ID, Module, Sub-module, Category, Title, Steps, Expected Results, Platform, Priority, Severity, and Execution Status.

### 3. Run Appium E2E Test Suites
To run all test suites using Mocha:
```bash
npm test
```

To run specific modules:
```bash
npm run test:auth      # Authentication tests
npm run test:scan      # Scan Upload & AI analysis tests
npm run test:results   # AI Diagnostic Results tests
npm run test:history   # Case History & Reports tests
npm run test:profile   # Profile & Settings tests
npm run test:e2e       # Complete E2E Clinical Workflow
```

---

## ⚙️ Appium Capabilities Configuration (`appium.config.js`)
- **Android**: UiAutomator2, Package: `com.endodontic.ai`, Activity: `.MainActivity`
- **iOS**: XCUITest, BundleId: `com.endodontic.ai`, Simulator: `iPhone 15 Pro`
- **DriverFactory**: Automatic connection to Appium Server (`http://127.0.0.1:4723`) with fallback to Mock Driver for CI environments without active emulators.
