import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockCompanies } from '../data/placements';
import { Briefcase, Building2, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';

export default function CompanyList() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [applyModalCompany, setApplyModalCompany] = useState(null);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyModalCompany(null);
      alert(`[DEMO]: Application submitted successfully for ${applyModalCompany?.name}! Application ID: CRC-APP-2024-9841`);
    }, 1200);
  };

  const columns = [
    {
      header: 'Company Name',
      accessor: 'name',
      render: (val, row) => (
        <div>
          <strong style={{ color: '#253973', fontSize: '13px' }}>{val}</strong>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
            Drive Type: <strong>{row.driveType}</strong> &bull; Location: {row.location}
          </div>
        </div>
      )
    },
    {
      header: 'Job Role / Designation',
      accessor: 'role',
      width: '220px'
    },
    {
      header: 'CTC Package',
      accessor: 'packageCTC',
      width: '130px',
      render: (val) => <strong style={{ color: '#28a745' }}>{val}</strong>
    },
    {
      header: 'Drive Date',
      accessor: 'driveDate',
      width: '110px'
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '170px',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Actions',
      accessor: 'id',
      width: '160px',
      align: 'center',
      render: (val, row) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          <button
            type="button"
            className="erp-btn erp-btn-default erp-btn-sm"
            onClick={() => setSelectedCompany(row)}
          >
            Details
          </button>
          {row.status.includes('Applied') ? (
            <span className="badge badge-success" style={{ fontSize: '11px', padding: '5px 8px' }}>
              Applied
            </span>
          ) : (
            <button
              type="button"
              className="erp-btn erp-btn-primary erp-btn-sm"
              onClick={() => setApplyModalCompany(row)}
            >
              Apply Now
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Placement - Company Drives"
        subtitle="Campus recruitment drives, eligibility verification, job roles, compensation packages, and online application"
        items={[{ label: 'Placement', link: null }, { label: 'Companies', link: null }]}
      />

      <DataTable
        columns={columns}
        data={mockCompanies}
        searchPlaceholder="Search company, role, package, location..."
      />

      {/* Company Details Modal */}
      <Modal
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        title={selectedCompany ? `${selectedCompany.name} - Job Profile` : 'Company Details'}
        maxWidth="650px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setSelectedCompany(null)}
            >
              Close
            </button>
            {selectedCompany && !selectedCompany.status.includes('Applied') && (
              <button
                type="button"
                className="erp-btn erp-btn-primary"
                onClick={() => {
                  const comp = selectedCompany;
                  setSelectedCompany(null);
                  setApplyModalCompany(comp);
                }}
              >
                Apply for Drive
              </button>
            )}
          </>
        }
      >
        {selectedCompany && (
          <div>
            <div
              style={{
                background: '#f8fafc',
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
                marginBottom: '15px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                fontSize: '12.5px'
              }}
            >
              <div><strong>Designation:</strong> {selectedCompany.role}</div>
              <div><strong>Package (CTC):</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>{selectedCompany.packageCTC}</span></div>
              <div><strong>Drive Date:</strong> {selectedCompany.driveDate}</div>
              <div><strong>Last Date to Apply:</strong> {selectedCompany.lastDateToApply}</div>
              <div><strong>Job Location:</strong> {selectedCompany.location}</div>
              <div><strong>Service Bond:</strong> {selectedCompany.bond}</div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: '#253973', fontSize: '13px', marginBottom: '4px' }}>Eligibility Criteria</h4>
              <p style={{ fontSize: '12.5px', color: '#444', background: '#fff9e6', padding: '10px 12px', border: '1px solid #ffeeba', borderRadius: '3px' }}>
                {selectedCompany.eligibilityCriteria}
              </p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: '#253973', fontSize: '13px', marginBottom: '4px' }}>Selection Process / Rounds</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '12.5px', color: '#555' }}>
                {selectedCompany.rounds.map((r, i) => (
                  <li key={i} style={{ marginBottom: '3px' }}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#253973', fontSize: '13px', marginBottom: '4px' }}>Role Description</h4>
              <p style={{ fontSize: '12.5px', color: '#555', lineHeight: '1.6' }}>
                {selectedCompany.description}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Apply Modal */}
      <Modal
        isOpen={!!applyModalCompany}
        onClose={() => setApplyModalCompany(null)}
        title={applyModalCompany ? `Apply to ${applyModalCompany.name}` : 'Apply for Drive'}
        maxWidth="550px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setApplyModalCompany(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-success"
              onClick={handleApplySubmit}
            >
              Submit Application
            </button>
          </>
        }
      >
        {applyModalCompany && (
          <form onSubmit={handleApplySubmit}>
            {applySuccess && (
              <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
                <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
                Application transmitted to CRC database!
              </div>
            )}

            <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '3px', border: '1px solid #e2e8f0', marginBottom: '15px', fontSize: '12px' }}>
              <div><strong>Applicant:</strong> Demo Student (Roll No: 2201430100001)</div>
              <div><strong>B.Tech CGPA:</strong> 8.42 &bull; <strong>Active Backlogs:</strong> 0</div>
              <div><strong>Status:</strong> Eligible under CRC Guidelines</div>
            </div>

            <div className="form-group">
              <label>Select Verified CV / Resume to Attach <span className="required-star">*</span></label>
              <select className="form-control" defaultValue="Demo_Student_Resume_v3.pdf">
                <option value="Demo_Student_Resume_v3.pdf">Demo_Student_Resume_v3.pdf (Verified by CRC on 01-Sep-2024)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Location Preference</label>
              <input type="text" className="form-control" defaultValue="Noida / Gurugram / Delhi NCR" />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'normal', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked required />
                <span>I confirm that all details provided in my resume and academic transcripts are accurate.</span>
              </label>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
