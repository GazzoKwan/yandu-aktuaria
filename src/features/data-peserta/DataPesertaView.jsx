import React from 'react';
import { styles } from '../../styles/themeStyles';
import { calculateBenefits } from '../../utils/actuaryCalculator';
import { formatRupiah, formatMkgDisplay } from '../../utils/formatters';

export default function DataPesertaView({
  searchVal,
  setSearchVal,
  filterKlaim,
  setFilterKlaim,
  userRole,
  filteredClaims,
  rateManfaatPeserta,
  setSelectedClaimId,
  setModalTab,
  handleExportDataPesertaPdf,
  handleExportDataPesertaExcel
}) {
  return (
    <div>
      <div style={styles.pageTopBar}>
        <div>
          <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Data Peserta</div>
          <h1 style={styles.pageTitle}>Data Peserta</h1>
        </div>
        <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
      </div>

      {/* TOOLBAR & EXTRACTION BUTTONS */}
      <div style={styles.toolbar}>
        <div style={{ display: 'flex', gap: 12 }}>
          <input 
            type="text" 
            style={styles.filterInput}
            value={searchVal} 
            onChange={(e) => setSearchVal(e.target.value)} 
            placeholder="Cari No. SP / KTPA / Nama / NRP..." 
          />
          <select 
            style={styles.filterSelect}
            value={filterKlaim}
            onChange={(e) => setFilterKlaim(e.target.value)}
          >
            <option value="ALL">Semua Jenis Klaim</option>
            <option value="TA">Tabungan Asuransi (TA)</option>
            <option value="NTTA">Nilai Tunai TA (NTTA)</option>
            <option value="NTIP">Nilai Tunai Iuran Pensiun (NTIP)</option>
          </select>
        </div>

        {userRole === 'AKTUARIA' && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={styles.btnPdfRed} onClick={handleExportDataPesertaPdf}>
              📄 Unduh Data (PDF)
            </button>
            <button style={styles.btnExcelGreen} onClick={handleExportDataPesertaExcel}>
              📊 Unduh Data (Excel)
            </button>
          </div>
        )}
      </div>

      {/* DATA TABLE WITH MKG AWAL (TAHUN & BULAN) */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>NO. SP</th>
              <th style={styles.th}>TGL PENGAJUAN</th>
              <th style={styles.th}>PESERTA / NRP (KLIK DETAIL)</th>
              <th style={styles.th}>JENIS KLAIM</th>
              <th style={styles.th}>SKORSING BERLAKU</th>
              <th style={styles.th}>MKG AWAL</th>
              <th style={styles.th}>MANFAAT TA</th>
              <th style={styles.th}>NTTA</th>
              <th style={styles.th}>NTIP</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map(item => {
              const calc = calculateBenefits(item.gajiPokok, item.masaKerjaBulan, item.skorsingBulan, item.mkgAwalTahun, item.mkgAwalBulan, rateManfaatPeserta);
              return (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}><strong>{item.spNum}</strong></td>
                  <td style={styles.td}>{item.tgl}</td>
                  <td style={styles.td}>
                    <div 
                      style={styles.pesertaClickable}
                      onClick={() => { setSelectedClaimId(item.id); setModalTab('profil'); }}
                    >
                      <div style={styles.pesertaName}>{item.nama}</div>
                      <div style={styles.pesertaSub}>KTPA: {item.ktpa} • NRP: {item.nrp}</div>
                    </div>
                  </td>
                  <td style={styles.td}><span style={styles.badge}>{item.jenisKlaim}</span></td>
                  <td style={styles.td}><strong>{item.skorsingBulan}</strong> Bulan</td>
                  <td style={styles.td}><strong>{formatMkgDisplay(item.mkgAwalTahun, item.mkgAwalBulan)}</strong></td>
                  <td style={styles.td}><strong>{formatRupiah(calc.ta)}</strong></td>
                  <td style={styles.td}>{formatRupiah(calc.ntta)}</td>
                  <td style={styles.td}>{formatRupiah(calc.ntip)}</td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <button 
                      style={styles.actionBtnIcon}
                      title={userRole === 'CSO' ? "Detail & Koreksi Perhitungan Manfaat" : "Detail Profil & Perhitungan Manfaat"}
                      onClick={() => { setSelectedClaimId(item.id); setModalTab('profil'); }}
                    >
                      {userRole === 'CSO' ? '✏️' : '👁️'}
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
