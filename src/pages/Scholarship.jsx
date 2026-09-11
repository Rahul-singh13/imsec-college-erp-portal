import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { mockScholarships } from '../data/misc';
import { BadgeDollarSign, CheckCircle, FileText, ExternalLink } from 'lucide-react';

export default function Scholarship() {
  const columns = [
    {
      header: 'Scholarship Scheme Title',
      accessor: 'scholarshipScheme',
      render: (val) => <strong style={{ color: '#253973' }}>{val}</strong>
    },
    {
      header: 'Session',
      accessor: 'academicSession',
      width: '110px'
    },
    {
      header: 'Application ID',
      accessor: 'applicationId',
      width: '180px',
      render: (val) => <code>{val}</code>
    },
    {
      header: 'Sanctioned Amount',
      accessor: 'sanctionedAmount',
      width: '150px',
      render: (val) => <strong style={{ color: '#28a745' }}>{val}</strong>
    },
    {
      header: 'Application Status',
      accessor: 'disbursementStatus',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Current Stage',
      accessor: 'currentStage',
      width: '240px',
      render: (val) => <span style={{ fontSize: '11.5px', color: '#555' }}>{val}</span>
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Scholarship Application & Tracking"
        subtitle="Uttar Pradesh Post-Matric Scholarship, AICTE Pragati/Saksham, and Institutional Merit Waivers"
        items={[{ label: 'Scholarship', link: null }]}
      />

      {/* Guidelines Box */}
      <div className="erp-card" style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', marginBottom: '20px' }}>
        <div className="erp-card-body" style={{ padding: '15px' }}>
          <h4 style={{ color: '#253973', fontSize: '13.5px', marginBottom: '6px' }}>UP Govt Post-Matric Scholarship Instructions (2024-25)</h4>
          <p style={{ fontSize: '12.5px', color: '#555', lineHeight: '1.6', margin: '0 0 10px 0' }}>
            Students must verify that their Aadhaar is linked with an active DBT-enabled bank account. Physical verification of Caste, Income, and Domicile certificates is conducted at Room No. 104 (Scholarship Cell).
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="erp-btn erp-btn-default erp-btn-sm"
              onClick={() => alert('[DEMO]: Opening official UP Scholarship portal sandbox')}
            >
              <ExternalLink size={12} /> UP Scholarship Portal
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-default erp-btn-sm"
              onClick={() => alert('[DEMO]: Downloading required documents checklist PDF')}
            >
              <FileText size={12} /> Mandatory Documents Checklist
            </button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockScholarships}
        searchPlaceholder="Search scholarships by scheme, application ID..."
      />
    </div>
  );
}
