import React from 'react';
import { styles } from '../../../styles/themeStyles';
import Rekapitulasi3ExpectedGroupBlock from '../components/Rekapitulasi3ExpectedGroupBlock';

export default function ReportKuPreviewModal({
  show,
  kuCetak,
  kuCabang,
  kuMitraBayar,
  kuPeriodeAwal,
  kuPeriodeAkhir,
  onClose,
  onDownloadPdf,
  onDownloadExcel
}) {
  if (!show) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.modalContainer, maxWidth: '1380px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#64748b', fontWeight: '800', letterSpacing: '0.5px' }}>PREVIEW CETAK REPORT KU — SHEET 'OUTPUT YANG DIHARAPKAN'</div>
            <h2 style={{ fontSize: 16, marginTop: 2 }}>{kuCetak || 'DAFTAR REKAPITULASI III NON DAPEM'} — {kuCabang || '2000 - KANCAB UTAMA JAKARTA'}</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          
          {/* HEADER BLOCK MATCHING SHEET 2 'Ouput yang diharapkan' */}
          <div style={{ textAlign: 'center', marginBottom: 20, fontFamily: 'Arial, sans-serif', color: '#0f172a', lineHeight: '1.4' }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' }}>
              {kuCetak || 'DAFTAR REKAPITULASI III NON DAPEM'}
            </div>
            <div style={{ fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 2 }}>
              {kuMitraBayar === 'Semua Mitra' ? 'GABUNGAN POS DAN BANK' : kuMitraBayar} — {kuCabang || '2000 - KANCAB UTAMA JAKARTA'}
            </div>
            <div style={{ fontSize: 11, fontWeight: 'bold', marginTop: 2 }}>
              TANGGAL SP {kuPeriodeAwal} S.D. {kuPeriodeAkhir}
            </div>
          </div>

          {/* EXACT TABLE MATCHING SHEET 2 'Ouput yang diharapkan' */}
          <div style={{ overflowX: 'auto', border: '1px solid #000000' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
              <thead>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th rowSpan={7} style={styles.thExcelExact}>NO.</th>
                  <th rowSpan={7} style={styles.thExcelExact}>KELOMPOK PENSIUN</th>
                  <th rowSpan={7} style={styles.thExcelExact}>JENIS PENSIUN</th>
                  <th style={styles.thExcelExact}>JUMLAH JIWA</th>
                  <th style={styles.thExcelExact}>JUMLAH BRUTO</th>
                  <th colSpan={6} style={styles.thExcelExact}>POTONGAN</th>
                  <th rowSpan={7} style={styles.thExcelExact}>JUMLAH NETTO</th>
                </tr>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th style={styles.thExcelExact}>A. PENERIMA</th>
                  <th style={styles.thExcelExact}>A. PENSIUN POKOK</th>
                  <th rowSpan={6} style={styles.thExcelExact}>PPH21</th>
                  <th rowSpan={6} style={styles.thExcelExact}>ASKES</th>
                  <th colSpan={2} rowSpan={5} style={styles.thExcelExact}>HUTANG NEGARA</th>
                  <th rowSpan={6} style={styles.thExcelExact}>LAIN-LAIN</th>
                  <th rowSpan={6} style={styles.thExcelExact}>JUMLAH</th>
                </tr>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th style={styles.thExcelExact}>B. ISTRI/ SUAMI</th>
                  <th style={styles.thExcelExact}>B. TUNJANGAN KELUARGA</th>
                </tr>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th style={styles.thExcelExact}>C. ANAK</th>
                  <th style={styles.thExcelExact}>C. TUNJANGAN BERAS</th>
                </tr>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th style={styles.thExcelExact}>D. (CACAT)</th>
                  <th style={styles.thExcelExact}>D. CACAT LAIN-LAIN</th>
                </tr>
                <tr style={{ backgroundColor: '#ffffff' }}>
                  <th style={styles.thExcelExact}></th>
                  <th style={styles.thExcelExact}>E. LAIN-LAIN</th>
                </tr>
                <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
                  <th style={styles.thExcelExact}>TOTAL</th>
                  <th style={styles.thExcelExact}>TOTAL</th>
                  <th style={styles.thExcelExact}>TGR</th>
                  <th style={styles.thExcelExact}>NON TGR</th>
                </tr>
              </thead>
              <tbody>
                {/* KELOMPOK 1: PENS PNS KEMHAN ( 513113 ) */}
                <Rekapitulasi3ExpectedGroupBlock 
                  no="1" 
                  kelompokName="PENS PNS KEMHAN ( 513113 )"
                />

                {/* KELOMPOK 2: PENS PNS POLRI ( 513114 ) */}
                <Rekapitulasi3ExpectedGroupBlock 
                  no="2" 
                  kelompokName="PENS PNS POLRI ( 513114 )"
                />

                {/* KELOMPOK 3: PENS TNI ( 513122 ) */}
                <Rekapitulasi3ExpectedGroupBlock 
                  no="3" 
                  kelompokName="PENS TNI ( 513122 )"
                />

                {/* KELOMPOK 4: PENS POLRI ( 513123 ) */}
                <Rekapitulasi3ExpectedGroupBlock 
                  no="4" 
                  kelompokName="PENS POLRI ( 513123 )"
                />

                {/* GRAND TOTAL BLOCK */}
                <Rekapitulasi3ExpectedGroupBlock 
                  no="TOTAL" 
                  kelompokName="GRAND TOTAL REKAPITULASI III"
                  isGrandTotal
                />
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
