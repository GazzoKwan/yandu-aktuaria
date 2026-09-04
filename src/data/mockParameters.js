// RESTRUCTURED AKTUARIA PARAMETERS WITH RATE HISTORY (UC-AKT-005)
// SINGLE UNIFIED PARAMETER FOR THT ALLOCATION: ALOKASI MANFAAT PESERTA & DANA RISIKO (DEFAULT: 90% / 10%)
export const initialActuaryParameters = [
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
  },
  {
    id: 4,
    nama: "Alokasi Manfaat Peserta & Dana Risiko",
    kategori: "Tabungan Hari Tua (THT)",
    history: [
      {
        id: 401,
        persen: 90.00,
        tglMulai: "2026-01-01",
        tglSelesai: "2026-12-31",
        diubahOleh: "Divisi Aktuaria - Dr. Hendra",
        landasan: "SK Direksi No. 18/2026 (90% Peserta / 10% Uang Risiko)",
        status: "AKTIF"
      }
    ]
  }
];

// INITIAL PENDING APPROVALS FOR BERJENJANG WORKFLOW (MAKER -> CHECKER -> APPROVER)
export const initialPendingApprovals = [
  {
    id: 501,
    paramId: 2,
    namaParam: "Suku Bunga NTTA",
    kategori: "Nilai Tunai TA (NTTA)",
    nilaiLama: "0.45 %",
    nilaiBaru: 0.50,
    tglMulai: "2027-01-01",
    tglSelesai: "2027-12-31",
    landasan: "Nota Dinas Kajian Investasi & SK Penyesuaian NTTA No. 77/2026",
    catatanPengajuan: "Penyesuaian yield portofolio investasi SBN dan proyeksi cadangan aktuaria tahun 2027.",
    diajukanOleh: "Ratna Meilani (Analis Aktuaria)",
    tglPengajuan: "02-09-2026 09:30:15",
    diverifikasiOleh: null,
    tglVerifikasi: null,
    catatanVerifikasi: "",
    disetujuiOleh: null,
    tglApproval: null,
    catatanApproval: "",
    status: "PENDING" // 'PENDING' | 'DISETUJUI' | 'DITOLAK'
  }
];

// DETAILED AUDIT LOGS FOR PARAMETER CHANGES WITH MULTI-ACTOR APPROVAL
export const initialParameterChangeLogs = [
  {
    id: 401,
    paramId: 4,
    namaParam: "Alokasi Manfaat Peserta & Dana Risiko",
    timestamp: "01/01/26",
    diajukanOleh: "Ratna Meilani (Analis Aktuaria)",
    diverifikasiOleh: "Budi Santoso (Kabid Aktuaria)",
    disetujuiOleh: "Dr. Hendra, FSAI (Kadiv Aktuaria)",
    nilaiLama: "100.00 % (Peserta)",
    nilaiBaru: "90.00 % (Peserta) / 10.00 % (Risiko)",
    tglMulai: "01/01/26",
    tglSelesai: "31/12/26",
    tglPengajuan: "01/01/26",
    tglApproval: "01/01/26",
    landasan: "SK Direksi No. 18/2026 Alokasi Risiko THT",
    catatan: "Sesuai keputusan RUPS dan persetujuan OJK untuk cadangan dana risiko.",
    tipeAksi: "Penetapan Parameter Baru",
    statusApproval: "DISETUJUI"
  },
  {
    id: 101,
    paramId: 1,
    namaParam: "Suku Bunga TA",
    timestamp: "06/08/26",
    diajukanOleh: "Ratna Meilani (Analis Aktuaria)",
    diverifikasiOleh: "Budi Santoso (Kabid Aktuaria)",
    disetujuiOleh: "Dr. Hendra, FSAI (Kadiv Aktuaria)",
    nilaiLama: "0.20 %",
    nilaiBaru: "0.25 %",
    tglMulai: "06/06/26",
    tglSelesai: "06/12/26",
    tglPengajuan: "06/08/26",
    tglApproval: "06/08/26",
    landasan: "SK Direksi No. 44/2026",
    catatan: "Penyesuaian tingkat suku bunga acuan pasar semester II.",
    tipeAksi: "Penambahan Rate Persenan Baru",
    statusApproval: "DISETUJUI"
  },
  {
    id: 100,
    paramId: 1,
    namaParam: "Suku Bunga TA",
    timestamp: "05/01/25",
    diajukanOleh: "Ratna Meilani (Analis Aktuaria)",
    diverifikasiOleh: "Budi Santoso (Kabid Aktuaria)",
    disetujuiOleh: "Dr. Hendra, FSAI (Kadiv Aktuaria)",
    nilaiLama: "0.15 %",
    nilaiBaru: "0.20 %",
    tglMulai: "01/01/25",
    tglSelesai: "05/06/26",
    tglPengajuan: "05/01/25",
    tglApproval: "05/01/25",
    landasan: "SK Direksi No. 12/2025",
    catatan: "Penetapan suku bunga berkala awal tahun buku 2025.",
    tipeAksi: "Penambahan Rate Persenan Baru",
    statusApproval: "DISETUJUI"
  },
  {
    id: 201,
    paramId: 2,
    namaParam: "Suku Bunga NTTA",
    timestamp: "01/01/26",
    diajukanOleh: "Ratna Meilani (Analis Aktuaria)",
    diverifikasiOleh: "Budi Santoso (Kabid Aktuaria)",
    disetujuiOleh: "Dr. Hendra, FSAI (Kadiv Aktuaria)",
    nilaiLama: "0.40 %",
    nilaiBaru: "0.45 %",
    tglMulai: "01/01/26",
    tglSelesai: "31/12/26",
    tglPengajuan: "01/01/26",
    tglApproval: "01/01/26",
    landasan: "SK Direksi No. 02/2026",
    catatan: "Penyesuaian tabel aktuaria NTTA tahunan.",
    tipeAksi: "Penambahan Rate Persenan Baru",
    statusApproval: "DISETUJUI"
  },
  {
    id: 301,
    paramId: 3,
    namaParam: "Tarif Premi THT",
    timestamp: "01/03/26",
    diajukanOleh: "Ratna Meilani (Analis Aktuaria)",
    diverifikasiOleh: "Budi Santoso (Kabid Aktuaria)",
    disetujuiOleh: "Dr. Hendra, FSAI (Kadiv Aktuaria)",
    nilaiLama: "3.00 %",
    nilaiBaru: "3.25 %",
    tglMulai: "01/03/26",
    tglSelesai: "28/02/27",
    tglPengajuan: "01/03/26",
    tglApproval: "01/03/26",
    landasan: "PP No. 54/2026",
    catatan: "Penyesuaian iuran pensiun sesuai regulasi pemerintah.",
    tipeAksi: "Penambahan Rate Persenan Baru",
    statusApproval: "DISETUJUI"
  }
];

