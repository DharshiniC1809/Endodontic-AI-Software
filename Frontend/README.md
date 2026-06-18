# Endodontic AI Prediction System - Frontend

## Overview

The Endodontic AI Prediction System Frontend is developed using React Native and Expo. It provides a modern and responsive user interface for dentists to upload dental scans, perform AI-based analysis, manage patient cases, generate reports, and monitor treatment success predictions.

## Technologies Used

* React Native
* Expo
* React Navigation
* AsyncStorage
* Expo Linear Gradient
* Expo Vector Icons
* React Native Gesture Handler
* React Native Reanimated

## Features

### Authentication

* User Registration
* User Login
* Forgot Password with OTP Verification
* Reset Password
* Change Password
* Profile Management

### Scan Analysis

* X-Ray Upload
* CBCT Upload
* ROI Selection
* Scan Preview
* AI Analysis Request

### Case Management

* Case History
* Case Details
* Notes Management
* Delete Case

### Reports

* Report Generation
* Report Viewing
* PDF Report Download

## Project Structure

src/
├── navigation/
├── screens/
├── services/
├── assets/
└── components/

## Installation

1. Clone the repository

git clone <repository-url>

2. Navigate to frontend directory

cd frontend

3. Install dependencies

npm install

4. Start Expo

npx expo start

## Running on Devices

* Android Emulator
* Physical Android Device
* iOS Simulator
* Web Browser

## API Connection

Update API URL in:

src/services/api.js

Example:

const API_URL = "http://YOUR_IP_ADDRESS:5000/api";

## Future Enhancements

* AI Confidence Visualization
* Dashboard Analytics
* Cloud Storage Integration
* Multi-Doctor Access
* Real-Time Notifications

## Developed For

Final Year B.E Computer Science and Engineering Project

Title:
Endodontic AI Prediction System for Treatment Success Prediction Using Dental Imaging and Machine Learning
