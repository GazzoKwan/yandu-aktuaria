import React, { useState } from 'react';
import { styles } from '../../../styles/themeStyles';

export default function ParamApprovalModal({
  proposal,
  selectedParam,
  userRole,
  onClose,
  onApprove,
  onReject
}) {
  const [decisionNote, setDecisionNote] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!proposal) return null;

  const isPending = proposal.status === 'PENDING';
  const canApprove = (userRole === 'AKTUARIA_CHECKER' || userRole === 'AKTUARIA_APPROVER' || userRole === 'AKTUARIA') && isPending;

  const getActorLabel = () => {
    if (userRole === 'AKTUARIA_CHECKER') return 'Budi Santoso, M.Act (Kabid Aktuaria)';
    if (userRole === 'AKTUARIA_APPROVER') return 'Dr. Hendro P., FSAI (Kadiv Aktuaria)';
    return 'Pimpinan Divisi Aktuaria';
  };

  const handleConfirmApprove = () => {
    onApprove(proposal.id, decisionNote || 'Disetujui dan diberlakukan secara resmi.');
    setDecisionNote('');
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert('Mohon masukkan alasan penolakan.');
      return;
    }
    onReject(proposal.id, rejectReason, getActorLabel());
    setRejectReason('');
    setShowRejectForm(false);
  };

  return (
    <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
      <div style={{ ...styles.modalContainer, maxWidth: '880px' }}>
        {/* Modal Header */}
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              UC-AKT-005: PERSETUJUAN PARAMETER AKTUARIA (1x APPROVAL)
            </div>
            <h2 style={{ fontSize: 16, marginTop: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
              👁️ Detail Usulan Perubahan — {proposal.namaParam}
            </h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          
          {/* ALUR PERSETUJUAN LINEAR (SESUAI GAMBAR REFERENSI: PENGAJUAN ─── DITERIMA) */}
          <div style={{
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            padding: '30px 20px',
            marginBottom: '24px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              maxWidth: '460px',
              margin: '0 auto'
            }}>
              {/* Garis Penghubung Hijau Solid */}
              <div style={{
                position: 'absolute',
                top: '24px',
                left: '46px',
                right: '46px',
                height: '2.5px',
                backgroundColor: '#388e3c',
                zIndex: 1
              }} />

              {/* NODE 1: PENGAJUAN */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '110px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#d7edd9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#388e3c',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <span style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginTop: '12px',
                  textAlign: 'center'
                }}>
                  Pengajuan
                </span>
                {proposal.diajukanOleh && (
                  <span style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', textAlign: 'center' }}>
                    {proposal.diajukanOleh.split(' (')[0]}
                  </span>
                )}
              </div>

              {/* NODE 2: DITERIMA */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '110px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#d7edd9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#388e3c',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <span style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginTop: '12px',
                  textAlign: 'center'
                }}>
                  Diterima
                </span>
                <span style={{ fontSize: '11px', color: proposal.status === 'DISETUJUI' ? '#16a34a' : '#d97706', marginTop: '2px', fontWeight: '600', textAlign: 'center' }}>
                  {proposal.status === 'DISETUJUI' ? 'Disetujui' : 'Menunggu Approval'}
                </span>
              </div>
            </div>
          </div>

          {/* DETAIL DIFF & COMPARISON TABLE */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '22px' }}>
            <div style={{ background: '#f1f5f9', padding: '12px 18px', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>KATEGORI PROGRAM: </span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e3a8a' }}>{proposal.kategori}</span>
              </div>
              <div>
                <span style={{
                  background: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #fde68a',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  Status: PENDING
                </span>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px', width: '30%', background: '#f8fafc', fontWeight: 'bold', color: '#334155' }}>
                    Nilai Rate Parameter Saat Ini:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#64748b', fontWeight: '600' }}>
                    <span style={{ textDecoration: 'line-through' }}>{proposal.nilaiLama}</span>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f0fdf4' }}>
                  <td style={{ padding: '12px 18px', fontWeight: 'bold', color: '#166534' }}>
                    Nilai Usulan Rate Baru:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#15803d', fontWeight: '800', fontSize: '16px' }}>
                    {proposal.paramId === 4 ? (
                      <span>{proposal.nilaiBaru}% (Peserta) / {Math.max(0, 100 - proposal.nilaiBaru)}% (Risiko)</span>
                    ) : (
                      `${proposal.nilaiBaru} %`
                    )}
                    <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#16a34a', marginLeft: '10px' }}>
                      (Akan aktif segera setelah disetujui)
                    </span>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px', background: '#f8fafc', fontWeight: 'bold', color: '#334155' }}>
                    Periode Tanggal Berlaku:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#0f172a', fontWeight: '700' }}>
                    📅 {proposal.tglMulai} s.d. {proposal.tglSelesai}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px', background: '#f8fafc', fontWeight: 'bold', color: '#334155' }}>
                    Landasan SK / Dokumen Acuan:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#1e293b', fontWeight: '600' }}>
                    📜 {proposal.landasan}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 18px', background: '#f8fafc', fontWeight: 'bold', color: '#334155' }}>
                    Catatan Justifikasi Kajian:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#475569', fontStyle: 'italic' }}>
                    "{proposal.catatanPengajuan || 'Tidak ada catatan khusus.'}"
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ACTION PANEL FOR APPROVER (KABID ATAU KADIV) */}
          {canApprove && (
            <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '12px', padding: '18px 20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span>⚖️ Keputusan Persetujuan Parameter ({userRole === 'AKTUARIA_CHECKER' ? 'Kabid Aktuaria' : 'Kadiv Aktuaria'})</span>
                <span style={{ fontSize: '10px', background: '#2563eb', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>
                  1X APPROVAL
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#1e40af', marginBottom: '14px' }}>
                Persetujuan Anda sebagai <strong>{userRole === 'AKTUARIA_CHECKER' ? 'Kabid Aktuaria' : 'Kadiv Aktuaria'}</strong> akan langsung menerbitkan rate ini secara resmi dan mencatatnya ke dalam Audit Log.
              </div>

              {!showRejectForm ? (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#172554', display: 'block', marginBottom: '6px' }}>
                    Catatan Keputusan (Opsional):
                  </label>
                  <input 
                    type="text"
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #93c5fd', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box', marginBottom: '14px' }}
                    placeholder="Contoh: Disetujui dan diberlakukan per tanggal efektif sesuai SK Direksi."
                    value={decisionNote}
                    onChange={(e) => setDecisionNote(e.target.value)}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button 
                      type="button" 
                      style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca', padding: '9px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                      onClick={() => setShowRejectForm(true)}
                    >
                      ❌ Tolak Usulan
                    </button>
                    <button 
                      type="button" 
                      style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#fff', border: 'none', padding: '9px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}
                      onClick={handleConfirmApprove}
                    >
                      ✨ Setujui & Terbitkan Parameter
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#991b1b', display: 'block', marginBottom: '6px' }}>
                    Alasan Penolakan:
                  </label>
                  <textarea 
                    rows={3}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #f87171', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    placeholder="Tuliskan alasan penolakan atau instruksi perbaikan..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button 
                      type="button" 
                      style={styles.secBtn}
                      onClick={() => setShowRejectForm(false)}
                    >
                      Batal
                    </button>
                    <button 
                      type="button" 
                      style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                      onClick={handleConfirmReject}
                    >
                      Konfirmasi Tolak Usulan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* READ-ONLY NOTICE FOR MAKER */}
          {!canApprove && (
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>ℹ️</span>
              <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                Usulan ini berstatus <strong>Pending</strong>. Pengambilan keputusan persetujuan dapat dilakukan oleh <strong>Kabid Aktuaria</strong> atau <strong>Kadiv Aktuaria</strong> (hanya perlu 1 kali persetujuan).
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div style={styles.modalFooter}>
          <button style={styles.secBtn} onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}
