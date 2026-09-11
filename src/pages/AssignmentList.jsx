import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockAssignments } from '../data/assignments';
import { FileSpreadsheet, Upload, Download, CheckCircle2 } from 'lucide-react';

export default function AssignmentList() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [uploadModalItem, setUploadModalItem] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert('Please select a solution file to upload.');
      return;
    }

    setUploadSuccess(true);
    setTimeout(() => {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === uploadModalItem.id
            ? {
                ...a,
                status: 'Submitted (Pending Evaluation)',
                submittedFile: uploadFile.name,
                submissionDate: '11-Sep-2024'
              }
            : a
        )
      );
      setUploadSuccess(false);
      setUploadModalItem(null);
      alert(`[DEMO]: Assignment solution "${uploadFile.name}" successfully submitted!`);
    }, 1200);
  };

  const columns = [
    {
      header: 'Subject & Code',
      accessor: 'subjectName',
      width: '240px',
      render: (val, row) => (
        <div>
          <strong style={{ color: '#253973' }}>{val}</strong>
          <div style={{ fontSize: '11px', color: '#666' }}>
            Code: <strong>{row.subjectCode}</strong> &bull; Faculty: {row.faculty}
          </div>
        </div>
      )
    },
    {
      header: 'Assignment Title',
      accessor: 'title',
      render: (val, row) => (
        <div>
          <span className="badge badge-secondary" style={{ fontSize: '10px', marginBottom: '3px' }}>
            {row.assignmentNo}
          </span>
          <div style={{ fontWeight: 600, color: '#333' }}>{val}</div>
        </div>
      )
    },
    {
      header: 'Given Date',
      accessor: 'givenDate',
      width: '100px'
    },
    {
      header: 'Due Date',
      accessor: 'submissionDueDate',
      width: '110px',
      render: (val) => <strong style={{ color: '#dc3545' }}>{val}</strong>
    },
    {
      header: 'Marks',
      accessor: 'obtainedMarks',
      width: '100px',
      align: 'center',
      render: (val, row) => (
        val !== null ? (
          <strong style={{ color: '#28a745' }}>{val} / {row.maxMarks}</strong>
        ) : (
          <span style={{ color: '#888', fontSize: '11px' }}>-- / {row.maxMarks}</span>
        )
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '190px',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Action',
      accessor: 'id',
      width: '130px',
      align: 'center',
      render: (val, row) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {row.status.includes('Pending Submission') ? (
            <button
              type="button"
              className="erp-btn erp-btn-primary erp-btn-sm"
              onClick={() => setUploadModalItem(row)}
            >
              <Upload size={12} /> Upload
            </button>
          ) : (
            <button
              type="button"
              className="erp-btn erp-btn-default erp-btn-sm"
              onClick={() => {
                alert(`[DEMO]: Viewing submitted solution "${row.submittedFile}" on ${row.submissionDate}`);
              }}
            >
              View Submission
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Student Assignments & Submissions"
        subtitle="Subject homework tasks, lab assignments, deadline trackers, and online document upload portal"
        items={[{ label: 'Academics', link: null }, { label: 'Assignments', link: null }]}
      />

      <DataTable
        columns={columns}
        data={assignments}
        searchPlaceholder="Search assignments by subject, faculty, topic..."
      />

      {/* Upload Solution Modal */}
      <Modal
        isOpen={!!uploadModalItem}
        onClose={() => setUploadModalItem(null)}
        title={uploadModalItem ? `Upload Solution: ${uploadModalItem.assignmentNo}` : 'Submit Assignment'}
        maxWidth="550px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setUploadModalItem(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-success"
              onClick={handleUploadSubmit}
            >
              Confirm & Submit
            </button>
          </>
        }
      >
        {uploadModalItem && (
          <form onSubmit={handleUploadSubmit}>
            {uploadSuccess && (
              <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
                <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
                Solution uploaded successfully!
              </div>
            )}

            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '3px', border: '1px solid #e2e8f0', marginBottom: '15px', fontSize: '12px' }}>
              <div><strong>Subject:</strong> {uploadModalItem.subjectName} ({uploadModalItem.subjectCode})</div>
              <div><strong>Topic:</strong> {uploadModalItem.title}</div>
              <div><strong>Deadline:</strong> <span style={{ color: '#dc3545', fontWeight: 'bold' }}>{uploadModalItem.submissionDueDate}</span></div>
            </div>

            <div className="form-group">
              <label>Select PDF / Word Solution File <span className="required-star">*</span></label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.docx,.doc,.zip"
                onChange={(e) => setUploadFile(e.target.files[0])}
                required
              />
              <div className="form-text">Allowed formats: PDF, DOCX, ZIP (Max 15MB)</div>
            </div>

            <div className="form-group">
              <label>Student Comments / Reference Notes (Optional)</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Include any remarks for the checking faculty..."
              ></textarea>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
