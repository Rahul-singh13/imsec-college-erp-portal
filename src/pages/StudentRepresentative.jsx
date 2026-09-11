import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { mockStudentRepresentatives } from '../data/misc';
import { Users, Mail, Shield, UserCheck } from 'lucide-react';

export default function StudentRepresentative() {
  return (
    <div>
      <Breadcrumb
        title="Student Council & Class Representatives (CR)"
        subtitle="Departmental council representatives, batch coordinators, cultural secretaries, and student grievance liaisons"
        items={[{ label: 'Student Representative', link: null }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {mockStudentRepresentatives.map((rep, idx) => (
          <div key={idx} className="erp-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="erp-card-header" style={{ background: '#f8fafc' }}>
              <h3 style={{ fontSize: '13.5px' }}>
                <UserCheck size={16} color="#253973" />
                {rep.role}
              </h3>
            </div>

            <div className="erp-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#253973', margin: '0 0 3px 0' }}>
                  {rep.name}
                </h4>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                  {rep.branch}
                </div>

                <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '3px', border: '1px solid #e2e8f0', marginBottom: '12px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Mail size={13} color="#253973" />
                    <span><strong>Email:</strong> {rep.contact}</span>
                  </div>
                </div>

                <p style={{ fontSize: '12.5px', color: '#444', lineHeight: '1.5', margin: 0 }}>
                  <strong>Key Duties:</strong> {rep.responsibilities}
                </p>
              </div>

              <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <button
                  type="button"
                  className="erp-btn erp-btn-default erp-btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => alert(`[DEMO]: Opening message dialog for ${rep.name}`)}
                >
                  <Mail size={12} /> Contact Representative
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
