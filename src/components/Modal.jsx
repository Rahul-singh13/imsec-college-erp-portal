import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, footer, maxWidth = '550px' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="erp-modal-backdrop" onClick={onClose}>
      <div
        className="erp-modal"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="erp-modal-header">
          <h4>{title}</h4>
          <button type="button" className="erp-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="erp-modal-body">{children}</div>
        {footer && <div className="erp-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
