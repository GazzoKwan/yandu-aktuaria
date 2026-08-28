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
