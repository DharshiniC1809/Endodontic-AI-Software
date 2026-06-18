# Endodontic AI Prediction System - Backend

## Overview

The backend of the Endodontic AI Prediction System handles user authentication, OTP verification, scan uploads, AI analysis requests, report storage, and patient case management.

## Technologies Used

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI Engine

* Python
* Flask
* OpenCV
* Scikit-learn

### Email Service

* Nodemailer
* Gmail SMTP

## Features

### Authentication Module

* User Registration
* User Login
* Update Profile
* Change Password
* Forgot Password
* OTP Verification
* Password Reset

### AI Analysis Module

* Upload X-Ray Images
* Upload CBCT Images
* ROI Processing
* Feature Extraction
* AI Prediction Service Integration

### Case Management

* Save Analysis Results
* Retrieve History
* Update Notes
* Delete Cases

### Report Management

* Store Reports
* Retrieve Reports
* Export Results

## API Endpoints

### Authentication

POST /api/auth/signup

POST /api/auth/login

POST /api/auth/send-otp

POST /api/auth/verify-otp

POST /api/auth/reset-password

POST /api/auth/change-password

PUT /api/auth/profile

### Analysis

POST /api/analysis/save

GET /api/analysis/history/:userId

PUT /api/analysis/notes/:id

DELETE /api/analysis/:id

### Upload

POST /api/upload

## Environment Variables

Create a .env file:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

EMAIL_USER=[your_email@gmail.com](mailto:your_email@gmail.com)

EMAIL_PASS=your_gmail_app_password

## Installation

1. Clone Repository

git clone <repository-url>

2. Navigate to backend folder

cd backend

3. Install dependencies

npm install

4. Start Server

npm run dev

or

npm start

## Backend Architecture

React Native App
↓
Node.js / Express API
↓
MongoDB Database
↓
Flask AI Service
↓
OpenCV + Scikit-Learn Processing

## AI Prediction Workflow

1. Upload Dental Scan
2. ROI Selection
3. Image Preprocessing
4. Feature Extraction
5. Machine Learning Prediction
6. Success Probability Classification
7. Report Generation

Prediction Levels:

* HIGH SUCCESS
* MODERATE SUCCESS
* LOW SUCCESS

## Developed For

Final Year B.E Computer Science and Engineering Project

Title:
Endodontic AI Prediction System for Treatment Success Prediction Using X-Ray and CBCT Imaging Using Machine Learning
