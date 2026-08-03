import React, { useState } from 'react';

// ==========================================
// MOCK DATA & BENEFIT CALCULATOR ENGINE
// ==========================================
const initialClaimData = [
  {
    id: 1,
    spNum: "SP/2026/08/0101",
    tgl: "01 Aug 2026",
    ktpa: "AA001290",
    nama: "DRS. DANI RUSDANI",
    nrp: "27779",
    nik: "3273012308380001",
    npwp: "09.123.456.7-401.000",
    tglAwalDaftar: "01-02-1960",
    ttl: "Bandung, 08-08-1938",
    alamat: "Jl. Jend. Sudirman No. 142",
    rtRw: "004 / 006",
    desa: "Kebon Jeruk",
    kecamatan: "Andir",
    kota: "Kota Bandung",
    provinsi: "Jawa Barat",
    kodePos: "40124",
    statusKtpa: "Aktif",
    statusPensiun: "Pensiun Wari",
    
    pdw: "01-02-1960",
    satkerAwal: "KODAM III/SLW",
    satkerAkhir: "MABESAD",
    noSkepPengangkatan: "SKEP/102/I/1960",
    tglSkepPengangkatan: "15-01-1960",
    tmtSkepPengangkatan: "01-02-1960",
    tmtPensiun: "01-09-1988",
    tglSkepPensiun: "15-08-1988",
    noSkepPensiun: "SKEP/889/VIII/1988",
    tmtSkpp: "01-09-1988",
    noPensiun: "PEN-1988-00291",
    pensiunPokok: 4850000,
    tunjanganCacat: 0,
    statusHidup: "Meninggal",
    tglMeninggal: "04-04-1991",
    tglNonAktif: "01-05-1991",

    gajiPokok: 4850000,
    masaKerjaBulan: 336,
    jenisKlaim: "TA",
    skorsingBulan: 0,
    mkgAwalTahun: 0,
    status: "BELUM"
  },
  {
    id: 2,
    spNum: "SP/2026/08/0102",
    tgl: "01 Aug 2026",
    ktpa: "AB002341",
    nama: "KAPT INF AHMAD SUBAGYO",
    nrp: "11029384756",
    nik: "3174021504820003",
    npwp: "08.987.654.3-012.000",
    tglAwalDaftar: "01-03-2004",
    ttl: "Surakarta, 15-04-1982",
    alamat: "Jl. Pemuda No. 88",
    rtRw: "002 / 005",
    desa: "Rawamangun",
    kecamatan: "Pulogadung",
    kota: "Jakarta Timur",
    provinsi: "DKI Jakarta",
    kodePos: "13220",
    statusKtpa: "Aktif",
    statusPensiun: "Aktif",
    
    pdw: "01-03-2004",
    satkerAwal: "YONIF 403",
    satkerAkhir: "KODAM IV/DIP",
    noSkepPengangkatan: "SKEP/441/III/2004",
    tglSkepPengangkatan: "20-02-2004",
    tmtSkepPengangkatan: "01-03-2004",
    tmtPensiun: "01-05-2040",
    tglSkepPensiun: "-",
    noSkepPensiun: "-",
    tmtSkpp: "-",
    noPensiun: "-",
    pensiunPokok: 5400000,
    tunjanganCacat: 0,
    statusHidup: "Hidup",
    tglMeninggal: "-",
    tglNonAktif: "-",

    gajiPokok: 5400000,
    masaKerjaBulan: 264,
    jenisKlaim: "NTTA",
    skorsingBulan: 6,
    mkgAwalTahun: 2,
    status: "TERKOREKSI"
  },
  {
    id: 3,
    spNum: "SP/2026/08/0103",
    tgl: "02 Aug 2026",
    ktpa: "AC009812",
    nama: "AKBP POL SUTRISNO SE",
    nrp: "74019283745",
    nik: "3578011209740005",
    npwp: "12.345.678.9-602.000",
    tglAwalDaftar: "01-09-1996",
    ttl: "Surabaya, 12-09-1974",
    alamat: "Jl. Darmo Permai No. 12",
    rtRw: "001 / 003",
    desa: "Pradah Kalikidal",
    kecamatan: "Dukuh Pakis",
    kota: "Kota Surabaya",
    provinsi: "Jawa Timur",
    kodePos: "60225",
    statusKtpa: "Aktif",
    statusPensiun: "Pensiun Sendiri",
    
    pdw: "01-09-1996",
    satkerAwal: "POLRESTABES SURABAYA",
    satkerAkhir: "POLDA JATIM",
    noSkepPengangkatan: "SKEP/812/IX/1996",
    tglSkepPengangkatan: "25-08-1996",
    tmtSkepPengangkatan: "01-09-1996",
    tmtPensiun: "01-10-2032",
    tglSkepPensiun: "-",
    noSkepPensiun: "-",
    tmtSkpp: "-",
    noPensiun: "-",
    pensiunPokok: 6100000,
    tunjanganCacat: 0,
    statusHidup: "Hidup",
    tglMeninggal: "-",
    tglNonAktif: "-",

    gajiPokok: 6100000,
    masaKerjaBulan: 312,
    jenisKlaim: "NTIP",
    skorsingBulan: 0,
    mkgAwalTahun: 0,
    status: "BELUM"
  }
];

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number || 0);
}

function calculateBenefits(gajiPokok, masaKerjaBulan, skorsingBulan, mkgAwalTahun) {
  const effMasaKerjaYears = Math.max(0, (masaKerjaBulan - (skorsingBulan || 0)) / 12) + (mkgAwalTahun || 0);
  const ta = gajiPokok * 12 * (effMasaKerjaYears / 10) * 1.15;
  const ntta = gajiPokok * 0.95 * effMasaKerjaYears * 1.05;
  const ntip = gajiPokok * 0.75 * effMasaKerjaYears * 1.02;
  const total = ta + ntta + ntip;
  return { ta, ntta, ntip, total, effMasaKerjaYears };
}

// ==========================================
// MAIN APP COMPONENT (SINGLE SIMPLE JSX FILE)
// ==========================================
export default function App() {
  const [claims, setClaims] = useState(initialClaimData);
  const [searchVal, setSearchVal] = useState('');
  const [filterKlaim, setFilterKlaim] = useState('ALL');
  
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [modalTab, setModalTab] = useState('profil'); // 'profil' | 'masakerja'
  const [editConfig, setEditConfig] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [toasts, setToasts] = useState([]);

  // Filtered Claims
  const filteredClaims = claims.filter(item => {
    const q = searchVal.toLowerCase();
    const matchesSearch = item.spNum.toLowerCase().includes(q) ||
                          item.nama.toLowerCase().includes(q) ||
                          item.nrp.toLowerCase().includes(q) ||
                          item.ktpa.toLowerCase().includes(q);
    const matchesKlaim = (filterKlaim === 'ALL') || (item.jenisKlaim === filterKlaim);
    return matchesSearch && matchesKlaim;
  });

  const selectedClaim = claims.find(c => c.id === selectedClaimId);

  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleOpenEditField = (fieldName, fieldLabel, inputType = 'text', suffix = '') => {
    if (!selectedClaim) return;
    setEditConfig({
      fieldName,
      fieldLabel,
      inputType,
      suffix
    });
    setEditInputValue(selectedClaim[fieldName] !== undefined ? selectedClaim[fieldName] : '');
  };

  const handleSaveFieldEdit = (e) => {
    e.preventDefault();
    if (!editConfig || !selectedClaimId) return;

    const parsedVal = editConfig.inputType === 'number' ? (parseInt(editInputValue) || 0) : editInputValue;

    setClaims(prev => prev.map(item => {
      if (item.id === selectedClaimId) {
        const updated = { ...item, [editConfig.fieldName]: parsedVal };
        if (editConfig.fieldName === 'mkgAwalTahun' || editConfig.fieldName === 'skorsingBulan') {
          updated.status = 'TERKOREKSI';
        }
        return updated;
      }
      return item;
    }));

    addToast(`✏️ ${editConfig.fieldLabel} berhasil diperbarui: "${parsedVal} ${editConfig.suffix}". Real-time calculation updated!`);
    setEditConfig(null);
  };

  const handleSaveModal = () => {
    if (!selectedClaimId) return;
    setClaims(prev => prev.map(item => item.id === selectedClaimId ? { ...item, status: 'TERKOREKSI' } : item));
    addToast(`✅ Data Perhitungan Manfaat ${selectedClaim.nama} Berhasil Disimpan!`);
    setSelectedClaimId(null);
  };

  // Calculations for KPI and Modal
  let totalNettoAll = 0;
  let terkoreksiCount = 0;
  claims.forEach(c => {
    if (c.status === 'TERKOREKSI') terkoreksiCount++;
    const calc = calculateBenefits(c.gajiPokok, c.masaKerjaBulan, c.skorsingBulan, c.mkgAwalTahun);
    totalNettoAll += calc.total;
  });

  const baseCalc = selectedClaim ? calculateBenefits(selectedClaim.gajiPokok, selectedClaim.masaKerjaBulan, 0, 0) : null;
  const newCalc = selectedClaim ? calculateBenefits(selectedClaim.gajiPokok, selectedClaim.masaKerjaBulan, selectedClaim.skorsingBulan, selectedClaim.mkgAwalTahun) : null;

  return (
    <div style={styles.appRoot}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.brandBox}>A</div>
          <div>
            <div style={styles.brandTitle}>YANDU NEXTGEN ASABRI</div>
            <div style={styles.brandSub}>CSO KANTOR CABANG</div>
          </div>
        </div>

        <div style={styles.headerCenter}>
          <input 
            type="text" 
            style={styles.searchInput}
            value={searchVal} 
            onChange={(e) => setSearchVal(e.target.value)} 
            placeholder="Cari SP / NRP / NIP / Nama Peserta..." 
          />
        </div>

        <div style={styles.headerRight}>
          <div style={styles.roleBadge}>
            <span>ROLE: CSO Kantor Cabang</span>
            <span style={styles.rolePill}>AKSES EDIT</span>
          </div>
          <div style={styles.userAvatar}>CS</div>
        </div>
      </header>

      <div style={styles.appLayout}>
        {/* SIDEBAR (RAPAT KE ATAS) */}
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.sidebarSectionLabel}>PELAYANAN KANCAB</div>
            <div style={styles.sidebarNavItemActive}>
              <span>📋 Koreksi Manfaat</span>
              <span style={styles.sidebarActivePill}>AKTIF</span>
            </div>
          </div>

          <div style={styles.sidebarFooter}>
            <div style={{ fontWeight: 'bold', fontSize: 12 }}>Akses CSO KanCab</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
              Klik nama peserta untuk detail. Klik icon ✏️ pensil untuk mengedit MKG & Skorsing.
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.mainContent}>
          <div style={styles.pageTopBar}>
            <div>
              <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Koreksi Perhitungan Manfaat</div>
              <h1 style={styles.pageTitle}>Review & Koreksi Perhitungan Manfaat</h1>
            </div>
            <div style={styles.dateBox}>Senin, 03 Agustus 2026</div>
          </div>

          {/* MAIN TAB BAR */}
          <div style={styles.tabBar}>
            <button style={styles.tabBtnActive}>
              Daftar Perhitungan Manfaat ({claims.length})
            </button>
          </div>

          {/* KPI METRICS */}
          <div style={styles.kpiGrid}>
            <div style={styles.kpiCard}>
              <div style={styles.kpiTitle}>TOTAL DOKUMEN</div>
              <div style={styles.kpiValue}>{claims.length}</div>
              <div style={styles.kpiDesc}>dokumen aktif periode berjalan</div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiTitle}>TOTAL MANFAAT BRUTO</div>
              <div style={styles.kpiValue}>Rp 1,59 M</div>
              <div style={styles.kpiDesc}>nilai manfaat sebelum koreksi</div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiTitle}>KOREKSI SKORSING & MKG</div>
              <div style={styles.kpiValue}>{terkoreksiCount} Dokumen</div>
              <div style={styles.kpiDesc}>telah disesuaikan oleh CSO</div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiTitle}>ESTIMASI TOTAL NETTO</div>
              <div style={styles.kpiValue}>{formatRupiah(totalNettoAll)}</div>
              <div style={styles.kpiDesc}>nilai bersih manfaat klaim</div>
            </div>
          </div>

          {/* TOOLBAR */}
          <div style={styles.toolbar}>
            <div style={{ display: 'flex', gap: 12 }}>
              <input 
                type="text" 
                style={styles.filterInput}
                value={searchVal} 
                onChange={(e) => setSearchVal(e.target.value)} 
                placeholder="Cari No. SP / Nama / NRP..." 
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
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Menampilkan {filteredClaims.length} dari {claims.length} Dokumen
            </div>
          </div>

          {/* DATA TABLE (NO STATUS COLUMN) */}
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>NO. SP</th>
                  <th style={styles.th}>TGL PENGAJUAN</th>
                  <th style={styles.th}>PESERTA / NRP (KLIK DETAIL)</th>
                  <th style={styles.th}>JENIS KLAIM</th>
                  <th style={styles.th}>SKORSING</th>
                  <th style={styles.th}>MKG AWAL</th>
                  <th style={styles.th}>MANFAAT TA</th>
                  <th style={styles.th}>NTTA</th>
                  <th style={styles.th}>NTIP</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>AKSI (CSO)</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map(item => {
                  const calc = calculateBenefits(item.gajiPokok, item.masaKerjaBulan, item.skorsingBulan, item.mkgAwalTahun);
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
                      <td style={styles.td}><strong>{item.mkgAwalTahun}</strong> Tahun</td>
                      <td style={styles.td}><strong>{formatRupiah(calc.ta)}</strong></td>
                      <td style={styles.td}>{formatRupiah(calc.ntta)}</td>
                      <td style={styles.td}>{formatRupiah(calc.ntip)}</td>
                      <td style={{ ...styles.td, textAlign: 'right' }}>
                        <button 
                          style={styles.actionBtn}
                          onClick={() => { setSelectedClaimId(item.id); setModalTab('profil'); }}
                        >
                          ✏️ Detail & Koreksi
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL FORM 2-TAB DETAIL PESERTA */}
      {selectedClaim && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContainer}>
            {/* MODAL HEADER */}
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>KOREKSI DATA PERHITUNGAN MANFAAT PESERTA</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>Form Detail Peserta — {selectedClaim.nama} ({selectedClaim.spNum})</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setSelectedClaimId(null)}>✕</button>
            </div>

            {/* MODAL TAB BAR */}
            <div style={styles.modalTabBar}>
              <button 
                style={modalTab === 'profil' ? styles.modalTabBtnActive : styles.modalTabBtn}
                onClick={() => setModalTab('profil')}
              >
                👤 Profil Peserta
              </button>
              <button 
                style={modalTab === 'masakerja' ? styles.modalTabBtnActive : styles.modalTabBtn}
                onClick={() => setModalTab('masakerja')}
              >
                🎖️ Masa Kerja & Parameter Koreksi
              </button>
            </div>

            {/* MODAL BODY */}
            <div style={styles.modalBody}>
              {/* TAB 1: PROFIL PESERTA */}
              {modalTab === 'profil' && (
                <div>
                  <div style={styles.bannerTitle}>Form Profil Pribadi Peserta</div>
                  <div style={styles.stripeGrid}>
                    <StripeRow label="KTPA" value={selectedClaim.ktpa} />
                    <StripeRow label="Nama Peserta" value={selectedClaim.nama} alt onEdit={() => handleOpenEditField('nama', 'Nama Peserta')} />
                    <StripeRow label="NRP/NIP" value={selectedClaim.nrp} onEdit={() => handleOpenEditField('nrp', 'NRP/NIP')} />
                    <StripeRow label="Identitas Diri (NIK)" value={selectedClaim.nik} alt onEdit={() => handleOpenEditField('nik', 'NIK')} />
                    <StripeRow label="NPWP" value={selectedClaim.npwp} onEdit={() => handleOpenEditField('npwp', 'NPWP')} />
                    <StripeRow label="Tanggal Awal Daftar" value={selectedClaim.tglAwalDaftar} alt />
                    <StripeRow label="Tempat, Tanggal Lahir" value={selectedClaim.ttl} />
                    <StripeRow label="Alamat" value={selectedClaim.alamat} alt onEdit={() => handleOpenEditField('alamat', 'Alamat Peserta')} />
                    <StripeRow label="RT/RW" value={selectedClaim.rtRw} />
                    <StripeRow label="Desa/Kelurahan" value={selectedClaim.desa} alt />
                    <StripeRow label="Kecamatan" value={selectedClaim.kecamatan} />
                    <StripeRow label="Kota" value={selectedClaim.kota} alt />
                    <StripeRow label="Provinsi" value={selectedClaim.provinsi} />
                    <StripeRow label="Kode Pos" value={selectedClaim.kodePos} alt onEdit={() => handleOpenEditField('kodePos', 'Kode Pos')} />
                    <StripeRow label="Status KTPA" value={selectedClaim.statusKtpa} valueStyle={{ color: '#16a34a', fontWeight: 'bold' }} />
                    <StripeRow label="Status Pensiun" value={selectedClaim.statusPensiun} alt />
                  </div>
                </div>
              )}

              {/* TAB 2: MASA KERJA */}
              {modalTab === 'masakerja' && (
                <div>
                  <div style={styles.bannerTitle}>Data Masa Kerja & Parameter Koreksi</div>
                  <div style={styles.stripeGrid}>
                    <StripeRow label="PDW" value={selectedClaim.pdw} onEdit={() => handleOpenEditField('pdw', 'PDW')} />
                    <StripeRow label="Satker Awal" value={selectedClaim.satkerAwal} alt onEdit={() => handleOpenEditField('satkerAwal', 'Satker Awal')} />
                    <StripeRow label="Satker Akhir" value={selectedClaim.satkerAkhir} onEdit={() => handleOpenEditField('satkerAkhir', 'Satker Akhir')} />
                    <StripeRow label="No SKEP Pengangkatan" value={selectedClaim.noSkepPengangkatan} alt onEdit={() => handleOpenEditField('noSkepPengangkatan', 'No SKEP Pengangkatan')} />
                    <StripeRow label="Tanggal SKEP Pengangkatan" value={selectedClaim.tglSkepPengangkatan} onEdit={() => handleOpenEditField('tglSkepPengangkatan', 'Tanggal SKEP Pengangkatan')} />
                    <StripeRow label="TMT Skep Pengangkatan" value={selectedClaim.tmtSkepPengangkatan} alt />
                    <StripeRow label="TMT Pensiun" value={selectedClaim.tmtPensiun} />
                    <StripeRow label="Tgl Skep Pensiun" value={selectedClaim.tglSkepPensiun} alt onEdit={() => handleOpenEditField('tglSkepPensiun', 'Tgl Skep Pensiun')} />
                    <StripeRow label="No Skep Pensiun" value={selectedClaim.noSkepPensiun} onEdit={() => handleOpenEditField('noSkepPensiun', 'No Skep Pensiun')} />
                    <StripeRow label="TMT SKPP" value={selectedClaim.tmtSkpp} alt />
                    <StripeRow label="Nomor Pensiun" value={selectedClaim.noPensiun} />
                    <StripeRow label="Pensiun Pokok" value={formatRupiah(selectedClaim.pensiunPokok)} alt valueStyle={{ color: '#2563eb', fontWeight: 'bold' }} />
                    <StripeRow label="Tunjangan Cacat" value={formatRupiah(selectedClaim.tunjanganCacat)} />
                    <StripeRow label="Status Hidup" value={selectedClaim.statusHidup} alt />
                    <StripeRow label="Tanggal Meninggal" value={selectedClaim.tglMeninggal} />
                    <StripeRow label="Tanggal Non Aktif" value={selectedClaim.tglNonAktif} alt />

                    {/* MKG AWAL & SKORSING LISTED SEQUENTIALLY WITHOUT HIGHLIGHT */}
                    <StripeRow 
                      label="Masa Kerja Golongan (MKG) Awal" 
                      value={`${selectedClaim.mkgAwalTahun} Tahun`} 
                      onEdit={() => handleOpenEditField('mkgAwalTahun', 'Masa Kerja Golongan (MKG) Awal', 'number', 'Tahun')} 
                    />
                    <StripeRow 
                      label="Data Skorsing" 
                      value={`${selectedClaim.skorsingBulan} Bulan`} 
                      alt
                      onEdit={() => handleOpenEditField('skorsingBulan', 'Data Skorsing', 'number', 'Bulan')} 
                    />
                  </div>

                  {/* REALTIME CALCULATOR RESULTS */}
                  <div style={styles.calcBox}>
                    <div style={{ fontWeight: 'bold', fontSize: 13, color: '#0f172a', marginBottom: 12 }}>
                      ⚡ Hasil Perhitungan Ulang Nilai Manfaat Klaim (Real-time Calculator)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                      <BenefitCard title="MANFAAT TA" oldVal={baseCalc.ta} newVal={newCalc.ta} />
                      <BenefitCard title="NILAI TUNAI TA (NTTA)" oldVal={baseCalc.ntta} newVal={newCalc.ntta} />
                      <BenefitCard title="NILAI TUNAI NTIP" oldVal={baseCalc.ntip} newVal={newCalc.ntip} />
                    </div>
                    <div style={styles.totalBanner}>
                      <div>
                        <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>TOTAL MANFAAT HASIL KOREKSI (POST CONDITION)</div>
                        <div style={{ fontSize: 11, color: '#cbd5e1' }}>Telah memperhitungkan MKG Awal & Skorsing sesuai pengajuan.</div>
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 'bold', color: '#4ade80' }}>
                        {formatRupiah(newCalc.total)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setSelectedClaimId(null)}>Tutup</button>
              <button style={styles.priBtn} onClick={handleSaveModal}>Hitung Ulang & Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT FIELD POP-UP SUB-MODAL */}
      {editConfig && (
        <div style={styles.modalBackdrop}>
          <div style={styles.subModalContainer}>
            <div style={styles.subModalHeader}>
              <h3 style={{ fontSize: 14, color: '#fff' }}>Edit — {editConfig.fieldLabel}</h3>
              <button style={styles.closeBtn} onClick={() => setEditConfig(null)}>✕</button>
            </div>
            <form onSubmit={handleSaveFieldEdit}>
              <div style={{ padding: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 'bold', marginBottom: 8, color: '#1e293b' }}>
                  Nilai Baru untuk {editConfig.fieldLabel}:
                </label>
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
                  <input 
                    type={editConfig.inputType === 'number' ? 'number' : 'text'}
                    style={styles.editInput}
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                    autoFocus
                  />
                  {editConfig.suffix && <span style={styles.suffixText}>{editConfig.suffix}</span>}
                </div>
                <small style={{ color: '#64748b', fontSize: 11, marginTop: 6, display: 'block' }}>
                  Perubahan akan langsung mengkalkulasi ulang Manfaat TA, NTTA, dan NTIP.
                </small>
              </div>
              <div style={styles.modalFooter}>
                <button type="button" style={styles.secBtn} onClick={() => setEditConfig(null)}>Batal</button>
                <button type="submit" style={styles.priBtn}>Simpan & Hitung Ulang</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATIONS */}
      <div style={styles.toastWrap}>
        {toasts.map(t => (
          <div key={t.id} style={styles.toast}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// HELPER COMPONENTS
function StripeRow({ label, value, alt, onEdit, valueStyle }) {
  return (
    <div style={{ ...styles.stripeRow, backgroundColor: alt ? '#eaf4fe' : '#ffffff' }}>
      <div style={{ width: '40%', fontWeight: 'bold', color: '#1e293b' }}>{label}</div>
      <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...valueStyle }}>
        <span>{value}</span>
        {onEdit && (
          <button type="button" style={styles.pencilBtn} onClick={onEdit} title="Edit Field">✏️</button>
        )}
      </div>
    </div>
  );
}

function BenefitCard({ title, oldVal, newVal }) {
  const diff = newVal - oldVal;
  return (
    <div style={styles.benefitCard}>
      <div style={{ fontSize: 11, fontWeight: 'bold', color: '#334155' }}>{title}</div>
      <div style={{ margin: '6px 0', fontSize: 12 }}>
        <div style={{ color: '#94a3b8', textDecoration: 'line-through' }}>Awal: {formatRupiah(oldVal)}</div>
        <div style={{ color: '#2563eb', fontWeight: 'bold' }}>Koreksi: {formatRupiah(newVal)}</div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 'bold', color: diff >= 0 ? '#16a34a' : '#dc2626', textAlign: 'right' }}>
        {diff >= 0 ? '+' : ''}{formatRupiah(diff)}
      </div>
    </div>
  );
}

// ==========================================
// UNIFIED INLINE STYLES (SIDEBAR RAPAT KE ATAS)
// ==========================================
const styles = {
  appRoot: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#f8fafc",
    color: "#0f172a",
    minHeight: "100vh"
  },
  header: {
    height: "64px",
    backgroundColor: "#0b1329",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  brandBox: {
    width: "32px", height: "32px",
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "#0b1329", fontWeight: "900", borderRadius: "6px",
    display: "flex", alignItems: "center", justifyContent: "center"
  },
  brandTitle: { fontWeight: "800", fontSize: "14px", color: "#fff" },
  brandSub: { fontSize: "10px", color: "#f59e0b", fontWeight: "bold" },
  headerCenter: { flex: 1, maxWidth: "440px", margin: "0 20px" },
  searchInput: {
    width: "100%", padding: "8px 16px",
    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "20px", color: "#fff", outline: "none", fontSize: "13px"
  },
  headerRight: { display: "flex", alignItems: "center", gap: "14px" },
  roleBadge: {
    background: "rgba(255,255,255,0.1)", padding: "4px 10px",
    borderRadius: "6px", fontSize: "11px", color: "#e2e8f0",
    display: "flex", alignItems: "center", gap: "8px"
  },
  rolePill: { background: "#f59e0b", color: "#0b1329", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", fontSize: "9px" },
  userAvatar: { width: "34px", height: "34px", background: "#2563eb", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "13px" },
  appLayout: { display: "flex", marginTop: "64px", minHeight: "calc(100vh - 64px)" },
  sidebar: {
    width: "240px", backgroundColor: "#ffffff", borderRight: "1px solid #cbd5e1",
    padding: "20px 12px", position: "fixed", top: "64px", bottom: 0, left: 0,
    display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "20px"
  },
  sidebarSectionLabel: { fontSize: "11px", fontWeight: "bold", color: "#94a3b8", marginBottom: "8px" },
  sidebarNavItemActive: {
    backgroundColor: "#eff6ff", color: "#2563eb", padding: "10px 12px",
    borderRadius: "8px", fontWeight: "bold", fontSize: "13px",
    display: "flex", justifyContent: "space-between", alignItems: "center"
  },
  sidebarActivePill: { background: "#dbeafe", color: "#1d4ed8", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" },
  sidebarFooter: { background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px" },
  mainContent: { flex: 1, marginLeft: "240px", padding: "24px" },
  pageTopBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  breadcrumb: { fontSize: "12px", color: "#64748b" },
  pageTitle: { fontSize: "20px", fontWeight: "bold", color: "#0f172a" },
  dateBox: { background: "#0f172a", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold" },
  tabBar: { borderBottom: "2px solid #cbd5e1", marginBottom: "20px" },
  tabBtnActive: { padding: "10px 16px", background: "none", border: "none", borderBottom: "3px solid #2563eb", color: "#2563eb", fontWeight: "bold", fontSize: "13px" },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "20px" },
  kpiCard: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "16px" },
  kpiTitle: { fontSize: "10px", fontWeight: "bold", color: "#64748b" },
  kpiValue: { fontSize: "18px", fontWeight: "bold", color: "#0f172a", margin: "4px 0" },
  kpiDesc: { fontSize: "11px", color: "#94a3b8" },
  toolbar: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  filterInput: { padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", outline: "none" },
  filterSelect: { padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", outline: "none" },
  tableWrap: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "10px", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" },
  thRow: { backgroundColor: "#f8fafc", borderBottom: "1px solid #cbd5e1" },
  th: { padding: "12px 14px", fontSize: "11px", fontWeight: "bold", color: "#475569" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "12px 14px" },
  pesertaClickable: { cursor: "pointer" },
  pesertaName: { fontWeight: "bold", color: "#1d4ed8", textDecoration: "underline" },
  pesertaSub: { fontSize: "11px", color: "#64748b" },
  badge: { background: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "11px" },
  actionBtn: { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" },
  modalBackdrop: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  modalContainer: { background: "#fff", width: "100%", maxWidth: "860px", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh" },
  modalHeader: { background: "#0b1329", color: "#fff", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  closeBtn: { background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" },
  modalTabBar: { display: "flex", background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" },
  modalTabBtn: { padding: "12px 20px", background: "none", border: "none", fontSize: "13px", fontWeight: "bold", color: "#64748b", cursor: "pointer" },
  modalTabBtnActive: { padding: "12px 20px", background: "#fff", border: "none", borderBottom: "3px solid #2563eb", color: "#2563eb", fontWeight: "bold", fontSize: "13px", cursor: "pointer" },
  modalBody: { padding: "20px", overflowY: "auto", flex: 1 },
  bannerTitle: { background: "#e2e8f0", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", color: "#334155", marginBottom: "12px" },
  stripeGrid: { border: "1px solid #dbeafe", borderRadius: "8px", overflow: "hidden" },
  stripeRow: { display: "flex", justifyContent: "space-between", padding: "9px 14px", fontSize: "13px" },
  pencilBtn: { background: "#eff6ff", border: "1px solid #bfdbfe", color: "#2563eb", padding: "3px 8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  calcBox: { marginTop: "20px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "16px" },
  benefitCard: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px" },
  totalBanner: { marginTop: "12px", background: "#0f172a", borderRadius: "8px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalFooter: { padding: "14px 20px", background: "#f8fafc", borderTop: "1px solid #cbd5e1", display: "flex", justifyContent: "flex-end", gap: "12px" },
  secBtn: { padding: "8px 16px", background: "#e2e8f0", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" },
  priBtn: { padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" },
  subModalContainer: { background: "#fff", width: "100%", maxWidth: "440px", borderRadius: "12px", overflow: "hidden" },
  subModalHeader: { background: "#1e293b", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  editInput: { width: "100%", padding: "10px 14px", border: "2px solid #60a5fa", borderRadius: "6px", fontSize: "14px", fontWeight: "bold", outline: "none" },
  suffixText: { position: "absolute", right: "12px", fontWeight: "bold", color: "#64748b", fontSize: "12px" },
  toastWrap: { position: "fixed", bottom: "24px", right: "24px", zIndex: 2000, display: "flex", flexDirection: "column", gap: "8px" },
  toast: { background: "#0f172a", color: "#fff", padding: "12px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", borderLeft: "4px solid #10b981" }
};
