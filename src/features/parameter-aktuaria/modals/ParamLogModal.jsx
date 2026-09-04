import React from 'react';
import { styles } from '../../../styles/themeStyles';
import { getCategoryAbbr, formatDateDDMMYY } from '../../../utils/formatters';

export default function ParamLogModal({
  selectedParamLog,
  paramChangeLogs,
  onClose
}) {
  if (!selectedParamLog) return null;

  const logs = paramChangeLogs.filter(log => log.paramId === selectedParamLog.id);

  return (
    <div style={{ ...styles.modalBackdrop, zIndex: 1150 }}>
      <div style={{ ...styles.modalContainer, maxWidth: '1180px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#64748b', fontWeight: '800', letterSpacing: '0.5px' }}>AUDIT LOG & JEJAK REKAM APPROVAL</div>
            <h2 style={{ fontSize: 16, marginTop: 2 }}>📜 Histori Perubahan & Aktor Log — {selectedParamLog.nama}</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: '#0f172a' }}>
                Jejak Audit Parameter: {selectedParamLog.nama} ({getCategoryAbbr(selectedParamLog.kategori)})
              </div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                Merekam secara transparan riwayat permohonan rate oleh Analis Aktuaria, verifikasi Kabid Aktuaria, serta pengesahan akhir Kadiv Aktuaria.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold' }}>
                Total Entri: {logs.length} Log
              </span>
            </div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>WAKTU (TIMESTAMP)</th>
                  <th style={styles.th}>PERUBAHAN NILAI</th>
                  <th style={styles.th}>DIAJUKAN OLEH</th>
                  <th style={styles.th}>DISETUJUI OLEH (KABID / KADIV)</th>
                  <th style={styles.th}>PERIODE & SK DIREKSI</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      Belum ada log catatan perubahan untuk parameter ini.
                    </td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id} style={styles.tr}>
                      {/* Timestamp */}
                      <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#334155' }}>
                          ⏱️ {formatDateDDMMYY(log.timestamp)}
                        </span>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                          {log.tipeAksi || 'Penyesuaian Rate'}
                        </div>
                      </td>

                      {/* Nilai Lama vs Baru */}
                      <td style={styles.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#475569', fontSize: '12px', fontWeight: '600' }}>
                            {log.nilaiLama}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>➔</span>
                          <span style={{ color: '#16a34a', fontWeight: '800', fontSize: '13px' }}>
                            {log.nilaiBaru}
                          </span>
                        </div>
                      </td>

                      {/* Maker / Pengaju */}
                      <td style={styles.td}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#0369a1' }}>
                            {log.diajukanOleh || log.aktor || 'Analis Aktuaria'}
                          </span>
                          {log.tglPengajuan && (
                            <span style={{ fontSize: '10px', color: '#64748b' }}>
                              Tgl: {formatDateDDMMYY(log.tglPengajuan)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Approver: Kabid atau Kadiv */}
                      <td style={styles.td}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: log.disetujuiOleh ? '#059669' : (log.diverifikasiOleh ? '#7c3aed' : '#94a3b8') }}>
                            {log.disetujuiOleh || log.diverifikasiOleh || (log.aktor ? log.aktor : '-')}
                          </span>
                          {log.tglApproval && (
                            <span style={{ fontSize: '10px', color: '#64748b' }}>
                              Tgl: {formatDateDDMMYY(log.tglApproval)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Periode & SK */}
                      <td style={styles.td}>
                        <div style={{ fontSize: '11px', color: '#1e293b', fontWeight: '600' }}>
                          📅 {formatDateDDMMYY(log.tglMulai)} s.d. {formatDateDDMMYY(log.tglSelesai)}
                        </div>
                        <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px', maxWidth: '200px' }}>
                          📜 {log.landasan}
                        </div>
                        {log.catatan && (
                          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '3px', fontStyle: 'italic', maxWidth: '220px' }}>
                            💬 {log.catatan}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <span style={{
                          background: log.statusApproval === 'DITOLAK' ? '#fee2e2' : '#dcfce7',
                          color: log.statusApproval === 'DITOLAK' ? '#991b1b' : '#15803d',
                          border: log.statusApproval === 'DITOLAK' ? '1px solid #fecaca' : '1px solid #bbf7d0',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap'
                        }}>
                          {log.statusApproval === 'DITOLAK' ? 'Ditolak' : 'Disetujui'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
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
