import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockGatePasses } from '../data/hostel';
import { KeyRound, PlusCircle, QrCode, CheckCircle2, Clock } from 'lucide-react';

export default function GatePassList() {
  const [gatePasses, setGatePasses] = useState(mockGatePasses);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedQrPass, setSelectedQrPass] = useState(null);

  const [passType, setPassType] = useState('Day Outing Pass');
  const [destination, setDestination] = useState('');
  const [reason, setReason] = useState('');
  const [outDate, setOutDate] = useState('11-Sep-2024');
  const [outTime, setOutTime] = useState('05:00 PM');
  const [inTime, setInTime] = useState('08:00 PM');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if (!destination || !reason) {
      alert('Please fill in destination and reason.');
      return;
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      const newPass = {
        id: `GP-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        passType: passType,
        destination: destination,
        reason: reason,
        outDate: outDate,
        outTime: outTime,
        inDate: outDate,
        inTime: inTime,
        appliedDate: '11-Sep-2024',
        parentConsent: 'Auto Approved via Parent SMS Consent',
        wardenApproval: 'Approved',
        guardStatus: 'Active / Pass Issued'
      };
      setGatePasses([newPass, ...gatePasses]);
      setSubmitSuccess(false);
      setApplyModalOpen(false);
      setDestination('');
      setReason('');
      alert(`[DEMO]: Gate Pass #${newPass.id} generated with digital QR verification!`);
    }, 1000);
  };

  const columns = [
    {
      header: 'Pass ID',
      accessor: 'id',
      width: '120px',
      render: (val) => <strong>{val}</strong>
    },
    {
      header: 'Pass Category',
      accessor: 'passType',
      width: '160px'
    },
    {
      header: 'Destination & Reason',
      accessor: 'destination',
      render: (val, row) => (
        <div>
          <strong style={{ color: '#253973' }}>{val}</strong>
          <p style={{ fontSize: '11.5px', color: '#666', margin: '2px 0 0 0' }}>{row.reason}</p>
        </div>
      )
    },
    {
      header: 'Out Schedule',
      accessor: 'outTime',
      width: '140px',
      render: (val, row) => (
        <div>
          <div>{row.outDate}</div>
          <div style={{ fontSize: '11px', color: '#777' }}>{val}</div>
        </div>
      )
    },
    {
      header: 'In Schedule',
      accessor: 'inTime',
      width: '140px',
      render: (val, row) => (
        <div>
          <div>{row.inDate}</div>
          <div style={{ fontSize: '11px', color: '#777' }}>{val}</div>
        </div>
      )
    },
    {
      header: 'Warden Status',
      accessor: 'wardenApproval',
      width: '140px',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Security Verification',
      accessor: 'guardStatus',
      width: '180px',
      render: (val) => <span style={{ fontSize: '11.5px', color: '#555' }}>{val}</span>
    },
    {
      header: 'QR Pass',
      accessor: 'id',
      width: '90px',
      align: 'center',
      render: (val, row) => (
        <button
          type="button"
          className="erp-btn erp-btn-default erp-btn-sm"
          onClick={() => setSelectedQrPass(row)}
        >
          <QrCode size={13} /> QR
        </button>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Hostel Gate Pass & Outing Authorization"
        subtitle="Apply for day outings, weekend home leaves, emergency passes, and instant digital QR security check"
        items={[{ label: 'Hostel', link: null }, { label: 'Gate Pass', link: null }]}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button
          type="button"
          className="erp-btn erp-btn-primary"
          onClick={() => setApplyModalOpen(true)}
        >
          <PlusCircle size={14} /> Apply New Gate Pass
        </button>
      </div>

      <DataTable
        columns={columns}
        data={gatePasses}
        searchPlaceholder="Search gate passes by ID, destination, status..."
      />

      {/* Apply Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title="Apply for Hostel Gate Pass"
        maxWidth="550px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setApplyModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={handleApply}
            >
              Submit Gate Pass Application
            </button>
          </>
        }
      >
        <form onSubmit={handleApply}>
          {submitSuccess && (
            <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
              Gate pass authorized and registered!
            </div>
          )}

          <div className="form-group">
            <label>Pass Type <span className="required-star">*</span></label>
            <select
              className="form-control"
              value={passType}
              onChange={(e) => setPassType(e.target.value)}
            >
              <option value="Day Outing Pass">Day Outing Pass (Return before 08:30 PM)</option>
              <option value="Home Leave Pass">Home Leave Pass (Weekend / Vacation)</option>
              <option value="Emergency Pass">Emergency / Medical Pass</option>
            </select>
          </div>

          <div className="form-group">
            <label>Destination Location <span className="required-star">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Indirapuram Market, Ghaziabad"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label>Out Date & Time <span className="required-star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={`${outDate} ${outTime}`}
                onChange={(e) => setOutTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Expected Return (In Time) <span className="required-star">*</span></label>
              <input
                type="text"
                className="form-control"
                value={`${outDate} ${inTime}`}
                onChange={(e) => setInTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Reason for Outing <span className="required-star">*</span></label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Explain outing purpose clearly..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
        </form>
      </Modal>

      {/* QR Code Pass Modal */}
      <Modal
        isOpen={!!selectedQrPass}
        onClose={() => setSelectedQrPass(null)}
        title={`Digital Security Gate Pass #${selectedQrPass?.id}`}
        maxWidth="450px"
        footer={
          <button
            type="button"
            className="erp-btn erp-btn-default"
            onClick={() => setSelectedQrPass(null)}
          >
            Close
          </button>
        }
      >
        {selectedQrPass && (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{ border: '2px solid #253973', padding: '15px', borderRadius: '4px', background: '#fcfcfc' }}>
              <div style={{ fontWeight: 'bold', color: '#253973', fontSize: '15px' }}>IMS ENGINEERING COLLEGE</div>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '12px' }}>MAIN SECURITY GATE PASS</div>

              <div style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', display: 'inline-block', marginBottom: '12px' }}>
                <QrCode size={120} color="#253973" />
              </div>

              <div style={{ fontSize: '12.5px', textAlign: 'left', lineHeight: '1.7', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                <div><strong>Pass ID:</strong> {selectedQrPass.id}</div>
                <div><strong>Student:</strong> Demo Student (2201430100001)</div>
                <div><strong>Hostel:</strong> Tagore Boys Hostel (B-304)</div>
                <div><strong>Out Timing:</strong> {selectedQrPass.outDate} ({selectedQrPass.outTime})</div>
                <div><strong>In Timing:</strong> {selectedQrPass.inDate} ({selectedQrPass.inTime})</div>
                <div><strong>Warden Status:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>APPROVED</span></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
