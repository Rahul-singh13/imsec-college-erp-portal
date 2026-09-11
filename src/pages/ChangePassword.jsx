import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { Key, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setSuccess('Password changed successfully in Demo Environment!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div>
      <Breadcrumb
        title="Change Account Password"
        subtitle="Manage student portal credentials and security settings"
        items={[{ label: 'Change Password', link: null }]}
      />

      <div className="erp-card" style={{ maxWidth: '550px' }}>
        <div className="erp-card-header">
          <h3>
            <Key size={16} color="#253973" />
            Update Security Credentials
          </h3>
        </div>

        <div className="erp-card-body">
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#fdf2f2', color: '#dc3545', padding: '10px 14px', borderRadius: '3px', marginBottom: '15px', fontSize: '12.5px' }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px 14px', borderRadius: '3px', marginBottom: '15px', fontSize: '12.5px' }}>
                <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
                {success}
              </div>
            )}

            <div className="form-group">
              <label>Current Password <span className="required-star">*</span></label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter current password (demo)"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password <span className="required-star">*</span></label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password <span className="required-star">*</span></label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <button type="submit" className="erp-btn erp-btn-primary" style={{ padding: '8px 20px' }}>
                <Key size={14} /> Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
