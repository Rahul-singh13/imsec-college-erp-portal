# 🎓 IMSEC COLLEGE ERP PORTAL — Architectural & Visual Showcase

> **Author**: Rahul Singh (@Rahul-singh13)
> **Tech Stack**: React, Vite, React Router
> **Modules**: 29 Views

---

## 📌 1. Project Overview
🎓 High-fidelity React 18.3.1 + Vite educational clone of IMSEC College ERP with 29 modules, decoupled mock backend services & vanilla design system.

---

## 🏛️ 2. Key Modules & Pages
- **AcademicPayment**
- **AdmissionProject**
- **AdmitCard**
- **AssignmentList**
- **BirthdayList**
- **ChangePassword**
- **CompanyList**
- **ComplaintList**
- **Dashboard**
- **DownloadForms**
- **Feedback**
- **GatePassList**
- **HostelRequest**
- **LibraryBook**
- **LogoutPage**
- **NoDuesList**
- **NoticeList**
- **OnlineTxn**
- **RfidRequest**
- **ScheduleWiseAttendance**

---

## 🛠️ 3. Architecture & Data Flow
```mermaid
flowchart TD
    Client[Frontend UI Components] --> Adapter[API Client Layer]
    Adapter --> Academic[Academic Service]
    Adapter --> Finance[Finance Service]
    Academic --> DB[(Mock In-Memory DB)]
    Finance --> DB
```

---

## 🎯 4. Visual Verification
### Admission
![Admission](public/screenshots/admission.png)

### Attendance
![Attendance](public/screenshots/attendance.png)

### Dashboard
![Dashboard](public/screenshots/dashboard.png)

### Library
![Library](public/screenshots/library.png)

