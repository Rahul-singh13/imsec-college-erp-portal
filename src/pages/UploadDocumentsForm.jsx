import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { mockUploadedDocuments } from '../data/placements';
import { Upload, FileCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function UploadDocumentsForm() {
  const [docType, setDocType] = useState('Resume');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [documentsList, setDocumentsList] = useState(mockUploadedDocuments);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    setUploadSuccess(true);
    setTimeout(() => {
      const newDoc = {
        id: documentsList.length + 1,
        docType: docType,
        fileName: selectedFile.name,
        uploadDate: '11-Sep-2024',
        status: 'Uploaded (Pending CRC Verification)',
        size: `${(selectedFile.size / 1024).toFixed(1)} KB`
      };
      setDocumentsList([newDoc, ...documentsList]);
      setSelectedFile(null);
      setUploadSuccess(false);
      alert(`[DEMO]: "${newDoc.fileName}" successfully uploaded to CRC server repository!`);
    }, 1200);
  };

  const columns = [
    {
      header: 'Document Type',
      accessor: 'docType',
      width: '240px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'File Name',
      accessor: 'fileName',
      render: (val) => <span style={{ color: '#253973', fontWeight: 600 }}>{val}</span>
    },
    {
      header: 'Uploaded Date',
      accessor: 'uploadDate',
      width: '120px'
    },
    {
      header: 'File Size',
      accessor: 'size',
      width: '100px'
    },
    {
      header: 'Verification Status',
      accessor: 'status',
      width: '200px',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Placement - Upload Documents & Resume"
        subtitle="Submit official transcripts, academic marksheets, resume versions, and government photo IDs for CRC verification"
        items={[{ label: 'Placement', link: null }, { label: 'Upload Documents', link: null }]}
      />

      {/* Upload Form Card */}
      <div className="erp-card">
        <div className="erp-card-header">
          <h3>
            <Upload size={16} color="#253973" />
            Upload New Document to CRC Portfolio
          </h3>
        </div>

        <div className="erp-card-body">
          <form onSubmit={handleUploadSubmit}>
            {uploadSuccess && (
              <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px 14px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
                <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
                Document uploaded and indexed successfully in demo state!
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '15px', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label>Document Category <span className="required-star">*</span></label>
                <select
                  className="form-control"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                >
                  <option value="Curriculum Vitae (Resume)">Curriculum Vitae (Resume)</option>
                  <option value="10th Marksheet">10th Marksheet</option>
                  <option value="12th Marksheet">12th Marksheet</option>
                  <option value="B.Tech Semester Marksheet">B.Tech Semester Marksheet</option>
                  <option value="Aadhaar / ID Proof">Aadhaar / Government ID</option>
                  <option value="Technical Certification">Technical Certification (AWS / Java / GCP)</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Choose File (PDF / DOCX) <span className="required-star">*</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.docx,.doc,.jpg,.png"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>File Description / Remarks</label>
                <input type="text" className="form-control" placeholder="e.g. Updated with Hackathon wins" />
              </div>

              <div>
                <button type="submit" className="erp-btn erp-btn-primary" style={{ padding: '8px 18px' }}>
                  <Upload size={14} /> Upload File
                </button>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#7a868f', marginTop: '10px' }}>
              Supported file formats: <strong>.PDF, .DOCX, .JPG, .PNG</strong> (Max file limit: 5MB per document).
            </div>
          </form>
        </div>
      </div>

      {/* Uploaded Documents History */}
      <DataTable
        columns={columns}
        data={documentsList}
        searchPlaceholder="Search uploaded files..."
      />
    </div>
  );
}
