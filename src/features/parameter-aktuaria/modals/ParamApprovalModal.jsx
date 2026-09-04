import React, { useState } from 'react';
import { styles } from '../../../styles/themeStyles';
import { getCategoryAbbr, formatDateDDMMYY } from '../../../utils/formatters';

export default function ParamApprovalModal({
  proposal,
  selectedParam,
  userRole,
  onClose,
  onApprove,
  onReject
}) {
  const [pendingAction, setPendingAction] = useState(null); // 'SETUJU' | 'TOLAK'
  const [actionNote, setActionNote] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!proposal) return null;

  const isPending = proposal.status === 'PENDING';
  const isApproved = proposal.status === 'DISETUJUI';
  const canApprove = (userRole === 'AKTUARIA_CHECKER' || userRole === 'AKTUARIA_APPROVER' || userRole === 'AKTUARIA') && isPending;

  const getActorLabel = () => {
    if (userRole === 'AKTUARIA_CHECKER') return 'Budi Santoso, M.Act (Kabid Aktuaria)';
    if (userRole === 'AKTUARIA_APPROVER') return 'Dr. Hendro P., FSAI (Kadiv Aktuaria)';
    return 'Pimpinan Divisi Aktuaria';
  };

  const handleInitiateAction = (actionType) => {
    setPendingAction(actionType);
    setActionNote('');
    setShowNoteModal(true);
  };

  const handleNoteSubmit = () => {
    if (pendingAction === 'TOLAK' && !actionNote.trim()) {
      alert('Mohon masukkan catatan/alasan penolakan usulan.');
      return;
    }
    setShowNoteModal(false);
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    if (pendingAction === 'SETUJU') {
      onApprove(proposal.id, actionNote || 'Disetujui dan diberlakukan secara resmi.');
    } else if (pendingAction === 'TOLAK') {
      onReject(proposal.id, actionNote || 'Ditolak.', getActorLabel());
    }
    setShowConfirmModal(false);
    setPendingAction(null);
    setActionNote('');
    onClose();
  };

  return (
    <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
      <div style={{ ...styles.modalContainer, maxWidth: '880px' }}>
        {/* Modal Header */}
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#64748b', fontWeight: '800', letterSpacing: '0.5px' }}>
              PERSETUJUAN PARAMETER AKTUARIA
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
            padding: '24px 20px',
            marginBottom: '20px',
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
              {/* Garis Penghubung */}
              <div style={{
                position: 'absolute',
                top: '24px',
                left: '46px',
                right: '46px',
                height: '2.5px',
                backgroundColor: isApproved ? '#388e3c' : '#cbd5e1',
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
                  backgroundColor: isApproved ? '#d7edd9' : '#f1f5f9',
                  border: isApproved ? 'none' : '1.5px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isApproved ? '#388e3c' : '#e2e8f0',
                    color: isApproved ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    {isApproved ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <span>2</span>
                    )}
                  </div>
                </div>
                <span style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: isApproved ? '#1e293b' : '#64748b',
                  marginTop: '12px',
                  textAlign: 'center'
                }}>
                  Diterima
                </span>
                <span style={{ fontSize: '11px', color: isApproved ? '#16a34a' : '#d97706', marginTop: '2px', fontWeight: '600', textAlign: 'center' }}>
                  {isApproved ? 'Disetujui' : 'Menunggu Approval'}
                </span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS: DI ATAS SECTION KATEGORI PROGRAM */}
          {canApprove && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '16px' }}>
              <button
                type="button"
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                  transition: 'background-color 0.15s'
                }}
                onClick={() => handleInitiateAction('TOLAK')}
              >
                Tolak
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)',
                  transition: 'background-color 0.15s'
                }}
                onClick={() => handleInitiateAction('SETUJU')}
              >
                Setuju
              </button>
            </div>
          )}

          {/* DETAIL DIFF & COMPARISON TABLE (SECTION KATEGORI PROGRAM) */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '22px' }}>
            <div style={{ background: '#f1f5f9', padding: '12px 18px', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>KATEGORI PROGRAM: </span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e3a8a' }}>{getCategoryAbbr(proposal.kategori)}</span>
              </div>
              <div>
                <span style={{
                  background: isApproved ? '#dcfce7' : '#fef3c7',
                  color: isApproved ? '#15803d' : '#92400e',
                  border: isApproved ? '1px solid #bbf7d0' : '1px solid #fde68a',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  Status: {proposal.status}
                </span>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px', width: '32%', background: '#f8fafc', fontWeight: 'bold', color: '#334155' }}>
                    Nilai Rate Parameter Saat Ini:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#475569', fontWeight: '600' }}>
                    <span>{proposal.nilaiLama}</span>
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
                    📅 {formatDateDDMMYY(proposal.tglMulai)} s.d. {formatDateDDMMYY(proposal.tglSelesai)}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px', background: '#f8fafc', fontWeight: 'bold', color: '#334155' }}>
                    Tanggal Pengajuan Usulan:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#1e293b', fontWeight: '600' }}>
                    ⏱️ {formatDateDDMMYY(proposal.tglPengajuan)}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 18px', background: '#f8fafc', fontWeight: 'bold', color: '#334155' }}>
                    Diajukan Oleh:
                  </td>
                  <td style={{ padding: '12px 18px', color: '#1e293b', fontWeight: '600' }}>
                    👤 {proposal.diajukanOleh ? proposal.diajukanOleh.replace(/\s*\(Maker\)/gi, '') : '-'}
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

          {/* NOTICE FOR ROLES THAT CANNOT APPROVE OR WHEN ALREADY PROCESSED */}
          {!canApprove && !isApproved && (
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>ℹ️</span>
              <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                Usulan ini berstatus <strong>Pending</strong>. Pengambilan keputusan persetujuan dapat dilakukan oleh <strong>Kabid Aktuaria</strong> atau <strong>Kadiv Aktuaria</strong>.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div style={styles.modalFooter}>
          <button style={styles.secBtn} onClick={onClose}>Tutup</button>
        </div>
      </div>

      {/* MODAL 1: MENULIS CATATAN */}
      {showNoteModal && (
        <div style={{ ...styles.modalBackdrop, zIndex: 1200 }}>
          <div style={{ ...styles.modalContainer, maxWidth: '520px', borderRadius: '12px' }}>
            <div style={styles.modalHeader}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Catatan {pendingAction === 'SETUJU' ? 'Persetujuan' : 'Penolakan'}
              </h3>
              <button style={styles.closeBtn} onClick={() => setShowNoteModal(false)}>✕</button>
            </div>
            <div style={{ padding: '20px 24px', backgroundColor: '#ffffff' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#334155', display: 'block', marginBottom: '8px' }}>
                Tulis Catatan {pendingAction === 'SETUJU' ? 'Persetujuan (Opsional)' : 'Penolakan (Wajib)'}:
              </label>
              <textarea
                rows={4}
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
                placeholder={pendingAction === 'SETUJU' ? 'Tuliskan catatan persetujuan parameter...' : 'Tuliskan alasan penolakan usulan perubahan parameter...'}
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
              />
            </div>
            <div style={{ ...styles.modalFooter, justifyContent: 'flex-end', gap: '10px', padding: '14px 24px' }}>
              <button
                type="button"
                style={styles.secBtn}
                onClick={() => setShowNoteModal(false)}
              >
                Batal
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: pendingAction === 'SETUJU' ? '#16a34a' : '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 22px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
                onClick={handleNoteSubmit}
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: KONFIRMASI */}
      {showConfirmModal && (
        <div style={{ ...styles.modalBackdrop, zIndex: 1250 }}>
          <div style={{ ...styles.modalContainer, maxWidth: '460px', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ padding: '28px 24px 16px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: pendingAction === 'SETUJU' ? '#dcfce7' : '#fee2e2',
                color: pendingAction === 'SETUJU' ? '#15803d' : '#b91c1c',
                fontSize: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                {pendingAction === 'SETUJU' ? '✓' : '!'}
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px' }}>
                {pendingAction === 'SETUJU' ? 'Apakah Anda Yakin untuk Di setujui ?' : 'Apakah Anda Yakin untuk Ditolak ?'}
              </h3>

              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: '0 0 14px' }}>
                {pendingAction === 'SETUJU' 
                  ? `Perubahan nilai parameter "${proposal.namaParam}" akan langsung disahkan dan mulai diberlakukan.`
                  : `Usulan perubahan parameter "${proposal.namaParam}" akan ditolak.`
                }
              </p>

              {actionNote && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#334155', fontStyle: 'italic', textAlign: 'left', marginBottom: '10px' }}>
                  <strong>Catatan:</strong> "{actionNote}"
                </div>
              )}
            </div>

            <div style={{ ...styles.modalFooter, justifyContent: 'center', gap: '12px', padding: '14px 24px 20px', borderTop: '1px solid #f1f5f9' }}>
              <button
                type="button"
                style={{ ...styles.secBtn, padding: '8px 20px' }}
                onClick={() => setShowConfirmModal(false)}
              >
                Batal
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: pendingAction === 'SETUJU' ? '#16a34a' : '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 24px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: pendingAction === 'SETUJU' ? '0 2px 8px rgba(22, 163, 74, 0.3)' : '0 2px 8px rgba(220, 38, 38, 0.3)'
                }}
                onClick={handleFinalConfirm}
              >
                {pendingAction === 'SETUJU' ? 'Ya, Setujui' : 'Ya, Tolak'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
