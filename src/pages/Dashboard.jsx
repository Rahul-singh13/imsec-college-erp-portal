import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Download, Eye, Printer, FileText } from 'lucide-react';
import Modal from '../components/Modal';

// Exact notice list extracted directly from the HAR
const exactNotices = [
  {
    id: 1,
    isNew: true,
    date: '11-09-2026',
    title: 'AICTE Pragati Scholarship Scheme (Only for Girl Students) fresh & renewal applications Session 2026-27',
    file: 'AICTE_Pragati_Scholarship_2026_27.pdf',
    description: 'Online application window for AICTE Pragati Scholarship Scheme (for girl students admitted in first year / lateral entry second year) is now live on National Scholarship Portal.'
  },
  {
    id: 2,
    isNew: false,
    date: '02-09-2026',
    title: 'Warning Notice for Odd Sem Academic Fee and Registration Form of B.Tech, MBA, MCA, M.Tech Second, third and final Years Students Session 2026-27',
    file: 'Warning_Notice_Odd_Sem_Academic_Fee_Registration_Form_2026.pdf',
    description: 'All 2nd, 3rd, and 4th year students must complete semester registration and clear outstanding tuition balances before the cutoff date to prevent de-registration.'
  },
  {
    id: 3,
    isNew: false,
    date: '21-08-2026',
    title: 'Notice for Odd Sem Registration Form of B.Tech, MBA, MCA, M.Tech Second, third and final Years Students Session 2026-27',
    file: 'Reminder_Notice_Registration_Process_Odd_Sem_2026_27.pdf',
    description: 'Detailed instructions on digital subject selection, elective choices, and student verification for Odd Semester 2026-27.'
  },
  {
    id: 4,
    isNew: false,
    date: '18-08-2026',
    title: 'Regarding Reopening of the ERP Portal for Challenge Evaluation (Stage–I) on 19 and 20 August 2026 for the Even Semester, Session 2025–26.',
    file: 'Challenge_Evaluation_Stage_I_Reopening_Notice.pdf',
    description: 'AKTU university notification regarding stage-1 answer sheet evaluation view window.'
  },
  {
    id: 5,
    isNew: false,
    date: '17-08-2026',
    title: 'NOTICE FOR BRANCH CHANGE - SESSION 2026-27',
    file: 'Notice_Branch_Change_2026_27.pdf',
    description: 'Rules and eligibility criteria for branch change based on first-year B.Tech CGPA.'
  },
  {
    id: 6,
    isNew: false,
    date: '05-08-2026',
    title: 'Regarding Challenge Evaluation (Stage–II) for the Even Semester Examination Session 2025–26',
    file: 'Challenge_Evaluation_Stage_II_Notice.pdf',
    description: 'Application process for re-checking theory answer scripts.'
  },
  {
    id: 7,
    isNew: false,
    date: '31-07-2026',
    title: 'Notice - Extension of due date for Payment and Registration Process of Odd Semester Session 2026-27',
    file: 'Notice_Extension_Due_Date_Payment_Registration_2026.pdf',
    description: 'Final extension granted for semester fee clearance without late surcharge.'
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [regFormModalOpen, setRegFormModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();

  const filteredNotices = exactNotices.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.date.includes(searchQuery)
  );

  const displayedNotices = filteredNotices.slice(0, visibleCount);

  return (
    <div>
      {/* 1. Hamburger Icon Bar */}
      <div className="hamburger-bar">
        <button
          type="button"
          className="hamburger-btn"
          title="Toggle Navigation Menu"
          onClick={() => {
            const sidebar = document.querySelector('.left.side-menu');
            if (sidebar) {
              sidebar.classList.toggle('mobile-open');
            }
          }}
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* 2. Top 5 Navy Blue Widgets (Exact HAR Match) */}
      <div className="dues_fee_div">
        <div className="dues_fee_grid">
          
          {/* 1. Fee Dues */}
          <Link to="/academic_payment" className="div_6" style={{ textDecoration: 'none' }}>
            <div className="widget green-1">
              <div className="widget-content padding">
                <div className="widget-icon">
                  <img src="/school.svg" className="img-responsive center-block" alt="Fee Dues" />
                </div>
                <div className="text-box">
                  <h2>0.00</h2>
                </div>
              </div>
              <div className="widget-footer">
                <b>Fee Dues</b>
              </div>
            </div>
          </Link>

          {/* 2. Hostel Dues */}
          <Link to="/hostel_request" className="div_6" style={{ textDecoration: 'none' }}>
            <div className="widget green-1">
              <div className="widget-content padding">
                <div className="widget-icon">
                  <img src="/Hostel.svg" className="img-responsive center-block" alt="Hostel Dues" />
                </div>
                <div className="text-box">
                  <h2>0.00</h2>
                </div>
              </div>
              <div className="widget-footer">
                <b>Hostel Dues</b>
              </div>
            </div>
          </Link>

          {/* 3. Attendance Status */}
          <div className="div_6">
            <div className="widget green-1">
              <div className="widget-content padding">
                <div className="widget-icon">
                  <img src="/Committee.svg" className="img-responsive center-block" alt="Attendance Status" />
                </div>
                <div className="text-box">
                  <h2>Good</h2>
                </div>
              </div>
              <div className="widget-footer">
                <b>Attendance Status</b>
              </div>
            </div>
          </div>

          {/* 4. Attendance % */}
          <Link to="/subject_wise_attendence" className="div_6" style={{ textDecoration: 'none' }}>
            <div className="widget green-1">
              <div className="widget-content padding">
                <div className="widget-icon">
                  <img src="/Profile.svg" className="img-responsive center-block" alt="Attendance %" />
                </div>
                <div className="text-box">
                  <h2>73%</h2>
                </div>
              </div>
              <div className="widget-footer">
                <b>Attendance %</b>
              </div>
            </div>
          </Link>

          {/* 5. Sport & Cultural Event */}
          <Link to="/student_event" className="div_6" style={{ textDecoration: 'none' }}>
            <div className="widget green-1">
              <div className="widget-content padding">
                <div className="widget-icon">
                  <img src="/Committee.svg" className="img-responsive center-block" alt="Sport & Cultural Event" />
                </div>
                <div className="text-box">
                  <h2>0</h2>
                </div>
              </div>
              <div className="widget-footer">
                <b>Sport & Cultural Event</b>
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* 3. Notice List Header Row */}
      <div className="notice-list-header">
        <h2 className="notice-title-text">
          <strong>Notice</strong>
          <span>List</span>
        </h2>

        {/* Center Blinking Orange Link */}
        <div>
          <Link
            to="/subject_wise_attendence"
            className="blink_me"
          >
            Attendance /Performance Letter
          </Link>
        </div>

        {/* Right Print Registration Button */}
        <div>
          <button
            type="button"
            className="btn-print-reg"
            onClick={() => setRegFormModalOpen(true)}
          >
            Print Registration Form &gt;&gt;
          </button>
        </div>
      </div>

      {/* Center Sub Blinking Link for Faculty Feedback */}
      <div>
        <Link to="/feedback" className="blink_me_sub">
          Faculty Feedback
        </Link>
      </div>

      {/* 4. Search Filter Input */}
      <div className="notice-search-box">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 5. Notice Table (Exact columns: No | Date | Title | Option) */}
      <div className="notice-table-container">
        <table className="notice-table">
          <thead>
            <tr>
              <th style={{ width: '8%' }}>No</th>
              <th style={{ width: '14%' }}>Date</th>
              <th>Title</th>
              <th style={{ width: '9%', textAlign: 'center' }}>Option</th>
            </tr>
          </thead>
          <tbody>
            {displayedNotices.map((notice, idx) => (
              <tr key={notice.id}>
                <td>
                  <strong>{idx + 1}</strong>
                  {notice.isNew && <span className="badge-new-box">New</span>}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{notice.date}</td>
                <td>
                  <span
                    style={{ cursor: 'pointer', color: '#333' }}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    {notice.title}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div className="btn-group-option">
                    <button
                      type="button"
                      className="btn-option-blue"
                      title="Download Notice PDF"
                      onClick={() => {
                        alert(`[DEMO]: Downloading "${notice.file}"...`);
                      }}
                    >
                      <Download size={12} />
                    </button>
                    <button
                      type="button"
                      className="btn-option-blue"
                      title="View Notice Details"
                      onClick={() => setSelectedNotice(notice)}
                    >
                      <Eye size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Link */}
      {visibleCount < filteredNotices.length && (
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <button
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#d9534f',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => setVisibleCount(filteredNotices.length)}
          >
            Load More
          </button>
        </div>
      )}

      {/* 6. Red Bottom Pagination Buttons */}
      <div className="erp-pagination-group">
        <button
          type="button"
          className="btn-page-red"
          onClick={() => setActivePage(1)}
        >
          &laquo;
        </button>
        <button
          type="button"
          className="btn-page-red"
          onClick={() => setActivePage(Math.max(1, activePage - 1))}
        >
          &lsaquo;
        </button>
        <button
          type="button"
          className={`btn-page-red ${activePage === 1 ? 'active' : ''}`}
          onClick={() => setActivePage(1)}
        >
          1
        </button>
        <button
          type="button"
          className={`btn-page-red ${activePage === 2 ? 'active' : ''}`}
          onClick={() => setActivePage(2)}
        >
          2
        </button>
        <button
          type="button"
          className={`btn-page-red ${activePage === 3 ? 'active' : ''}`}
          onClick={() => setActivePage(3)}
        >
          3
        </button>
        <button
          type="button"
          className="btn-page-red"
          onClick={() => setActivePage(Math.min(3, activePage + 1))}
        >
          &rsaquo;
        </button>
        <button
          type="button"
          className="btn-page-red"
          onClick={() => setActivePage(3)}
        >
          &raquo;
        </button>
      </div>

      {/* Notice Detail View Modal */}
      <Modal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        title={selectedNotice ? selectedNotice.title : 'Notice Details'}
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setSelectedNotice(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={() => {
                alert(`[DEMO]: Downloading "${selectedNotice?.file}"...`);
              }}
            >
              <Download size={13} /> Download File ({selectedNotice?.file})
            </button>
          </>
        }
      >
        {selectedNotice && (
          <div>
            <div style={{ background: '#f5f5f5', padding: '10px 14px', borderRadius: '3px', marginBottom: '12px', fontSize: '12px' }}>
              <div><strong>Notice Date:</strong> {selectedNotice.date}</div>
              <div><strong>Digital File:</strong> {selectedNotice.file}</div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333' }}>
              {selectedNotice.description}
            </p>
          </div>
        )}
      </Modal>

      {/* Print Registration Form Modal */}
      <Modal
        isOpen={regFormModalOpen}
        onClose={() => setRegFormModalOpen(false)}
        title="Student Semester Registration Form"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setRegFormModalOpen(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={() => window.print()}
            >
              <Printer size={13} /> Print Registration Slip
            </button>
          </>
        }
      >
        <div style={{ padding: '10px', fontSize: '12.5px', lineHeight: '1.6' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #253973', paddingBottom: '10px', marginBottom: '15px' }}>
            <h3 style={{ color: '#253973', margin: 0 }}>IMS ENGINEERING COLLEGE, GHAZIABAD</h3>
            <div style={{ fontSize: '11px', color: '#666' }}>ODD SEMESTER REGISTRATION FORM (SESSION 2026-27)</div>
          </div>
          <table className="notice-table" style={{ marginBottom: '15px' }}>
            <tbody>
              <tr>
                <th style={{ width: '40%' }}>Student ID</th>
                <td><strong>A2024CSE10363</strong></td>
              </tr>
              <tr>
                <th>Student Name</th>
                <td>Demo Student</td>
              </tr>
              <tr>
                <th>Branch / Semester</th>
                <td>B.Tech Computer Science & Engineering - Sem 5</td>
              </tr>
              <tr>
                <th>Registration Status</th>
                <td><strong style={{ color: '#28a745' }}>COMPLETED & VERIFIED</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
