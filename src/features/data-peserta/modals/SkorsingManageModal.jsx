import React from 'react';
import { styles } from '../../../styles/themeStyles';
import { getSkorsingStatus } from '../../../utils/actuaryCalculator';

export default function SkorsingManageModal({
  show,
  selectedClaim,
  userRole,
  onClose,
  onOpenAddSkorsing,
  onDeleteSkorsingItem
}) {
  if (!show || !selectedClaim) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.modalContainer, maxWidth: '980px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#64748b', fontWeight: '800', letterSpacing: '0.5px' }}>
              {userRole === 'CSO' ? 'HAK AKSES CSO KANCAB — PENGELOLAAN MULTI-PERIODE SKORSING & DOKUMEN SKEP' : 'HAK AKSES DIVISI AKTUARIA — DETAIL MULTI-PERIODE SKORSING (READ-ONLY)'}
            </div>
            <h3 style={{ fontSize: 16, color: '#0f172a', marginTop: 2 }}>
              {userRole === 'CSO' ? '🎖️ Kelola Periode Skorsing Peserta' : '👁️ Detail Periode Skorsing Peserta'} — {selectedClaim.nama} ({selectedClaim.spNum})
            </h3>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a8a' }}>TOTAL SKORSING BERLAKU / MEMOTONG MANFAAT</div>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#2563eb' }}>
                {selectedClaim.skorsingBulan} Bulan <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#475569' }}>({(selectedClaim.skorsingList || []).length} Total Periode Terdaftar)</span>
              </div>
            </div>
            {userRole === 'CSO' && (
              <button 
                style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}
                onClick={onOpenAddSkorsing}
              >
                ➕ Tambah Periode Skorsing Baru
              </button>
            )}
          </div>

          <h4 style={{ fontSize: 14, fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            📋 Daftar Periode Skorsing & Keberlakuan Peraturan Tanggal
          </h4>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>STATUS KEBERLAKUAN</th>
                  <th style={styles.th}>PERIODE SKORSING</th>
                  <th style={styles.th}>DURASI BULAN</th>
                  <th style={styles.th}>PERSENTASE SKORSING (%)</th>
                  <th style={styles.th}>NO. SKEP SKORSING</th>
                  <th style={styles.th}>BERKAS SKEP UPLOAD / LANDASAN</th>
                  {userRole === 'CSO' && <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>}
                </tr>
              </thead>
              <tbody>
                {(selectedClaim.skorsingList || []).length === 0 ? (
                  <tr>
                    <td colSpan={userRole === 'CSO' ? 7 : 6} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '13px' }}>
                      Belum ada periode skorsing yang ditambahkan untuk peserta ini.
                    </td>
                  </tr>
                ) : (
                  selectedClaim.skorsingList.map((item) => {
                    const statusPeriod = getSkorsingStatus(item.tglMulai, item.tglAkhir);
                    return (
                      <tr key={item.id} style={styles.tr}>
                        <td style={styles.td}>
                          <span style={{ 
                            background: statusPeriod === 'Aktif' ? '#dbeafe' : statusPeriod === 'Belum Aktif' ? '#fef3c7' : '#f1f5f9', 
                            color: statusPeriod === 'Aktif' ? '#1d4ed8' : statusPeriod === 'Belum Aktif' ? '#d97706' : '#64748b', 
                            padding: '3px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' 
                          }}>
                            {statusPeriod}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontWeight: '700', color: '#1e293b' }}>
                            📅 {item.tglMulai} s.d. {item.tglAkhir}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                            {item.jumlahBulan} Bulan
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontWeight: '800', color: '#0f172a', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '3px 10px', borderRadius: '6px' }}>
                            {item.persenSkorsing} %
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>{item.noSkep}</span>
                        </td>
                        <td style={styles.td}>
                          <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', color: '#2563eb', fontWeight: 'bold' }}>
                              <span>📄</span>
                              <span>{item.fileName}</span>
                            </div>
                            {item.landasan && (
                              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', fontStyle: 'italic' }}>
                                Landasan: {item.landasan}
                              </div>
                            )}
                          </div>
                        </td>
                        {userRole === 'CSO' && (
                          <td style={{ ...styles.td, textAlign: 'center' }}>
                            <button 
                              style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                              title="Hapus Periode Skorsing Ini"
                              onClick={() => onDeleteSkorsingItem(item.id)}
                            >
                              🗑️
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })
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
