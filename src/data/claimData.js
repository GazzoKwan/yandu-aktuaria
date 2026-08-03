// Data store and benefit calculation engine for ASABRI Koreksi Manfaat

export const initialClaimData = [
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

export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number || 0);
}

export function calculateBenefits(gajiPokok, masaKerjaBulan, skorsingBulan, mkgAwalTahun) {
  const effMasaKerjaYears = Math.max(0, (masaKerjaBulan - (skorsingBulan || 0)) / 12) + (mkgAwalTahun || 0);

  const ta = gajiPokok * 12 * (effMasaKerjaYears / 10) * 1.15;
  const ntta = gajiPokok * 0.95 * effMasaKerjaYears * 1.05;
  const ntip = gajiPokok * 0.75 * effMasaKerjaYears * 1.02;

  const total = ta + ntta + ntip;

  return { ta, ntta, ntip, total, effMasaKerjaYears };
}
