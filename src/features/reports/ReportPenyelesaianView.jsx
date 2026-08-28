import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function ReportPenyelesaianView({
  filterPenyelesaianOpen,
  setFilterPenyelesaianOpen,
  penyelesaianPeriode,
  setPenyelesaianPeriode,
  penyelesaianTahun,
  setPenyelesaianTahun,
  penyelesaianType,
  setPenyelesaianType,
  penyelesaianJenis,
  setPenyelesaianJenis,
  handleOpenPenyelesaianPreview,
  addToast
}) {
  return (
    <div>
      <div style={styles.pageTopBar}>
        <div>
          <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Report Pelayanan &rsaquo; Report Penyelesaian Klaim (Format E-1)</div>
          <h1 style={styles.pageTitle}>Report Penyelesaian Klaim</h1>
        </div>
        <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
      </div>

      <div style={styles.modernCardContainer}>
        <div style={styles.modernFilterCard}>
          <div 
            style={styles.modernFilterHeader}
            onClick={() => setFilterPenyelesaianOpen(!filterPenyelesaianOpen)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px', letterSpacing: '0.3px' }}>
                🔍 Filter Data
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={styles.modernFilterTag}>
                {penyelesaianPeriode === 'Tahunan' ? `Tahunan • ${penyelesaianTahun}` : `Triwulan ${penyelesaianPeriode === '1' ? 'I' : penyelesaianPeriode === '2' ? 'II' : penyelesaianPeriode === '3' ? 'III' : 'IV'} • ${penyelesaianTahun}`}
              </span>
              <span style={{ fontSize: '12px' }}>{filterPenyelesaianOpen ? '▲' : '▼'}</span>
            </div>
          </div>

          {filterPenyelesaianOpen && (
            <div style={styles.modernFilterBody}>
              <div style={styles.modernControlsGrid}>
                <div style={styles.modernFieldGroup}>
                  <label style={styles.modernLabel}>
                    <span>📅 Pilih Periode</span>
                  </label>
                  <select 
                    style={styles.modernSelect}
                    value={penyelesaianPeriode}
                    onChange={(e) => setPenyelesaianPeriode(e.target.value)}
                  >
                    <option value="1">Triwulan 1 (I)</option>
                    <option value="2">Triwulan 2 (II)</option>
                    <option value="3">Triwulan 3 (III)</option>
                    <option value="4">Triwulan 4 (IV)</option>
                    <option value="Tahunan">Tahunan (1 Tahun Penuh)</option>
                  </select>
                </div>

                <div style={styles.modernFieldGroup}>
                  <label style={styles.modernLabel}>
                    <span>📊 Tipe Laporan</span>
                  </label>
                  <select 
                    style={styles.modernSelect}
                    value={penyelesaianType}
                    onChange={(e) => setPenyelesaianType(e.target.value)}
                  >
                    <option value="Rekap">Rekapitulasi</option>
                    <option value="Detail">Rincian Detail</option>
                  </select>
                </div>

                <div style={{ ...styles.modernFieldGroup, gridColumn: 'span 2' }}>
                  <label style={styles.modernLabel}>
                    <span>📋 Status Jenis Klaim</span>
                  </label>
                  <select 
                    style={styles.modernSelect}
                    value={penyelesaianJenis}
                    onChange={(e) => setPenyelesaianJenis(e.target.value)}
                  >
                    <option value="KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU">KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU</option>
                    <option value="KLAIM YANG DIAJUKAN TRIWULAN/TAHUN BERJALAN">KLAIM YANG DIAJUKAN TRIWULAN/TAHUN BERJALAN</option>
                    <option value="KLAIM YANG HARUS DISELESAIKAN TRIWULAN/TAHUN BERJALAN KLAIM YANG HARUS DIPROSES">KLAIM YANG HARUS DISELESAIKAN TRIWULAN/TAHUN BERJALAN KLAIM YANG HARUS DIPROSES</option>
                    <option value="KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN DAN TELAH DI BAYAR">KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN DAN TELAH DI BAYAR</option>
                    <option value="KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TAPI BELUM DI BAYAR">KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TAPI BELUM DI BAYAR</option>
                    <option value="KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN BERJALAN">KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN BERJALAN</option>
                  </select>
                </div>

                <div style={styles.modernFieldGroup}>
                  <label style={styles.modernLabel}>
                    <span>🗓️ Tahun Periode</span>
                  </label>
                  <input 
                    type="number" 
                    style={styles.modernInput}
                    value={penyelesaianTahun} 
                    onChange={(e) => setPenyelesaianTahun(e.target.value)} 
                  />
                </div>
              </div>

              <div style={{ ...styles.modernActionBar, justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button 
                    type="button"
                    style={styles.btnIconResetModern}
                    title="Reset Filter"
                    onClick={() => { setPenyelesaianPeriode('1'); setPenyelesaianTahun('2026'); setPenyelesaianType('Rekap'); setPenyelesaianJenis('KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU'); addToast('🔄 Filter berhasil di-reset!'); }}
                  >
                    🔄
                  </button>

                  <button 
                    type="button"
                    style={styles.btnPrimaryModern}
                    onClick={handleOpenPenyelesaianPreview}
                  >
                    🔍 Preview & Cetak Laporan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
