import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { mockDownloadForms } from '../data/misc';
import { FileDown, Download, FileText, Eye } from 'lucide-react';

export default function DownloadForms() {
  const [selectedForm, setSelectedForm] = useState(null);

  const columns = [
    {
      header: 'Form / Document Title',
      accessor: 'title',
      render: (val, row) => (
        <div>
          <strong style={{ color: '#253973', fontSize: '13px' }}>{val}</strong>
          <p style={{ fontSize: '11.5px', color: '#666', margin: '2px 0 0 0' }}>{row.description}</p>
        </div>
      )
    },
    {
      header: 'Issuing Department',
      accessor: 'category',
      width: '180px',
      render: (val) => <span className="badge badge-info">{val}</span>
    },
    {
      header: 'Template File',
      accessor: 'file',
      width: '220px',
      render: (val) => (
        <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <FileText size={13} color="#253973" /> {val}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'file',
      width: '180px',
      align: 'center',
      render: (val, row) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          <button
            type="button"
            className="erp-btn erp-btn-default erp-btn-sm"
            onClick={() => setSelectedForm(row)}
          >
            <Eye size={12} /> View Format
          </button>
          <button
            type="button"
            className="erp-btn erp-btn-primary erp-btn-sm"
            onClick={() => {
              alert(`[DEMO]: Downloading standard clearance form "${row.file}"`);
            }}
          >
            <Download size={12} /> Download
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Download Forms & Clearance Templates"
        subtitle="Official institutional application formats: Admission Withdrawal, Hostel Vacating, Duplicate Marksheet, Migration"
        items={[{ label: 'Download Forms', link: null }]}
      />

      <DataTable
        columns={columns}
        data={mockDownloadForms}
        searchPlaceholder="Search forms by title, category, department..."
      />

      {/* Form Preview Modal */}
      <Modal
        isOpen={!!selectedForm}
        onClose={() => setSelectedForm(null)}
        title={selectedForm ? selectedForm.title : 'Form Preview'}
        maxWidth="600px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setSelectedForm(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={() => {
                alert(`[DEMO]: Downloading form template "${selectedForm?.file}"`);
                setSelectedForm(null);
              }}
            >
              <Download size={14} /> Download Form ({selectedForm?.file})
            </button>
          </>
        }
      >
        {selectedForm && (
          <div style={{ padding: '10px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '15px', fontSize: '12.5px' }}>
              <div><strong>Form Title:</strong> {selectedForm.title}</div>
              <div><strong>Department:</strong> {selectedForm.category}</div>
              <div><strong>Template Filename:</strong> {selectedForm.file}</div>
            </div>

            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#444' }}>
              {selectedForm.description}
            </p>

            <div style={{ marginTop: '15px', padding: '10px', background: '#fff9e6', border: '1px solid #ffeeba', borderRadius: '3px', fontSize: '11.5px', color: '#856404' }}>
              <strong>Submission Guideline:</strong> Print the downloaded PDF on standard A4 paper, fill all student fields in BLOCK LETTERS, obtain respective signatures, and submit to the Registrar Counter.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
