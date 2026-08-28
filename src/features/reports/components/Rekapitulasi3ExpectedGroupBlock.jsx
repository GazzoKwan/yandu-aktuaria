import React from 'react';
import { styles } from '../../../styles/themeStyles';

// HELPER COMPONENT FOR REKAPITULASI III SHEET 2 ("Ouput yang diharapkan") STRUCTURE
export default function Rekapitulasi3ExpectedGroupBlock({ 
  no, 
  kelompokName, 
  dataSections,
  isGrandTotal = false 
}) {
  const bgHeaderStyle = isGrandTotal ? { backgroundColor: '#e0f2fe', fontWeight: '800' } : { backgroundColor: '#ffffff', fontWeight: 'bold' };
  
  // Default fallback data if dataSections is omitted
  const sections = dataSections || {
    a: {
      jiwa: { penerima: "1.250", istriSuami: "215", anak: "110", cacat: "10", lain: "0", total: "1.585" },
      bruto: { pokok: "8.200.000.000", keluarga: "820.000.000", beras: "350.000.000", cacat: "41.850.610", lain: "20.000.000", total: "9.431.850.610" },
      potongan: { pph21: "462.163.239", askes: "59.671.967", tgr: "0", nonTgr: "30.548.074", lain: "0", total: "552.383.280" },
      netto: "8.879.467.330"
    },
    b: {
      jiwa: { penerima: "450", istriSuami: "0", anak: "35", cacat: "2", lain: "0", total: "487" },
      bruto: { pokok: "2.100.000.000", keluarga: "105.000.000", beras: "85.000.000", cacat: "10.000.000", lain: "0", total: "2.300.000.000" },
      potongan: { pph21: "95.000.000", askes: "14.500.000", tgr: "0", nonTgr: "5.200.000", lain: "0", total: "114.700.000" },
      netto: "2.185.300.000"
    },
    c: {
      jiwa: { penerima: "75", istriSuami: "0", anak: "0", cacat: "0", lain: "0", total: "75" },
      bruto: { pokok: "320.000.000", keluarga: "0", beras: "15.000.000", cacat: "0", lain: "0", total: "335.000.000" },
      potongan: { pph21: "8.500.000", askes: "2.100.000", tgr: "0", nonTgr: "0", lain: "0", total: "10.600.000" },
      netto: "324.400.000"
    },
    d: {
      jiwa: { penerima: "20", istriSuami: "0", anak: "0", cacat: "0", lain: "0", total: "20" },
      bruto: { pokok: "85.000.000", keluarga: "0", beras: "4.500.000", cacat: "0", lain: "0", total: "89.500.000" },
      potongan: { pph21: "2.100.000", askes: "600.000", tgr: "0", nonTgr: "0", lain: "0", total: "2.700.000" },
      netto: "86.800.000"
    }
  };

  const sectionKeys = [
    { key: 'a', title: 'a. Pensiun Sendiri' },
    { key: 'b', title: 'b. Pensiun Warakawuri/Janda/Duda' },
    { key: 'c', title: 'c. Tunjangan Yatim Piatu' },
    { key: 'd', title: 'd. Tunjangan Orang Tua' }
  ];

  return (
    <React.Fragment>
      {sectionKeys.map((sec, secIdx) => {
        const secData = sections[sec.key];
        const isFirstSec = secIdx === 0;

        return (
          <React.Fragment key={sec.key}>
            {/* ROW 1: A. PENERIMA / A. PENSIUN POKOK + POTONGAN & NETTO (ROWSPAN 6) */}
            <tr style={bgHeaderStyle}>
              {isFirstSec && (
                <td rowSpan={24} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', fontSize: '11px', backgroundColor: isGrandTotal ? '#e0f2fe' : '#ffffff' }}>
                  {no}
                </td>
              )}
              {isFirstSec && (
                <td rowSpan={24} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '11px', backgroundColor: isGrandTotal ? '#e0f2fe' : '#ffffff' }}>
                  {kelompokName}
                </td>
              )}
              <td rowSpan={6} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', backgroundColor: isGrandTotal ? '#f0f9ff' : '#ffffff' }}>
                {sec.title}
              </td>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.jiwa.penerima}</td>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.bruto.pokok}</td>
              <td rowSpan={6} style={{ ...styles.tdExcelExact, textAlign: 'right', verticalAlign: 'top' }}>{secData.potongan.pph21}</td>
              <td rowSpan={6} style={{ ...styles.tdExcelExact, textAlign: 'right', verticalAlign: 'top' }}>{secData.potongan.askes}</td>
              <td rowSpan={6} style={{ ...styles.tdExcelExact, textAlign: 'right', verticalAlign: 'top' }}>{secData.potongan.tgr}</td>
              <td rowSpan={6} style={{ ...styles.tdExcelExact, textAlign: 'right', verticalAlign: 'top' }}>{secData.potongan.nonTgr}</td>
              <td rowSpan={6} style={{ ...styles.tdExcelExact, textAlign: 'right', verticalAlign: 'top' }}>{secData.potongan.lain}</td>
              <td rowSpan={6} style={{ ...styles.tdExcelExact, textAlign: 'right', verticalAlign: 'top', fontWeight: 'bold' }}>{secData.potongan.total}</td>
              <td rowSpan={6} style={{ ...styles.tdExcelExact, textAlign: 'right', verticalAlign: 'top', fontWeight: 'bold' }}>{secData.netto}</td>
            </tr>

            {/* ROW 2: B. ISTRI/ SUAMI / B. TUNJANGAN KELUARGA */}
            <tr style={bgHeaderStyle}>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.jiwa.istriSuami}</td>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.bruto.keluarga}</td>
            </tr>

            {/* ROW 3: C. ANAK / C. TUNJANGAN BERAS */}
            <tr style={bgHeaderStyle}>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.jiwa.anak}</td>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.bruto.beras}</td>
            </tr>

            {/* ROW 4: D. (CACAT) / D. CACAT LAIN-LAIN */}
            <tr style={bgHeaderStyle}>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.jiwa.cacat}</td>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.bruto.cacat}</td>
            </tr>

            {/* ROW 5: E. LAIN-LAIN */}
            <tr style={bgHeaderStyle}>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.jiwa.lain}</td>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{secData.bruto.lain}</td>
            </tr>

            {/* ROW 6: TOTAL SECTION */}
            <tr style={{ backgroundColor: isGrandTotal ? '#bae6fd' : '#f8fafc', fontWeight: 'bold' }}>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>{secData.jiwa.total}</td>
              <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>{secData.bruto.total}</td>
            </tr>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
