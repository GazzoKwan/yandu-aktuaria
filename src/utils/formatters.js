// Currency formatter (Rupiah)
export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number || 0);
}

// Helper: Format MKG display string (Tahun & Bulan)
export function formatMkgDisplay(tahun, bulan) {
  const t = tahun || 0;
  const b = bulan || 0;
  if (t === 0 && b === 0) return '0 Tahun';
  let str = '';
  if (t > 0) str += `${t} Tahun`;
  if (b > 0) str += `${str ? ' ' : ''}${b} Bulan`;
  return str;
}

// Helper: Singkatan Kategori Program (TA, NTTA, THT)
export function getCategoryAbbr(category) {
  if (!category) return '';
  const upper = String(category).toUpperCase();
  if (upper.includes('NTTA') || upper.includes('NILAI TUNAI')) return 'NTTA';
  if (upper.includes('THT') || upper.includes('HARI TUA')) return 'THT';
  if (upper.includes('TA') || upper.includes('ASURANSI')) return 'TA';
  return category;
}

// Helper: Format tanggal konsisten DD/MM/YY (contoh: 06/08/26)
export function formatDateDDMMYY(dateInput) {
  if (!dateInput) return '-';
  if (dateInput instanceof Date) {
    const d = String(dateInput.getDate()).padStart(2, '0');
    const m = String(dateInput.getMonth() + 1).padStart(2, '0');
    const y = String(dateInput.getFullYear()).slice(-2);
    return `${d}/${m}/${y}`;
  }

  const str = String(dateInput).trim();
  if (!str || str === '-') return '-';

  // Format DD/MM/YY sudah sesuai
  if (/^\d{2}\/\d{2}\/\d{2}$/.test(str)) {
    return str;
  }

  // Format DD/MM/YYYY atau DD-MM-YYYY (contoh: 06/08/2026 atau 01-01-2026)
  const ddmmyyyyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (ddmmyyyyMatch) {
    const d = ddmmyyyyMatch[1].padStart(2, '0');
    const m = ddmmyyyyMatch[2].padStart(2, '0');
    const y = ddmmyyyyMatch[3].slice(-2);
    return `${d}/${m}/${y}`;
  }

  // Format DD/MM/YY dengan pemisah lain atau spasi
  const ddmmyyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/);
  if (ddmmyyMatch) {
    const d = ddmmyyMatch[1].padStart(2, '0');
    const m = ddmmyyMatch[2].padStart(2, '0');
    const y = ddmmyyMatch[3];
    return `${d}/${m}/${y}`;
  }

  // Format YYYY-MM-DD atau YYYY/MM/DD (contoh: 2026-06-06)
  const yyyymmddMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (yyyymmddMatch) {
    const y = yyyymmddMatch[1].slice(-2);
    const m = yyyymmddMatch[2].padStart(2, '0');
    const d = yyyymmddMatch[3].padStart(2, '0');
    return `${d}/${m}/${y}`;
  }

  // Format dengan nama teks bulan (contoh: "01 Jan 2026", "1 Januari 2026", "31 Des 2026")
  const monthMap = {
    jan: '01', feb: '02', mar: '03', apr: '04', mei: '05', may: '05',
    jun: '06', jul: '07', agu: '08', ags: '08', aug: '08', sep: '09',
    okt: '10', oct: '10', nop: '11', nov: '11', des: '12', dec: '12'
  };
  const textMonthMatch = str.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{2,4})/);
  if (textMonthMatch) {
    const d = textMonthMatch[1].padStart(2, '0');
    const monKey = textMonthMatch[2].toLowerCase().slice(0, 3);
    const m = monthMap[monKey] || '01';
    const y = textMonthMatch[3].slice(-2);
    return `${d}/${m}/${y}`;
  }

  // Fallback: JS Date parser
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const d = String(parsed.getDate()).padStart(2, '0');
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const y = String(parsed.getFullYear()).slice(-2);
    return `${d}/${m}/${y}`;
  }

  return str;
}


