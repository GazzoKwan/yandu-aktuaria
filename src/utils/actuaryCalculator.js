// BENEFIT CALCULATOR SUPPORTING MKG AWAL TAHUN & BULAN & UNIFIED DISBURSEMENT ALLOCATION (% PESERTA VS % DANA RISIKO)
export function calculateBenefits(gajiPokok, masaKerjaBulan, skorsingBulan, mkgAwalTahun, mkgAwalBulan = 0, persenManfaatPeserta = 90) {
  const mkgAwalTotalYears = (mkgAwalTahun || 0) + ((mkgAwalBulan || 0) / 12);
  const effMasaKerjaYears = Math.max(0, (masaKerjaBulan - (skorsingBulan || 0)) / 12) + mkgAwalTotalYears;
  const ta = gajiPokok * 12 * (effMasaKerjaYears / 10) * 1.15;
  const ntta = gajiPokok * 0.95 * effMasaKerjaYears * 1.05;
  const ntip = gajiPokok * 0.75 * effMasaKerjaYears * 1.02;
  const totalKotor = ta + ntta + ntip;
  
  const persenRisiko = Math.max(0, 100 - persenManfaatPeserta);
  const hakPeserta = totalKotor * (persenManfaatPeserta / 100);
  const uangRisiko = totalKotor * (persenRisiko / 100);

  return { ta, ntta, ntip, total: totalKotor, hakPeserta, uangRisiko, effMasaKerjaYears, persenRisiko };
}

// Calculate month difference between two dates
export function calculateMonthDiff(d1, d2) {
  if (!d1 || !d2) return 0;
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  if (isNaN(date1) || isNaN(date2)) return 0;
  let months = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()) + 1;
  return Math.max(0, months);
}

// Helper: Determine exact status of skorsing ('Aktif', 'Belum Aktif', 'History')
export function getSkorsingStatus(tglMulai, tglAkhir) {
  if (!tglMulai || !tglAkhir) return 'Aktif';
  const todayStr = new Date().toISOString().split('T')[0];
  if (tglMulai > todayStr) return 'Belum Aktif';
  if (tglAkhir < todayStr) return 'History';
  return 'Aktif';
}

// Helper: Sum effective skorsing months
export function calculateEffectiveSkorsingMonths(skorsingList) {
  if (!skorsingList || !Array.isArray(skorsingList)) return 0;
  return skorsingList.reduce((acc, curr) => {
    const status = getSkorsingStatus(curr.tglMulai, curr.tglAkhir);
    if (status === 'Aktif' || status === 'History') {
      return acc + (curr.jumlahBulan || 0);
    }
    return acc;
  }, 0);
}
