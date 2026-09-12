# {{PROJECT_NAME}}

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 🎓 **High-fidelity 100% pixel-perfect educational clone of the IMSEC College ERP Student Portal** (`/academic`). Built for offline reliability, performance, and demonstration of modern modular frontend architecture.

---

## 🌟 Key Highlights & Features

- 🏛️ **Pixel-Perfect ERP Portal**: Exact replication of IMSEC layout, color palette (#253973 Navy, #F8C12D Yellow active navigation), typography, blinking alerts, and pagination.
- ⚡ **Decoupled Architecture**: 
  - Mock database (`src/backend/mockDatabase.js`)
  - Academic & Finance services (`src/backend/academicService.js`, `src/backend/financeService.js`)
  - Universal API client (`src/api/apiClient.js`) with seamless switch between local mock data and live REST endpoints.
- 📱 **All 29 Routes Implemented**: Complete student workflows including Dashboard, Subject-wise Attendance, Fee Receipts, Library Books, Examination Admit Cards, Grievances, Gate Passes, and Hostel Management.
- 🔒 **Zero Hardcoded Secrets**: Fully sanitized, offline-capable, and secure.

---

## 📸 Visual Showcase

### 1. Academic Student Dashboard (`/academic`)
![Dashboard Showcase](public/screenshots/dashboard.png)

### 2. Subject-wise Attendance Tracker (`/subject_wise_attendence`)
![Attendance Showcase](public/screenshots/attendance.png)

### 3. Digital Library Portal (`/library_book`)
![Library Showcase](public/screenshots/library.png)

### 4. Student Admission Details (`/view_admission`)
![Admission Showcase](public/screenshots/admission.png)

---

## 🏗️ Architecture & Decoupled Design

```mermaid
graph TD
    UI[React 18 SPA Components] --> Router[React Router DOM]
    Router --> Client[API Client Layer]
    Client --> Backend[Mock Service Layer]
    Backend --> DB[(Local Mock Database / JSON Store)]
```

---

## 🚀 Getting Started

```bash
# 1. Clone repository
git clone https://github.com/Rahul-singh13/imsec-college-erp-portal.git

# 2. Navigate to project
cd imsec-college-erp-portal

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build
```

---

## 📄 License
MIT License. Created for educational & architectural demonstration purposes.
