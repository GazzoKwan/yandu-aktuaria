import React from 'react';
import { styles } from '../../../styles/themeStyles';
import { formatMkgDisplay } from '../../../utils/formatters';

export default function EditMkgModal({
  show,
  selectedClaim,
  userRole,
  mkgInputTahun,
  setMkgInputTahun,
  mkgInputBulan,
  setMkgInputBulan,
  onClose,
  onSubmit
}) {
  if (!show || !selectedClaim) return null;

  return (
    <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
      <div style={{ ...styles.subModalContainer, maxWidth: '540px' }}>
        <div style={styles.subModalHeader}>
          <h3 style={{ fontSize: 14, color: '#fff', margin: 0 }}>
            {userRole === 'CSO' ? '✏️ Edit Masa Kerja Golongan (MKG) Awal' : '👁️ Detail Masa Kerja Golongan (MKG) Awal (Read-Only)'} — {selectedClaim.nama}
          </h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div style={{ background: userRole === 'CSO' ? '#eff6ff' : '#f8fafc', borderRadius: '8px', padding: '12px 14px', border: userRole === 'CSO' ? '1px solid #bfdbfe' : '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '12px', color: userRole === 'CSO' ? '#1e3a8a' : '#334155', fontWeight: 'bold' }}>
                MKG Awal Terdaftar: {formatMkgDisplay(selectedClaim.mkgAwalTahun, selectedClaim.mkgAwalBulan)}
              </div>
              <small style={{ color: '#475569', fontSize: '11px', display: 'block', marginTop: '2px' }}>
                {userRole === 'CSO' ? 'Masukkan jumlah Tahun dan Bulan MKG Awal sesuai dokumen resmi.' : 'Mode Peninjauan Divisi Aktuaria (Read-Only — Tidak dapat diubah).'}
              </small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Jumlah Tahun (MKG):
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                  <input 
                    type="number"
                    min="0"
                    max="50"
                    disabled={userRole === 'AKTUARIA'}
                    style={{ width: '100%', height: '42px', padding: '0 65px 0 14px', border: userRole === 'CSO' ? '2px solid #60a5fa' : '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: userRole === 'CSO' ? '#f0f9ff' : '#f1f5f9', color: '#0f172a', boxSizing: 'border-box', cursor: userRole === 'AKTUARIA' ? 'not-allowed' : 'text' }}
                    value={mkgInputTahun}
                    onChange={(e) => setMkgInputTahun(e.target.value)}
                    required
                    autoFocus={userRole === 'CSO'}
                  />
                  <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '12px', pointerEvents: 'none' }}>Tahun</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Jumlah Bulan (MKG):
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                  <input 
                    type="number"
                    min="0"
                    max="11"
                    disabled={userRole === 'AKTUARIA'}
                    style={{ width: '100%', height: '42px', padding: '0 65px 0 14px', border: userRole === 'CSO' ? '2px solid #60a5fa' : '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: userRole === 'CSO' ? '#f0f9ff' : '#f1f5f9', color: '#0f172a', boxSizing: 'border-box', cursor: userRole === 'AKTUARIA' ? 'not-allowed' : 'text' }}
                    value={mkgInputBulan}
                    onChange={(e) => setMkgInputBulan(e.target.value)}
                    required
                  />
                  <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '12px', pointerEvents: 'none' }}>Bulan</span>
                </div>
              </div>
            </div>

          </div>

          <div style={styles.modalFooter}>
            <button type="button" style={styles.secBtn} onClick={onClose}>
              {userRole === 'CSO' ? 'Batal' : 'Tutup'}
            </button>
            {userRole === 'CSO' && (
              <button type="submit" style={styles.priBtn}>💾 Simpan & Hitung Ulang</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
