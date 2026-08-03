import React from 'react';
import { formatRupiah, calculateBenefits } from '../data/claimData';

export default function ClaimTable({ claims, onSelectClaim }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>NO. SP</th>
            <th>TGL PENGAJUAN</th>
            <th>PESERTA / NRP (KLIK UNTUK DETAIL)</th>
            <th>JENIS KLAIM</th>
            <th>SKORSING</th>
            <th>MKG AWAL</th>
            <th>MANFAAT TA</th>
            <th>NTTA</th>
            <th>NTIP</th>
            <th className="text-right">AKSI (CSO)</th>
          </tr>
        </thead>
        <tbody>
          {claims.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                Tidak ada data perhitungan manfaat yang cocok dengan pencarian.
              </td>
            </tr>
          ) : (
            claims.map(item => {
              const calc = calculateBenefits(item.gajiPokok, item.masaKerjaBulan, item.skorsingBulan, item.mkgAwalTahun);
              return (
                <tr key={item.id}>
                  <td><span className="sp-num">{item.spNum}</span></td>
                  <td>{item.tgl}</td>
                  <td>
                    <div className="clickable-peserta" onClick={() => onSelectClaim(item.id)}>
                      <span className="peserta-name">{item.nama}</span>
                      <span className="peserta-nrp">KTPA: {item.ktpa} • NRP: {item.nrp}</span>
                    </div>
                  </td>
                  <td><span className={`badge-tag tag-${item.jenisKlaim.toLowerCase()}`}>{item.jenisKlaim}</span></td>
                  <td><strong>{item.skorsingBulan}</strong> Bulan</td>
                  <td><strong>{item.mkgAwalTahun}</strong> Tahun</td>
                  <td><strong>{formatRupiah(calc.ta)}</strong></td>
                  <td>{formatRupiah(calc.ntta)}</td>
                  <td>{formatRupiah(calc.ntip)}</td>
                  <td className="text-right">
                    <button className="btn-action" onClick={() => onSelectClaim(item.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                      Form Detail & Koreksi
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
