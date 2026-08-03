# YANDU NEXTGEN ASABRI — Module Review & Koreksi Perhitungan Manfaat

![ASABRI YANDU System Banner](https://img.shields.io/badge/System-YANDU%20NEXTGEN%20ASABRI-0b1329?style=for-the-badge&logo=shield)
![Role Access](https://img.shields.io/badge/Role-CSO%20Kantor%20Cabang-f59e0b?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Vite%20%7C%20JSX-2563eb?style=for-the-badge&logo=react)

Dokumentasi dan antarmuka web interaktif **YANDU NEXTGEN ASABRI** untuk modul **Review & Koreksi Perhitungan Manfaat Klaim**. Modul ini dirancang khusus bagi **CSO (Customer Service Officer) Kantor Cabang** untuk meninjau data profil peserta, menyesuaikan parameter koreksi (*Masa Kerja Golongan/MKG Awal* & *Data Skorsing*), serta mendapatkan nilai estimasi manfaat klaim secara real-time (*Manfaat TA, NTTA, NTIP, Total Netto*).

---

## 🌟 Fitur Utama System

- 🛡️ **UI/UX Standar Enterprise ASABRI**: Menggunakan skema warna Dark Header `#0b1329`, Aksen Biru `#2563eb`, serta Badge Emas khas ASABRI.
- 📋 **Tabel Perhitungan Manfaat**: Menampilkan data pengajuan klaim aktif secara ringkas tanpa kolom status, dengan tautan klik langsung pada nama peserta.
- 👤 **Form Detail Peserta 2-Tab**:
  - **Tab 1 (`Profil Peserta`)**: Informasi pribadi peserta lengkap (KTPA, NIK, NPWP, TTL, Alamat, Status KTPA, dll).
  - **Tab 2 (`Masa Kerja & Parameter Koreksi`)**: Riwayat masa kerja, SKEP pengangkatan/pensiun, pensiun pokok, serta penyesuaian **MKG Awal** dan **Skorsing**.
- ✏️ **Edit Pop-up Sub-modal via Icon Pensil**: Pengeditan nilai field yang fleksibel dan instan dengan pop-up modal dialog.
- ⚡ **Kalkulator Manfaat Real-time**: Menghitung secara langsung perubahan Manfaat TA, NTTA, NTIP, dan Total Netto Hasil Koreksi setelah parameter disesuaikan.
- 🗂️ **Sidebar Rapat ke Atas (Top-Aligned)**: Navigasi khusus fokus pada menu *Koreksi Manfaat*.
- 🔔 **Sistem Notifikasi Toast**: Umpan balik visual langsung saat data berhasil disimpan atau dikoreksi.

---

## 📁 Struktur Berkas Proyek (Clean & Extensible)

```text
yandu-koreksi-manfaat-jsx/
├── index.html            # Template HTML utama Vite React
├── package.json          # Manifest dependensi & skrip Vite
├── .gitignore            # Konfigurasi pengabaian berkas (node_modules, build, logs)
├── README.md             # Dokumentasi proyek GitHub
└── src/
    ├── App.jsx           # Berkas JSX Terpadu (Komponen UI, State, Modal, Realtime Calculator)
    └── main.jsx          # Entrypoint React
```

---

## 🚀 Cara Menjalankan di Komputer Lokal

### 1. Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (Versi 16 atau lebih baru).

### 2. Instalasi Dependensi
Buka terminal pada direktori proyek ini, lalu jalankan:
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka alamat lokal yang muncul di terminal (biasanya `http://localhost:5173`) di browser Anda.

---

## 📤 Langkah Push ke GitHub Repository

Buka terminal pada direktori proyek, lalu jalankan perintah berikut:

```bash
# 1. Inisialisasi Repositori Git Lokal
git init

# 2. Tambahkan Seluruh Berkas (.gitignore akan otomatis mengabaikan node_modules)
git add .

# 3. Commit Berkas
git commit -m "feat: initial commit YANDU ASABRI Koreksi Manfaat React JSX"

# 4. Hubungkan ke Remote Repository GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/yandu-koreksi-manfaat.git

# 5. Push ke GitHub
git push -u origin main
```

---

## 📝 Catatan Hak Akses System
Modul ini dikembangkan sesuai alur spesifikasi teknis Use Case Scenario **Koreksi Perhitungan Manfaat** bagi peran **CSO Kantor Cabang ASABRI**.
