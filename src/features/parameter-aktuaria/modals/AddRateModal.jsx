import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function AddRateModal({
  show,
  selectedParam,
  newRatePersen,
  setNewRatePersen,
  newRateTglMulai,
  setNewRateTglMulai,
  newRateTglSelesai,
  setNewRateTglSelesai,
  newRateLandasan,
  setNewRateLandasan,
  newRateCatatan,
  setNewRateCatatan,
  onClose,
  onSubmit
}) {
  if (!show || !selectedParam) return null;

  return (
    <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
      <div style={{ ...styles.subModalContainer, maxWidth: '600px' }}>
        <div style={styles.subModalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>UC-AKT-005: USULAN RATE PARAMETER (MAKER)</div>
            <h3 style={{ fontSize: 14, color: '#fff', margin: '2px 0 0 0' }}>
              ➕ Usulkan Rate Persenan Baru — {selectedParam.nama}
            </h3>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Banner info approval */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px 14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px' }}>🛡️</span>
              <div style={{ fontSize: '11px', color: '#166534', lineHeight: '1.4' }}>
                <strong>Tata Kelola Persetujuan Parameter:</strong> Usulan yang Anda ajukan akan berstatus <strong>Pending</strong> dan dapat langsung diverifikasi & disahkan (1 kali approval) oleh <strong>Kabid Aktuaria</strong> atau <strong>Kadiv Aktuaria</strong>.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                {selectedParam.id === 4 ? 'Persentase Manfaat Peserta (%):' : 'Nilai Persenan Rate Baru (%):'}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                <input 
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  style={{ width: '100%', height: '42px', padding: '0 40px 0 14px', border: '2px solid #60a5fa', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: '#f0f9ff', color: '#0f172a', boxSizing: 'border-box' }}
                  placeholder="Contoh: 90.00"
                  value={newRatePersen}
                  onChange={(e) => setNewRatePersen(e.target.value)}
                  required
                  autoFocus
                />
                <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '14px', pointerEvents: 'none' }}>%</span>
              </div>
              {selectedParam.id === 4 && newRatePersen !== '' && (
                <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 'bold', marginTop: '4px' }}>
                  ⚡ Alokasi Uang Risiko Otomatis: {Math.max(0, 100 - (parseFloat(newRatePersen) || 0)).toFixed(2)}%
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Tanggal Mulai Berlaku:
                </label>
                <input 
                  type="date"
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                  value={newRateTglMulai}
                  onChange={(e) => setNewRateTglMulai(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                  Tanggal Selesai Berlaku:
                </label>
                <input 
                  type="date"
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                  value={newRateTglSelesai}
                  onChange={(e) => setNewRateTglSelesai(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                Landasan SK Direksi / Dokumen Kebijakan:
              </label>
              <input 
                type="text"
                style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                placeholder="Contoh: SK Direksi No. 55/2026 tentang Penyesuaian Suku Bunga Aktuaria"
                value={newRateLandasan}
                onChange={(e) => setNewRateLandasan(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                Catatan Justifikasi Kajian Aktuaria (Opsional):
              </label>
              <textarea 
                rows={2}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                placeholder="Tuliskan latar belakang usulan perubahan nilai rate ini..."
                value={newRateCatatan || ''}
                onChange={(e) => setNewRateCatatan && setNewRateCatatan(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.modalFooter}>
            <button type="button" style={styles.secBtn} onClick={onClose}>Batal</button>
            <button type="submit" style={{ ...styles.priBtn, background: 'linear-gradient(135deg, #0284c7, #0369a1)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              📤 Ajukan Usulan Approval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
