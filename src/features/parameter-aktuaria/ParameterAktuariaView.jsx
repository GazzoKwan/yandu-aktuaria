import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function ParameterAktuariaView({
  actuaryParams,
  setSelectedParamId,
  setShowAddRateModal,
  setSelectedParamLogId,
  pendingApprovals = [],
  userRole
}) {
  const getRoleBadgeLabel = (role) => {
    switch(role) {
      case 'AKTUARIA_MAKER': return 'Analis Aktuaria (Maker)';
      case 'AKTUARIA_CHECKER': return 'Kabid Aktuaria (Checker)';
      case 'AKTUARIA_APPROVER': return 'Kadiv Aktuaria (Final Approver)';
      default: return 'Divisi Aktuaria';
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div style={styles.pageTopBar}>
        <div>
          <div style={styles.breadcrumb}>Beranda &rsaquo; Aktuaria &rsaquo; Perubahan Parameter Perhitungan Manfaat (UC-AKT-005)</div>
          <h1 style={styles.pageTitle}>Perubahan Parameter Perhitungan Manfaat</h1>
        </div>
        <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: '800', color: '#0f172a' }}>
            📋 Daftar Parameter Utama Perhitungan Manfaat
          </h3>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            Kelola rate persenan dan histori tanggal keberlakuan. Klik tombol <strong>Detail</strong> pada baris parameter untuk melihat riwayat serta mengakses opsi ubah rate atau log audit.
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#1e293b', background: '#f1f5f9', padding: '6px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          Akses Login: <strong>{getRoleBadgeLabel(userRole)}</strong>
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>NO</th>
              <th style={styles.th}>NAMA PARAMETER</th>
              <th style={styles.th}>KATEGORI PROGRAM</th>
              <th style={styles.th}>PERSENAN SAAT INI (AKTIF)</th>
              <th style={styles.th}>PERIODE BERLAKU</th>
              <th style={styles.th}>TERAKHIR DIUBAH OLEH</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {actuaryParams.map((param, idx) => {
              const activeRate = param.history.find(h => h.status === 'AKTIF') || param.history[0];
              const activeProposal = pendingApprovals.find(p => p.paramId === param.id);

              return (
                <tr key={param.id} style={{ ...styles.tr, backgroundColor: activeProposal ? '#fffbeb' : '#ffffff' }}>
                  <td style={styles.td}><strong>{idx + 1}</strong></td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{param.nama}</div>
                    {activeProposal && (
                      <div style={{ marginTop: '4px' }}>
                        <span style={{
                          background: '#fef3c7',
                          color: '#92400e',
                          border: '1px solid #fde68a',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}>
                          Pending Approval
                        </span>
                      </div>
                    )}
                  </td>
                  <td style={styles.td}><span style={styles.badge}>{param.kategori}</span></td>
                  <td style={styles.td}>
                    {param.id === 4 && activeRate ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', whiteSpace: 'nowrap' }}>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', width: 'fit-content' }}>
                          {activeRate.persen}% (Peserta)
                        </span>
                        <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', width: 'fit-content' }}>
                          {Math.max(0, 100 - activeRate.persen)}% (Risiko)
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: 13, fontWeight: '800', color: '#0f172a', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                        {activeRate ? `${activeRate.persen} %` : '-'}
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: 12, fontWeight: '600', color: '#1e293b' }}>
                      📅 {activeRate ? `${activeRate.tglMulai} s.d. ${activeRate.tglSelesai}` : '-'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: 11, color: '#475569' }}>{activeRate ? activeRate.diubahOleh : '-'}</span>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    {/* SINGLE ACTION BUTTON: DETAIL */}
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
                      title="Buka Detail Parameter untuk Ubah Rate dan Lihat Log Audit"
                      onClick={() => {
                        setSelectedParamId(param.id);
                        setShowAddRateModal(false);
                      }}
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
    </div>
  );
}
