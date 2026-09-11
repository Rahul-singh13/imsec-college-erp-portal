import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockFeeStructure } from '../data/fees';
import { mockStudent } from '../data/student';
import { Receipt, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AcademicPayment() {
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('5000');
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaySuccess(true);
      setTimeout(() => {
        setPaySuccess(false);
        setPayModalOpen(false);
        alert(`[DEMO]: Payment of ₹${paymentAmount} simulated successfully via ${paymentMode}! Transaction ID: TXN2024${Date.now()}`);
      }, 1200);
    }, 1500);
  };

  return (
    <div>
      <Breadcrumb
        title="Fee & Academic Payment Details"
        subtitle="Semester tuition breakdown, examination dues, hostel charges, and online payment gateway"
        items={[{ label: 'Fee / Payment Details', link: null }]}
      />

      {/* Account Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div className="erp-card" style={{ borderLeft: '4px solid #28a745' }}>
          <div className="erp-card-body" style={{ padding: '15px' }}>
            <div style={{ fontSize: '12px', color: '#777' }}>Total Fee Applicable (2024-25)</div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#253973', margin: '4px 0' }}>₹ 2,17,000.00</h3>
            <span style={{ fontSize: '11px', color: '#555' }}>Academic + Hostel + Exam</span>
          </div>
        </div>

        <div className="erp-card" style={{ borderLeft: '4px solid #17a2b8' }}>
          <div className="erp-card-body" style={{ padding: '15px' }}>
            <div style={{ fontSize: '12px', color: '#777' }}>Total Amount Paid</div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#28a745', margin: '4px 0' }}>₹ 2,17,000.00</h3>
            <span style={{ fontSize: '11px', color: '#28a745', fontWeight: 600 }}>100% Cleared for Odd Semester</span>
          </div>
        </div>

        <div className="erp-card" style={{ borderLeft: '4px solid #253973' }}>
          <div className="erp-card-body" style={{ padding: '15px' }}>
            <div style={{ fontSize: '12px', color: '#777' }}>Current Outstanding Due</div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#253973', margin: '4px 0' }}>₹ 0.00</h3>
            <span className="badge badge-success">No Dues (Clear)</span>
          </div>
        </div>
      </div>

      {/* Fee Breakdown Table */}
      <div className="erp-card">
        <div className="erp-card-header">
          <h3>
            <Receipt size={16} color="#253973" />
            Academic Year 2024-25 Fee Head Breakdown
          </h3>
          <button
            type="button"
            className="erp-btn erp-btn-primary erp-btn-sm"
            onClick={() => setPayModalOpen(true)}
          >
            <CreditCard size={13} /> Pay Online (Demo Gateway)
          </button>
        </div>

        <div className="erp-card-body" style={{ padding: 0 }}>
          <table className="erp-table" style={{ margin: 0, border: 'none' }}>
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                <th>Account Head Description</th>
                <th style={{ width: '150px', textAlign: 'right' }}>Total Fee</th>
                <th style={{ width: '150px', textAlign: 'right' }}>Paid Amount</th>
                <th style={{ width: '150px', textAlign: 'right' }}>Balance Due</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockFeeStructure.map((fee, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td><strong>{fee.head}</strong></td>
                  <td style={{ textAlign: 'right' }}>{fee.amount}</td>
                  <td style={{ textAlign: 'right', color: '#28a745', fontWeight: 'bold' }}>{fee.paid}</td>
                  <td style={{ textAlign: 'right' }}>{fee.balance}</td>
                  <td style={{ textAlign: 'center' }}><StatusBadge status={fee.status} /></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: '#f7f9fa', fontWeight: 'bold' }}>
                <td colSpan={2} style={{ textAlign: 'right' }}>Total (INR):</td>
                <td style={{ textAlign: 'right' }}>₹ 2,17,000.00</td>
                <td style={{ textAlign: 'right', color: '#28a745' }}>₹ 2,17,000.00</td>
                <td style={{ textAlign: 'right' }}>₹ 0.00</td>
                <td style={{ textAlign: 'center' }}><span className="badge badge-success">CLEARED</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Online Payment Simulator Modal */}
      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="ERP Online Payment Gateway (Simulator)"
        maxWidth="500px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setPayModalOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-success"
              onClick={handlePaySubmit}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Transaction...' : `Proceed to Pay ₹${paymentAmount}`}
            </button>
          </>
        }
      >
        <form onSubmit={handlePaySubmit}>
          {paySuccess && (
            <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
              Demo payment processed successfully! Receipt generated.
            </div>
          )}

          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '15px', fontSize: '12.5px' }}>
            <div><strong>Student ID:</strong> {mockStudent.admissionNo} ({mockStudent.name})</div>
            <div><strong>Course / Semester:</strong> {mockStudent.course} - Sem {mockStudent.currentSemester}</div>
            <div><strong>Payment Target:</strong> Miscellaneous / Advance Semester Adjustment</div>
          </div>

          <div className="form-group">
            <label>Payment Amount (INR) <span className="required-star">*</span></label>
            <input
              type="number"
              className="form-control"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              min="100"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Payment Method <span className="required-star">*</span></label>
            <select
              className="form-control"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="UPI / QR Code (Google Pay, PhonePe, Paytm)">UPI / QR Code (Google Pay, PhonePe, Paytm)</option>
              <option value="Net Banking (HDFC / SBI / ICICI)">Net Banking (HDFC / SBI / ICICI)</option>
              <option value="Debit Card / Credit Card (RuPay, Visa, MasterCard)">Debit Card / Credit Card (RuPay, Visa, MasterCard)</option>
            </select>
          </div>

          <div style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={14} color="#28a745" /> 256-Bit SSL Encrypted Sandbox (Educational Mode Only)
          </div>
        </form>
      </Modal>
    </div>
  );
}
