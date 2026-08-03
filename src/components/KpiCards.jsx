import React from 'react';
import { formatRupiah, calculateBenefits } from '../data/claimData';

export default function KpiCards({ claims }) {
  const totalDoc = claims.length;
  const terkoreksiCount = claims.filter(c => c.status === 'TERKOREKSI').length;
  
  let totalNetto = 0;
  claims.forEach(c => {
    const calc = calculateBenefits(c.gajiPokok, c.masaKerjaBulan, c.skorsingBulan, c.mkgAwalTahun);
    totalNetto += calc.total;
  });

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-icon icon-purple">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <div className="kpi-body">
          <div className="kpi-title">TOTAL DOKUMEN PENGASUHAN</div>
          <div className="kpi-value">{totalDoc}</div>
          <div className="kpi-desc">dokumen aktif periode berjalan</div>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-icon icon-green">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div className="kpi-body">
          <div className="kpi-title">TOTAL MANFAAT BRUTO</div>
          <div className="kpi-value">Rp 1,59 M</div>
          <div className="kpi-desc">nilai manfaat sebelum koreksi</div>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-icon icon-orange">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div className="kpi-body">
          <div className="kpi-title">KOREKSI SKORSING & MKG</div>
          <div className="kpi-value">{terkoreksiCount} Dokumen</div>
          <div className="kpi-desc">telah disesuaikan oleh CSO</div>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-icon icon-blue">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        </div>
        <div className="kpi-body">
          <div className="kpi-title">ESTIMASI TOTAL NETTO</div>
          <div className="kpi-value">{formatRupiah(totalNetto)}</div>
          <div className="kpi-desc">nilai bersih manfaat klaim (TA, NTTA, NTIP)</div>
        </div>
      </div>
    </div>
  );
}
