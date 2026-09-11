import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockProject } from '../data/misc';
import { FolderGit2, Users, FileText, Upload, CheckCircle2 } from 'lucide-react';

export default function AdmissionProject() {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [reportFile, setReportFile] = useState(null);
  const [pptFile, setPptFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState('https://github.com/demo-imsec/campus-gate-management');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setSubmitModalOpen(false);
      alert('[DEMO]: Project milestone report submitted successfully for guide evaluation!');
    }, 1200);
  };

  return (
    <div>
      <Breadcrumb
        title="My Project (Semester 5 - Minor Project)"
        subtitle="Departmental project allocation, guide assignment, team roster, synopsis status, and milestone evaluation"
        items={[{ label: 'My Project', link: null }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)', gap: '20px' }}>
        
        {/* Left Side: Project Overview & Abstract */}
        <div>
          <div className="erp-card">
            <div className="erp-card-header">
              <h3>
                <FolderGit2 size={16} color="#253973" />
                Project Details & Guide
              </h3>
              <StatusBadge status={mockProject.synopsisStatus} />
            </div>

            <div className="erp-card-body">
              <table className="erp-table">
                <tbody>
                  <tr>
                    <th style={{ width: '30%' }}>Project Title</th>
                    <td><strong style={{ color: '#253973', fontSize: '13.5px' }}>{mockProject.projectTitle}</strong></td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{mockProject.projectType}</td>
                  </tr>
                  <tr>
                    <th>Team ID</th>
                    <td><code>{mockProject.teamId}</code></td>
                  </tr>
                  <tr>
                    <th>Faculty Project Guide</th>
                    <td><strong>{mockProject.guideName}</strong></td>
                  </tr>
                  <tr>
                    <th>Current Phase</th>
                    <td><span className="badge badge-warning">{mockProject.currentPhase}</span></td>
                  </tr>
                  <tr>
                    <th>Final Submission Deadline</th>
                    <td><strong style={{ color: '#dc3545' }}>{mockProject.submissionDeadline}</strong></td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '15px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#253973', marginBottom: '6px' }}>Project Synopsis & Abstract</h4>
                <p style={{ fontSize: '12.5px', lineHeight: '1.6', color: '#444', background: '#f8fafc', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                  {mockProject.abstract}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="erp-btn erp-btn-primary"
                  onClick={() => setSubmitModalOpen(true)}
                >
                  <Upload size={14} /> Submit Progress Report / PPT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Team Members & Review Schedule */}
        <div>
          <div className="erp-card">
            <div className="erp-card-header">
              <h3>
                <Users size={16} color="#253973" />
                Project Team Members
              </h3>
              <span className="badge badge-secondary">{mockProject.teamMembers.length} Members</span>
            </div>

            <div className="erp-card-body" style={{ padding: 0 }}>
              <table className="erp-table" style={{ margin: 0, border: 'none' }}>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Member Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProject.teamMembers.map((m, idx) => (
                    <tr key={idx}>
                      <td style={{ fontSize: '11.5px', fontFamily: 'monospace' }}>{m.rollNo}</td>
                      <td><strong>{m.name}</strong></td>
                      <td style={{ fontSize: '11.5px', color: '#666' }}>{m.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="erp-card">
            <div className="erp-card-header">
              <h3>
                <FileText size={16} color="#253973" />
                Review & Evaluation Schedule
              </h3>
            </div>
            <div className="erp-card-body" style={{ fontSize: '12.5px' }}>
              <div style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>Review 1: Synopsis Defense</span>
                  <span style={{ color: '#28a745' }}>Completed (Marks: 9/10)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#777' }}>Conducted on: 28-Aug-2024</div>
              </div>

              <div style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>Review 2: Mid-Term Demo</span>
                  <span style={{ color: '#f39c12' }}>Scheduled: 10-Oct-2024</span>
                </div>
                <div style={{ fontSize: '11px', color: '#777' }}>Module demonstration & code inspection</div>
              </div>

              <div style={{ padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>Final Project Viva & Report</span>
                  <span style={{ color: '#666' }}>Scheduled: 20-Nov-2024</span>
                </div>
                <div style={{ fontSize: '11px', color: '#777' }}>External AKTU examiner panel</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Submit Report Modal */}
      <Modal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        title="Submit Project Progress Report (Demo)"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setSubmitModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={handleSubmit}
            >
              Submit to Guide
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          {submitSuccess && (
            <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
              Report files uploaded successfully!
            </div>
          )}

          <div className="form-group">
            <label>Progress Report Document (PDF) <span className="required-star">*</span></label>
            <input
              type="file"
              className="form-control"
              accept=".pdf"
              onChange={(e) => setReportFile(e.target.files[0])}
            />
            <div className="form-text">Max file size: 10MB (PDF format only)</div>
          </div>

          <div className="form-group">
            <label>Presentation Slides (PPT / PDF)</label>
            <input
              type="file"
              className="form-control"
              accept=".ppt,.pptx,.pdf"
              onChange={(e) => setPptFile(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Source Code Repository URL (GitHub / GitLab)</label>
            <input
              type="url"
              className="form-control"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/project"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
