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
    skorsingList: [],
    mkgAwalTahun: 0,
    mkgAwalBulan: 0,
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
    skorsingList: [
      {
        id: 1,
        tglMulai: "2024-01-01",
        tglAkhir: "2024-06-30",
        jumlahBulan: 6,
        persenSkorsing: 50,
        noSkep: "SKEP/SKOR/102/2024",
        fileName: "SKEP_Skorsing_AhmadSubagyo_2024.pdf",
        tglUpload: "15-01-2024",
        landasan: "SK Direksi No. 102/2024"
      },
      {
        id: 2,
        tglMulai: "2027-01-01",
        tglAkhir: "2027-06-30",
        jumlahBulan: 6,
        persenSkorsing: 25,
        noSkep: "SKEP/SKOR/108/2027",
        fileName: "SKEP_Skorsing_Mendatang_2027.pdf",
        tglUpload: "01-08-2026",
        landasan: "Evaluasi Triwulan 2026"
      }
    ],
    mkgAwalTahun: 2,
    mkgAwalBulan: 6,
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
    skorsingList: [],
    mkgAwalTahun: 0,
    mkgAwalBulan: 0,
    status: "BELUM"
  }
];

// RESTRUCTURED AKTUARIA PARAMETERS WITH RATE HISTORY (UC-AKT-005)
const initialActuaryParameters = [
  {
    id: 1,
    nama: "Suku Bunga TA",
    kategori: "Tabungan Asuransi (TA)",
    history: [
      {
        id: 101,
        persen: 0.25,
        tglMulai: "2026-06-06",
        tglSelesai: "2026-12-06",
        diubahOleh: "Divisi Aktuaria - Dr. Hendra",
        landasan: "SK Direksi No. 44/2026",
        status: "AKTIF"
      },
      {
        id: 100,
        persen: 0.20,
        tglMulai: "2025-01-01",
        tglSelesai: "2026-06-05",
        diubahOleh: "Divisi Aktuaria - Ratna M.",
        landasan: "SK Direksi No. 12/2025",
        status: "HISTORI"
      }
    ]
  },
  {
    id: 2,
    nama: "Suku Bunga NTTA",
    kategori: "Nilai Tunai TA (NTTA)",
    history: [
      {
        id: 201,
        persen: 0.45,
        tglMulai: "2026-01-01",
        tglSelesai: "2026-12-31",
        diubahOleh: "Divisi Aktuaria - Ratna M.",
        landasan: "SK Direksi No. 02/2026",
        status: "AKTIF"
      }
    ]
  },
  {
    id: 3,
    nama: "Tarif Premi THT",
    kategori: "Tabungan Hari Tua (THT)",
    history: [
      {
        id: 301,
        persen: 3.25,
        tglMulai: "2026-03-01",
        tglSelesai: "2027-02-28",
        diubahOleh: "Divisi Aktuaria - Budi S.",
        landasan: "PP No. 54/2026",
        status: "AKTIF"
      },
      {
        id: 300,
        persen: 3.00,
        tglMulai: "2024-01-01",
        tglSelesai: "2026-02-28",
        diubahOleh: "Divisi Aktuaria - Dr. Hendra",
        landasan: "PP No. 102/2023",
        status: "HISTORI"
      }
    ]
  }
];

// DETAILED AUDIT LOGS FOR PARAMETER CHANGES
const initialParameterChangeLogs = [
  {
    id: 101,
    paramId: 1,
    namaParam: "Suku Bunga TA",
    timestamp: "06-08-2026 14:20:15",
    aktor: "Divisi Aktuaria - Dr. Hendra",
    nilaiLama: "0.20 %",
    nilaiBaru: "0.25 %",
    tglMulai: "2026-06-06",
    tglSelesai: "2026-12-06",
    landasan: "SK Direksi No. 44/2026",
    tipeAksi: "Penambahan Rate Persenan Baru"
  },
  {
    id: 100,
    paramId: 1,
    namaParam: "Suku Bunga TA",
    timestamp: "05-01-2025 09:15:30",
    aktor: "Divisi Aktuaria - Ratna M.",
    nilaiLama: "0.15 %",
    nilaiBaru: "0.20 %",
    tglMulai: "2025-01-01",
    tglSelesai: "2026-06-05",
    landasan: "SK Direksi No. 12/2025",
    tipeAksi: "Penambahan Rate Persenan Baru"
  },
  {
    id: 201,
    paramId: 2,
    namaParam: "Suku Bunga NTTA",
    timestamp: "01-01-2026 10:00:00",
    aktor: "Divisi Aktuaria - Ratna M.",
    nilaiLama: "0.40 %",
    nilaiBaru: "0.45 %",
    tglMulai: "2026-01-01",
    tglSelesai: "2026-12-31",
    landasan: "SK Direksi No. 02/2026",
    tipeAksi: "Penambahan Rate Persenan Baru"
  },
  {
    id: 301,
    paramId: 3,
    namaParam: "Tarif Premi THT",
    timestamp: "01-03-2026 11:45:10",
    aktor: "Divisi Aktuaria - Budi S.",
    nilaiLama: "3.00 %",
    nilaiBaru: "3.25 %",
    tglMulai: "2026-03-01",
    tglSelesai: "2027-02-28",
    landasan: "PP No. 54/2026",
    tipeAksi: "Penambahan Rate Persenan Baru"
  },
  {
    id: 300,
    paramId: 3,
    namaParam: "Tarif Premi THT",
    timestamp: "01-01-2024 08:30:00",
    aktor: "Divisi Aktuaria - Dr. Hendra",
    nilaiLama: "2.75 %",
    nilaiBaru: "3.00 %",
    tglMulai: "2024-01-01",
    tglSelesai: "2026-02-28",
    landasan: "PP No. 102/2023",
    tipeAksi: "Penambahan Rate Persenan Baru"
  }
];

// MOCK DATA FOR E-DOSIR & SPTB
const initialEdosirList = [
  { id: 1, ktpa: "AA001290", nama: "DRS. DANI RUSDANI", jenisDoc: "SKEP Pengangkatan & Pensiun", noDoc: "SKEP/889/VIII/1988", tglUpload: "01-08-2026", status: "TERVERIFIKASI DIGITAL" },
  { id: 2, ktpa: "AB002341", nama: "KAPT INF AHMAD SUBAGYO", jenisDoc: "SKPP & Kartu Peserta ASABRI", noDoc: "SKPP/2004/IV", tglUpload: "02-08-2026", status: "TERVERIFIKASI DIGITAL" },
  { id: 3, ktpa: "AC009812", nama: "AKBP POL SUTRISNO SE", jenisDoc: "Kartu Keluarga & KTP Peserta", noDoc: "KK/3578/2024", tglUpload: "03-08-2026", status: "TERVERIFIKASI DIGITAL" }
];

const initialSptbList = [
  { id: 1, ktpa: "AA001290", nama: "DRS. DANI RUSDANI", noSptb: "SPTB/2026/01/088", tglBerlaku: "01-01-2026 s/d 31-12-2026", statusSptb: "LENGKAP & VALID", penerima: "Ny. Dani Rusdani (Warakawuri)" },
  { id: 2, ktpa: "AB002341", nama: "KAPT INF AHMAD SUBAGYO", noSptb: "SPTB/2026/02/104", tglBerlaku: "01-01-2026 s/d 31-12-2026", statusSptb: "LENGKAP & VALID", penerima: "Sendiri (Peserta Aktif)" }
];

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number || 0);
}

// UPDATED BENEFIT CALCULATOR SUPPORTING MKG AWAL TAHUN & BULAN
function calculateBenefits(gajiPokok, masaKerjaBulan, skorsingBulan, mkgAwalTahun, mkgAwalBulan = 0) {
  const mkgAwalTotalYears = (mkgAwalTahun || 0) + ((mkgAwalBulan || 0) / 12);
  const effMasaKerjaYears = Math.max(0, (masaKerjaBulan - (skorsingBulan || 0)) / 12) + mkgAwalTotalYears;
  const ta = gajiPokok * 12 * (effMasaKerjaYears / 10) * 1.15;
  const ntta = gajiPokok * 0.95 * effMasaKerjaYears * 1.05;
  const ntip = gajiPokok * 0.75 * effMasaKerjaYears * 1.02;
  const total = ta + ntta + ntip;
  return { ta, ntta, ntip, total, effMasaKerjaYears };
}

// Calculate month difference between two dates
function calculateMonthDiff(d1, d2) {
  if (!d1 || !d2) return 0;
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  if (isNaN(date1) || isNaN(date2)) return 0;
  let months = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()) + 1;
  return Math.max(0, months);
}

// Helper: Determine exact status of skorsing ('Aktif', 'Belum Aktif', 'History')
function getSkorsingStatus(tglMulai, tglAkhir) {
  if (!tglMulai || !tglAkhir) return 'Aktif';
  const todayStr = '2026-08-06';
  if (tglMulai > todayStr) return 'Belum Aktif';
  if (tglAkhir < todayStr) return 'History';
  return 'Aktif';
}

// Helper: Sum effective skorsing months
function calculateEffectiveSkorsingMonths(skorsingList) {
  if (!skorsingList || !Array.isArray(skorsingList)) return 0;
  return skorsingList.reduce((acc, curr) => {
    const status = getSkorsingStatus(curr.tglMulai, curr.tglAkhir);
    if (status === 'Aktif' || status === 'History') {
      return acc + (curr.jumlahBulan || 0);
    }
    return acc;
  }, 0);
}

// Helper: Format MKG display string (Tahun & Bulan)
function formatMkgDisplay(tahun, bulan) {
  const t = tahun || 0;
  const b = bulan || 0;
  if (t === 0 && b === 0) return '0 Tahun';
  let str = '';
  if (t > 0) str += `${t} Tahun`;
  if (b > 0) str += `${str ? ' ' : ''}${b} Bulan`;
  return str;
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [claims, setClaims] = useState(initialClaimData);
  const [actuaryParams, setActuaryParams] = useState(initialActuaryParameters);
  const [paramChangeLogs, setParamChangeLogs] = useState(initialParameterChangeLogs);
  const [edosirList] = useState(initialEdosirList);
  const [sptbList] = useState(initialSptbList);

  // ROLE STATE: DEFAULT TO 'AKTUARIA' WITH LOCALSTORAGE PERSISTENCE
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('yandu_user_role') || 'AKTUARIA';
  });

  // PAGE STATE: 'dataPeserta' | 'reportHutang' | 'reportPenyelesaian' | 'reportKU' | 'parameterAktuaria'
  const [activePage, setActivePage] = useState('dataPeserta');
  const [reportExpanded, setReportExpanded] = useState(true);

  // Search & Filter state for Data Peserta
  const [searchVal, setSearchVal] = useState('');
  const [filterKlaim, setFilterKlaim] = useState('ALL');
  
  // Modals state
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [modalTab, setModalTab] = useState('profil');
  const [editConfig, setEditConfig] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [toasts, setToasts] = useState([]);

  // DEDICATED SUB-MODAL FOR MKG AWAL (TAHUN & BULAN) EDITING / VIEWING
  const [showEditMkgModal, setShowEditMkgModal] = useState(false);
  const [mkgInputTahun, setMkgInputTahun] = useState('0');
  const [mkgInputBulan, setMkgInputBulan] = useState('0');

  // Report Hutang Klaim Form state (B-2)
  const [hutangPeriode, setHutangPeriode] = useState('2');
  const [hutangTahun, setHutangTahun] = useState('2026');
  const [hutangKategori, setHutangKategori] = useState('Utang Klaim Tahun Lalu');
  const [hutangType, setHutangType] = useState('Rekap');
  const [filterHutangOpen, setFilterHutangOpen] = useState(true);
  const [showHutangPreviewModal, setShowHutangPreviewModal] = useState(false);

  // Report Penyelesaian Klaim Form state (E-1)
  const [penyelesaianPeriode, setPenyelesaianPeriode] = useState('1');
  const [penyelesaianType, setPenyelesaianType] = useState('Rekap');
  const [penyelesaianJenis, setPenyelesaianJenis] = useState('KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU');
  const [penyelesaianTahun, setPenyelesaianTahun] = useState('2026');
  const [filterPenyelesaianOpen, setFilterPenyelesaianOpen] = useState(true);
  const [showReportPreviewModal, setShowReportPreviewModal] = useState(false);

  // REPORT KU FORM STATE
  const [kuCetak, setKuCetak] = useState('');
  const [kuCabang, setKuCabang] = useState('');
  const [kuJenisBayar, setKuJenisBayar] = useState('');
  const [kuPeriodeAwal, setKuPeriodeAwal] = useState('2026-06-01');
  const [kuPeriodeAkhir, setKuPeriodeAkhir] = useState('2026-06-30');
  const [kuMitraBayar, setKuMitraBayar] = useState('Semua Mitra');
  const [kuJumlah, setKuJumlah] = useState('Semua Jumlah');
  const [filterKuOpen, setFilterKuOpen] = useState(true);
  const [showKuPreviewModal, setShowKuPreviewModal] = useState(false);

  const [selectedDocPreview, setSelectedDocPreview] = useState(null);

  // PARAMETER MANAGING MODAL STATE
  const [selectedParamId, setSelectedParamId] = useState(null);
  const [selectedParamLogId, setSelectedParamLogId] = useState(null);

  // DEDICATED SUB-MODALS FOR PARAMETER ACTIONS
  const [showAddRateModal, setShowAddRateModal] = useState(false);
  const [newRatePersen, setNewRatePersen] = useState('');
  const [newRateTglMulai, setNewRateTglMulai] = useState('2026-12-07');
  const [newRateTglSelesai, setNewRateTglSelesai] = useState('2027-12-31');
  const [newRateLandasan, setNewRateLandasan] = useState('');

  // SKORSING MANAGEMENT MODALS & FORM STATE
  const [showSkorsingManageModal, setShowSkorsingManageModal] = useState(false);
  const [showAddSkorsingSubModal, setShowAddSkorsingSubModal] = useState(false);
  const [skorsingTglMulai, setSkorsingTglMulai] = useState('2025-01-01');
  const [skorsingTglAkhir, setSkorsingTglAkhir] = useState('2025-06-30');
  const [skorsingPersenNum, setSkorsingPersenNum] = useState('50');
  const [skorsingNoSkep, setSkorsingNoSkep] = useState('SKEP/SKOR/2025/099');
  const [skorsingFileName, setSkorsingFileName] = useState('');
  const [skorsingLandasan, setSkorsingLandasan] = useState('');

  // Handle Role Switching
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('yandu_user_role', newRole);
    if (newRole === 'CSO') {
      if (['reportKU', 'parameterAktuaria'].includes(activePage)) {
        setActivePage('dataPeserta');
      }
      addToast('👤 Hak Akses Diperbarui: CSO Kancab (Akses Edit: MKG & Skorsing)');
    } else if (newRole === 'AKTUARIA') {
      addToast('🛡️ Hak Akses Diperbarui: Divisi Aktuaria (Akses Peninjauan MKG/Skorsing Read-Only & Parameter/KU)');
    }
  };

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
  const selectedParam = actuaryParams.find(p => p.id === selectedParamId);
  const selectedParamLog = actuaryParams.find(p => p.id === selectedParamLogId);

  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleOpenEditField = (fieldName, fieldLabel, inputType = 'text', suffix = '') => {
    if (fieldName === 'mkgAwalTahun') {
      if (selectedClaim) {
        setMkgInputTahun(selectedClaim.mkgAwalTahun || '0');
        setMkgInputBulan(selectedClaim.mkgAwalBulan || '0');
      }
      setShowEditMkgModal(true);
      return;
    }

    if (fieldName === 'skorsingBulan') {
      setShowSkorsingManageModal(true);
      return;
    }

    if (userRole === 'AKTUARIA') {
      addToast('⚠️ Akses Dibatasi: Divisi Aktuaria hanya dapat meninjau data ini (Read-Only).');
      return;
    }

    if (!selectedClaim) return;
    setEditConfig({ fieldName, fieldLabel, inputType, suffix });
    setEditInputValue(selectedClaim[fieldName] !== undefined ? selectedClaim[fieldName] : '');
  };

  // HANDLER: SAVE MKG AWAL TAHUN & BULAN (CSO ONLY)
  const handleSaveMkgSubmit = (e) => {
    e.preventDefault();
    if (userRole === 'AKTUARIA') return;
    if (!selectedClaimId) return;

    const t = parseInt(mkgInputTahun) || 0;
    const b = parseInt(mkgInputBulan) || 0;

    setClaims(prev => prev.map(item => {
      if (item.id === selectedClaimId) {
        return {
          ...item,
          mkgAwalTahun: t,
          mkgAwalBulan: b,
          status: 'TERKOREKSI'
        };
      }
      return item;
    }));

    addToast(`✏️ Masa Kerja Golongan (MKG) Awal berhasil diperbarui: "${formatMkgDisplay(t, b)}"! Real-time calculation updated.`);
    setShowEditMkgModal(false);
  };

  const handleSaveFieldEdit = (e) => {
    e.preventDefault();
    if (userRole === 'AKTUARIA') return;
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

  // HANDLER FOR CSO KANCAB: ADD NEW SKORSING PERIOD ENTRY
  const handleAddSkorsingSubmit = (e) => {
    e.preventDefault();
    if (userRole === 'AKTUARIA') return;
    if (!selectedClaim) return;

    const bulanCalc = calculateMonthDiff(skorsingTglMulai, skorsingTglAkhir);
    const parsedPersen = parseFloat(skorsingPersenNum) || 0;
    const itemStatus = getSkorsingStatus(skorsingTglMulai, skorsingTglAkhir);

    const newSkorsingItem = {
      id: Date.now(),
      tglMulai: skorsingTglMulai,
      tglAkhir: skorsingTglAkhir,
      jumlahBulan: bulanCalc,
      persenSkorsing: parsedPersen,
      noSkep: skorsingNoSkep || 'SKEP/SKOR/2026/001',
      fileName: skorsingFileName || 'SKEP_Skorsing_Dokumen_Upload.pdf',
      tglUpload: new Date().toLocaleDateString('id-ID'),
      landasan: skorsingLandasan || 'Penyesuaian Skorsing Peserta'
    };

    setClaims(prev => prev.map(item => {
      if (item.id === selectedClaimId) {
        const currentList = item.skorsingList || [];
        const updatedList = [newSkorsingItem, ...currentList];
        const effectiveBulan = calculateEffectiveSkorsingMonths(updatedList);
        return {
          ...item,
          skorsingList: updatedList,
          skorsingBulan: effectiveBulan,
          status: 'TERKOREKSI'
        };
      }
      return item;
    }));

    const statusNotice = itemStatus === 'Belum Aktif' ? ' [STATUS: Belum Aktif - Tidak memotong manfaat saat ini]' : ` [STATUS: ${itemStatus}]`;
    addToast(`✅ Periode Skorsing Baru (${bulanCalc} Bulan, ${parsedPersen}%) berhasil ditambahkan!${statusNotice}`);
    setShowAddSkorsingSubModal(false);
    setSkorsingFileName('');
    setSkorsingLandasan('');
  };

  // HANDLER FOR CSO KANCAB: DELETE SKORSING ENTRY
  const handleDeleteSkorsingItem = (skorsingId) => {
    if (userRole === 'AKTUARIA') return;
    if (!selectedClaim) return;

    setClaims(prev => prev.map(item => {
      if (item.id === selectedClaimId) {
        const updatedList = (item.skorsingList || []).filter(s => s.id !== skorsingId);
        const effectiveBulan = calculateEffectiveSkorsingMonths(updatedList);
        return {
          ...item,
          skorsingList: updatedList,
          skorsingBulan: effectiveBulan,
          status: 'TERKOREKSI'
        };
      }
      return item;
    }));

    addToast(`🗑️ Entri periode skorsing berhasil dihapus!`);
  };

  // HANDLER FOR ADDING NEW PARAMETER RATE (UC-AKT-005)
  const handleAddNewRateSubmit = (e) => {
    e.preventDefault();
    if (!selectedParam) return;

    const rateVal = parseFloat(newRatePersen) || 0;
    const newRateObj = {
      id: Date.now(),
      persen: rateVal,
      tglMulai: newRateTglMulai,
      tglSelesai: newRateTglSelesai,
      diubahOleh: "Divisi Aktuaria - Dr. Hendra",
      landasan: newRateLandasan || "SK Direksi Penyesuaian Aktuaria",
      status: "AKTIF"
    };

    setActuaryParams(prev => prev.map(param => {
      if (param.id === selectedParamId) {
        const updatedHistory = param.history.map(h => ({ ...h, status: "HISTORI" }));
        return {
          ...param,
          history: [newRateObj, ...updatedHistory]
        };
      }
      return param;
    }));

    const newLogObj = {
      id: Date.now(),
      paramId: selectedParam.id,
      namaParam: selectedParam.nama,
      timestamp: new Date().toLocaleString('id-ID'),
      aktor: "Divisi Aktuaria - Dr. Hendra",
      nilaiLama: `${selectedParam.history[0]?.persen || 0} %`,
      nilaiBaru: `${rateVal} %`,
      tglMulai: newRateTglMulai,
      tglSelesai: newRateTglSelesai,
      landasan: newRateLandasan || "SK Direksi Penyesuaian Aktuaria",
      tipeAksi: "Penambahan Rate Persenan Baru"
    };

    setParamChangeLogs(prev => [newLogObj, ...prev]);

    addToast(`✅ Rate Persenan Baru (${rateVal}%) berhasil ditambahkan & menjadi rate AKTIF!`);
    setShowAddRateModal(false);
    setNewRatePersen('');
    setNewRateLandasan('');
  };

  const handleSaveModal = () => {
    if (!selectedClaimId) return;
    if (userRole === 'AKTUARIA') {
      setSelectedClaimId(null);
      return;
    }
    setClaims(prev => prev.map(item => item.id === selectedClaimId ? { ...item, status: 'TERKOREKSI' } : item));
    addToast(`✅ Data Perhitungan Manfaat ${selectedClaim.nama} Berhasil Disimpan!`);
    setSelectedClaimId(null);
  };

  // Export Handlers
  const handleExportDataPesertaPdf = () => {
    addToast(`🔴 Berkas PDF Data Peserta (${filteredClaims.length} Record).pdf berhasil diunduh!`);
  };

  const handleExportDataPesertaExcel = () => {
    addToast(`🟢 Berkas Excel Data Peserta (${filteredClaims.length} Record).xlsx berhasil diunduh!`);
  };

  const handleOpenKuPreview = () => setShowKuPreviewModal(true);
  const handleDownloadKuPdf = () => {
    const cetakLabel = kuCetak || 'DAFTAR REKAPITULASI III NON DAPEM';
    addToast(`🔴 Berkas Report KU (${cetakLabel}).pdf berhasil diunduh!`);
    setShowKuPreviewModal(false);
  };

  const handleDownloadKuExcel = () => {
    const cetakLabel = kuCetak || 'DAFTAR REKAPITULASI III NON DAPEM';
    addToast(`🟢 Berkas Excel Report KU (${cetakLabel}).xlsx berhasil diunduh!`);
    setShowKuPreviewModal(false);
  };

  const handleOpenPenyelesaianPreview = () => setShowReportPreviewModal(true);
  const handleDownloadPdf = () => {
    const periodeLabel = penyelesaianPeriode === 'Tahunan' ? `Tahunan ${penyelesaianTahun}` : `Triwulan ${penyelesaianPeriode} ${penyelesaianTahun}`;
    addToast(`🔴 Berkas Laporan Penyelesaian Klaim E-1 (${periodeLabel}).pdf berhasil diunduh!`);
    setShowReportPreviewModal(false);
  };
  const handleDownloadExcel = () => {
    const periodeLabel = penyelesaianPeriode === 'Tahunan' ? `Tahunan ${penyelesaianTahun}` : `Triwulan ${penyelesaianPeriode} ${penyelesaianTahun}`;
    addToast(`🟢 Berkas Laporan Penyelesaian Klaim E-1 (${periodeLabel}).xlsx berhasil diunduh!`);
    setShowReportPreviewModal(false);
  };

  const handleOpenHutangPreview = () => setShowHutangPreviewModal(true);
  const handleDownloadHutangPdf = () => {
    const periodeLabel = hutangPeriode === 'Tahunan' ? `Tahunan ${hutangTahun}` : `Triwulan ${hutangPeriode} ${hutangTahun}`;
    addToast(`🔴 Berkas Laporan Utang Klaim B-2 (${periodeLabel}).pdf berhasil diunduh!`);
    setShowHutangPreviewModal(false);
  };
  const handleDownloadHutangExcel = () => {
    const periodeLabel = hutangPeriode === 'Tahunan' ? `Tahunan ${hutangTahun}` : `Triwulan ${hutangPeriode} ${hutangTahun}`;
    addToast(`🟢 Berkas Laporan Utang Klaim B-2 (${periodeLabel}).xlsx berhasil diunduh!`);
    setShowHutangPreviewModal(false);
  };

  const baseCalc = selectedClaim ? calculateBenefits(selectedClaim.gajiPokok, selectedClaim.masaKerjaBulan, 0, 0, 0) : null;
  const newCalc = selectedClaim ? calculateBenefits(selectedClaim.gajiPokok, selectedClaim.masaKerjaBulan, selectedClaim.skorsingBulan, selectedClaim.mkgAwalTahun, selectedClaim.mkgAwalBulan) : null;

  return (
    <div style={styles.appRoot}>
      {/* TOP HEADER WITH DYNAMIC ROLE SWITCHER DROPDOWN */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.brandBox}>A</div>
          <div>
            <div style={styles.brandTitle}>YANDU NEXTGEN ASABRI</div>
            <div style={styles.brandSub}>
              {userRole === 'CSO' ? 'CSO KANTOR CABANG' : 'DIVISI AKTUARIA'}
            </div>
          </div>
        </div>

        <div style={styles.headerCenter}>
          <input 
            type="text" 
            style={styles.searchInput}
            value={searchVal} 
            onChange={(e) => setSearchVal(e.target.value)} 
            placeholder="Cari SP / KTPA / NRP / NIP / Parameter..." 
          />
        </div>

        <div style={styles.headerRight}>
          <div style={styles.roleBadge}>
            <span style={{ fontSize: '11px', color: '#cbd5e1' }}>PILIH AKSES:</span>
            <select 
              style={styles.roleSelectDropdown}
              value={userRole}
              onChange={(e) => handleRoleChange(e.target.value)}
            >
              <option value="CSO">CSO Kancab</option>
              <option value="AKTUARIA">Divisi Aktuaria</option>
            </select>
          </div>
          <div style={{ ...styles.userAvatar, background: userRole === 'CSO' ? '#2563eb' : '#059669' }}>
            {userRole === 'CSO' ? 'CS' : 'DA'}
          </div>
        </div>
      </header>

      <div style={styles.appLayout}>
        {/* SIDEBAR NAVIGATION DYNAMICALLY FILTERED BY USER ROLE */}
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.sidebarSectionLabel}>MENU APLIKASI</div>

            {/* SHARED MENU: DATA PESERTA */}
            <div 
              style={activePage === 'dataPeserta' ? styles.sidebarNavItemActive : styles.sidebarNavItem}
              onClick={() => setActivePage('dataPeserta')}
            >
              <span>👥 Data Peserta</span>
              {activePage === 'dataPeserta' && <span style={styles.sidebarActivePill}>AKTIF</span>}
            </div>

            {/* MENU: REPORT PELAYANAN (VISIBLE FOR BOTH CSO & AKTUARIA) */}
            <div style={{ marginTop: 10 }}>
              <div 
                style={styles.sidebarParentNav}
                onClick={() => setReportExpanded(!reportExpanded)}
              >
                <span>📊 Report Pelayanan</span>
                <span style={{ fontSize: 10 }}>{reportExpanded ? '▼' : '▶'}</span>
              </div>

              {reportExpanded && (
                <div style={{ marginLeft: 12, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div 
                    style={activePage === 'reportHutang' ? styles.sidebarSubItemActive : styles.sidebarSubItem}
                    onClick={() => setActivePage('reportHutang')}
                  >
                    📄 Report Hutang Klaim (B-2)
                  </div>

                  <div 
                    style={activePage === 'reportPenyelesaian' ? styles.sidebarSubItemActive : styles.sidebarSubItem}
                    onClick={() => setActivePage('reportPenyelesaian')}
                  >
                    📄 Report Penyelesaian Klaim (E-1)
                  </div>
                </div>
              )}
            </div>

            {/* MENUS FOR DIVISI AKTUARIA (FSD EXTENDED MODULES) */}
            {userRole === 'AKTUARIA' && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {/* UC-AKT-003: REPORT KU */}
                <div 
                  style={activePage === 'reportKU' ? styles.sidebarNavItemActive : styles.sidebarNavItem}
                  onClick={() => setActivePage('reportKU')}
                >
                  <span>💰 Report KU (Dapem & Non)</span>
                  {activePage === 'reportKU' && <span style={styles.sidebarActivePill}>AKTIF</span>}
                </div>

                {/* UC-AKT-005: PERUBAHAN PARAMETER */}
                <div 
                  style={activePage === 'parameterAktuaria' ? styles.sidebarNavItemActive : styles.sidebarNavItem}
                  onClick={() => setActivePage('parameterAktuaria')}
                >
                  <span>⚙️ Perubahan Parameter</span>
                  {activePage === 'parameterAktuaria' && <span style={styles.sidebarActivePill}>AKTIF</span>}
                </div>

                {/* DISABLED AUDIT LOG & TRACKABILITY MENU PER USER REQUEST */}
                <div 
                  style={{
                    padding: "10px 12px", 
                    borderRadius: "8px", 
                    fontSize: "13px", 
                    color: "#94a3b8",
                    backgroundColor: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    cursor: "not-allowed",
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    opacity: 0.7
                  }}
                  onClick={() => addToast('ℹ️ Menu Audit Log & Trackability saat ini sedang dinonaktifkan.')}
                  title="Menu ini sedang dinonaktifkan"
                >
                  <span>📜 Audit Log & Trackability</span>
                  <span style={{ fontSize: "9px", background: "#cbd5e1", color: "#475569", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>
                    NON-AKTIF
                  </span>
                </div>
              </div>
            )}
          </div>

          <div style={styles.sidebarFooter}>
            <div style={{ fontWeight: 'bold', fontSize: 12 }}>
              Mode Hak Akses: {userRole === 'CSO' ? 'CSO Kancab' : 'Divisi Aktuaria'}
            </div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
              {userRole === 'CSO' 
                ? 'Hak Edit: MKG & Skorsing Aktif.' 
                : 'Hak Akses Peninjauan MKG/Skorsing (Read-Only).'}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main style={styles.mainContent}>
          
          {/* ========================================================== */}
          {/* SHARED PAGE: DATA PESERTA                                  */}
          {/* ========================================================== */}
          {activePage === 'dataPeserta' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Data Peserta</div>
                  <h1 style={styles.pageTitle}>Data Peserta</h1>
                </div>
                <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
              </div>

              {/* TOOLBAR & EXTRACTION BUTTONS */}
              <div style={styles.toolbar}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input 
                    type="text" 
                    style={styles.filterInput}
                    value={searchVal} 
                    onChange={(e) => setSearchVal(e.target.value)} 
                    placeholder="Cari No. SP / KTPA / Nama / NRP..." 
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

                {userRole === 'AKTUARIA' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={styles.btnPdfRed} onClick={handleExportDataPesertaPdf}>
                      📄 Unduh Data (PDF)
                    </button>
                    <button style={styles.btnExcelGreen} onClick={handleExportDataPesertaExcel}>
                      📊 Unduh Data (Excel)
                    </button>
                  </div>
                )}
              </div>

              {/* DATA TABLE WITH MKG AWAL (TAHUN & BULAN) */}
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>NO. SP</th>
                      <th style={styles.th}>TGL PENGAJUAN</th>
                      <th style={styles.th}>PESERTA / NRP (KLIK DETAIL)</th>
                      <th style={styles.th}>JENIS KLAIM</th>
                      <th style={styles.th}>SKORSING BERLAKU</th>
                      <th style={styles.th}>MKG AWAL</th>
                      <th style={styles.th}>MANFAAT TA</th>
                      <th style={styles.th}>NTTA</th>
                      <th style={styles.th}>NTIP</th>
                      <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClaims.map(item => {
                      const calc = calculateBenefits(item.gajiPokok, item.masaKerjaBulan, item.skorsingBulan, item.mkgAwalTahun, item.mkgAwalBulan);
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
                          <td style={styles.td}><strong>{formatMkgDisplay(item.mkgAwalTahun, item.mkgAwalBulan)}</strong></td>
                          <td style={styles.td}><strong>{formatRupiah(calc.ta)}</strong></td>
                          <td style={styles.td}>{formatRupiah(calc.ntta)}</td>
                          <td style={styles.td}>{formatRupiah(calc.ntip)}</td>
                          <td style={{ ...styles.td, textAlign: 'center' }}>
                            <button 
                              style={styles.actionBtnIcon}
                              title={userRole === 'CSO' ? "Detail & Koreksi Perhitungan Manfaat" : "Detail Profil & Perhitungan Manfaat"}
                              onClick={() => { setSelectedClaimId(item.id); setModalTab('profil'); }}
                            >
                              {userRole === 'CSO' ? '✏️' : '👁️'}
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
          {/* PAGE 2: REPORT HUTANG KLAIM (B-2)          */}
          {/* ========================================== */}
          {activePage === 'reportHutang' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Report Pelayanan &rsaquo; Report Hutang Klaim (Format B-2)</div>
                  <h1 style={styles.pageTitle}>Report Hutang Klaim</h1>
                </div>
                <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
              </div>

              <div style={styles.modernCardContainer}>
                <div style={styles.modernFilterCard}>
                  <div 
                    style={styles.modernFilterHeader}
                    onClick={() => setFilterHutangOpen(!filterHutangOpen)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '700', fontSize: '14px', letterSpacing: '0.3px' }}>
                        🔍 Filter Data
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={styles.modernFilterTag}>
                        {hutangPeriode === 'Tahunan' ? `Tahunan • ${hutangTahun}` : `Triwulan ${hutangPeriode === '2' ? 'II' : hutangPeriode === '1' ? 'I' : hutangPeriode === '3' ? 'III' : 'IV'} • ${hutangTahun}`}
                      </span>
                      <span style={{ fontSize: '12px' }}>{filterHutangOpen ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {filterHutangOpen && (
                    <div style={styles.modernFilterBody}>
                      <div style={styles.modernControlsGrid}>
                        <div style={styles.modernFieldGroup}>
                          <label style={styles.modernLabel}>
                            <span>📅 Pilih Periode</span>
                          </label>
                          <select 
                            style={styles.modernSelect}
                            value={hutangPeriode}
                            onChange={(e) => setHutangPeriode(e.target.value)}
                          >
                            <option value="1">Triwulan 1 (I)</option>
                            <option value="2">Triwulan 2 (II)</option>
                            <option value="3">Triwulan 3 (III)</option>
                            <option value="4">Triwulan 4 (IV)</option>
                            <option value="Tahunan">Tahunan (1 Tahun Penuh)</option>
                          </select>
                        </div>

                        <div style={styles.modernFieldGroup}>
                          <label style={styles.modernLabel}>
                            <span>📊 Tipe Laporan</span>
                          </label>
                          <select 
                            style={styles.modernSelect}
                            value={hutangType}
                            onChange={(e) => setHutangType(e.target.value)}
                          >
                            <option value="Rekap">Rekapitulasi</option>
                            <option value="Detail">Rincian Detail</option>
                          </select>
                        </div>

                        <div style={styles.modernFieldGroup}>
                          <label style={styles.modernLabel}>
                            <span>📋 Kategori Utang</span>
                          </label>
                          <select 
                            style={styles.modernSelect}
                            value={hutangKategori}
                            onChange={(e) => setHutangKategori(e.target.value)}
                          >
                            <option value="Utang Klaim Tahun Lalu">Utang Klaim Tahun Lalu</option>
                            <option value="Utang Klaim Tahun Berjalan">Utang Klaim Tahun Berjalan</option>
                            <option value="Semua Utang Klaim">Semua Utang Klaim</option>
                          </select>
                        </div>

                        <div style={styles.modernFieldGroup}>
                          <label style={styles.modernLabel}>
                            <span>🗓️ Tahun Periode</span>
                          </label>
                          <input 
                            type="number" 
                            style={styles.modernInput}
                            value={hutangTahun} 
                            onChange={(e) => setHutangTahun(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div style={{ ...styles.modernActionBar, justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <button 
                            type="button"
                            style={styles.btnIconResetModern}
                            title="Reset Filter"
                            onClick={() => { setHutangPeriode('2'); setHutangTahun('2026'); setHutangType('Rekap'); setHutangKategori('Utang Klaim Tahun Lalu'); addToast('🔄 Filter berhasil di-reset!'); }}
                          >
                            🔄
                          </button>

                          <button 
                            type="button"
                            style={styles.btnPrimaryModern}
                            onClick={handleOpenHutangPreview}
                          >
                            🔍 Preview & Cetak Laporan
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 3: REPORT PENYELESAIAN KLAIM (E-1)    */}
          {/* ========================================== */}
          {activePage === 'reportPenyelesaian' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Pelayanan &rsaquo; Report Pelayanan &rsaquo; Report Penyelesaian Klaim (Format E-1)</div>
                  <h1 style={styles.pageTitle}>Report Penyelesaian Klaim</h1>
                </div>
                <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
              </div>

              <div style={styles.modernCardContainer}>
                <div style={styles.modernFilterCard}>
                  <div 
                    style={styles.modernFilterHeader}
                    onClick={() => setFilterPenyelesaianOpen(!filterPenyelesaianOpen)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '700', fontSize: '14px', letterSpacing: '0.3px' }}>
                        🔍 Filter Data
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={styles.modernFilterTag}>
                        {penyelesaianPeriode === 'Tahunan' ? `Tahunan • ${penyelesaianTahun}` : `Triwulan ${penyelesaianPeriode === '1' ? 'I' : penyelesaianPeriode === '2' ? 'II' : penyelesaianPeriode === '3' ? 'III' : 'IV'} • ${penyelesaianTahun}`}
                      </span>
                      <span style={{ fontSize: '12px' }}>{filterPenyelesaianOpen ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {filterPenyelesaianOpen && (
                    <div style={styles.modernFilterBody}>
                      <div style={styles.modernControlsGrid}>
                        <div style={styles.modernFieldGroup}>
                          <label style={styles.modernLabel}>
                            <span>📅 Pilih Periode</span>
                          </label>
                          <select 
                            style={styles.modernSelect}
                            value={penyelesaianPeriode}
                            onChange={(e) => setPenyelesaianPeriode(e.target.value)}
                          >
                            <option value="1">Triwulan 1 (I)</option>
                            <option value="2">Triwulan 2 (II)</option>
                            <option value="3">Triwulan 3 (III)</option>
                            <option value="4">Triwulan 4 (IV)</option>
                            <option value="Tahunan">Tahunan (1 Tahun Penuh)</option>
                          </select>
                        </div>

                        <div style={styles.modernFieldGroup}>
                          <label style={styles.modernLabel}>
                            <span>📊 Tipe Laporan</span>
                          </label>
                          <select 
                            style={styles.modernSelect}
                            value={penyelesaianType}
                            onChange={(e) => setPenyelesaianType(e.target.value)}
                          >
                            <option value="Rekap">Rekapitulasi</option>
                            <option value="Detail">Rincian Detail</option>
                          </select>
                        </div>

                        <div style={{ ...styles.modernFieldGroup, gridColumn: 'span 2' }}>
                          <label style={styles.modernLabel}>
                            <span>📋 Status Jenis Klaim</span>
                          </label>
                          <select 
                            style={styles.modernSelect}
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

                        <div style={styles.modernFieldGroup}>
                          <label style={styles.modernLabel}>
                            <span>🗓️ Tahun Periode</span>
                          </label>
                          <input 
                            type="number" 
                            style={styles.modernInput}
                            value={penyelesaianTahun} 
                            onChange={(e) => setPenyelesaianTahun(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div style={{ ...styles.modernActionBar, justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <button 
                            type="button"
                            style={styles.btnIconResetModern}
                            title="Reset Filter"
                            onClick={() => { setPenyelesaianPeriode('1'); setPenyelesaianTahun('2026'); setPenyelesaianType('Rekap'); setPenyelesaianJenis('KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU'); addToast('🔄 Filter berhasil di-reset!'); }}
                          >
                            🔄
                          </button>

                          <button 
                            type="button"
                            style={styles.btnPrimaryModern}
                            onClick={handleOpenPenyelesaianPreview}
                          >
                            🔍 Preview & Cetak Laporan
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE NEW: REPORT KU                                       */}
          {/* ========================================================= */}
          {activePage === 'reportKU' && userRole === 'AKTUARIA' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Aktuaria &rsaquo; Report KU</div>
                  <h1 style={styles.pageTitle}>Report KU</h1>
                </div>
                <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
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
          )}

          {/* ========================================================= */}
          {/* PAGE 4: PERUBAHAN PARAMETER PERHITUNGAN MANFAAT           */}
          {/* ========================================================= */}
          {activePage === 'parameterAktuaria' && userRole === 'AKTUARIA' && (
            <div>
              <div style={styles.pageTopBar}>
                <div>
                  <div style={styles.breadcrumb}>Beranda &rsaquo; Aktuaria &rsaquo; Perubahan Parameter Perhitungan Manfaat (UC-AKT-005)</div>
                  <h1 style={styles.pageTitle}>Perubahan Parameter Perhitungan Manfaat</h1>
                </div>
                <div style={styles.dateBox}>Kamis, 06 Agustus 2026</div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: '800', color: '#0f172a' }}>
                      📋 Daftar Parameter Utama Perhitungan Manfaat
                    </h3>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                      Kelola rate persenan, histori tanggal berlaku, dan jejak audit perubahan parameter.
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    Hak Akses: <strong>Divisi Aktuaria</strong>
                  </div>
                </div>

                <div style={styles.tableWrap}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.thRow}>
                        <th style={styles.th}>NO</th>
                        <th style={styles.th}>NAMA PARAMETER</th>
                        <th style={styles.th}>KATEGORI PROGRAM</th>
                        <th style={styles.th}>PERSENAN SAAT INI (AKTIF)</th>
                        <th style={styles.th}>PERIODE BERLAKU</th>
                        <th style={styles.th}>TERAKHIR DIUBAH OLEH</th>
                        <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actuaryParams.map((param, idx) => {
                        const activeRate = param.history.find(h => h.status === 'AKTIF') || param.history[0];
                        return (
                          <tr key={param.id} style={styles.tr}>
                            <td style={styles.td}><strong>{idx + 1}</strong></td>
                            <td style={styles.td}>
                              <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{param.nama}</div>
                            </td>
                            <td style={styles.td}><span style={styles.badge}>{param.kategori}</span></td>
                            <td style={styles.td}>
                              <span style={{ fontSize: 14, fontWeight: '800', color: '#0f172a', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px' }}>
                                {activeRate ? `${activeRate.persen} %` : '-'}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ fontSize: 12, fontWeight: '600', color: '#1e293b' }}>
                                📅 {activeRate ? `${activeRate.tglMulai} s.d. ${activeRate.tglSelesai}` : '-'}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ fontSize: 11, color: '#475569' }}>{activeRate ? activeRate.diubahOleh : '-'}</span>
                            </td>
                            <td style={{ ...styles.td, textAlign: 'center' }}>
                              <div style={{ display: 'inline-flex', gap: '8px' }}>
                                <button 
                                  style={styles.actionBtnParamIcon}
                                  title="Kelola Rate Persenan & Rentang Tanggal"
                                  onClick={() => {
                                    setSelectedParamId(param.id);
                                    setShowAddRateModal(false);
                                  }}
                                >
                                  ⚙️
                                </button>
                                <button 
                                  style={styles.actionBtnHistoryIcon}
                                  title="Lihat Histori Perubahan & Aktor Log"
                                  onClick={() => {
                                    setSelectedParamLogId(param.id);
                                  }}
                                >
                                  📜
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL KELOLA RATE PARAMETER AKTUARIA (⚙️)                 */}
      {/* ========================================================= */}
      {selectedParam && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '940px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>UC-AKT-005: PENGELOLAAN RATE PARAMETER AKTUARIA</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>⚙️ Kelola Rate & Rentang Tanggal — {selectedParam.nama}</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setSelectedParamId(null)}>✕</button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a8a' }}>KATEGORI PROGRAM MANFAAT</div>
                  <div style={{ fontSize: 16, fontWeight: 'bold', color: '#2563eb' }}>{selectedParam.kategori}</div>
                </div>
                <button 
                  style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}
                  onClick={() => setShowAddRateModal(true)}
                >
                  ➕ Tambah Rate Persenan Baru
                </button>
              </div>

              <h4 style={{ fontSize: 14, fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                📋 Riwayat Rate & Periode Keberlakuan Tanggal
              </h4>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>STATUS</th>
                      <th style={styles.th}>RATE PERSEN (%)</th>
                      <th style={styles.th}>PERIODE MULAI S.D. SELESAI</th>
                      <th style={styles.th}>DIUBAH OLEH</th>
                      <th style={styles.th}>LANDASAN SK / CATATAN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedParam.history.map(item => (
                      <tr key={item.id} style={styles.tr}>
                        <td style={styles.td}>
                          <span style={{ 
                            background: item.status === 'AKTIF' ? '#dcfce7' : '#f1f5f9', 
                            color: item.status === 'AKTIF' ? '#15803d' : '#64748b', 
                            padding: '3px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' 
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', background: '#f8fafc', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px' }}>
                            {item.persen} %
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontWeight: '700', color: '#1e293b' }}>
                            📅 {item.tglMulai} s.d. {item.tglSelesai}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontSize: '12px', color: '#475569' }}>{item.diubahOleh}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>{item.landasan}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setSelectedParamId(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-MODAL TAMBAH RATE PARAMETER BARU                     */}
      {/* ========================================================= */}
      {showAddRateModal && selectedParam && (
        <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
          <div style={{ ...styles.subModalContainer, maxWidth: '580px' }}>
            <div style={styles.subModalHeader}>
              <h3 style={{ fontSize: 14, color: '#fff', margin: 0 }}>
                ➕ Tambah Rate Persenan Baru — {selectedParam.nama}
              </h3>
              <button style={styles.closeBtn} onClick={() => setShowAddRateModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddNewRateSubmit}>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                    Nilai Persenan Rate Baru (%):
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                    <input 
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      style={{ width: '100%', height: '42px', padding: '0 40px 0 14px', border: '2px solid #60a5fa', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: '#f0f9ff', color: '#0f172a', boxSizing: 'border-box' }}
                      placeholder="Contoh: 0.30"
                      value={newRatePersen}
                      onChange={(e) => setNewRatePersen(e.target.value)}
                      required
                      autoFocus
                    />
                    <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '14px', pointerEvents: 'none' }}>%</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Tanggal Mulai Berlaku:
                    </label>
                    <input 
                      type="date"
                      style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                      value={newRateTglMulai}
                      onChange={(e) => setNewRateTglMulai(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Tanggal Selesai Berlaku:
                    </label>
                    <input 
                      type="date"
                      style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                      value={newRateTglSelesai}
                      onChange={(e) => setNewRateTglSelesai(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                    Landasan SK Direksi / Catatan Audit Log:
                  </label>
                  <input 
                    type="text"
                    style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                    placeholder="Contoh: SK Direksi No. 55/2026 tentang Evaluasi Rate Suku Bunga"
                    value={newRateLandasan}
                    onChange={(e) => setNewRateLandasan(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button type="button" style={styles.secBtn} onClick={() => setShowAddRateModal(false)}>Batal</button>
                <button type="submit" style={styles.priBtn}>💾 Simpan & Aktifkan Rate</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL AUDIT LOG & HISTORY PERUBAHAN PARAMETER (📜)        */}
      {/* ========================================================= */}
      {selectedParamLog && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '1040px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>UC-AKT-005: AUDIT LOG PERUBAHAN PARAMETER AKTUARIA</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>📜 Histori Perubahan & Aktor Log — {selectedParamLog.nama}</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setSelectedParamLogId(null)}>✕</button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: 12, color: '#475569' }}>
                  Menampilkan jejak audit rekaman perubahan nilai rate, waktu eksekusi, serta identitas aktor pengubah untuk parameter <strong>{selectedParamLog.nama}</strong>.
                </div>
              </div>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>WAKTU (TIMESTAMP)</th>
                      <th style={styles.th}>AKTOR / PENGUBAH</th>
                      <th style={styles.th}>NILAI LAMA</th>
                      <th style={styles.th}>NILAI BARU</th>
                      <th style={styles.th}>RENTANG TANGGAL BERLAKU</th>
                      <th style={styles.th}>LANDASAN SK / DOKUMEN</th>
                      <th style={styles.th}>TIPE AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paramChangeLogs.filter(log => log.paramId === selectedParamLog.id).length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                          Belum ada log catatan perubahan untuk parameter ini.
                        </td>
                      </tr>
                    ) : (
                      paramChangeLogs.filter(log => log.paramId === selectedParamLog.id).map(log => (
                        <tr key={log.id} style={styles.tr}>
                          <td style={styles.td}>
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#334155' }}>
                              ⏱️ {log.timestamp}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1d4ed8' }}>
                              {log.aktor}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '12px' }}>
                              {log.nilaiLama}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={{ color: '#16a34a', fontWeight: '800', fontSize: '13px' }}>
                              {log.nilaiBaru}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={{ fontSize: '11px', color: '#1e293b', fontWeight: '600' }}>
                              📅 {log.tglMulai} s.d. {log.tglSelesai}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>
                              {log.landasan}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>
                              {log.tipeAksi}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setSelectedParamLogId(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL PREVIEW REPORT PENYELESAIAN KLAIM (E-1 EXACT EXCEL) */}
      {/* ========================================================= */}
      {showReportPreviewModal && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '1360px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW CETAK REPORT PELAYANAN — E-1. LAPORAN PENYELESAIAN KLAIM</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>
                  E-1. LAPORAN PENYELESAIAN KLAIM — {penyelesaianPeriode === 'Tahunan' ? `PERIODE TAHUNAN ${penyelesaianTahun}` : `PERIODE TRIWULAN : ${penyelesaianPeriode === '1' ? 'I' : penyelesaianPeriode === '2' ? 'II' : penyelesaianPeriode === '3' ? 'III' : 'IV'} TAHUN ${penyelesaianTahun}`}
                </h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowReportPreviewModal(false)}>✕</button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
              
              {/* ASABRI OFFICIAL E-1 HEADER BLOCK MATCHING EXCEL SCREENSHOT */}
              <div style={{ textAlign: 'center', marginBottom: 20, fontFamily: 'Arial, sans-serif', color: '#0f172a', lineHeight: '1.4' }}>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>PENGELOLA PROGRAM</div>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>LAPORAN PENYELENGGARAAN PROGRAM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  PROGRAM JAMINAN KECELAKAAN KERJA DAN JAMINAN KEMATIAN PRAJURIT TENTARA NASIONAL INDONESIA,
                </div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  ANGGOTA KEPOLISIAN NEGARA REPUBLIK INDONESIA, DAN PEGAWAI APARATUR SIPIL NEGARA DI LINGKUNGAN
                </div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  KEMENTERIAN PERTAHANAN DAN KEPOLISIAN NEGARA REPUBLIK INDONESIA
                </div>
                <div style={{ fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>E-1. LAPORAN PENYELESAIAN KLAIM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold', marginTop: 2 }}>
                  {penyelesaianPeriode === 'Tahunan' ? `PERIODE TAHUNAN ${penyelesaianTahun}` : `PERIODE TRIWULAN : ${penyelesaianPeriode === '1' ? 'I' : penyelesaianPeriode === '2' ? 'II' : penyelesaianPeriode === '3' ? 'III' : 'IV'} TAHUN ${penyelesaianTahun}`}
                </div>
              </div>

              {/* ASABRI OFFICIAL E-1 TABLE MATCHING EXCEL SCREENSHOT */}
              <div style={{ overflowX: 'auto', border: '1px solid #000000' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#ffffff' }}>
                      <th rowSpan={2} style={styles.thExcelExact}>PP</th>
                      <th rowSpan={2} style={styles.thExcelExact}>PROG</th>
                      <th rowSpan={2} style={styles.thExcelExact}>PROGRAM MANFAAT</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM YANG DIAJUKAN TRIWULAN/TAHUN BERJALAN</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM YANG HARUS DISELESAIKAN TRIWULAN/TAHUN BERJALAN KLAIM YANG HARUS DIPROSES</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN DAN TELAH DI BAYAR</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TAPI BELUM DI BAYAR</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM DI TOLAK</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN BERJALAN</th>
                    </tr>
                    <tr style={{ backgroundColor: '#ffffff' }}>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                    </tr>
                    {/* COLUMN NUMBERS ROW */}
                    <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '9px' }}>
                      <th style={styles.thExcelExact}></th>
                      <th style={styles.thExcelExact}>1</th>
                      <th style={styles.thExcelExact}>2</th>
                      <th style={styles.thExcelExact}>3</th>
                      <th style={styles.thExcelExact}>4</th>
                      <th style={styles.thExcelExact}>5</th>
                      <th style={styles.thExcelExact}>6</th>
                      <th style={styles.thExcelExact}>7=3+5</th>
                      <th style={styles.thExcelExact}>8=4+6</th>
                      <th style={styles.thExcelExact}>9</th>
                      <th style={styles.thExcelExact}>10</th>
                      <th style={styles.thExcelExact}>11</th>
                      <th style={styles.thExcelExact}>12</th>
                      <th style={styles.thExcelExact}>13</th>
                      <th style={styles.thExcelExact}>14</th>
                      <th style={styles.thExcelExact}>15=7-9-11-13</th>
                      <th style={styles.thExcelExact}>16=8-10-12-14</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SA</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>1</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>71,871,800</td>
                      <td style={styles.tdExcelExact}>1</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>71,871,800</td>
                      <td style={styles.tdExcelExact}>1</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>71,871,800</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI TANPA HAK PENSIUN</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>12</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>90,592,400</td>
                      <td style={styles.tdExcelExact}>12</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>90,592,400</td>
                      <td style={styles.tdExcelExact}>12</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>90,592,400</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI DGN HAK TUNJANGAN</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SRK/SNTA</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBP</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>3</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>8,000,000</td>
                      <td style={styles.tdExcelExact}>3</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>8,000,000</td>
                      <td style={styles.tdExcelExact}>3</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>8,000,000</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S PESERTA AKTIF</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>2</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>6,000,000</td>
                      <td style={styles.tdExcelExact}>2</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>6,000,000</td>
                      <td style={styles.tdExcelExact}>2</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>6,000,000</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S PESERTA PENSIUN</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>5</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>12,000,000</td>
                      <td style={styles.tdExcelExact}>5</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>12,000,000</td>
                      <td style={styles.tdExcelExact}>5</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>12,000,000</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setShowReportPreviewModal(false)}>Tutup</button>
              <button style={styles.btnPdfRed} onClick={handleDownloadPdf}>📄 Unduh PDF (.pdf)</button>
              <button style={styles.btnExcelGreen} onClick={handleDownloadExcel}>📊 Unduh Excel (.xlsx)</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL PREVIEW REPORT UTANG KLAIM (B-2 EXACT EXCEL)         */}
      {/* ========================================================= */}
      {showHutangPreviewModal && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '1360px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW CETAK REPORT PELAYANAN — B-2. LAPORAN UTANG KLAIM</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>
                  B-2. LAPORAN UTANG KLAIM — {hutangPeriode === 'Tahunan' ? `PERIODE TAHUNAN ${hutangTahun}` : `PERIODE TRIWULAN : ${hutangPeriode === '2' ? 'II' : hutangPeriode === '1' ? 'I' : hutangPeriode === '3' ? 'III' : 'IV'} TAHUN ${hutangTahun}`}
                </h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowHutangPreviewModal(false)}>✕</button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
              
              {/* ASABRI OFFICIAL B-2 HEADER BLOCK MATCHING EXCEL SCREENSHOT */}
              <div style={{ textAlign: 'center', marginBottom: 20, fontFamily: 'Arial, sans-serif', color: '#0f172a', lineHeight: '1.4' }}>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>PENGELOLA PROGRAM</div>
                <div style={{ fontSize: 13, fontWeight: 'bold' }}>LAPORAN PENYELENGGARAAN PROGRAM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  PROGRAM TABUNGAN HARI TUA PRAJURIT TENTARA NASIONAL INDONESIA,
                </div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  ANGGOTA KEPOLISIAN NEGARA REPUBLIK INDONESIA, DAN PEGAWAI APARATUR SIPIL NEGARA DI LINGKUNGAN
                </div>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  KEMENTERIAN PERTAHANAN DAN KEPOLISIAN NEGARA REPUBLIK INDONESIA
                </div>
                <div style={{ fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>B-2. LAPORAN UTANG KLAIM</div>
                <div style={{ fontSize: 12, fontWeight: 'bold', marginTop: 2 }}>
                  {hutangPeriode === 'Tahunan' ? `PERIODE TAHUNAN ${hutangTahun}` : `PERIODE TRIWULAN : ${hutangPeriode === '2' ? 'II' : hutangPeriode === '1' ? 'I' : hutangPeriode === '3' ? 'III' : 'IV'} TAHUN ${hutangTahun}`}
                </div>
              </div>

              {/* ASABRI OFFICIAL B-2 TABLE MATCHING EXCEL SCREENSHOT */}
              <div style={{ overflowX: 'auto', border: '1px solid #000000' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#ffffff' }}>
                      <th rowSpan={2} style={styles.thExcelExact}>PP</th>
                      <th rowSpan={2} style={styles.thExcelExact}>PROG</th>
                      <th rowSpan={2} style={styles.thExcelExact}>PROGRAM/ MANFAAT</th>
                      <th colSpan={2} style={styles.thExcelExact}>UTANG KLAIM AKHIR TRIWULAN/TAHUN LALU</th>
                      <th colSpan={2} style={styles.thExcelExact}>KLAIM YANG DISETUJUI TRIWULAN/TAHUN BERJALAN TETAPI BELUM DIBAYAR</th>
                      <th colSpan={2} style={styles.thExcelExact}>UTANG KLAIM AKHIR TRIWULAN/TAHUN LALU YANG SUDAH DIBAYAR</th>
                      <th colSpan={2} style={styles.thExcelExact}>UTANG KLAIM AKHIR TRIWULAN/TAHUN BERJALAN</th>
                    </tr>
                    <tr style={{ backgroundColor: '#ffffff' }}>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                      <th style={styles.thExcelExact}>JML PESERTA</th>
                      <th style={styles.thExcelExact}>RP JUTA</th>
                    </tr>
                    {/* COLUMN NUMBERS ROW */}
                    <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '10px' }}>
                      <th style={styles.thExcelExact}></th>
                      <th style={styles.thExcelExact}>1</th>
                      <th style={styles.thExcelExact}>2</th>
                      <th style={styles.thExcelExact}>3</th>
                      <th style={styles.thExcelExact}>4</th>
                      <th style={styles.thExcelExact}>5</th>
                      <th style={styles.thExcelExact}>6</th>
                      <th style={styles.thExcelExact}>7</th>
                      <th style={styles.thExcelExact}>8</th>
                      <th style={styles.thExcelExact}>9</th>
                      <th style={styles.thExcelExact}>10</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SA</td>
                      <td style={styles.tdExcelExact}>1</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>1734900</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>1</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>1734900</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI TANPA HAK PENSIUN</td>
                      <td style={styles.tdExcelExact}>12</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>90592400</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>12</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>90592400</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SNTA BERHENTI DGN HAK TUNJANGAN</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SRK/SNTA</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBP</td>
                      <td style={styles.tdExcelExact}>3</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>8000000</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>3</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>8000000</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S PESERTA AKTIF</td>
                      <td style={styles.tdExcelExact}>2</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>6000000</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>2</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>6000000</td>
                    </tr>
                    <tr>
                      <td style={styles.tdExcelExact}>PP67</td>
                      <td style={styles.tdExcelExact}>THT</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'left', fontWeight: 'bold' }}>SBPI/S PESERTA PENSIUN</td>
                      <td style={styles.tdExcelExact}>5</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>12000000</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>0</td>
                      <td style={styles.tdExcelExact}>5</td>
                      <td style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>12000000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setShowHutangPreviewModal(false)}>Tutup</button>
              <button style={styles.btnPdfRed} onClick={handleDownloadHutangPdf}>📄 Unduh PDF (.pdf)</button>
              <button style={styles.btnExcelGreen} onClick={handleDownloadHutangExcel}>📊 Unduh Excel (.xlsx)</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL PREVIEW REPORT KU (EXACT SHEET 'Ouput yang diharapkan') */}
      {/* ========================================================= */}
      {showKuPreviewModal && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '1380px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW CETAK REPORT KU — SHEET 'OUTPUT YANG DIHARAPKAN'</div>
                <h2 style={{ fontSize: 16, marginTop: 2 }}>{kuCetak || 'DAFTAR REKAPITULASI III NON DAPEM'} — {kuCabang || '2000 - KANCAB UTAMA JAKARTA'}</h2>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowKuPreviewModal(false)}>✕</button>
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
                      <th rowSpan={4} style={{ display: 'none' }}></th>
                      <th style={styles.thExcelExact}>JUMLAH JIWA</th>
                      <th style={styles.thExcelExact}>JUMLAH BRUTO</th>
                      <th colSpan={6} style={styles.thExcelExact}>POTONGAN</th>
                      <th rowSpan={7} style={styles.thExcelExact}>JUMLAH NETTO</th>
                    </tr>
                    <tr style={{ backgroundColor: '#ffffff' }}>
                      <th style={styles.thExcelExact}>A. PENERIMA</th>
                      <th style={styles.thExcelExact}>A. PENSIUN POKOK</th>
                      <th colSpan={6} style={{ display: 'none' }}></th>
                    </tr>
                    <tr style={{ backgroundColor: '#ffffff' }}>
                      <th style={styles.thExcelExact}>B. ISTRI/ SUAMI</th>
                      <th style={styles.thExcelExact}>B. TUNJANGAN KELUARGA</th>
                      <th colSpan={6} style={{ display: 'none' }}></th>
                    </tr>
                    <tr style={{ backgroundColor: '#ffffff' }}>
                      <th rowSpan={4} style={styles.thExcelExact}>JENIS PENSIUN</th>
                      <th style={styles.thExcelExact}>C. ANAK</th>
                      <th style={styles.thExcelExact}>C. TUNJANGAN BERAS</th>
                      <th rowSpan={4} style={styles.thExcelExact}>PPH21</th>
                      <th rowSpan={4} style={styles.thExcelExact}>ASKES</th>
                      <th colSpan={2} rowSpan={3} style={styles.thExcelExact}>HUTANG NEGARA</th>
                      <th rowSpan={4} style={styles.thExcelExact}>LAIN-LAIN</th>
                      <th rowSpan={4} style={styles.thExcelExact}>JUMLAH</th>
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
                      d1="1.585" d2="9.431.850.610" d3="462.163.239" d4="59.671.967" d5="0" d6="30.548.074" d7="0" d8="552.383.280" d9="9.965.400.800"
                    />

                    {/* KELOMPOK 2: PENS PNS POLRI ( 513114 ) */}
                    <Rekapitulasi3ExpectedGroupBlock 
                      no="2" 
                      kelompokName="PENS PNS POLRI ( 513114 )"
                      d1="373" d2="2.237.478.820" d3="107.208.141" d4="15.440.836" d5="0" d6="8.842.800" d7="0" d8="131.491.777" d9="2.360.504.600"
                    />

                    {/* KELOMPOK 3: PENS TNI ( 513122 ) */}
                    <Rekapitulasi3ExpectedGroupBlock 
                      no="3" 
                      kelompokName="PENS TNI ( 513122 )"
                      d1="5.137" d2="30.688.212.440" d3="1.821.105.493" d4="182.473.689" d5="0" d6="280.281.317" d7="0" d8="2.283.860.499" d9="32.709.502.800"
                    />

                    {/* KELOMPOK 4: PENS POLRI ( 513123 ) */}
                    <Rekapitulasi3ExpectedGroupBlock 
                      no="4" 
                      kelompokName="PENS POLRI ( 513123 )"
                      d1="3.297" d2="19.778.311.090" d3="1.039.959.488" d4="98.231.287" d5="0" d6="141.036.219" d7="0" d8="1.279.226.994" d9="20.704.549.800"
                    />

                    {/* GRAND TOTAL BLOCK */}
                    <Rekapitulasi3ExpectedGroupBlock 
                      no="TOTAL" 
                      kelompokName="GRAND TOTAL REKAPITULASI III"
                      d1="10.392" d2="62.135.852.960" d3="3.430.436.361" d4="355.817.779" d5="0" d6="460.708.410" d7="0" d8="4.246.962.550" d9="65.739.958.000"
                      isGrandTotal
                    />
                  </tbody>
                </table>
              </div>

            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setShowKuPreviewModal(false)}>Tutup</button>
              <button style={styles.btnPdfRed} onClick={handleDownloadKuPdf}>📄 Unduh PDF (.pdf)</button>
              <button style={styles.btnExcelGreen} onClick={handleDownloadKuExcel}>📊 Unduh Excel (.xlsx)</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL E-DOSIR PREVIEW SUB-MODAL                            */}
      {/* ========================================================= */}
      {selectedDocPreview && (
        <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
          <div style={{ ...styles.modalContainer, maxWidth: '680px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>PREVIEW BERKAS DIGITAL E-DOSIR (RPT-02)</div>
                <h3 style={{ fontSize: 15, color: '#fff', marginTop: 2 }}>{selectedDocPreview.jenisDoc}</h3>
              </div>
              <button style={styles.closeBtn} onClick={() => setSelectedDocPreview(null)}>✕</button>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#ffffff' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#0f172a' }}>Nama Peserta: <strong>{selectedDocPreview.nama}</strong></div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Nomor KTPA: <strong>{selectedDocPreview.ktpa}</strong></div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setSelectedDocPreview(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL FORM 4-TAB DETAIL PESERTA                           */}
      {/* ========================================================= */}
      {selectedClaim && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '960px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>
                  {userRole === 'CSO' ? 'KOREKSI DATA PERHITUNGAN MANFAAT PESERTA' : 'DETAIL PROFIL PESERTA & DOKUMEN DIGITAL (READ-ONLY)'}
                </div>
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
                🎖️ Masa Kerja & Perhitungan
              </button>
              <button 
                style={modalTab === 'edosir' ? styles.modalTabBtnActive : styles.modalTabBtn}
                onClick={() => setModalTab('edosir')}
              >
                📁 Dokumen E-Dosir (RPT-02)
              </button>
              <button 
                style={modalTab === 'sptb' ? styles.modalTabBtnActive : styles.modalTabBtn}
                onClick={() => setModalTab('sptb')}
              >
                📋 Informasi SPTB (RPT-03)
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* TAB 1: PROFIL PESERTA */}
              {modalTab === 'profil' && (
                <div>
                  <div style={styles.bannerTitle}>Form Profil Pribadi Peserta</div>
                  <div style={styles.stripeGrid}>
                    <StripeRow label="KTPA" value={selectedClaim.ktpa} />
                    <StripeRow label="Nama Peserta" value={selectedClaim.nama} alt onEdit={userRole === 'CSO' ? () => handleOpenEditField('nama', 'Nama Peserta') : null} />
                    <StripeRow label="NRP/NIP" value={selectedClaim.nrp} onEdit={userRole === 'CSO' ? () => handleOpenEditField('nrp', 'NRP/NIP') : null} />
                    <StripeRow label="Identitas Diri (NIK)" value={selectedClaim.nik} alt onEdit={userRole === 'CSO' ? () => handleOpenEditField('nik', 'NIK') : null} />
                    <StripeRow label="NPWP" value={selectedClaim.npwp} onEdit={userRole === 'CSO' ? () => handleOpenEditField('npwp', 'NPWP') : null} />
                    <StripeRow label="Tanggal Awal Daftar" value={selectedClaim.tglAwalDaftar} alt />
                    <StripeRow label="Tempat, Tanggal Lahir" value={selectedClaim.ttl} />
                    <StripeRow label="Alamat" value={selectedClaim.alamat} alt onEdit={userRole === 'CSO' ? () => handleOpenEditField('alamat', 'Alamat Peserta') : null} />
                    <StripeRow label="RT/RW" value={selectedClaim.rtRw} />
                    <StripeRow label="Desa/Kelurahan" value={selectedClaim.desa} alt />
                    <StripeRow label="Kecamatan" value={selectedClaim.kecamatan} />
                    <StripeRow label="Kota" value={selectedClaim.kota} alt />
                    <StripeRow label="Provinsi" value={selectedClaim.provinsi} />
                    <StripeRow label="Kode Pos" value={selectedClaim.kodePos} alt onEdit={userRole === 'CSO' ? () => handleOpenEditField('kodePos', 'Kode Pos') : null} />
                    <StripeRow label="Status KTPA" value={selectedClaim.statusKtpa} valueStyle={{ color: '#16a34a', fontWeight: 'bold' }} />
                    <StripeRow label="Status Pensiun" value={selectedClaim.statusPensiun} alt />
                  </div>
                </div>
              )}

              {/* TAB 2: MASA KERJA & PERHITUNGAN WITH MKG AWAL TAHUN & BULAN */}
              {modalTab === 'masakerja' && (
                <div>
                  <div style={styles.bannerTitle}>Data Masa Kerja & Parameter Perhitungan</div>
                  <div style={styles.stripeGrid}>
                    <StripeRow label="PDW" value={selectedClaim.pdw} onEdit={userRole === 'CSO' ? () => handleOpenEditField('pdw', 'PDW') : null} />
                    <StripeRow label="Satker Awal" value={selectedClaim.satkerAwal} alt onEdit={userRole === 'CSO' ? () => handleOpenEditField('satkerAwal', 'Satker Awal') : null} />
                    <StripeRow label="Satker Akhir" value={selectedClaim.satkerAkhir} onEdit={userRole === 'CSO' ? () => handleOpenEditField('satkerAkhir', 'Satker Akhir') : null} />
                    <StripeRow label="No SKEP Pengangkatan" value={selectedClaim.noSkepPengangkatan} alt onEdit={userRole === 'CSO' ? () => handleOpenEditField('noSkepPengangkatan', 'No SKEP Pengangkatan') : null} />
                    <StripeRow label="Tanggal SKEP Pengangkatan" value={selectedClaim.tglSkepPengangkatan} onEdit={userRole === 'CSO' ? () => handleOpenEditField('tglSkepPengangkatan', 'Tanggal SKEP Pengangkatan') : null} />
                    <StripeRow label="TMT Skep Pengangkatan" value={selectedClaim.tmtSkepPengangkatan} alt />
                    <StripeRow label="TMT Pensiun" value={selectedClaim.tmtPensiun} />
                    <StripeRow label="Tgl Skep Pensiun" value={selectedClaim.tglSkepPensiun} alt onEdit={userRole === 'CSO' ? () => handleOpenEditField('tglSkepPensiun', 'Tgl Skep Pensiun') : null} />
                    <StripeRow label="No Skep Pensiun" value={selectedClaim.noSkepPensiun} onEdit={userRole === 'CSO' ? () => handleOpenEditField('noSkepPensiun', 'No Skep Pensiun') : null} />
                    <StripeRow label="TMT SKPP" value={selectedClaim.tmtSkpp} alt />
                    <StripeRow label="Nomor Pensiun" value={selectedClaim.noPensiun} />
                    <StripeRow label="Pensiun Pokok" value={formatRupiah(selectedClaim.pensiunPokok)} alt valueStyle={{ color: '#2563eb', fontWeight: 'bold' }} />
                    <StripeRow label="Tunjangan Cacat" value={formatRupiah(selectedClaim.tunjanganCacat)} />
                    <StripeRow label="Status Hidup" value={selectedClaim.statusHidup} alt />
                    <StripeRow label="Tanggal Meninggal" value={selectedClaim.tglMeninggal} />
                    <StripeRow label="Tanggal Non Aktif" value={selectedClaim.tglNonAktif} alt />

                    {/* READ-ONLY VIEWABLE FOR DIVISI AKTUARIA, EDITABLE FOR CSO KANCAB */}
                    <StripeRow 
                      label="Masa Kerja Golongan (MKG) Awal" 
                      value={formatMkgDisplay(selectedClaim.mkgAwalTahun, selectedClaim.mkgAwalBulan)} 
                      onEdit={() => handleOpenEditField('mkgAwalTahun', 'Masa Kerja Golongan (MKG) Awal')}
                      isReadOnlyMode={userRole === 'AKTUARIA'} 
                    />
                    <StripeRow 
                      label="Data Skorsing (Multientri Evaluasi Periode)" 
                      value={`${selectedClaim.skorsingBulan} Bulan Aktif (${(selectedClaim.skorsingList || []).length} Total Periode)`} 
                      alt
                      onEdit={() => handleOpenEditField('skorsingBulan', 'Data Skorsing')}
                      isReadOnlyMode={userRole === 'AKTUARIA'} 
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

              {/* TAB 3: DOKUMEN DIGITAL E-DOSIR */}
              {modalTab === 'edosir' && (
                <div>
                  <div style={styles.bannerTitle}>Dokumen Digital E-Dosir Peserta ({selectedClaim.nama})</div>
                  <div style={styles.tableWrap}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.thRow}>
                          <th style={styles.th}>KTPA</th>
                          <th style={styles.th}>JENIS DOKUMEN DIGITAL</th>
                          <th style={styles.th}>NOMOR DOKUMEN</th>
                          <th style={styles.th}>TANGGAL UPLOAD</th>
                          <th style={styles.th}>STATUS VERIFIKASI</th>
                          <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {edosirList.filter(d => d.ktpa === selectedClaim.ktpa || d.id === 1).map(doc => (
                          <tr key={doc.id} style={styles.tr}>
                            <td style={styles.td}><strong>{selectedClaim.ktpa}</strong></td>
                            <td style={styles.td}><span style={styles.badge}>{doc.jenisDoc}</span></td>
                            <td style={styles.td}>{doc.noDoc}</td>
                            <td style={styles.td}>{doc.tglUpload}</td>
                            <td style={styles.td}><span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' }}>{doc.status}</span></td>
                            <td style={{ ...styles.td, textAlign: 'center' }}>
                              <button 
                                style={styles.actionBtnIcon}
                                title="Buka Viewer Dokumen Digital E-Dosir"
                                onClick={() => {
                                  setSelectedDocPreview({ ...doc, nama: selectedClaim.nama, ktpa: selectedClaim.ktpa });
                                }}
                              >
                                📂
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: INFORMASI SPTB PESERTA */}
              {modalTab === 'sptb' && (
                <div>
                  <div style={styles.bannerTitle}>Informasi Surat Pernyataan Tanda Bukti Diri (SPTB) ({selectedClaim.nama})</div>
                  <div style={styles.tableWrap}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.thRow}>
                          <th style={styles.th}>KTPA</th>
                          <th style={styles.th}>NOMOR REGISTRASI SPTB</th>
                          <th style={styles.th}>PERIODE MASA BERLAKU</th>
                          <th style={styles.th}>NAMA PENERIMA / WARAKAWURI</th>
                          <th style={styles.th}>STATUS SPTB</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sptbList.filter(s => s.ktpa === selectedClaim.ktpa || s.id === 1).map(sptb => (
                          <tr key={sptb.id} style={styles.tr}>
                            <td style={styles.td}><strong>{selectedClaim.ktpa}</strong></td>
                            <td style={styles.td}><strong>{sptb.noSptb}</strong></td>
                            <td style={styles.td}>{sptb.tglBerlaku}</td>
                            <td style={styles.td}>{sptb.penerima}</td>
                            <td style={styles.td}><span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' }}>{sptb.statusSptb}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setSelectedClaimId(null)}>Tutup</button>
              {userRole === 'CSO' && modalTab === 'masakerja' && (
                <button style={styles.priBtn} onClick={handleSaveModal}>Hitung Ulang & Simpan Perubahan</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL FOR EDITING OR VIEWING MKG AWAL */}
      {showEditMkgModal && selectedClaim && (
        <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
          <div style={{ ...styles.subModalContainer, maxWidth: '540px' }}>
            <div style={styles.subModalHeader}>
              <h3 style={{ fontSize: 14, color: '#fff', margin: 0 }}>
                {userRole === 'CSO' ? '✏️ Edit Masa Kerja Golongan (MKG) Awal' : '👁️ Detail Masa Kerja Golongan (MKG) Awal (Read-Only)'} — {selectedClaim.nama}
              </h3>
              <button style={styles.closeBtn} onClick={() => setShowEditMkgModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveMkgSubmit}>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                <div style={{ background: userRole === 'CSO' ? '#eff6ff' : '#f8fafc', borderRadius: '8px', padding: '12px 14px', border: userRole === 'CSO' ? '1px solid #bfdbfe' : '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '12px', color: userRole === 'CSO' ? '#1e3a8a' : '#334155', fontWeight: 'bold' }}>
                    MKG Awal Terdaftar: {formatMkgDisplay(selectedClaim.mkgAwalTahun, selectedClaim.mkgAwalBulan)}
                  </div>
                  <small style={{ color: '#475569', fontSize: '11px', display: 'block', marginTop: '2px' }}>
                    {userRole === 'CSO' ? 'Masukkan jumlah Tahun dan Bulan MKG Awal sesuai dokumen resmi.' : 'Mode Peninjauan Divisi Aktuaria (Read-Only — Tidak dapat diubah).'}
                  </small>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Jumlah Tahun (MKG):
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                      <input 
                        type="number"
                        min="0"
                        max="50"
                        disabled={userRole === 'AKTUARIA'}
                        style={{ width: '100%', height: '42px', padding: '0 65px 0 14px', border: userRole === 'CSO' ? '2px solid #60a5fa' : '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: userRole === 'CSO' ? '#f0f9ff' : '#f1f5f9', color: '#0f172a', boxSizing: 'border-box', cursor: userRole === 'AKTUARIA' ? 'not-allowed' : 'text' }}
                        value={mkgInputTahun}
                        onChange={(e) => setMkgInputTahun(e.target.value)}
                        required
                        autoFocus={userRole === 'CSO'}
                      />
                      <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '12px', pointerEvents: 'none' }}>Tahun</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Jumlah Bulan (MKG):
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                      <input 
                        type="number"
                        min="0"
                        max="11"
                        disabled={userRole === 'AKTUARIA'}
                        style={{ width: '100%', height: '42px', padding: '0 65px 0 14px', border: userRole === 'CSO' ? '2px solid #60a5fa' : '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: userRole === 'CSO' ? '#f0f9ff' : '#f1f5f9', color: '#0f172a', boxSizing: 'border-box', cursor: userRole === 'AKTUARIA' ? 'not-allowed' : 'text' }}
                        value={mkgInputBulan}
                        onChange={(e) => setMkgInputBulan(e.target.value)}
                        required
                      />
                      <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '12px', pointerEvents: 'none' }}>Bulan</span>
                    </div>
                  </div>
                </div>

              </div>

              <div style={styles.modalFooter}>
                <button type="button" style={styles.secBtn} onClick={() => setShowEditMkgModal(false)}>
                  {userRole === 'CSO' ? 'Batal' : 'Tutup'}
                </button>
                {userRole === 'CSO' && (
                  <button type="submit" style={styles.priBtn}>💾 Simpan & Hitung Ulang</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DEDICATED MODAL KELOLA / DETAIL PERIODE SKORSING */}
      {showSkorsingManageModal && selectedClaim && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContainer, maxWidth: '980px' }}>
            <div style={styles.modalHeader}>
              <div>
                <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>
                  {userRole === 'CSO' ? 'HAK AKSES CSO KANCAB — PENGELOLAAN MULTI-PERIODE SKORSING & DOKUMEN SKEP' : 'HAK AKSES DIVISI AKTUARIA — DETAIL MULTI-PERIODE SKORSING (READ-ONLY)'}
                </div>
                <h3 style={{ fontSize: 16, color: '#fff', marginTop: 2 }}>
                  {userRole === 'CSO' ? '🎖️ Kelola Periode Skorsing Peserta' : '👁️ Detail Periode Skorsing Peserta'} — {selectedClaim.nama} ({selectedClaim.spNum})
                </h3>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowSkorsingManageModal(false)}>✕</button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a8a' }}>TOTAL SKORSING BERLAKU / MEMOTONG MANFAAT</div>
                  <div style={{ fontSize: 18, fontWeight: 'bold', color: '#2563eb' }}>
                    {selectedClaim.skorsingBulan} Bulan <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#475569' }}>({(selectedClaim.skorsingList || []).length} Total Periode Terdaftar)</span>
                  </div>
                </div>
                {userRole === 'CSO' && (
                  <button 
                    style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}
                    onClick={() => setShowAddSkorsingSubModal(true)}
                  >
                    ➕ Tambah Periode Skorsing Baru
                  </button>
                )}
              </div>

              <h4 style={{ fontSize: 14, fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
                📋 Daftar Periode Skorsing & Keberlakuan Peraturan Tanggal
              </h4>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>STATUS KEBERLAKUAN</th>
                      <th style={styles.th}>PERIODE SKORSING</th>
                      <th style={styles.th}>DURASI BULAN</th>
                      <th style={styles.th}>PERSENTASE SKORSING (%)</th>
                      <th style={styles.th}>NO. SKEP SKORSING</th>
                      <th style={styles.th}>BERKAS SKEP UPLOAD / LANDASAN</th>
                      {userRole === 'CSO' && <th style={{ ...styles.th, textAlign: 'center' }}>AKSI</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedClaim.skorsingList || []).length === 0 ? (
                      <tr>
                        <td colSpan={userRole === 'CSO' ? 7 : 6} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '13px' }}>
                          Belum ada periode skorsing yang ditambahkan untuk peserta ini.
                        </td>
                      </tr>
                    ) : (
                      selectedClaim.skorsingList.map((item, idx) => {
                        const statusPeriod = getSkorsingStatus(item.tglMulai, item.tglAkhir);
                        return (
                          <tr key={item.id} style={styles.tr}>
                            <td style={styles.td}>
                              <span style={{ 
                                background: statusPeriod === 'Aktif' ? '#dbeafe' : statusPeriod === 'Belum Aktif' ? '#fef3c7' : '#f1f5f9', 
                                color: statusPeriod === 'Aktif' ? '#1d4ed8' : statusPeriod === 'Belum Aktif' ? '#d97706' : '#64748b', 
                                padding: '3px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' 
                              }}>
                                {statusPeriod}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ fontWeight: '700', color: '#1e293b' }}>
                                📅 {item.tglMulai} s.d. {item.tglAkhir}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                {item.jumlahBulan} Bulan
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ fontWeight: '800', color: '#0f172a', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '3px 10px', borderRadius: '6px' }}>
                                {item.persenSkorsing} %
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>{item.noSkep}</span>
                            </td>
                            <td style={styles.td}>
                              <div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', color: '#2563eb', fontWeight: 'bold' }}>
                                  <span>📄</span>
                                  <span>{item.fileName}</span>
                                </div>
                                {item.landasan && (
                                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', fontStyle: 'italic' }}>
                                    Landasan: {item.landasan}
                                  </div>
                                )}
                              </div>
                            </td>
                            {userRole === 'CSO' && (
                              <td style={{ ...styles.td, textAlign: 'center' }}>
                                <button 
                                  style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                                  title="Hapus Periode Skorsing Ini"
                                  onClick={() => handleDeleteSkorsingItem(item.id)}
                                >
                                  🗑️
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.secBtn} onClick={() => setShowSkorsingManageModal(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* CSO KANCAB: SUB-MODAL POP-UP TAMBAH PERIODE SKORSING BARU */}
      {showAddSkorsingSubModal && selectedClaim && userRole === 'CSO' && (
        <div style={{ ...styles.modalBackdrop, zIndex: 1100 }}>
          <div style={{ ...styles.subModalContainer, maxWidth: '640px' }}>
            <div style={styles.subModalHeader}>
              <h3 style={{ fontSize: 14, color: '#fff', margin: 0 }}>
                ➕ Tambah Periode Skorsing Baru — {selectedClaim.nama}
              </h3>
              <button style={styles.closeBtn} onClick={() => setShowAddSkorsingSubModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddSkorsingSubmit}>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Periode Mulai Skorsing:
                    </label>
                    <input 
                      type="date"
                      style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                      value={skorsingTglMulai}
                      onChange={(e) => setSkorsingTglMulai(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Periode Akhir Skorsing:
                    </label>
                    <input 
                      type="date"
                      style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                      value={skorsingTglAkhir}
                      onChange={(e) => setSkorsingTglAkhir(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Persentase Skorsing (%):
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                      <input 
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        style={{ width: '100%', height: '42px', padding: '0 40px 0 14px', border: '2px solid #60a5fa', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', outline: 'none', backgroundColor: '#f0f9ff', color: '#0f172a', boxSizing: 'border-box' }}
                        placeholder="Contoh: 50"
                        value={skorsingPersenNum}
                        onChange={(e) => setSkorsingPersenNum(e.target.value)}
                        required
                      />
                      <span style={{ position: 'absolute', right: '14px', fontWeight: 'bold', color: '#2563eb', fontSize: '14px', pointerEvents: 'none' }}>%</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                      Nomor SKEP Skorsing:
                    </label>
                    <input 
                      type="text"
                      style={{ width: '100%', height: '42px', padding: '0 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}
                      placeholder="Contoh: SKEP/SKOR/2026/088"
                      value={skorsingNoSkep}
                      onChange={(e) => setSkorsingNoSkep(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                    Upload Berkas Digital SKEP Skorsing (.PDF / Image):
                  </label>
                  <input 
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSkorsingFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  {skorsingFileName && (
                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>✓ Berkas siap diunggah:</span>
                      <span style={{ color: '#2563eb', textDecoration: 'underline' }}>{skorsingFileName}</span>
                    </div>
                  )}
                </div>

                {/* EXACT FIELD REPLACEMENT AS PER USER SCREENSHOT */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>
                    Landasan / Catatan Audit Log Perubahan:
                  </label>
                  <textarea 
                    rows={3}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', backgroundColor: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
                    placeholder="Contoh: Penyesuaian kriteria aktuarial per SK Direksi / Evaluasi Triwulan 2026..."
                    value={skorsingLandasan}
                    onChange={(e) => setSkorsingLandasan(e.target.value)}
                  />
                </div>
              </div>
              <div style={styles.modalFooter}>
                <button type="button" style={styles.secBtn} onClick={() => setShowAddSkorsingSubModal(false)}>Batal</button>
                <button type="submit" style={styles.priBtn}>💾 Simpan Periode Skorsing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT FIELD POP-UP SUB-MODAL */}
      {editConfig && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.subModalContainer, maxWidth: '520px' }}>
            <div style={styles.subModalHeader}>
              <h3 style={{ fontSize: 14, color: '#fff', margin: 0 }}>Edit — {editConfig.fieldLabel}</h3>
              <button style={styles.closeBtn} onClick={() => setEditConfig(null)}>✕</button>
            </div>
            <form onSubmit={handleSaveFieldEdit}>
              <div style={{ padding: '24px' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 'bold', marginBottom: 8, color: '#1e293b' }}>
                  Nilai Baru untuk {editConfig.fieldLabel}:
                </label>
                <div style={{ display: 'flex', position: 'relative', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                  <input 
                    type={editConfig.inputType === 'number' ? 'number' : 'text'}
                    style={{ ...styles.editInput, paddingRight: editConfig.suffix ? '70px' : '14px' }}
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                    autoFocus
                  />
                  {editConfig.suffix && <span style={styles.suffixText}>{editConfig.suffix}</span>}
                </div>
                <small style={{ color: '#64748b', fontSize: 11, marginTop: 8, display: 'block', lineHeight: '1.4' }}>
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

// HELPER COMPONENT FOR REKAPITULASI III SHEET 2 ("Ouput yang diharapkan") STRUCTURE
function Rekapitulasi3ExpectedGroupBlock({ no, kelompokName, d1, d2, d3, d4, d5, d6, d7, d8, d9, isGrandTotal = false }) {
  const bgHeaderStyle = isGrandTotal ? { backgroundColor: '#e0f2fe', fontWeight: '800' } : { backgroundColor: '#ffffff', fontWeight: 'bold' };
  
  return (
    <React.Fragment>
      {/* SECTION a: Pensiun Sendiri */}
      <tr style={bgHeaderStyle}>
        <td rowSpan={24} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', fontSize: '11px', backgroundColor: isGrandTotal ? '#e0f2fe' : '#ffffff' }}>{no}</td>
        <td rowSpan={24} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '11px', backgroundColor: isGrandTotal ? '#e0f2fe' : '#ffffff' }}>{kelompokName}</td>
        <td rowSpan={6} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', backgroundColor: isGrandTotal ? '#f0f9ff' : '#ffffff' }}>a. Pensiun Sendiri</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENERIMA</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENSIUN POKOK</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d3}</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d4}</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d5}</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d6}</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d7}</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d8}</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>{d9}</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. ISTRI/ SUAMI</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. TUNJANGAN KELUARGA</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. ANAK</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. TUNJANGAN BERAS</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. (CACAT)</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. CACAT LAIN-LAIN</td>
      </tr>
      <tr>
        <td style={styles.tdExcelExact}></td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>E. LAIN-LAIN</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>
      <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d1}</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>{d2}</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>

      {/* SECTION b: Pensiun Warakawuri/Janda/Duda */}
      <tr>
        <td rowSpan={6} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left' }}>b. Pensiun Warakawuri/Janda/Duda</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENERIMA</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENSIUN POKOK</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>0</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. ISTRI/ SUAMI</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. TUNJANGAN KELUARGA</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. ANAK</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. TUNJANGAN BERAS</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. (CACAT)</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. CACAT LAIN-LAIN</td>
      </tr>
      <tr>
        <td style={styles.tdExcelExact}></td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>E. LAIN-LAIN</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>
      <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>

      {/* SECTION c: Tunjangan Yatim Piatu */}
      <tr>
        <td rowSpan={6} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left' }}>c. Tunjangan Yatim Piatu</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENERIMA</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENSIUN POKOK</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>0</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. ISTRI/ SUAMI</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. TUNJANGAN KELUARGA</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. ANAK</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. TUNJANGAN BERAS</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. (CACAT)</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. CACAT LAIN-LAIN</td>
      </tr>
      <tr>
        <td style={styles.tdExcelExact}></td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>E. LAIN-LAIN</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>
      <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>

      {/* SECTION d: Tunjangan Orang Tua */}
      <tr>
        <td rowSpan={6} style={{ ...styles.tdExcelExact, verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left' }}>d. Tunjangan Orang Tua</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENERIMA</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>A. PENSIUN POKOK</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={3} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td rowSpan={4} style={{ ...styles.tdExcelExact, textAlign: 'right', fontWeight: 'bold' }}>0</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. ISTRI/ SUAMI</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>B. TUNJANGAN KELUARGA</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. ANAK</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>C. TUNJANGAN BERAS</td>
      </tr>
      <tr>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. (CACAT)</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>D. CACAT LAIN-LAIN</td>
      </tr>
      <tr>
        <td style={styles.tdExcelExact}></td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>E. LAIN-LAIN</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>
      <tr style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'left' }}>TOTAL</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td style={{ ...styles.tdExcelExact, textAlign: 'right' }}>0</td>
        <td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td><td style={styles.tdExcelExact}></td>
      </tr>
    </React.Fragment>
  );
}

function StripeRow({ label, value, alt, onEdit, valueStyle, isReadOnlyMode = false }) {
  return (
    <div style={{ ...styles.stripeRow, backgroundColor: alt ? '#eaf4fe' : '#ffffff' }}>
      <div style={{ width: '40%', fontWeight: 'bold', color: '#1e293b' }}>{label}</div>
      <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...valueStyle }}>
        <span>{value}</span>
        {onEdit && (
          <button 
            type="button" 
            style={isReadOnlyMode ? styles.eyeBtn : styles.pencilBtn} 
            onClick={onEdit} 
            title={isReadOnlyMode ? "Lihat Detail (Read-Only)" : "Edit Field"}
          >
            {isReadOnlyMode ? '👁️' : '✏️'}
          </button>
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

// UNIFIED INLINE STYLES
const styles = {
  appRoot: { fontFamily: "'Inter', system-ui, -apple-system, sans-serif", backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh" },
  header: { height: "64px", backgroundColor: "#0b1329", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, boxShadow: "0 4px 20px rgba(11, 19, 41, 0.15)", boxSizing: "border-box" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  brandBox: { width: "34px", height: "34px", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#0b1329", fontWeight: "900", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)" },
  brandTitle: { fontWeight: "800", fontSize: "14px", color: "#fff", letterSpacing: "0.3px" },
  brandSub: { fontSize: "10px", color: "#f59e0b", fontWeight: "bold" },
  headerCenter: { flex: 1, maxWidth: "440px", margin: "0 20px" },
  searchInput: { width: "100%", padding: "8px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "20px", color: "#fff", outline: "none", fontSize: "13px", transition: "all 0.2s", boxSizing: "border-box" },
  headerRight: { display: "flex", alignItems: "center", gap: "14px" },
  roleBadge: { background: "rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: "8px", fontSize: "11px", color: "#e2e8f0", display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.15)" },
  roleSelectDropdown: { background: "#0f172a", color: "#f59e0b", border: "1px solid #f59e0b", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", outline: "none", cursor: "pointer" },
  userAvatar: { width: "34px", height: "34px", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "13px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" },
  appLayout: { display: "flex", marginTop: "64px", minHeight: "calc(100vh - 64px)" },
  sidebar: { width: "240px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", padding: "20px 12px", position: "fixed", top: "64px", bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "20px", boxShadow: "2px 0 10px rgba(0,0,0,0.02)", boxSizing: "border-box" },
  sidebarSectionLabel: { fontSize: "11px", fontWeight: "800", color: "#94a3b8", marginBottom: "8px", letterSpacing: "0.5px" },
  sidebarNavItem: { padding: "10px 12px", borderRadius: "8px", fontWeight: "500", fontSize: "13px", color: "#475569", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.15s" },
  sidebarNavItemActive: { backgroundColor: "#eff6ff", color: "#2563eb", padding: "10px 12px", borderRadius: "8px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" },
  sidebarParentNav: { padding: "10px 12px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", color: "#334155", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc", border: "1px solid #f1f5f9" },
  sidebarSubItem: { padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "500", color: "#64748b", cursor: "pointer", transition: "background 0.15s" },
  sidebarSubItemActive: { padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", color: "#2563eb", backgroundColor: "#e0f2fe", cursor: "pointer" },
  sidebarActivePill: { background: "#dbeafe", color: "#1d4ed8", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" },
  sidebarFooter: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px" },
  mainContent: { flex: 1, marginLeft: "240px", padding: "24px", boxSizing: "border-box" },
  pageTopBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  breadcrumb: { fontSize: "12px", color: "#64748b", fontWeight: "500" },
  pageTitle: { fontSize: "20px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.3px" },
  dateBox: { background: "#0f172a", color: "#fff", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold", boxShadow: "0 2px 6px rgba(15,23,42,0.15)" },
  toolbar: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  filterInput: { padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", outline: "none", boxSizing: "border-box" },
  filterSelect: { padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px", outline: "none", boxSizing: "border-box" },
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
  actionBtnIcon: { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", width: "32px", height: "32px", borderRadius: "6px", fontSize: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },
  actionBtnParamIcon: { background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", width: "34px", height: "34px", borderRadius: "8px", fontSize: "15px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },
  actionBtnHistoryIcon: { background: "#f8fafc", color: "#0f172a", border: "1px solid #cbd5e1", width: "34px", height: "34px", borderRadius: "8px", fontSize: "15px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },
  modalBackdrop: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)", boxSizing: "border-box" },
  modalContainer: { background: "#fff", width: "100%", maxWidth: "860px", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", boxSizing: "border-box" },
  modalHeader: { background: "#0b1329", color: "#fff", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  closeBtn: { background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" },
  modalTabBar: { display: "flex", background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" },
  modalTabBtn: { padding: "12px 18px", background: "none", border: "none", fontSize: "12px", fontWeight: "bold", color: "#64748b", cursor: "pointer" },
  modalTabBtnActive: { padding: "12px 18px", background: "#fff", border: "none", borderBottom: "3px solid #2563eb", color: "#2563eb", fontWeight: "bold", fontSize: "12px", cursor: "pointer" },
  modalBody: { padding: "20px", overflowY: "auto", flex: 1 },
  bannerTitle: { background: "#e2e8f0", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", color: "#334155", marginBottom: "12px" },
  stripeGrid: { border: "1px solid #dbeafe", borderRadius: "8px", overflow: "hidden" },
  stripeRow: { display: "flex", justifyContent: "space-between", padding: "9px 14px", fontSize: "13px" },
  pencilBtn: { background: "#eff6ff", border: "1px solid #bfdbfe", color: "#2563eb", padding: "3px 8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  eyeBtn: { background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#475569", padding: "3px 8px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
  calcBox: { marginTop: "20px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "16px" },
  benefitCard: { background: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px" },
  totalBanner: { marginTop: "12px", background: "#0f172a", borderRadius: "8px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalFooter: { padding: "16px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: "12px" },
  secBtn: { padding: "9px 18px", background: "#e2e8f0", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", color: "#475569" },
  priBtn: { padding: "9px 18px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" },
  btnPdfRed: { padding: "9px 20px", background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)" },
  btnExcelGreen: { padding: "9px 20px", background: "linear-gradient(135deg, #16a34a, #15803d)", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)" },
  subModalContainer: { background: "#fff", width: "100%", maxWidth: "560px", borderRadius: "14px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.25)", boxSizing: "border-box" },
  subModalHeader: { background: "#0b1329", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  editInput: { width: "100%", padding: "10px 14px", border: "2px solid #60a5fa", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", outline: "none", backgroundColor: "#f0f9ff", boxSizing: "border-box" },
  suffixText: { position: "absolute", right: "14px", fontWeight: "bold", color: "#64748b", fontSize: "12px", pointerEvents: "none" },
  toastWrap: { position: "fixed", bottom: "24px", right: "24px", zIndex: 2000, display: "flex", flexDirection: "column", gap: "8px" },
  toast: { background: "#0f172a", color: "#fff", padding: "12px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: "bold", borderLeft: "4px solid #10b981", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },

  modernCardContainer: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" },
  modernFilterCard: { border: "1px solid #cbd5e1", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" },
  modernFilterHeader: { background: "linear-gradient(135deg, #0b1329 0%, #1e293b 100%)", color: "#ffffff", padding: "14px 20px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  modernFilterTag: { background: "rgba(255,255,255,0.12)", color: "#e2e8f0", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" },
  modernFilterBody: { padding: "20px", backgroundColor: "#ffffff" },
  modernControlsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "20px" },
  modernFieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  modernLabel: { fontSize: "12px", fontWeight: "700", color: "#334155", display: "flex", alignItems: "center", gap: "6px" },
  modernInput: { padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", outline: "none", transition: "all 0.2s", backgroundColor: "#f8fafc", fontWeight: "600", color: "#0f172a", boxSizing: "border-box" },
  modernSelect: { padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", color: "#0f172a", backgroundColor: "#f8fafc", outline: "none", cursor: "pointer", fontWeight: "600", transition: "all 0.2s", boxSizing: "border-box" },
  modernActionBar: { display: "flex", alignItems: "center", paddingTop: "16px", borderTop: "1px solid #f1f5f9" },
  btnPrimaryModern: { background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#ffffff", border: "none", padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)", display: "inline-flex", alignItems: "center", gap: "8px", transition: "transform 0.15s, boxShadow 0.15s" },
  btnIconResetModern: { background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", width: "38px", height: "38px", borderRadius: "8px", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },
  thExcelExact: { border: "1px solid #000000", padding: "6px 8px", fontSize: "10px", fontWeight: "bold", backgroundColor: "#ffffff", color: "#0f172a" },
  tdExcelExact: { border: "1px solid #000000", padding: "5px 8px", fontSize: "10px", color: "#0f172a" }
};
