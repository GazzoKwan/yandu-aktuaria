import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function EditFieldModal({
  editConfig,
  editInputValue,
  setEditInputValue,
  onClose,
  onSubmit
}) {
  if (!editConfig) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.subModalContainer, maxWidth: '520px' }}>
        <div style={styles.subModalHeader}>
          <h3 style={{ fontSize: 14, color: '#0f172a', margin: 0 }}>Edit — {editConfig.fieldLabel}</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ padding: '24px' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 'bold', marginBottom: 8, color: '#1e293b' }}>
              Nilai Baru untuk {editConfig.fieldLabel}:
            </label>
            <div style={{ display: 'flex', position: 'relative', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
              <input 
                type={editConfig.inputType === 'number' ? 'number' : 'text'}
                style={{ ...styles.editInput, paddingRight: editConfig.suffix ? '70px' : '14px' }}
                value={editInputValue}
                onChange={(e) => setEditInputValue(e.target.value)}
                autoFocus
              />
              {editConfig.suffix && <span style={styles.suffixText}>{editConfig.suffix}</span>}
            </div>
            <small style={{ color: '#64748b', fontSize: 11, marginTop: 8, display: 'block', lineHeight: '1.4' }}>
              Perubahan akan langsung mengkalkulasi ulang Manfaat TA, NTTA, dan NTIP.
            </small>
          </div>
          <div style={styles.modalFooter}>
            <button type="button" style={styles.secBtn} onClick={onClose}>Batal</button>
            <button type="submit" style={styles.priBtn}>Simpan & Hitung Ulang</button>
          </div>
        </form>
      </div>
    </div>
  );
}
