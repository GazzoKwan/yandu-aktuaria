import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function ParamManageModal({
  selectedParam,
  onClose,
  onOpenAddRate,
  onOpenLog
}) {
  if (!selectedParam) return null;

  const activeRate = selectedParam.history.find(h => h.status === 'AKTIF') || selectedParam.history[0];

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.modalContainer, maxWidth: '960px' }}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>
              UC-AKT-005: DETAIL & PENGELOLAAN PARAMETER AKTUARIA
            </div>
            <h2 style={{ fontSize: 16, marginTop: 2 }}>
              👁️ Detail Parameter — {selectedParam.nama}
            </h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          
          {/* RINGKASAN PARAMETER & ACTION TOOLBAR */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px 20px', marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  KATEGORI PROGRAM MANFAAT
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e3a8a', marginTop: '2px' }}>
                  {selectedParam.kategori}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', marginTop: '2px' }}>
                  Nama Parameter: <strong>{selectedParam.nama}</strong>
                </div>
              </div>

              {/* ACTION BUTTONS (UBAH RATE & LOG AUDIT) */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '9px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
                  }}
                  onClick={onOpenAddRate}
                  title="Ajukan usulan penambahan atau perubahan nilai rate baru"
                >
                  <span>✏️</span>
                  <span>Ubah / Usulkan Rate</span>
                </button>

                <button 
                  style={{
                    background: '#ffffff',
                    color: '#334155',
                    border: '1.5px solid #cbd5e1',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                  onClick={() => onOpenLog && onOpenLog(selectedParam.id)}
                  title="Lihat seluruh histori dan rekaman audit log multi-aktor"
                >
                  <span>📜</span>
                  <span>Lihat Log Audit</span>
                </button>
              </div>
            </div>

            {/* QUICK STATS CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ background: '#eff6ff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#1e40af' }}>RATE PERSEN AKTIF SAAT INI</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#1d4ed8', marginTop: '3px' }}>
                  {selectedParam.id === 4 && activeRate ? (
                    <span>{activeRate.persen}% (Peserta) / {Math.max(0, 100 - activeRate.persen)}% (Risiko)</span>
                  ) : (
                    `${activeRate?.persen || 0} %`
                  )}
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b' }}>PERIODE KEBERLAKUAN AKTIF</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', marginTop: '4px' }}>
                  📅 {activeRate ? `${activeRate.tglMulai} s.d. ${activeRate.tglSelesai}` : '-'}
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b' }}>LANDASAN DOKUMEN / SK TERAKHIR</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  📜 {activeRate?.landasan || '-'}
                </div>
              </div>
            </div>
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
