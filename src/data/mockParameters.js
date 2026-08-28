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

// DETAILED AUDIT LOGS FOR PARAMETER CHANGES
export const initialParameterChangeLogs = [
  {
    id: 401,
    paramId: 4,
    namaParam: "Alokasi Manfaat Peserta & Dana Risiko",
    timestamp: "01-01-2026 09:00:00",
    aktor: "Divisi Aktuaria - Dr. Hendra",
    nilaiLama: "100.00 % (Peserta)",
    nilaiBaru: "90.00 % (Peserta) / 10.00 % (Risiko)",
    tglMulai: "2026-01-01",
    tglSelesai: "2026-12-31",
    landasan: "SK Direksi No. 18/2026 Alokasi Risiko THT",
    tipeAksi: "Penetapan Parameter Baru"
  },
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
