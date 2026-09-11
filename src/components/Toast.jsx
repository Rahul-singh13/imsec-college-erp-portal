import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className={`erp-toast toast-${toast.type || 'info'}`}>
      {getIcon()}
      <span style={{ fontWeight: 500 }}>{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: 0,
          marginLeft: '8px'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
