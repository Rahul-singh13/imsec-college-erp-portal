import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import NoticeList from './pages/NoticeList';
import ViewAdmission from './pages/ViewAdmission';
import AdmissionProject from './pages/AdmissionProject';
import TrainingMaterialList from './pages/TrainingMaterialList';
import StudentEvent from './pages/StudentEvent';
import CompanyList from './pages/CompanyList';
import UploadDocumentsForm from './pages/UploadDocumentsForm';
import SubjectWiseAttendance from './pages/SubjectWiseAttendance';
import ScheduleWiseAttendance from './pages/ScheduleWiseAttendance';
import AdmitCard from './pages/AdmitCard';
import AssignmentList from './pages/AssignmentList';
import TestMarks from './pages/TestMarks';
import Feedback from './pages/Feedback';
import ComplaintList from './pages/ComplaintList';
import RfidRequest from './pages/RfidRequest';
import BirthdayList from './pages/BirthdayList';
import DownloadForms from './pages/DownloadForms';
import AcademicPayment from './pages/AcademicPayment';
import OnlineTxn from './pages/OnlineTxn';
import NoDuesList from './pages/NoDuesList';
import Scholarship from './pages/Scholarship';
import HostelRequest from './pages/HostelRequest';
import GatePassList from './pages/GatePassList';
import WiFiServices from './pages/WiFiServices';
import LibraryBook from './pages/LibraryBook';
import StudentRepresentative from './pages/StudentRepresentative';
import ChangePassword from './pages/ChangePassword';
import LogoutPage from './pages/LogoutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application with Sidebar & Topbar Layout */}
        <Route path="/" element={<MainLayout />}>
          {/* Default redirect to /academic */}
          <Route index element={<Navigate to="/academic" replace />} />
          <Route path="academic" element={<Dashboard />} />
          <Route path="user" element={<Navigate to="/academic" replace />} />

          {/* 1. Notices */}
          <Route path="notice_list" element={<NoticeList />} />

          {/* 2. Admission / Student Profile */}
          <Route path="view_admission" element={<ViewAdmission />} />
          <Route path="admission_project" element={<AdmissionProject />} />

          {/* 3. Notes & Events */}
          <Route path="training_material_list" element={<TrainingMaterialList />} />
          <Route path="student_event" element={<StudentEvent />} />

          {/* 4. Placement */}
          <Route path="company_list" element={<CompanyList />} />
          <Route path="upload_documents_form" element={<UploadDocumentsForm />} />

          {/* 5. Attendance Reports */}
          <Route path="subject_wise_attendence" element={<SubjectWiseAttendance />} />
          <Route path="schedule_wise_attendence" element={<ScheduleWiseAttendance />} />

          {/* 6. Examination */}
          <Route path="admitCard" element={<AdmitCard />} />
          <Route path="assignment_list" element={<AssignmentList />} />
          <Route path="testmarks" element={<TestMarks />} />
          <Route path="feedback" element={<Feedback />} />

          {/* 7. Student Welfare & Grievances */}
          <Route path="complaint_list" element={<ComplaintList />} />
          <Route path="rfid_request" element={<RfidRequest />} />
          <Route path="birthday_list" element={<BirthdayList />} />
          <Route path="download_forms" element={<DownloadForms />} />

          {/* 8. Fees & Clearance */}
          <Route path="academic_payment" element={<AcademicPayment />} />
          <Route path="online_txn" element={<OnlineTxn />} />
          <Route path="no_dues_list" element={<NoDuesList />} />
          <Route path="scholarship" element={<Scholarship />} />

          {/* 9. Hostel & Campus Services */}
          <Route path="hostel_request" element={<HostelRequest />} />
          <Route path="gate_pass_list" element={<GatePassList />} />
          <Route path="wi_fi_services" element={<WiFiServices />} />
          <Route path="library_book" element={<LibraryBook />} />
          <Route path="student_representative" element={<StudentRepresentative />} />

          {/* 10. Security & Settings */}
          <Route path="change_password" element={<ChangePassword />} />
        </Route>

        {/* Standalone Logout Page */}
        <Route path="/logout" element={<LogoutPage />} />

        {/* Catch-all route -> redirect to academic dashboard */}
        <Route path="*" element={<Navigate to="/academic" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
