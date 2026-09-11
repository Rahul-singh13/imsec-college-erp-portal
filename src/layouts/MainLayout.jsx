import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { FileText, Download } from 'lucide-react';

export default function MainLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [pdfModalDoc, setPdfModalDoc] = useState(null);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const openPdfModal = (docTitle) => {
    setPdfModalDoc(docTitle);
  };

  return (
    <div id="wrapper">
      {/* Top Navigation */}
      <Topbar onToggleSidebar={toggleSidebar} />

      {/* Left Sidebar */}
      <Sidebar
        isOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onOpenPdfModal={openPdfModal}
      />

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 850
          }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="content-page">
        <Outlet context={{ openPdfModal }} />
      </div>

      {/* Generic Guidelines / Document Preview Modal */}
      <Modal
        isOpen={!!pdfModalDoc}
        onClose={() => setPdfModalDoc(null)}
        title={pdfModalDoc || 'Document Preview (Demo)'}
        maxWidth="600px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setPdfModalDoc(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={() => {
                alert(`[DEMO]: Downloading "${pdfModalDoc}.pdf"`);
                setPdfModalDoc(null);
              }}
            >
              <Download size={13} /> Download Sample PDF
            </button>
          </>
        }
      >
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <FileText size={40} color="#253973" style={{ marginBottom: '10px' }} />
          <h4 style={{ color: '#253973', margin: '0 0 6px 0' }}>{pdfModalDoc}</h4>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
            Official institutional document format simulator (Educational Sandbox).
          </p>
        </div>
      </Modal>
    </div>
  );
}
