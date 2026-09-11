import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockTransactions } from '../data/fees';
import { History, Receipt, Download, Printer, CheckCircle } from 'lucide-react';

export default function OnlineTxn() {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const columns = [
    {
      header: 'Transaction ID',
      accessor: 'txnId',
      width: '180px',
      render: (val) => <code>{val}</code>
    },
    {
      header: 'Order Reference',
      accessor: 'orderNo',
      width: '180px'
    },
    {
      header: 'Date & Time',
      accessor: 'date',
      width: '160px'
    },
    {
      header: 'Fee Description',
      accessor: 'accountHead',
      render: (val) => <strong style={{ color: '#253973' }}>{val}</strong>
    },
    {
      header: 'Amount Paid',
      accessor: 'amount',
      width: '130px',
      align: 'right',
      render: (val) => <strong style={{ color: '#28a745', fontSize: '13px' }}>{val}</strong>
    },
    {
      header: 'Gateway Mode',
      accessor: 'mode',
      width: '200px'
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '100px',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Receipt',
      accessor: 'receiptNo',
      width: '120px',
      align: 'center',
      render: (val, row) => (
        <button
          type="button"
          className="erp-btn erp-btn-default erp-btn-sm"
          onClick={() => setSelectedReceipt(row)}
        >
          <Receipt size={12} /> Receipt
        </button>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Online Transactions & Payment Ledger"
        subtitle="Complete log of digital fees paid via UPI, Net Banking, and Debit cards with instant receipt generation"
        items={[{ label: 'Online Transactions', link: null }]}
      />

      <DataTable
        columns={columns}
        data={mockTransactions}
        searchPlaceholder="Search transactions by ID, Order No, Account head..."
      />

      {/* Official Receipt Modal */}
      <Modal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        title="Official Fee Payment Receipt (Demo)"
        maxWidth="600px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setSelectedReceipt(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={() => {
                alert(`[DEMO]: Printing payment receipt "${selectedReceipt?.receiptNo}"...`);
              }}
            >
              <Printer size={14} /> Print Receipt
            </button>
          </>
        }
      >
        {selectedReceipt && (
          <div style={{ padding: '10px' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #253973', paddingBottom: '10px', marginBottom: '15px' }}>
              <h3 style={{ color: '#253973', margin: '0 0 3px 0' }}>IMS ENGINEERING COLLEGE, GHAZIABAD</h3>
              <div style={{ fontSize: '11px', color: '#555' }}>ACCOUNTS & FINANCE DEPARTMENT &bull; E-RECEIPT</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px', marginBottom: '15px' }}>
              <div><strong>Receipt No:</strong> {selectedReceipt.receiptNo}</div>
              <div><strong>Date:</strong> {selectedReceipt.date}</div>
              <div><strong>Transaction ID:</strong> {selectedReceipt.txnId}</div>
              <div><strong>Order Reference:</strong> {selectedReceipt.orderNo}</div>
              <div><strong>Student Name:</strong> Demo Student</div>
              <div><strong>Roll Number:</strong> 2201430100001</div>
            </div>

            <table className="erp-table light-header" style={{ marginBottom: '15px' }}>
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th style={{ textAlign: 'right', width: '130px' }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedReceipt.accountHead}</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{selectedReceipt.amount}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ background: '#f7f9fa', fontWeight: 'bold' }}>
                  <td>Total Paid Amount</td>
                  <td style={{ textAlign: 'right', color: '#28a745' }}>{selectedReceipt.amount}</td>
                </tr>
              </tfoot>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#666', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
              <div>Payment Mode: <strong>{selectedReceipt.mode}</strong></div>
              <div style={{ color: '#28a745', fontWeight: 'bold' }}>Status: [SUCCESS / VERIFIED]</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
