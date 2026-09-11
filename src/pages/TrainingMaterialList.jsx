import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { mockTrainingMaterials } from '../data/misc';
import { BookOpen, Download, FileText, Eye } from 'lucide-react';

export default function TrainingMaterialList() {
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [previewMaterial, setPreviewMaterial] = useState(null);

  const filteredData = selectedSubject === 'ALL'
    ? mockTrainingMaterials
    : mockTrainingMaterials.filter((m) => m.subject.includes(selectedSubject));

  const columns = [
    {
      header: 'Subject Code & Name',
      accessor: 'subject',
      width: '240px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Unit / Module',
      accessor: 'unit',
      width: '200px'
    },
    {
      header: 'Lecture Title & Material Description',
      accessor: 'title',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: '#253973' }}>{val}</div>
          <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>
            Faculty: {row.faculty} &bull; Uploaded: {row.uploadedDate} &bull; Size: {row.fileSize}
          </div>
        </div>
      )
    },
    {
      header: 'Format',
      accessor: 'fileType',
      width: '120px',
      render: (val) => (
        <span className="badge badge-info" style={{ fontSize: '10px' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      width: '140px',
      align: 'center',
      render: (val, row) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          <button
            type="button"
            className="erp-btn erp-btn-default erp-btn-sm"
            onClick={() => setPreviewMaterial(row)}
            title="Preview Notes"
          >
            <Eye size={12} /> Preview
          </button>
          <button
            type="button"
            className="erp-btn erp-btn-primary erp-btn-sm"
            onClick={() => {
              alert(`[DEMO]: Downloading simulated lecture notes file "${row.fileName}"`);
            }}
            title="Download Notes"
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
        title="Notes & Course Training Material"
        subtitle="Download official unit-wise lecture notes, presentation slides, reference questions, and lab manuals"
        items={[{ label: 'Notes', link: null }]}
      />

      {/* Subject Selector Bar */}
      <div className="erp-filter-bar">
        <div className="filter-group">
          <label>Filter By Subject:</label>
          <select
            className="erp-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="ALL">All Subjects (Semester 5)</option>
            <option value="KCS-501">KCS-501 - Database Management Systems</option>
            <option value="KCS-502">KCS-502 - Compiler Design</option>
            <option value="KCS-503">KCS-503 - Design and Analysis of Algorithms</option>
            <option value="KCS-054">KCS-054 - Object Oriented System Design</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Search notes by unit, title, keyword..."
      />

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewMaterial}
        onClose={() => setPreviewMaterial(null)}
        title={previewMaterial ? previewMaterial.title : 'Notes Preview'}
        maxWidth="650px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setPreviewMaterial(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={() => {
                alert(`[DEMO]: Downloading simulated notes file "${previewMaterial?.fileName}"`);
                setPreviewMaterial(null);
              }}
            >
              <Download size={14} /> Download File ({previewMaterial?.fileSize})
            </button>
          </>
        }
      >
        {previewMaterial && (
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <FileText size={48} color="#253973" style={{ marginBottom: '12px' }} />
            <h4 style={{ color: '#253973', margin: '0 0 6px 0' }}>{previewMaterial.subject}</h4>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '15px' }}>
              <strong>{previewMaterial.unit}</strong> &bull; {previewMaterial.faculty}
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '4px', border: '1px solid #e2e8f0', textAlign: 'left', fontSize: '12.5px', color: '#444' }}>
              <p><strong>File Name:</strong> {previewMaterial.fileName}</p>
              <p><strong>File Type:</strong> {previewMaterial.fileType}</p>
              <p><strong>File Size:</strong> {previewMaterial.fileSize}</p>
              <p><strong>Uploaded On:</strong> {previewMaterial.uploadedDate}</p>
              <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #eee' }} />
              <p style={{ color: '#666', fontStyle: 'italic', margin: 0 }}>
                This learning resource is curated by the subject faculty member for examination preparation, tutorial assignments, and semester revisions.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
