import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function ReportHutangView({
  filterHutangOpen,
  setFilterHutangOpen,
  hutangPeriode,
  setHutangPeriode,
  hutangTahun,
  setHutangTahun,
  hutangType,
  setHutangType,
  hutangKategori,
  setHutangKategori,
  handleOpenHutangPreview,
  addToast
}) {
  return (
    <div>
      <div style={styles.pageTopBar}>
        <div>
          <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Report Pelayanan &rsaquo; Report Hutang Klaim</div>
          <h1 style={styles.pageTitle}>Report Hutang Klaim</h1>
        </div>
        <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
      </div>

      <div style={styles.modernCardContainer}>
        <div style={styles.modernFilterCard}>
          <div 
            style={styles.modernFilterHeader}
            onClick={() => setFilterHutangOpen(!filterHutangOpen)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px', letterSpacing: '0.3px' }}>
                🔍 Filter Data
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={styles.modernFilterTag}>
                {hutangPeriode === 'Tahunan' ? `Tahunan • ${hutangTahun}` : `Triwulan ${hutangPeriode === '2' ? 'II' : hutangPeriode === '1' ? 'I' : hutangPeriode === '3' ? 'III' : 'IV'} • ${hutangTahun}`}
              </span>
              <span style={{ fontSize: '12px' }}>{filterHutangOpen ? '▲' : '▼'}</span>
            </div>
          </div>

          {filterHutangOpen && (
            <div style={styles.modernFilterBody}>
              <div style={styles.modernControlsGrid}>
                <div style={styles.modernFieldGroup}>
                  <label style={styles.modernLabel}>
                    <span>📅 Pilih Periode</span>
                  </label>
                  <select 
                    style={styles.modernSelect}
                    value={hutangPeriode}
                    onChange={(e) => setHutangPeriode(e.target.value)}
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
                    value={hutangType}
                    onChange={(e) => setHutangType(e.target.value)}
                  >
                    <option value="Rekap">Rekap</option>
                    <option value="Nominatif PP67 Dibawah 1 Juli 2015">Nominatif PP67 Dibawah 1 Juli 2015</option>
                    <option value="Nominatif PP67 Diatas 1 Juli 2015 (PP 102 Peralihan)">Nominatif PP67 Diatas 1 Juli 2015 (PP 102 Peralihan)</option>
                    <option value="Nominatif PP THT">Nominatif PP THT</option>
                    <option value="Nominatif PP JKK">Nominatif PP JKK</option>
                    <option value="Nominatif PP JKM">Nominatif PP JKM</option>
                    <option value="Nominatif PP JP">Nominatif PP JP</option>
                    <option value="Nominatif Batal BUM">Nominatif Batal BUM</option>
                  </select>
                </div>

                <div style={styles.modernFieldGroup}>
                  <label style={styles.modernLabel}>
                    <span>📋 Kategori</span>
                  </label>
                  <select 
                    style={styles.modernSelect}
                    value={hutangKategori}
                    onChange={(e) => setHutangKategori(e.target.value)}
                  >
                    <option value="Utang Klaim Tahun Lalu">Utang Klaim Tahun Lalu</option>
                    <option value="Klaim yang disetujui Tahun Berjalan Belum di Bayar">Klaim yang disetujui Tahun Berjalan Belum di Bayar</option>
                    <option value="Utang Klaim Tahun Lalu yang Sudah di Bayar">Utang Klaim Tahun Lalu yang Sudah di Bayar</option>
                    <option value="Utang Klaim Tahun Lalu Berjalan">Utang Klaim Tahun Lalu Berjalan</option>
                  </select>
                </div>

                <div style={styles.modernFieldGroup}>
                  <label style={styles.modernLabel}>
                    <span>🗓️ Tahun Periode</span>
                  </label>
                  <input 
                    type="number" 
                    style={styles.modernInput}
                    value={hutangTahun} 
                    onChange={(e) => setHutangTahun(e.target.value)} 
                  />
                </div>
              </div>

              <div style={{ ...styles.modernActionBar, justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button 
                    type="button"
                    style={styles.btnIconResetModern}
                    title="Reset Filter"
                    onClick={() => { setHutangPeriode('2'); setHutangTahun('2026'); setHutangType('Rekap'); setHutangKategori('Utang Klaim Tahun Lalu'); addToast('🔄 Filter berhasil di-reset!'); }}
                  >
                    🔄
                  </button>

                  <button 
                    type="button"
                    style={styles.btnPrimaryModern}
                    onClick={handleOpenHutangPreview}
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
