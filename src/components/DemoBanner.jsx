import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="demo-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertTriangle size={18} color="#d97706" />
        <span>
          <strong>EDUCATIONAL DEMO MODE:</strong> This is a local frontend demonstration replica created for UI/UX learning and teaching purposes only. Not affiliated with or connected to the official college ERP backend.
        </span>
      </div>
      <span className="badge badge-warning" style={{ fontWeight: 'bold', fontSize: '10px' }}>
        OFFLINE / DEMO DATA
      </span>
    </div>
  );
}
