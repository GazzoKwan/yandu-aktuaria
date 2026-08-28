import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function ReportHutangPreviewModal({
  show,
  hutangPeriode,
  hutangTahun,
  onClose,
  onDownloadPdf,
  onDownloadExcel
}) {
  if (!show) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.modalContainer, maxWidth: '1360px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW CETAK REPORT PELAYANAN — B-2. LAPORAN UTANG KLAIM</div>
            <h2 style={{ fontSize: 16, marginTop: 2 }}>
              B-2. LAPORAN UTANG KLAIM — {hutangPeriode === 'Tahunan' ? `PERIODE TAHUNAN ${hutangTahun}` : `PERIODE TRIWULAN : ${hutangPeriode === '2' ? 'II' : hutangPeriode === '1' ? 'I' : hutangPeriode === '3' ? 'III' : 'IV'} TAHUN ${hutangTahun}`}
            </h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          
          {/* ASABRI OFFICIAL B-2 HEADER BLOCK MATCHING EXCEL SCREENSHOT */}
          <div style={{ textAlign: 'center', marginBottom: 20, fontFamily: 'Arial, sans-serif', color: '#0f172a', lineHeight: '1.4' }}>
            <div style={{ fontSize: 13, fontWeight: 'bold' }}>PENGELOLA PROGRAM</div>
            <div style={{ fontSize: 13, fontWeight: 'bold' }}>LAPORAN PENYELENGGARAAN PROGRAM</div>
            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
              PROGRAM TABUNGAN HARI TUA PRAJURIT TENTARA NASIONAL INDONESIA,
            </div>
            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
              ANGGOTA KEPOLISIAN NEGARA REPUBLIK INDONESIA, DAN PEGAWAI APARATUR SIPIL NEGARA DI LINGKUNGAN
            </div>
            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
              KEMENTERIAN PERTAHANAN DAN KEPOLISIAN NEGARA REPUBLIK INDONESIA
            </div>
            <div style={{ fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>B-2. LAPORAN UTANG KLAIM</div>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginTop: 2 }}>
              {hutangPeriode === 'Tahunan' ? `PERIODE TAHUNAN ${hutangTahun}` : `PERIODE TRIWULAN : ${hutangPeriode === '2' ? 'II' : hutangPeriode === '1' ? 'I' : hutangPeriode === '3' ? 'III' : 'IV'} TAHUN ${hutangTahun}`}
            </div>
          </div>

          {/* ASABRI OFFICIAL B-2 TABLE MATCHING EXCEL SCREENSHOT */}
          <div style={{ overflowX: 'auto', border: '1px solid #000000' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
              <thead>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th rowSpan={2} style={styles.thExcelExact}>PP</th>
                  <th rowSpan={2} style={styles.thExcelExact}>PROG</th>
                  <th rowSpan={2} style={styles.thExcelExact}>PROGRAM/ MANFAAT</th>
                  <th colSpan={2} style={styles.thExcelExact}>UTANG KLAIM AKHIR TRIWULAN/TAHUN LALU</th>
                  <th colSpan={2} style={styles.thExcelExact}>KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TETAPI BELUM DIBAYAR</th>
                  <th colSpan={2} style={styles.thExcelExact}>UTANG KLAIM AKHIR TRIWULAN/TAHUN LALU YANG SUDAH DIBAYAR</th>
                  <th colSpan={2} style={styles.thExcelExact}>UTANG KLAIM AKHIR TRIWULAN/TAHUN BERJALAN</th>
                </tr>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th style={styles.thExcelExact}>JML PESERTA</th>
                  <th style={styles.thExcelExact}>RP JUTA</th>
                  <th style={styles.thExcelExact}>JML PESERTA</th>
                  <th style={styles.thExcelExact}>RP JUTA</th>
                  <th style={styles.thExcelExact}>JML PESERTA</th>
                  <th style={styles.thExcelExact}>RP JUTA</th>
                  <th style={styles.thExcelExact}>JML PESERTA</th>
                  <th style={styles.thExcelExact}>RP JUTA</th>
                </tr>
                {/* COLUMN NUMBERS ROW */}
                <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '10px' }}>
                  <th style={styles.thExcelExact}></th>
                  <th style={styles.thExcelExact}>1</th>
                  <th style={styles.thExcelExact}>2</th>
                  <th style={styles.thExcelExact}>3</th>
                  <th style={styles.thExcelExact}>4</th>
                  <th style={styles.thExcelExact}>5</th>
                  <th style={styles.thExcelExact}>6</th>
                  <th style={styles.thExcelExact}>7</th>
                  <th style={styles.thExcelExact}>8</th>
                  <th style={styles.thExcelExact}>9</th>
                  <th style={styles.thExcelExact}>10</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SA</td>
                  <td style={styles.tdExcelExact}>1</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>1734900</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>1</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>1734900</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI TANPA HAK PENSIUN</td>
                  <td style={styles.tdExcelExact}>12</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>90592400</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>12</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>90592400</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI DGN HAK TUNJANGAN</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SRK/SNTA</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBP</td>
                  <td style={styles.tdExcelExact}>3</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>8000000</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>3</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>8000000</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S PESERTA AKTIF</td>
                  <td style={styles.tdExcelExact}>2</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>6000000</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>2</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>6000000</td>
                </tr>
                <tr>
                  <td style={styles.tdExcelExact}>PP67</td>
                  <td style={styles.tdExcelExact}>THT</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S PESERTA PENSIUN</td>
                  <td style={styles.tdExcelExact}>5</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>12000000</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>0</td>
                  <td style={styles.tdExcelExact}>5</td>
                  <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>12000000</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div style={styles.modalFooter}>
          <button style={styles.secBtn} onClick={onClose}>Tutup</button>
          <button style={styles.btnPdfRed} onClick={onDownloadPdf}>📄 Unduh PDF (.pdf)</button>
          <button style={styles.btnExcelGreen} onClick={onDownloadExcel}>📊 Unduh Excel (.xlsx)</button>
        </div>
      </div>
    </div>
  );
}
