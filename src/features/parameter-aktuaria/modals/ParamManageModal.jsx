import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function ParamManageModal({
  selectedParam,
  onClose,
  onOpenAddRate
}) {
  if (!selectedParam) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.modalContainer, maxWidth: '940px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>UC-AKT-005: PENGELOLAAN RATE PARAMETER AKTUARIA</div>
            <h2 style={{ fontSize: 16, marginTop: 2 }}>⚙️ Kelola Rate & Rentang Tanggal — {selectedParam.nama}</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a8a' }}>KATEGORI PROGRAM MANFAAT</div>
              <div style={{ fontSize: 16, fontWeight: 'bold', color: '#2563eb' }}>{selectedParam.kategori}</div>
            </div>
            <button 
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}
              onClick={onOpenAddRate}
            >
              ➕ Tambah Rate Persenan Baru
            </button>
          </div>

          <h4 style={{ fontSize: 14, fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            📋 Riwayat Rate & Periode Keberlakuan Tanggal
          </h4>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>RATE PERSEN (%)</th>
                  <th style={styles.th}>PERIODE MULAI S.D. SELESAI</th>
                  <th style={styles.th}>DIUBAH OLEH</th>
                  <th style={styles.th}>LANDASAN SK / CATATAN</th>
                </tr>
              </thead>
              <tbody>
                {selectedParam.history.map(item => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>
                      <span style={{ 
                        background: item.status === 'AKTIF' ? '#dcfce7' : '#f1f5f9', 
                        color: item.status === 'AKTIF' ? '#15803d' : '#64748b', 
                        padding: '3px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' 
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {selectedParam.id === 4 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', whiteSpace: 'nowrap' }}>
                          <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', width: 'fit-content' }}>
                            {item.persen}% (Peserta)
                          </span>
                          <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', width: 'fit-content' }}>
                            {Math.max(0, 100 - item.persen)}% (Risiko)
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', background: '#f8fafc', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                          {item.persen} %
                        </span>
                      )}
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: '700', color: '#1e293b' }}>
                        📅 {item.tglMulai} s.d. {item.tglSelesai}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontSize: '12px', color: '#475569' }}>{item.diubahOleh}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>{item.landasan}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.modalFooter}>
          <button style={styles.secBtn} onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}
