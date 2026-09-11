import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  UserPlus,
  Droplets,
  CreditCard,
  FileText,
  Cake,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ isOpen, onCloseMobile, onOpenPdfModal }) {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    placement: false,
    attendance: false,
    examination: false,
    downloadForms: false,
    hostel: false
  });

  const toggleSubmenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 992 && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <div className={`left side-menu ${isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-inner">
        <div id="sidebar-menu">
          <ul>
            {/* 1. Dashboard (Exact yellow active style from screenshot) */}
            <li>
              <NavLink
                to="/academic"
                className={({ isActive }) => (isActive ? 'active-dashboard' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Menu size={16} strokeWidth={2.5} style={{ color: '#111' }} />
                  <span>DashBoard</span>
                </div>
              </NavLink>
            </li>

            {/* 2. Admission (+ icon) */}
            <li>
              <NavLink
                to="/view_admission"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Admission</span>
                </div>
              </NavLink>
            </li>

            {/* 3. My Project (+ icon) */}
            <li>
              <NavLink
                to="/admission_project"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>My Project</span>
                </div>
              </NavLink>
            </li>

            {/* 4. Notes (+ icon) */}
            <li>
              <NavLink
                to="/training_material_list"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Notes</span>
                </div>
              </NavLink>
            </li>

            {/* 5. Sport & Cultural Event (+ icon) */}
            <li>
              <NavLink
                to="/student_event"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Sport & Cultural Event</span>
                </div>
              </NavLink>
            </li>

            {/* 6. Placement (Submenu) */}
            <li className="has_sub">
              <div
                className="menu-header"
                onClick={() => toggleSubmenu('placement')}
              >
                <div className="menu-item-left">
                  <CreditCard size={15} color="#1e3570" />
                  <span>Placement</span>
                </div>
                {openMenus.placement ? (
                  <ChevronDown size={14} className="sidebar-chevron" />
                ) : (
                  <ChevronRight size={14} className="sidebar-chevron" />
                )}
              </div>
              {openMenus.placement && (
                <ul className="sub-menu">
                  <li>
                    <NavLink to="/company_list" onClick={handleLinkClick}>
                      Company
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="#/placement_rules"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onOpenPdfModal) onOpenPdfModal('Placement Rules & Guidelines');
                      }}
                    >
                      Placement Rules & Guidelines
                    </a>
                  </li>
                  <li>
                    <a
                      href="#/cv_sample"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onOpenPdfModal) onOpenPdfModal('Sample CV - Undergraduate (UG)');
                      }}
                    >
                      CV Sample
                    </a>
                  </li>
                  <li>
                    <NavLink to="/upload_documents_form" onClick={handleLinkClick}>
                      Upload Documents
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 7. Attendance Reports (Water drop icon & submenu) */}
            <li className="has_sub">
              <div
                className="menu-header"
                onClick={() => toggleSubmenu('attendance')}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Attendence Reports</span>
                </div>
                {openMenus.attendance ? (
                  <ChevronDown size={14} className="sidebar-chevron" />
                ) : (
                  <ChevronRight size={14} className="sidebar-chevron" />
                )}
              </div>
              {openMenus.attendance && (
                <ul className="sub-menu">
                  <li>
                    <NavLink to="/subject_wise_attendence" onClick={handleLinkClick}>
                      Subject Wise
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/schedule_wise_attendence" onClick={handleLinkClick}>
                      Schedule Wise
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 8. Examination (Water drop icon & submenu) */}
            <li className="has_sub">
              <div
                className="menu-header"
                onClick={() => toggleSubmenu('examination')}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Examination</span>
                </div>
                {openMenus.examination ? (
                  <ChevronDown size={14} className="sidebar-chevron" />
                ) : (
                  <ChevronRight size={14} className="sidebar-chevron" />
                )}
              </div>
              {openMenus.examination && (
                <ul className="sub-menu">
                  <li>
                    <NavLink to="/admitCard" onClick={handleLinkClick}>
                      Admit Card
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 9. Assignment (+ icon) */}
            <li>
              <NavLink
                to="/assignment_list"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Assignment</span>
                </div>
              </NavLink>
            </li>

            {/* 10. Test Marks (Water drop icon) */}
            <li>
              <NavLink
                to="/testmarks"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Test Marks</span>
                </div>
              </NavLink>
            </li>

            {/* 11. Feedback (+ icon) */}
            <li>
              <NavLink
                to="/feedback"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Feedback</span>
                </div>
              </NavLink>
            </li>

            {/* 12. Complaint (+ icon) */}
            <li>
              <NavLink
                to="/complaint_list"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Complaint</span>
                </div>
              </NavLink>
            </li>

            {/* 13. RFID Request (Document icon) */}
            <li>
              <NavLink
                to="/rfid_request"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <FileText size={15} color="#1e3570" />
                  <span>RFID Request</span>
                </div>
              </NavLink>
            </li>

            {/* 14. Birthday (Document / Cake icon) */}
            <li>
              <NavLink
                to="/birthday_list"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Cake size={15} color="#1e3570" />
                  <span>Birthday</span>
                </div>
              </NavLink>
            </li>

            {/* 15. Download Forms (Water drop icon & submenu) */}
            <li className="has_sub">
              <div
                className="menu-header"
                onClick={() => toggleSubmenu('downloadForms')}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Download Forms</span>
                </div>
                {openMenus.downloadForms ? (
                  <ChevronDown size={14} className="sidebar-chevron" />
                ) : (
                  <ChevronRight size={14} className="sidebar-chevron" />
                )}
              </div>
              {openMenus.downloadForms && (
                <ul className="sub-menu">
                  <li>
                    <NavLink to="/download_forms" onClick={handleLinkClick}>
                      Admission Withdrawal / No Dues
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/download_forms" onClick={handleLinkClick}>
                      Hostel Withdrawal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/download_forms" onClick={handleLinkClick}>
                      Duplicate Marksheet Issue
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/download_forms" onClick={handleLinkClick}>
                      Migration Withdrawal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/download_forms" onClick={handleLinkClick}>
                      Original Documents Withdrawal
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 16. Fee / Payment Details */}
            <li>
              <NavLink
                to="/academic_payment"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Fee / Payment Details</span>
                </div>
              </NavLink>
            </li>

            {/* 17. Online Transactions */}
            <li>
              <NavLink
                to="/online_txn"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>Online Transactions</span>
                </div>
              </NavLink>
            </li>

            {/* 18. No Dues */}
            <li>
              <NavLink
                to="/no_dues_list"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <UserPlus size={15} className="icon-person-plus" />
                  <span>No Dues</span>
                </div>
              </NavLink>
            </li>

            {/* 19. Scholarship */}
            <li>
              <NavLink
                to="/scholarship"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Scholarship</span>
                </div>
              </NavLink>
            </li>

            {/* 20. Hostel (Submenu) */}
            <li className="has_sub">
              <div
                className="menu-header"
                onClick={() => toggleSubmenu('hostel')}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Hostel</span>
                </div>
                {openMenus.hostel ? (
                  <ChevronDown size={14} className="sidebar-chevron" />
                ) : (
                  <ChevronRight size={14} className="sidebar-chevron" />
                )}
              </div>
              {openMenus.hostel && (
                <ul className="sub-menu">
                  <li>
                    <NavLink to="/hostel_request" onClick={handleLinkClick}>
                      Hostel Registration
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 21. Gate Pass */}
            <li>
              <NavLink
                to="/gate_pass_list"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Gate Pass</span>
                </div>
              </NavLink>
            </li>

            {/* 22. Wi-fi Services */}
            <li>
              <NavLink
                to="/wi_fi_services"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Wi-fi Services</span>
                </div>
              </NavLink>
            </li>

            {/* 23. Library */}
            <li>
              <NavLink
                to="/library_book"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Library</span>
                </div>
              </NavLink>
            </li>

            {/* 24. Student Representative */}
            <li>
              <NavLink
                to="/student_representative"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={handleLinkClick}
              >
                <div className="menu-item-left">
                  <Droplets size={15} className="icon-water-drops" />
                  <span>Student Representative</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
