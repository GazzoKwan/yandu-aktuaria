import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function AddSkorsingModal({
  show,
  selectedClaim,
  userRole,
  skorsingTglMulai,
  setSkorsingTglMulai,
  skorsingTglAkhir,
  setSkorsingTglAkhir,
  skorsingPersenNum,
  setSkorsingPersenNum,
  skorsingNoSkep,
  setSkorsingNoSkep,
  skorsingFileName,
  setSkorsingFileName,
  skorsingLandasan,
  setSkorsingLandasan,
  onClose,
  onSubmit
}) {
  if (!show || !selectedClaim || userRole !== 'CSO') return null;

  return (
    <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
      <div style={{ ...styles.subModalContainer, maxWidth: '640px' }}>
        <div style={styles.subModalHeader}>
          <h3 style={{ fontSize: 14, color: '#0f172a', margin: 0 }}>
            ➕ Tambah Periode Skorsing Baru — {selectedClaim.nama}
          </h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Periode Mulai Skorsing:
                </label>
                <input 
                  type="date"
                  style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                  value={skorsingTglMulai}
                  onChange={(e) => setSkorsingTglMulai(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Periode Akhir Skorsing:
                </label>
                <input 
                  type="date"
                  style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                  value={skorsingTglAkhir}
                  onChange={(e) => setSkorsingTglAkhir(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Persentase Skorsing (%):
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                  <input 
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    style={{ width: '100%', height: '42px', padding: '0 40px 0 14px', border: '2px solid #60a5fa', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: '#f0f9ff', color: '#0f172a', boxSizing: 'border-box' }}
                    placeholder="Contoh: 50"
                    value={skorsingPersenNum}
                    onChange={(e) => setSkorsingPersenNum(e.target.value)}
                    required
                  />
                  <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '14px', pointerEvents: 'none' }}>%</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Nomor SKEP Skorsing:
                </label>
                <input 
                  type="text"
                  style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                  placeholder="Contoh: SKEP/SKOR/2026/088"
                  value={skorsingNoSkep}
                  onChange={(e) => setSkorsingNoSkep(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                Upload Berkas Digital SKEP Skorsing (.PDF / Image):
              </label>
              <input 
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSkorsingFileName(e.target.files[0].name);
                  }
                }}
              />
              {skorsingFileName && (
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✓ Berkas siap diunggah:</span>
                  <span style={{ color: '#2563eb', textDecoration: 'underline' }}>{skorsingFileName}</span>
                </div>
              )}
            </div>

            {/* EXACT FIELD REPLACEMENT AS PER USER SCREENSHOT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                Landasan / Catatan Audit Log Perubahan:
              </label>
              <textarea 
                rows={3}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', backgroundColor: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
                placeholder="Contoh: Penyesuaian kriteria aktuarial per SK Direksi / Evaluasi Triwulan 2026..."
                value={skorsingLandasan}
                onChange={(e) => setSkorsingLandasan(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.modalFooter}>
            <button type="button" style={styles.secBtn} onClick={onClose}>Batal</button>
            <button type="submit" style={styles.priBtn}>💾 Simpan Periode Skorsing</button>
          </div>
        </form>
      </div>
    </div>
  );
}
