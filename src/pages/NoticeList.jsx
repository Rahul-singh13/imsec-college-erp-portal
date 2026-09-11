import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockNotices } from '../data/notices';
import { Bell, FileText, Download } from 'lucide-react';

export default function NoticeList() {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredNotices = selectedCategory === 'ALL'
    ? mockNotices
    : mockNotices.filter((n) => n.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const columns = [
    {
      header: 'Notice Date',
      accessor: 'date',
      width: '110px'
    },
    {
      header: 'Title / Subject',
      accessor: 'title',
      render: (val, row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {row.isBlinking && <span className="blink_me">&#9733;</span>}
            <button
              type="button"
              onClick={() => setSelectedNotice(row)}
              style={{
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                color: '#253973',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0
              }}
            >
              {val}
            </button>
          </div>
          <div style={{ fontSize: '11px', color: '#7a868f', marginTop: '2px' }}>
            Published By: {row.publishedBy} &bull; Target: {row.targetAudience}
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      width: '140px',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Attachment',
      accessor: 'attachment',
      width: '180px',
      render: (val) =>
        val ? (
          <span style={{ fontSize: '11.5px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FileText size={13} color="#253973" /> {val}
          </span>
        ) : (
          <span style={{ color: '#999', fontSize: '11px' }}>None</span>
        )
    },
    {
      header: 'Action',
      accessor: 'id',
      width: '90px',
      align: 'center',
      render: (val, row) => (
        <button
          type="button"
          className="erp-btn erp-btn-default erp-btn-sm"
          onClick={() => setSelectedNotice(row)}
        >
          View Notice
        </button>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Notice Board & Announcements"
        subtitle="Official circulars, academic notifications, placement notices, and examination orders"
        items={[{ label: 'Notices', link: null }]}
      />

      {/* Category filter pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
        {[
          { key: 'ALL', label: 'All Notices' },
          { key: 'Academic', label: 'Academic' },
          { key: 'CRC', label: 'Placement / CRC' },
          { key: 'Examination', label: 'Examination' },
          { key: 'Events', label: 'Sports & Events' },
          { key: 'General', label: 'General / Admin' }
        ].map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`erp-btn ${selectedCategory === cat.key ? 'erp-btn-primary' : 'erp-btn-default'} erp-btn-sm`}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredNotices}
        searchPlaceholder="Search notices by keyword, title, category..."
      />

      {/* Notice Detail View Modal */}
      <Modal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        title={selectedNotice ? selectedNotice.title : 'Notice Details'}
        maxWidth="680px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setSelectedNotice(null)}
            >
              Close
            </button>
            {selectedNotice?.attachment && (
              <button
                type="button"
                className="erp-btn erp-btn-primary"
                onClick={() => {
                  alert(`[DEMO]: Downloading attached notice document "${selectedNotice.attachment}"`);
                }}
              >
                <Download size={14} /> Download Notice PDF
              </button>
            )}
          </>
        }
      >
        {selectedNotice && (
          <div>
            <div
              style={{
                background: '#f8fafc',
                padding: '12px 16px',
                borderRadius: '3px',
                border: '1px solid #e2e8f0',
                marginBottom: '15px',
                fontSize: '12px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
              }}
            >
              <div><strong>Publish Date:</strong> {selectedNotice.date}</div>
              <div><strong>Category:</strong> {selectedNotice.category}</div>
              <div><strong>Issued Authority:</strong> {selectedNotice.publishedBy}</div>
              <div><strong>Target Audience:</strong> {selectedNotice.targetAudience}</div>
            </div>

            <div style={{ fontSize: '13.5px', lineHeight: '1.7', color: '#333', marginBottom: '20px' }}>
              <p>{selectedNotice.description}</p>
            </div>

            {selectedNotice.attachment && (
              <div
                style={{
                  background: '#edf2f7',
                  padding: '12px 16px',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12.5px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="#253973" />
                  <div>
                    <div style={{ fontWeight: 600, color: '#253973' }}>{selectedNotice.attachment}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>Official Signed Circular (Digital Copy)</div>
                  </div>
                </div>
                <span className="badge badge-primary">Verified PDF</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
