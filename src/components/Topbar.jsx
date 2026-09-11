import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }
    setPasswordSuccess('Password successfully updated!');
    setTimeout(() => {
      setPasswordModalOpen(false);
      setPasswordSuccess('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  const handleLogout = () => {
    setLogoutModalOpen(false);
    navigate('/logout');
  };

  return (
    <>
      <header className="topbar">
        {/* Left Side: Exactly matching HAR markup */}
        <div className="topbar-left">
          <div className="logo">
            <Link to="/academic">
              <img
                src="/logo_IMSEC.png"
                alt="Logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
          </div>
        </div>

        {/* Right Side: Exact A2024CSE10363 with yellow dropdown */}
        <div className="topbar-right" ref={dropdownRef}>
          <div className="topbar-profile">
            <button
              type="button"
              className="topbar-profile-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <strong>A2024CSE10363</strong>
              <span style={{ fontSize: '10px' }}>&#9660;</span>
            </button>

            {dropdownOpen && (
              <div className="topbar-profile-dropdown">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    setPasswordModalOpen(true);
                  }}
                >
                  Change Password
                </button>

                <div className="topbar-profile-divider"></div>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    setLogoutModalOpen(true);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Change Password"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setPasswordModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={handlePasswordSubmit}
            >
              Update Password
            </button>
          </>
        }
      >
        <form onSubmit={handlePasswordSubmit}>
          {passwordError && (
            <div style={{ color: '#d9534f', background: '#fdf2f2', padding: '8px', borderRadius: '3px', marginBottom: '10px', fontSize: '12px' }}>
              {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div style={{ color: '#28a745', background: '#eafaf1', padding: '8px', borderRadius: '3px', marginBottom: '10px', fontSize: '12px' }}>
              {passwordSuccess}
            </div>
          )}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Current Password</label>
            <input
              type="password"
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ccc', borderRadius: '2px' }}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>New Password</label>
            <input
              type="password"
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ccc', borderRadius: '2px' }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Confirm New Password</label>
            <input
              type="password"
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ccc', borderRadius: '2px' }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* Logout Modal */}
      <Modal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Logout Confirmation"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setLogoutModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              style={{ background: '#d9534f', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
            Are you sure you want to logout?
          </p>
        </div>
      </Modal>
    </>
  );
}
