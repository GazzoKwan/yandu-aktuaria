import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function ParamLogModal({
  selectedParamLog,
  paramChangeLogs,
  onClose
}) {
  if (!selectedParamLog) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.modalContainer, maxWidth: '1040px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>UC-AKT-005: AUDIT LOG PERUBAHAN PARAMETER AKTUARIA</div>
            <h2 style={{ fontSize: 16, marginTop: 2 }}>📜 Histori Perubahan & Aktor Log — {selectedParamLog.nama}</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: 12, color: '#475569' }}>
              Menampilkan jejak audit rekaman perubahan nilai rate, waktu eksekusi, serta identitas aktor pengubah untuk parameter <strong>{selectedParamLog.nama}</strong>.
            </div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>WAKTU (TIMESTAMP)</th>
                  <th style={styles.th}>AKTOR / PENGUBAH</th>
                  <th style={styles.th}>NILAI LAMA</th>
                  <th style={styles.th}>NILAI BARU</th>
                  <th style={styles.th}>RENTANG TANGGAL BERLAKU</th>
                  <th style={styles.th}>LANDASAN SK / DOKUMEN</th>
                  <th style={styles.th}>TIPE AKSI</th>
                </tr>
              </thead>
              <tbody>
                {paramChangeLogs.filter(log => log.paramId === selectedParamLog.id).length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                      Belum ada log catatan perubahan untuk parameter ini.
                    </td>
                  </tr>
                ) : (
                  paramChangeLogs.filter(log => log.paramId === selectedParamLog.id).map(log => (
                    <tr key={log.id} style={styles.tr}>
                      <td style={styles.td}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#334155' }}>
                          ⏱️ {log.timestamp}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1d4ed8' }}>
                          {log.aktor}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '12px' }}>
                          {log.nilaiLama}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ color: '#16a34a', fontWeight: '800', fontSize: '13px' }}>
                          {log.nilaiBaru}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ fontSize: '11px', color: '#1e293b', fontWeight: '600' }}>
                          📅 {log.tglMulai} s.d. {log.tglSelesai}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>
                          {log.landasan}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>
                          {log.tipeAksi}
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
