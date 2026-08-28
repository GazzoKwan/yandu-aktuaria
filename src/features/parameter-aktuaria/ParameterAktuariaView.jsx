import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function ParameterAktuariaView({
  actuaryParams,
  setSelectedParamId,
  setShowAddRateModal,
  setSelectedParamLogId
}) {
  return (
    <div>
      <div style={styles.pageTopBar}>
        <div>
          <div style={styles.breadcrumb}>Beranda &rsaquo; Aktuaria &rsaquo; Perubahan Parameter Perhitungan Manfaat (UC-AKT-005)</div>
          <h1 style={styles.pageTitle}>Perubahan Parameter Perhitungan Manfaat</h1>
        </div>
        <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: '800', color: '#0f172a' }}>
              📋 Daftar Parameter Utama Perhitungan Manfaat
            </h3>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              Kelola rate persenan, alokasi risiko THT, histori tanggal berlaku, dan jejak audit perubahan parameter.
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#64748b', background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            Hak Akses: <strong>Divisi Aktuaria</strong>
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
                return (
                  <tr key={param.id} style={styles.tr}>
                    <td style={styles.td}><strong>{idx + 1}</strong></td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{param.nama}</div>
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
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          style={styles.actionBtnParamIcon}
                          title="Kelola Rate Persenan & Rentang Tanggal"
                          onClick={() => {
                            setSelectedParamId(param.id);
                            setShowAddRateModal(false);
                          }}
                        >
                          ⚙️
                        </button>
                        <button 
                          style={styles.actionBtnHistoryIcon}
                          title="Lihat Histori Perubahan & Aktor Log"
                          onClick={() => {
                            setSelectedParamLogId(param.id);
                          }}
                        >
                          📜
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
