import React from 'react';
import { styles } from '../../styles/themeStyles';
import { getCategoryAbbr } from '../../utils/formatters';

export default function ParameterApprovalListView({
  pendingApprovals = [],
  onOpenApprovalModal,
  userRole
}) {
  const isApproverRole = userRole === 'AKTUARIA_CHECKER' || userRole === 'AKTUARIA_APPROVER' || userRole === 'AKTUARIA';

  return (
    <div>
      {/* Top Bar */}
      <div style={styles.pageTopBar}>
        <div>
          <div style={styles.breadcrumb}>Beranda &rsaquo; Aktuaria &rsaquo; Perubahan Parameter &rsaquo; Approval</div>
          <h1 style={styles.pageTitle}>⚖️ Approval Perubahan Parameter</h1>
        </div>
        <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📋 Daftar Usulan Perubahan Parameter Menunggu Persetujuan</span>
            {pendingApprovals.length > 0 && (
              <span style={{ background: '#d97706', color: '#ffffff', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                {pendingApprovals.length} Usulan Aktif
              </span>
            )}
          </h3>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            Halaman persetujuan bagi <strong>Kabid Aktuaria</strong> atau <strong>Kadiv Aktuaria</strong> (cukup 1 kali persetujuan). Klik tombol <strong>Detail</strong> untuk memeriksa rincian usulan dan mengambil keputusan.
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#1e293b', background: '#fef3c7', padding: '6px 14px', borderRadius: '8px', border: '1px solid #fde68a' }}>
          Role Aktif: <strong>{userRole === 'AKTUARIA_CHECKER' ? 'Kabid Aktuaria' : userRole === 'AKTUARIA_APPROVER' ? 'Kadiv Aktuaria' : 'Divisi Aktuaria'}</strong>
        </div>
      </div>

      {pendingApprovals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '42px', marginBottom: '12px' }}>✅</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
            Tidak Ada Usulan Menunggu Persetujuan
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            Seluruh usulan penyesuaian rate parameter telah selesai diproses dan disahkan secara resmi.
          </div>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>NO</th>
                <th style={styles.th}>NAMA PARAMETER</th>
                <th style={styles.th}>PERUBAHAN NILAI</th>
                <th style={styles.th}>DIAJUKAN OLEH</th>
                <th style={styles.th}>STATUS APPROVAL</th>
                <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((proposal, idx) => {
                return (
                  <tr key={proposal.id} style={styles.tr}>
                    <td style={styles.td}><strong>{idx + 1}</strong></td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{proposal.namaParam}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontWeight: 'bold' }}>
                        {getCategoryAbbr(proposal.kategori)}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        color: '#0f172a',
                        fontWeight: '800',
                        fontSize: '13px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap'
                      }}>
                        {proposal.paramId === 4 
                          ? `${proposal.nilaiBaru}% (Peserta)` 
                          : `${proposal.nilaiBaru} %`}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#0369a1' }}>
                        {proposal.diajukanOleh ? proposal.diajukanOleh.replace(/\s*\(Maker\)/gi, '') : '-'}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        background: '#fefce8',
                        color: '#854d0e',
                        border: '1px solid #fde047',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}>
                        PENDING
                      </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      {/* AKSI HANYA TOMBOL DETAIL */}
                      <button
                        style={{
                          background: '#eff6ff',
                          color: '#1d4ed8',
                          border: '1.5px solid #bfdbfe',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          boxShadow: '0 1px 3px rgba(37,99,235,0.08)',
                          whiteSpace: 'nowrap'
                        }}
                        onClick={() => onOpenApprovalModal(proposal.id)}
                        title="Buka detail usulan untuk melihat rincian tanggal, catatan, serta keputusan Setuju atau Tolak"
                      >
                        <span>👁️</span>
                        <span>Detail</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
