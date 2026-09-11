import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockComplaints } from '../data/misc';
import { AlertCircle, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function ComplaintList() {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [category, setCategory] = useState('Hostel & Infrastructure');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !description) {
      alert('Please fill in subject and description.');
      return;
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      const newTicket = {
        id: `GR-2024-${Math.floor(100 + Math.random() * 900)}`,
        category: category,
        subject: subject,
        description: description,
        lodgedDate: '11-Sep-2024',
        status: 'In Progress',
        resolvedDate: null,
        actionTaken: 'Assigned to maintenance team for inspection.'
      };
      setComplaints([newTicket, ...complaints]);
      setSubmitSuccess(false);
      setNewModalOpen(false);
      setSubject('');
      setDescription('');
      alert(`[DEMO]: Grievance Ticket #${newTicket.id} registered! Support team will inspect within 24 hours.`);
    }, 1000);
  };

  const columns = [
    {
      header: 'Ticket ID',
      accessor: 'id',
      width: '120px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Category',
      accessor: 'category',
      width: '180px'
    },
    {
      header: 'Grievance Subject & Description',
      accessor: 'subject',
      render: (val, row) => (
        <div>
          <strong style={{ color: '#253973' }}>{val}</strong>
          <p style={{ fontSize: '11.5px', color: '#555', margin: '3px 0 0 0' }}>{row.description}</p>
          {row.actionTaken && (
            <div style={{ fontSize: '11px', color: '#28a745', marginTop: '4px' }}>
              <strong>Action Taken:</strong> {row.actionTaken}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Lodged Date',
      accessor: 'lodgedDate',
      width: '110px'
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '130px',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Student Grievance & Complaint Redressal"
        subtitle="Submit and track maintenance requests, hostel infrastructure issues, academic queries, and campus feedback"
        items={[{ label: 'Complaints', link: null }]}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button
          type="button"
          className="erp-btn erp-btn-primary"
          onClick={() => setNewModalOpen(true)}
        >
          <PlusCircle size={14} /> Lodge New Grievance / Complaint
        </button>
      </div>

      <DataTable
        columns={columns}
        data={complaints}
        searchPlaceholder="Search grievances by ticket ID, subject, status..."
      />

      {/* New Complaint Modal */}
      <Modal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        title="Register Student Grievance / Complaint"
        maxWidth="550px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setNewModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={handleSubmit}
            >
              Submit Complaint
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          {submitSuccess && (
            <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
              Complaint ticket submitted successfully!
            </div>
          )}

          <div className="form-group">
            <label>Grievance Category <span className="required-star">*</span></label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Hostel & Infrastructure">Hostel & Infrastructure (Room, Fan, AC, Plumbing, Cleanliness)</option>
              <option value="Academic / Timetable">Academic & Timetable / Course Query</option>
              <option value="IT & Wi-Fi Network">Campus IT, ERP, & Wi-Fi Network</option>
              <option value="Mess & Dining Hall">Hostel Mess / Canteen Food Quality</option>
              <option value="Library & Book Bank">Central Library / Book Bank</option>
              <option value="Security & Transportation">Campus Security & Bus Transport</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subject / Brief Summary <span className="required-star">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Water purifier filter replacement on 2nd floor"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Detailed Description of Issue <span className="required-star">*</span></label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Provide exact room number, floor, or nature of assistance needed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
}
