import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function LogoutPage() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="erp-card"
        style={{
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          padding: '30px 20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <img
            src="/logo_IMSEC.png"
            alt="IMSEC Logo"
            style={{ height: '48px' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#eafaf1',
            color: '#28a745',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '15px'
          }}
        >
          <ShieldCheck size={32} />
        </div>

        <h2 style={{ color: '#253973', fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          You Have Been Logged Out
        </h2>

        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
          Thank you for using the IMSEC ERP Student Academic Portal demo simulation. Your local educational session has ended securely.
        </p>

        <div style={{ background: '#fff9e6', border: '1px solid #ffeeba', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#856404', marginBottom: '25px', textAlign: 'left' }}>
          <AlertTriangle size={14} style={{ display: 'inline', marginRight: '5px', verticalAlign: '-2px' }} />
          <strong>Demo Notice:</strong> No credentials or session cookies were transmitted to any external server.
        </div>

        <Link
          to="/academic"
          className="erp-btn erp-btn-primary"
          style={{ padding: '10px 25px', fontSize: '13.5px', display: 'inline-flex' }}
        >
          <LogIn size={15} /> Return to Demo Portal (Re-enter)
        </Link>
      </div>
    </div>
  );
}
