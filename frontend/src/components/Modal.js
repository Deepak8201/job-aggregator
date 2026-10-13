import React, { useEffect } from 'react';
import './Modal.css';

export default function Modal({ isOpen, message, type, onClose, autoClose }) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-content modal-${type}`}>
        <div className="modal-icon">{icons[type]}</div>
        <p className="modal-message">{message}</p>
        <button onClick={onClose} className="modal-button">
          OK
        </button>
      </div>
    </div>
  );
}
