import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockRfidRequests } from '../data/misc';
import { CreditCard, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function RfidRequest() {
  const [requests, setRequests] = useState(mockRfidRequests);
  const [modalOpen, setModalOpen] = useState(false);
  const [reason, setReason] = useState('Damaged RFID Chip');
  const [remarks, setRemarks] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      const newReq = {
        requestId: `RFID-2024-${Math.floor(600 + Math.random() * 300)}`,
        requestType: 'Smart Identity Card (RFID Reissue)',
        reason: reason,
        appliedDate: '11-Sep-2024',
        feePaid: '₹ 200.00 (Demo Payment Received)',
        status: 'Request Under Processing',
        pickupCounter: 'Student Registrar Window 3'
      };
      setRequests([newReq, ...requests]);
      setSubmitSuccess(false);
      setModalOpen(false);
      setRemarks('');
      alert(`[DEMO]: RFID Reissue Application #${newReq.requestId} submitted!`);
    }, 1000);
  };

  const columns = [
    {
      header: 'Request ID',
      accessor: 'requestId',
      width: '130px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Service Type',
      accessor: 'requestType',
      width: '240px'
    },
    {
      header: 'Reason / Remarks',
      accessor: 'reason',
      render: (val) => <span style={{ color: '#555' }}>{val}</span>
    },
    {
      header: 'Applied Date',
      accessor: 'appliedDate',
      width: '110px'
    },
    {
      header: 'Fee Paid',
      accessor: 'feePaid',
      width: '100px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '200px',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Pickup Window',
      accessor: 'pickupCounter',
      width: '180px',
      render: (val) => <span style={{ color: '#253973', fontWeight: 600 }}>{val}</span>
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="RFID Smart Card & ID Reissue"
        subtitle="Request biometric campus identity card reissue, lost card replacement, and library RFID sync"
        items={[{ label: 'RFID Request', link: null }]}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button
          type="button"
          className="erp-btn erp-btn-primary"
          onClick={() => setModalOpen(true)}
        >
          <PlusCircle size={14} /> Apply for RFID ID Card Reissue
        </button>
      </div>

      <DataTable
        columns={columns}
        data={requests}
        searchPlaceholder="Search RFID request..."
      />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Apply for RFID Card Replacement (Demo)"
        maxWidth="500px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={handleSubmit}
            >
              Pay ₹200 & Submit Application
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          {submitSuccess && (
            <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
              RFID application submitted!
            </div>
          )}

          <div style={{ background: '#f8fafc', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
            <div><strong>Student:</strong> Demo Student (Roll: 2201430100001)</div>
            <div><strong>Replacement Fee:</strong> ₹ 200.00 (Standard administrative fee)</div>
          </div>

          <div className="form-group">
            <label>Reason for Card Reissue <span className="required-star">*</span></label>
            <select
              className="form-control"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="Damaged RFID Chip / Physically Broken">Damaged RFID Chip / Physically Broken</option>
              <option value="Lost / Misplaced ID Card">Lost / Misplaced ID Card</option>
              <option value="Data Correction (Name / Photo Update)">Data Correction (Name / Photo Update)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Additional Remarks</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="State any details regarding lost incident or FIR copy if applicable..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
}
