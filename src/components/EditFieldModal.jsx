import React, { useState, useEffect } from 'react';

export default function EditFieldModal({ editConfig, onClose, onSave }) {
  const [val, setVal] = useState('');

  useEffect(() => {
    if (editConfig) {
      setVal(editConfig.currentVal !== undefined ? editConfig.currentVal : '');
    }
  }, [editConfig]);

  if (!editConfig) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editConfig.fieldName, val, editConfig.inputType);
  };

  return (
    <div className="modal-backdrop sub-modal-backdrop active">
      <div className="modal-container sub-modal-container">
        <div className="modal-header sub-header">
          <h3>Edit — {editConfig.fieldLabel}</h3>
          <button className="close-modal-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body sub-body">
            <div className="edit-field-form">
              <label htmlFor="editFieldInput">Masukkan nilai baru untuk {editConfig.fieldLabel}:</label>
              <div className="input-unit-group">
                <input 
                  id="editFieldInput"
                  type={editConfig.inputType === 'number' ? 'number' : 'text'}
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="Masukkan nilai baru..."
                  autoFocus
                />
                {editConfig.suffix && <span className="input-unit-suffix">{editConfig.suffix}</span>}
              </div>
              <small className="help-text">Perubahan akan langsung mengkalkulasi ulang Manfaat TA, NTTA, dan NTIP.</small>
            </div>
          </div>
          <div className="modal-footer sub-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary">Simpan & Hitung Ulang</button>
          </div>
        </form>
      </div>
    </div>
  );
}
