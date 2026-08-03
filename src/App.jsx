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
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [claims, setClaims] = useState(initialClaimData);
  const [activePage, setActivePage] = useState('koreksi'); // 'koreksi' | 'reportHutang' | 'reportPenyelesaian'
  const [reportExpanded, setReportExpanded] = useState(true);

  // Search & Filter state for Koreksi
  const [searchVal, setSearchVal] = useState('');
  const [filterKlaim, setFilterKlaim] = useState('ALL');
  
  // Modals state
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [modalTab, setModalTab] = useState('profil');
  const [editConfig, setEditConfig] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [toasts, setToasts] = useState([]);

  // Report Hutang Klaim Form state (Gambar 1)
  const [hutangTahun, setHutangTahun] = useState('2026');
  const [hutangTriwulan, setHutangTriwulan] = useState('I');
  const [hutangKategori, setHutangKategori] = useState('Utang Klaim Tahun Lalu');
  const [hutangType, setHutangType] = useState('Rekap');
  const [filterHutangOpen, setFilterHutangOpen] = useState(true);
  const [showHutangPreviewModal, setShowHutangPreviewModal] = useState(false);

  // Report Penyelesaian Klaim Form state (Gambar 2)
  const [penyelesaianTriwulan, setPenyelesaianTriwulan] = useState('1');
  const [penyelesaianType, setPenyelesaianType] = useState('Rekap');
  const [penyelesaianJenis, setPenyelesaianJenis] = useState('KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU');
  const [penyelesaianTahun, setPenyelesaianTahun] = useState('2026');
  const [filterPenyelesaianOpen, setFilterPenyelesaianOpen] = useState(true);
  const [showReportPreviewModal, setShowReportPreviewModal] = useState(false);

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
    setEditConfig({ fieldName, fieldLabel, inputType, suffix });
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

  // Preview & Download handlers for Report Penyelesaian Klaim E-1
  const handleOpenPenyelesaianPreview = () => {
    setShowReportPreviewModal(true);
  };
  const handleDownloadPdf = () => {
    addToast(`🔴 Berkas Laporan Penyelesaian Klaim E-1 (Triwulan ${penyelesaianTriwulan} ${penyelesaianTahun}).pdf berhasil diunduh!`);
    setShowReportPreviewModal(false);
  };
  const handleDownloadExcel = () => {
    addToast(`🟢 Berkas Laporan Penyelesaian Klaim E-1 (Triwulan ${penyelesaianTriwulan} ${penyelesaianTahun}).xlsx berhasil diunduh!`);
    setShowReportPreviewModal(false);
  };

  // Preview & Download handlers for Report Hutang Klaim B-2
  const handleOpenHutangPreview = () => {
    setShowHutangPreviewModal(true);
  };
  const handleDownloadHutangPdf = () => {
    addToast(`🔴 Berkas Laporan Utang Klaim B-2 (Triwulan ${hutangTriwulan} ${hutangTahun}).pdf berhasil diunduh!`);
    setShowHutangPreviewModal(false);
  };
  const handleDownloadHutangExcel = () => {
    addToast(`🟢 Berkas Laporan Utang Klaim B-2 (Triwulan ${hutangTriwulan} ${hutangTahun}).xlsx berhasil diunduh!`);
    setShowHutangPreviewModal(false);
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
      {/* TOP HEADER */}
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
        {/* SIDEBAR NAVIGATION WITH REPORT PELAYANAN SUB-MENUS */}
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.sidebarSectionLabel}>PELAYANAN KANCAB</div>

            {/* MENU 1: KOREKSI MANFAAT */}
            <div 
              style={activePage === 'koreksi' ? styles.sidebarNavItemActive : styles.sidebarNavItem}
              onClick={() => setActivePage('koreksi')}
            >
              <span>📋 Koreksi Manfaat</span>
              {activePage === 'koreksi' && <span style={styles.sidebarActivePill}>AKTIF</span>}
            </div>

            {/* MENU 2: REPORT PELAYANAN (PARENT MENU WITH SUB-MENUS) */}
            <div style={{ marginTop: 12 }}>
              <div 
                style={styles.sidebarParentNav}
                onClick={() => setReportExpanded(!reportExpanded)}
              >
                <span>📊 Report Pelayanan</span>
                <span style={{ fontSize: 10 }}>{reportExpanded ? '▼' : '▶'}</span>
              </div>

              {/* SUB-MENUS */}
              {reportExpanded && (
                <div style={{ marginLeft: 12, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {/* SUB-MENU 1: REPORT HUTANG KLAIM (GAMBAR 1) */}
                  <div 
                    style={activePage === 'reportHutang' ? styles.sidebarSubItemActive : styles.sidebarSubItem}
                    onClick={() => setActivePage('reportHutang')}
                  >
                    📄 Report Hutang Klaim
                  </div>

                  {/* SUB-MENU 2: REPORT PENYELESAIAN KLAIM (GAMBAR 2) */}
                  <div 
                    style={activePage === 'reportPenyelesaian' ? styles.sidebarSubItemActive : styles.sidebarSubItem}
                    onClick={() => setActivePage('reportPenyelesaian')}
                  >
                    📄 Report Penyelesaian Klaim
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={styles.sidebarFooter}>
            <div style={{ fontWeight: 'bold', fontSize: 12 }}>Akses CSO KanCab</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
              Menu Koreksi Manfaat & Laporan Pelayanan Resmi ASABRI.
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main style={styles.mainContent}>
          
          {/* ========================================== */}
          {/* PAGE 1: KOREKSI PERHITUNGAN MANFAAT        */}
          {/* ========================================== */}
          {activePage === 'koreksi' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Koreksi Perhitungan Manfaat</div>
                  <h1 style={styles.pageTitle}>Review & Koreksi Perhitungan Manfaat</h1>
                </div>
                <div style={styles.dateBox}>Senin, 03 Agustus 2026</div>
              </div>

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
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 2: REPORT HUTANG KLAIM (GAMBAR 1)     */}
          {/* ========================================== */}
          {activePage === 'reportHutang' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Report Pelayanan &rsaquo; Report Hutang Klaim</div>
                  <h1 style={styles.pageTitle}>Report Hutang Klaim</h1>
                </div>
                <div style={styles.dateBox}>Senin, 03 Agustus 2026</div>
              </div>

              <div style={styles.reportCardWrapper}>
                <div style={styles.filterCardBox}>
                  <div 
                    style={styles.filterBarHeader}
                    onClick={() => setFilterHutangOpen(!filterHutangOpen)}
                  >
                    <span>▸ Filter</span>
                    <span style={{ fontSize: 12 }}>{filterHutangOpen ? '▲' : '▼'}</span>
                  </div>

                  {filterHutangOpen && (
                    <div style={styles.filterBarBody}>
                      <div style={styles.formGrid3}>
                        <div style={styles.formFieldGroup}>
                          <label style={styles.formLabel}>Tahun</label>
                          <input 
                            type="text" 
                            style={styles.formControlInput}
                            value={hutangTahun} 
                            onChange={(e) => setHutangTahun(e.target.value)} 
                          />
                        </div>

                        <div style={styles.formFieldGroup}>
                          <label style={styles.formLabel}>Triwulan</label>
                          <select 
                            style={styles.formControlSelect}
                            value={hutangTriwulan}
                            onChange={(e) => setHutangTriwulan(e.target.value)}
                          >
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                          </select>
                        </div>

                        <div style={styles.formFieldGroup}>
                          <label style={styles.formLabel}>Kategori</label>
                          <select 
                            style={styles.formControlSelect}
                            value={hutangKategori}
                            onChange={(e) => setHutangKategori(e.target.value)}
                          >
                            <option value="Utang Klaim Tahun Lalu">Utang Klaim Tahun Lalu</option>
                            <option value="Utang Klaim Tahun Berjalan">Utang Klaim Tahun Berjalan</option>
                            <option value="Semua Utang Klaim">Semua Utang Klaim</option>
                          </select>
                        </div>

                        <div style={styles.formFieldGroup}>
                          <label style={styles.formLabel}>Type</label>
                          <select 
                            style={styles.formControlSelect}
                            value={hutangType}
                            onChange={(e) => setHutangType(e.target.value)}
                          >
                            <option value="Rekap">Rekap</option>
                            <option value="Detail">Detail</option>
                          </select>
                        </div>
                      </div>

                      {/* ACTION CETAK BUTTON (OPENS OFFICIAL B-2 PREVIEW MODAL) */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button 
                          style={styles.btnCetak}
                          onClick={handleOpenHutangPreview}
                        >
                          🔍 Cetak
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#0b1329', marginBottom: 8 }}>
                    📋 Preview Hasil Laporan Hutang Klaim ({hutangKategori} - Triwulan {hutangTriwulan} {hutangTahun})
                  </div>
                  <div style={styles.tableWrap}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.thRow}>
                          <th style={styles.th}>NO</th>
                          <th style={styles.th}>JENIS KLAIM</th>
                          <th style={styles.th}>JUMLAH SP</th>
                          <th style={styles.th}>TOTAL NOMINAL UTANG</th>
                          <th style={styles.th}>STATUS PROSES</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={styles.tr}>
                          <td style={styles.td}>1</td>
                          <td style={styles.td}><strong>Tabungan Asuransi (TA)</strong></td>
                          <td style={styles.td}>4 SP</td>
                          <td style={styles.td}><strong>Rp 842.500.000</strong></td>
                          <td style={styles.td}><span style={styles.badge}>Diverifikasi CSO</span></td>
                        </tr>
                        <tr style={styles.tr}>
                          <td style={styles.td}>2</td>
                          <td style={styles.td}><strong>Nilai Tunai TA (NTTA)</strong></td>
                          <td style={styles.td}>2 SP</td>
                          <td style={styles.td}><strong>Rp 410.200.000</strong></td>
                          <td style={styles.td}><span style={styles.badge}>Proses Pembayaran</span></td>
                        </tr>
                        <tr style={styles.tr}>
                          <td style={styles.td}>3</td>
                          <td style={styles.td}><strong>Nilai Tunai Iuran Pensiun (NTIP)</strong></td>
                          <td style={styles.td}>2 SP</td>
                          <td style={styles.td}><strong>Rp 340.800.000</strong></td>
                          <td style={styles.td}><span style={styles.badge}>Pending SKEP</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 3: REPORT PENYELESAIAN KLAIM (GAMBAR 2) */}
          {/* ========================================== */}
          {activePage === 'reportPenyelesaian' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Report Pelayanan &rsaquo; Report Penyelesaian Klaim</div>
                  <h1 style={styles.pageTitle}>Report Penyelesaian Klaim</h1>
                </div>
                <div style={styles.dateBox}>Senin, 03 Agustus 2026</div>
              </div>

              <div style={styles.reportCardWrapper}>
                <div style={styles.filterCardBox}>
                  <div 
                    style={styles.filterBarHeader}
                    onClick={() => setFilterPenyelesaianOpen(!filterPenyelesaianOpen)}
                  >
                    <span>▸ Filter</span>
                    <span style={{ fontSize: 12 }}>{filterPenyelesaianOpen ? '▲' : '▼'}</span>
                  </div>

                  {filterPenyelesaianOpen && (
                    <div style={styles.filterBarBody}>
                      <div style={styles.formGrid3}>
                        <div style={styles.formFieldGroup}>
                          <label style={styles.formLabel}>Triwulan</label>
                          <select 
                            style={styles.formControlSelect}
                            value={penyelesaianTriwulan}
                            onChange={(e) => setPenyelesaianTriwulan(e.target.value)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>

                        <div style={styles.formFieldGroup}>
                          <label style={styles.formLabel}>Type</label>
                          <select 
                            style={styles.formControlSelect}
                            value={penyelesaianType}
                            onChange={(e) => setPenyelesaianType(e.target.value)}
                          >
                            <option value="Rekap">Rekap</option>
                            <option value="Detail">Detail</option>
                          </select>
                        </div>

                        <div style={{ ...styles.formFieldGroup, gridColumn: 'span 2' }}>
                          <label style={styles.formLabel}>Jenis</label>
                          <select 
                            style={styles.formControlSelect}
                            value={penyelesaianJenis}
                            onChange={(e) => setPenyelesaianJenis(e.target.value)}
                          >
                            <option value="KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU">KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU</option>
                            <option value="KLAIM YANG DIAJUKAN TRIWULAN/TAHUN BERJALAN">KLAIM YANG DIAJUKAN TRIWULAN/TAHUN BERJALAN</option>
                            <option value="KLAIM YANG HARUS DISELESAIKAN TRIWULAN/TAHUN BERJALAN KLAIM YANG HARUS DIPROSES">KLAIM YANG HARUS DISELESAIKAN TRIWULAN/TAHUN BERJALAN KLAIM YANG HARUS DIPROSES</option>
                            <option value="KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN DAN TELAH DI BAYAR">KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN DAN TELAH DI BAYAR</option>
                            <option value="KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TAPI BELUM DI BAYAR">KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TAPI BELUM DI BAYAR</option>
                            <option value="KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN BERJALAN">KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN BERJALAN</option>
                          </select>
                        </div>

                        <div style={styles.formFieldGroup}>
                          <label style={styles.formLabel}>Tahun</label>
                          <input 
                            type="text" 
                            style={styles.formControlInput}
                            value={penyelesaianTahun} 
                            onChange={(e) => setPenyelesaianTahun(e.target.value)} 
                          />
                        </div>
                      </div>

                      {/* ACTION CETAK BUTTON (OPENS OFFICIAL E-1 PREVIEW MODAL) */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button 
                          style={styles.btnCetak}
                          onClick={handleOpenPenyelesaianPreview}
                        >
                          🔍 Cetak
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#0b1329', marginBottom: 8 }}>
                    📋 Preview Laporan Penyelesaian Pelayanan ({penyelesaianJenis})
                  </div>
                  <div style={styles.tableWrap}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.thRow}>
                          <th style={styles.th}>NO</th>
                          <th style={styles.th}>KATEGORI STATUS</th>
                          <th style={styles.th}>JUMLAH DOKUMEN</th>
                          <th style={styles.th}>TOTAL MANFAAT</th>
                          <th style={styles.th}>PERSENTASE SELESAI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={styles.tr}>
                          <td style={styles.td}>1</td>
                          <td style={styles.td}><strong>{penyelesaianJenis}</strong></td>
                          <td style={styles.td}>12 Dokumen</td>
                          <td style={styles.td}><strong>Rp 1.593.500.000</strong></td>
                          <td style={styles.td}><span style={{ color: '#16a34a', fontWeight: 'bold' }}>100% Selesai</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL PREVIEW LAPORAN UTANG KLAIM B-2 (DENGAN REKAP DATA)  */}
      {/* ========================================================= */}
      {showHutangPreviewModal && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '1100px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW FORMAT LAPORAN UTANG KLAIM B-2</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>Laporan Penyelenggaraan Program — Periode Triwulan {hutangTriwulan} Tahun {hutangTahun}</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowHutangPreviewModal(false)}>✕</button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
              {/* OFFICIAL B-2 REPORT HEADER (CENTER ALIGNED EXACTLY AS SCREENSHOT B-2) */}
              <div style={{ textAlign: 'center', marginBottom: 20, fontFamily: 'Arial, sans-serif' }}>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>PENGELOLA PROGRAM</div>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>LAPORAN PENYELENGGARAAN PROGRAM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>PROGRAM TABUNGAN HARI TUA PRAJURIT TENTARA NASIONAL INDONESIA,</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>ANGGOTA KEPOLISIAN NEGARA REPUBLIK INDONESIA, DAN PEGAWAI APARATUR SIPIL NEGARA DI LINGKUNGAN</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>KEMENTERIAN PERTAHANAN DAN KEPOLISIAN NEGARA REPUBLIK INDONESIA</div>
                <div style={{ fontSize: 13, fontWeight: 'bold', marginTop: 6, color: '#0b1329' }}>B-2. LAPORAN UTANG KLAIM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold', marginTop: 2 }}>PERIODE TRIWULAN : {hutangTriwulan} TAHUN {hutangTahun}</div>
              </div>

              {/* OFFICIAL EXCEL FORMAT B-2 MULTI-COLUMN TABLE */}
              <div style={{ overflowX: 'auto', border: '1px solid #000' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      <th rowSpan={3} style={styles.thExcel}>PP</th>
                      <th rowSpan={3} style={styles.thExcel}>PROG</th>
                      <th rowSpan={2} style={styles.thExcel}>PROGRAM / MANFAAT</th>
                      <th colSpan={2} style={styles.thExcel}>UTANG KLAIM AKHIR TRIWULAN/TAHUN LALU</th>
                      <th colSpan={2} style={styles.thExcel}>KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TETAPI BELUM DIBAYAR</th>
                      <th colSpan={2} style={styles.thExcel}>UTANG KLAIM AKHIR TRIWULAN/TAHUN LALU YANG SUDAH DIBAYAR</th>
                      <th colSpan={2} style={styles.thExcel}>UTANG KLAIM AKHIR TRIWULAN/TAHUN BERJALAN</th>
                    </tr>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                    </tr>
                    {/* FORMULA / NUMBERING ROW */}
                    <tr style={{ backgroundColor: '#e2e8f0', fontSize: '9px', fontWeight: 'bold' }}>
                      <td style={styles.tdExcel}>1</td>
                      <td style={styles.tdExcel}>2</td>
                      <td style={styles.tdExcel}>3</td>
                      <td style={styles.tdExcel}>4</td>
                      <td style={styles.tdExcel}>5</td>
                      <td style={styles.tdExcel}>6</td>
                      <td style={styles.tdExcel}>7</td>
                      <td style={styles.tdExcel}>8</td>
                      <td style={styles.tdExcel}>9</td>
                      <td style={styles.tdExcel}>10</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SA</td>
                      <td style={styles.tdExcel}>1</td>
                      <td style={styles.tdExcel}>1.734.900</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>1</td>
                      <td style={styles.tdExcel}>1.734.900</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SNTA</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI TANPA HAK PENSIUN</td>
                      <td style={styles.tdExcel}>12</td>
                      <td style={styles.tdExcel}>90.592.400</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>12</td>
                      <td style={styles.tdExcel}>90.592.400</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI DGN HAK TUNJANGAN</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SRK/SNTA</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SBP</td>
                      <td style={styles.tdExcel}>3</td>
                      <td style={styles.tdExcel}>8.000.000</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>3</td>
                      <td style={styles.tdExcel}>8.000.000</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SBP1/S</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SBP1/S PESERTA AKTIF</td>
                      <td style={styles.tdExcel}>2</td>
                      <td style={styles.tdExcel}>6.000.000</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>2</td>
                      <td style={styles.tdExcel}>6.000.000</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SBP1/S PESERTA PENSIUN</td>
                      <td style={styles.tdExcel}>5</td>
                      <td style={styles.tdExcel}>12.000.000</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>-</td>
                      <td style={styles.tdExcel}>5</td>
                      <td style={styles.tdExcel}>12.000.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* DUA TOMBOL UNDUH BERBEDA (MERAH PDF & HIJAU EXCEL XLSX) */}
            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setShowHutangPreviewModal(false)}>Tutup</button>
              
              {/* TOMBOL MERAH UNTUK PDF */}
              <button style={styles.btnPdfRed} onClick={handleDownloadHutangPdf}>
                📄 Unduh PDF (.pdf)
              </button>

              {/* TOMBOL HIJAU UNTUK EXCEL (.xlsx) */}
              <button style={styles.btnExcelGreen} onClick={handleDownloadHutangExcel}>
                📊 Unduh Excel (.xlsx)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL PREVIEW LAPORAN PENYELESAIAN KLAIM E-1 (GAMBAR 3)   */}
      {/* ========================================================= */}
      {showReportPreviewModal && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '1100px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW FORMAT LAPORAN PENYELESAIAN KLAIM E-1</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>Laporan Penyelenggaraan Program — Periode Triwulan {penyelesaianTriwulan} Tahun {penyelesaianTahun}</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowReportPreviewModal(false)}>✕</button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
              <div style={{ textAlign: 'center', marginBottom: 20, fontFamily: 'Arial, sans-serif' }}>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>PENGELOLA PROGRAM</div>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>LAPORAN PENYELENGGARAAN PROGRAM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>PROGRAM JAMINAN KECELAKAAN KERJA DAN JAMINAN KEMATIAN PRAJURIT TENTARA NASIONAL INDONESIA</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>ANGGOTA KEPOLISIAN NEGARA REPUBLIK INDONESIA, DAN PEGAWAI APARATUR SIPIL NEGARA DI LINGKUNGAN</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>KEMENTERIAN PERTAHANAN DAN KEPOLISIAN NEGARA REPUBLIK INDONESIA</div>
                <div style={{ fontSize: 13, fontWeight: 'bold', marginTop: 6, color: '#0b1329' }}>E-1. LAPORAN PENYELESAIAN KLAIM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold', marginTop: 2 }}>PERIODE TRIWULAN : {penyelesaianTriwulan} TAHUN {penyelesaianTahun}</div>
              </div>

              <div style={{ overflowX: 'auto', border: '1px solid #000' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      <th rowSpan={2} style={styles.thExcel}>PP</th>
                      <th rowSpan={2} style={styles.thExcel}>PROG</th>
                      <th rowSpan={2} style={styles.thExcel}>PROGRAM MANFAAT</th>
                      <th colSpan={2} style={styles.thExcel}>KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU</th>
                      <th colSpan={2} style={styles.thExcel}>KLAIM YANG DIAJUKAN TRIWULAN/TAHUN BERJALAN</th>
                      <th colSpan={2} style={styles.thExcel}>KLAIM YANG HARUS DISELESAIKAN TRIWULAN/TAHUN BERJALAN KLAIM YANG HARUS DIPROSES</th>
                      <th colSpan={2} style={styles.thExcel}>KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN DAN TELAH DI BAYAR</th>
                      <th colSpan={2} style={{ ...styles.thExcel, backgroundColor: '#dcfce7' }}>KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TAPI BELUM DI BAYAR</th>
                      <th colSpan={2} style={styles.thExcel}>KLAIM DI TOLAK</th>
                      <th colSpan={2} style={styles.thExcel}>KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN BERJALAN</th>
                    </tr>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={{ ...styles.thExcel, backgroundColor: '#dcfce7' }}>JML PESERTA</th><th style={{ ...styles.thExcel, backgroundColor: '#dcfce7' }}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                      <th style={styles.thExcel}>JML PESERTA</th><th style={styles.thExcel}>RP JUTA</th>
                    </tr>
                    <tr style={{ backgroundColor: '#e2e8f0', fontSize: '9px', fontWeight: 'bold' }}>
                      <td style={styles.tdExcel}>1</td>
                      <td style={styles.tdExcel}>2</td>
                      <td style={styles.tdExcel}>3</td>
                      <td style={styles.tdExcel}>4</td>
                      <td style={styles.tdExcel}>5</td>
                      <td style={styles.tdExcel}>6</td>
                      <td style={styles.tdExcel}>7=3+5</td>
                      <td style={styles.tdExcel}>8=4+6</td>
                      <td style={styles.tdExcel}>9</td>
                      <td style={styles.tdExcel}>10</td>
                      <td style={styles.tdExcel}>11</td>
                      <td style={styles.tdExcel}>12</td>
                      <td style={styles.tdExcel}>13</td>
                      <td style={styles.tdExcel}>14</td>
                      <td style={styles.tdExcel}>15=7-9-11-13</td>
                      <td style={styles.tdExcel}>16=8-10-12-14</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SA</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>1</td>
                      <td style={styles.tdExcel}>71.871,800</td>
                      <td style={styles.tdExcel}>1</td>
                      <td style={styles.tdExcel}>71.871,800</td>
                      <td style={styles.tdExcel}>1</td>
                      <td style={styles.tdExcel}>71.871,800</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SNTA</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcel}>PP67</td>
                      <td style={styles.tdExcel}>THT</td>
                      <td style={{ ...styles.tdExcel, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI TANPA HAK</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                      <td style={styles.tdExcel}>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setShowReportPreviewModal(false)}>Tutup</button>
              
              <button style={styles.btnPdfRed} onClick={handleDownloadPdf}>
                📄 Unduh PDF (.pdf)
              </button>

              <button style={styles.btnExcelGreen} onClick={handleDownloadExcel}>
                📊 Unduh Excel (.xlsx)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM 2-TAB DETAIL PESERTA */}
      {selectedClaim && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>KOREKSI DATA PERHITUNGAN MANFAAT PESERTA</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>Form Detail Peserta — {selectedClaim.nama} ({selectedClaim.spNum})</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setSelectedClaimId(null)}>✕</button>
            </div>

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

            <div style={styles.modalBody}>
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
// UNIFIED INLINE STYLES (CAMELCASE JS OBJECTS)
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
  sidebarNavItem: {
    padding: "10px 12px", borderRadius: "8px", fontWeight: "500", fontSize: "13px", color: "#475569",
    cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
  },
  sidebarNavItemActive: {
    backgroundColor: "#eff6ff", color: "#2563eb", padding: "10px 12px",
    borderRadius: "8px", fontWeight: "bold", fontSize: "13px", cursor: "pointer",
    display: "flex", justifyContent: "space-between", alignItems: "center"
  },
  sidebarParentNav: {
    padding: "10px 12px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", color: "#334155",
    cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
    backgroundColor: "#f8fafc"
  },
  sidebarSubItem: {
    padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "500", color: "#64748b",
    cursor: "pointer", transition: "background 0.15s"
  },
  sidebarSubItemActive: {
    padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", color: "#2563eb",
    backgroundColor: "#e0f2fe", cursor: "pointer"
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
  btnPdfRed: { padding: "8px 18px", background: "#dc2626", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" },
  btnExcelGreen: { padding: "8px 18px", background: "#16a34a", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" },
  subModalContainer: { background: "#fff", width: "100%", maxWidth: "440px", borderRadius: "12px", overflow: "hidden" },
  subModalHeader: { background: "#1e293b", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  editInput: { width: "100%", padding: "10px 14px", border: "2px solid #60a5fa", borderRadius: "6px", fontSize: "14px", fontWeight: "bold", outline: "none" },
  suffixText: { position: "absolute", right: "12px", fontWeight: "bold", color: "#64748b", fontSize: "12px" },
  toastWrap: { position: "fixed", bottom: "24px", right: "24px", zIndex: 2000, display: "flex", flexDirection: "column", gap: "8px" },
  toast: { background: "#0f172a", color: "#fff", padding: "12px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", borderLeft: "4px solid #10b981" },

  // STYLES FOR REPORT PAGES & EXCEL FORMAT PREVIEW
  reportCardWrapper: { background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "20px" },
  filterCardBox: { border: "1px solid #cbd5e1", borderRadius: "4px", overflow: "hidden" },
  filterBarHeader: { background: "#0b1329", color: "#ffffff", padding: "10px 14px", fontSize: "13px", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" },
  filterBarBody: { padding: "16px", backgroundColor: "#ffffff" },
  formGrid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
  formFieldGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  formLabel: { fontSize: "12px", fontWeight: "bold", color: "#1e293b" },
  formControlInput: { padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", outline: "none" },
  formControlSelect: { padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", color: "#334155", backgroundColor: "#ffffff", outline: "none", cursor: "pointer" },
  btnCetak: { background: "#10b981", color: "#ffffff", border: "none", padding: "8px 24px", borderRadius: "4px", fontSize: "13px", fontWeight: "bold", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" },
  thExcel: { border: "1px solid #94a3b8", padding: "6px 8px", fontSize: "10px", fontWeight: "bold" },
  tdExcel: { border: "1px solid #cbd5e1", padding: "6px 8px", fontSize: "10px" }
};
