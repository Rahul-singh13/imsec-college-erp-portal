import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { mockNoDuesDepartments } from '../data/fees';
import { mockStudent } from '../data/student';
import { CheckCircle, ShieldCheck, Download, Printer } from 'lucide-react';

export default function NoDuesList() {
  const columns = [
    {
      header: 'Department / Clearance Section',
      accessor: 'department',
      width: '240px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Departmental Clearance Remarks',
      accessor: 'remarks',
      render: (val) => <span style={{ color: '#444' }}>{val}</span>
    },
    {
      header: 'Verifying Officer',
      accessor: 'officer',
      width: '220px',
      render: (val) => <span style={{ fontSize: '12px', color: '#666' }}>{val}</span>
    },
    {
      header: 'Clearance Date',
      accessor: 'date',
      width: '120px'
    },
    {
      header: 'Clearance Status',
      accessor: 'status',
      width: '170px',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Multi-Department No Dues Status"
        subtitle="Institutional clearance status across Central Library, Accounts, Hostel, Laboratories, CRC, and Department HOD"
        items={[{ label: 'No Dues', link: null }]}
      />

      {/* Clearance Certificate Header Banner */}
      <div
        className="erp-card"
        style={{
          background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          marginBottom: '20px'
        }}
      >
        <div
          className="erp-card-body"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px',
            padding: '18px 24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#ffffff',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}
            >
              <CheckCircle size={32} />
            </div>
            <div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>INSTITUTIONAL CLEARANCE CERTIFICATE</div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '2px 0', color: '#ffffff' }}>
                ALL DEPARTMENT DUES CLEARED (100%)
              </h2>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>
                Candidate: {mockStudent.name} ({mockStudent.admissionNo}) &bull; Sem 5 / CSE
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="erp-btn"
              style={{ background: '#ffffff', color: '#059669', fontWeight: 'bold' }}
              onClick={() => {
                alert('[DEMO]: Generating consolidated institutional No Dues certificate PDF...');
              }}
            >
              <Download size={14} /> Download Clearance Certificate
            </button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockNoDuesDepartments}
        searchPlaceholder="Search departments, officers, clearance status..."
      />
    </div>
  );
}
