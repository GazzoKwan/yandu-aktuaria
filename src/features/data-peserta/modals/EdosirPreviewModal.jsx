import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function EdosirPreviewModal({ selectedDocPreview, onClose }) {
  if (!selectedDocPreview) return null;

  return (
    <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
      <div style={{ ...styles.modalContainer, maxWidth: '680px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW BERKAS DIGITAL E-DOSIR (RPT-02)</div>
            <h3 style={{ fontSize: 15, color: '#fff', marginTop: 2 }}>{selectedDocPreview.jenisDoc}</h3>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#ffffff' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#0f172a' }}>Nama Peserta: <strong>{selectedDocPreview.nama}</strong></div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Nomor KTPA: <strong>{selectedDocPreview.ktpa}</strong></div>
          </div>
        </div>

        <div style={styles.modalFooter}>
          <button style={styles.secBtn} onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}
