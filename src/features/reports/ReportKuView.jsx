import React from 'react';

export default function ReportKuView({
  filterKuOpen,
  setFilterKuOpen,
  kuCetak,
  setKuCetak,
  kuPeriodeAwal,
  setKuPeriodeAwal,
  kuMitraBayar,
  setKuMitraBayar,
  kuCabang,
  setKuCabang,
  kuPeriodeAkhir,
  setKuPeriodeAkhir,
  kuJumlah,
  setKuJumlah,
  kuJenisBayar,
  setKuJenisBayar,
  handleOpenKuPreview
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Beranda &rsaquo; Aktuaria &rsaquo; Report KU</div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.3px' }}>Report KU</h1>
        </div>
        <div style={{ background: '#0f172a', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 6px rgba(15,23,42,0.15)' }}>Kamis, 06 Agustus 2026</div>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', padding: '24px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', marginBottom: '18px', letterSpacing: '-0.3px' }}>Report KU</h3>

        <div style={{ border: '1px solid #0e7490', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(14, 116, 144, 0.08)' }}>
          <div 
            style={{ background: 'linear-gradient(135deg, #0e5a8a 0%, #154e68 100%)', color: '#ffffff', padding: '12px 20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setFilterKuOpen(!filterKuOpen)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px' }}>▶</span> Filter Parameter Report KU
            </span>
            <span style={{ fontSize: '12px' }}>{filterKuOpen ? '▲' : '▼'}</span>
          </div>

          {filterKuOpen && (
            <div style={{ padding: '24px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    Cetak KU
                  </label>
                  <select 
                    style={{ height: '40px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }}
                    value={kuCetak}
                    onChange={(e) => setKuCetak(e.target.value)}
                  >
                    <option value="">-- Pilih Cetak KU --</option>
                    <option value="DAFTAR REKAPITULASI III NON DAPEM">DAFTAR REKAPITULASI III NON DAPEM</option>
                    <option value="DAFTAR REKAPITULASI III DAPEM">DAFTAR REKAPITULASI III DAPEM</option>
                    <option value="KU 000 - REK III">KU 000 - REK III</option>
                    <option value="KU 00 - REK II">KU 00 - REK II</option>
                    <option value="KU 00 - REK II PER MITRA">KU 00 - REK II PER MITRA</option>
                    <option value="KU 01 - PER MITRA">KU 01 - PER MITRA</option>
                    <option value="KU 02 - PER MAK">KU 02 - PER MAK</option>
                    <option value="KU 03 - NOM NON TGR">KU 03 - NOM NON TGR</option>
                    <option value="KU 04 - REK NON TGR">KU 04 - REK NON TGR</option>
                    <option value="KU 05 - NOM NON DAPEM">KU 05 - NOM NON DAPEM</option>
                    <option value="KU 06 - PAGU DIPA">KU 06 - PAGU DIPA</option>
                    <option value="KU 07">KU 07</option>
                    <option value="KU 09 - Rp">KU 09 - Rp</option>
                    <option value="KU 09">KU 09</option>
                    <option value="KU 10">KU 10</option>
                    <option value="KU 12 - SPB">KU 12 - SPB</option>
                    <option value="KU 14 - PER CABANG">KU 14 - PER CABANG</option>
                    <option value="Rekap Asuransi SP">Rekap Asuransi SP</option>
                    <option value="Rekap Asuransi Entry">Rekap Asuransi Entry</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    Periode Awal
                  </label>
                  <input 
                    type="date"
                    style={{ height: '40px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }}
                    value={kuPeriodeAwal}
                    onChange={(e) => setKuPeriodeAwal(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    Mitra Bayar
                  </label>
                  <select 
                    style={{ height: '40px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }}
                    value={kuMitraBayar}
                    onChange={(e) => setKuMitraBayar(e.target.value)}
                  >
                    <option value="Semua Mitra">Semua Mitra</option>
                    <option value="PT POS INDONESIA">PT POS INDONESIA</option>
                    <option value="BANK MANDIRI">BANK MANDIRI</option>
                    <option value="BANK BRI">BANK BRI</option>
                    <option value="BANK BNI">BANK BNI</option>
                    <option value="BANK BSI">BANK BSI</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    Cabang
                  </label>
                  <select 
                    style={{ height: '40px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }}
                    value={kuCabang}
                    onChange={(e) => setKuCabang(e.target.value)}
                  >
                    <option value="">-- Silahkan Pilih Cabang --</option>
                    <option value="1000 - KANTOR PUSAT">1000 - KANTOR PUSAT</option>
                    <option value="1100 - KANCAB MEDAN">1100 - KANCAB MEDAN</option>
                    <option value="1200 - KANCAB PALEMBANG">1200 - KANCAB PALEMBANG</option>
                    <option value="1300 - KANCAB BANDUNG">1300 - KANCAB BANDUNG</option>
                    <option value="1400 - KANCAB SEMARANG">1400 - KANCAB SEMARANG</option>
                    <option value="1500 - KANCAB SURABAYA">1500 - KANCAB SURABAYA</option>
                    <option value="1600 - KANCAB BALIKPAPAN">1600 - KANCAB BALIKPAPAN</option>
                    <option value="1700 - KANCAB MAKASSAR">1700 - KANCAB MAKASSAR</option>
                    <option value="1800 - KANCAB JAYAPURA">1800 - KANCAB JAYAPURA</option>
                    <option value="1900 - KANCAB DENPASAR">1900 - KANCAB DENPASAR</option>
                    <option value="2000 - KANCAB UTAMA JAKARTA">2000 - KANCAB UTAMA JAKARTA</option>
                    <option value="2100 - KANCAB AMBON">2100 - KANCAB AMBON</option>
                    <option value="2200 - KANCAB BANDA ACEH">2200 - KANCAB BANDA ACEH</option>
                    <option value="2300 - KANCAB PONTIANAK">2300 - KANCAB PONTIANAK</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    Periode Akhir
                  </label>
                  <input 
                    type="date"
                    style={{ height: '40px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }}
                    value={kuPeriodeAkhir}
                    onChange={(e) => setKuPeriodeAkhir(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    Jumlah
                  </label>
                  <select 
                    style={{ height: '40px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }}
                    value={kuJumlah}
                    onChange={(e) => setKuJumlah(e.target.value)}
                  >
                    <option value="Semua Jumlah">Semua Jumlah</option>
                    <option value="> 0 (Ada Realisasi)">&gt; 0 (Ada Realisasi)</option>
                    <option value="0 (Nihil)">0 (Nihil)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    Jenis Bayar
                  </label>
                  <select 
                    style={{ height: '40px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', fontWeight: '600', color: '#0f172a', boxSizing: 'border-box' }}
                    value={kuJenisBayar}
                    onChange={(e) => setKuJenisBayar(e.target.value)}
                  >
                    <option value="">-- Pilih Jenis Bayar --</option>
                    <option value="Semua Jenis Bayar">Semua Jenis Bayar</option>
                    <option value="Dapem - Induk">Dapem - Induk</option>
                    <option value="Dapem - Rapel">Dapem - Rapel</option>
                    <option value="Dapem - Gaji ke-13">Dapem - Gaji ke-13</option>
                    <option value="Dapem - Susulan">Dapem - Susulan</option>
                    <option value="Dapem - THR">Dapem - THR</option>
                  </select>
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '18px', borderTop: '1px solid #e2e8f0' }}>
                <button 
                  type="button"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', padding: '11px 28px', borderRadius: '6px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', transition: 'transform 0.15s' }}
                  onClick={handleOpenKuPreview}
                >
                  🔍 Cetak
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
