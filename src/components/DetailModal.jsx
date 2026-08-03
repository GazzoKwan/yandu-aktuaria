import React, { useState } from 'react';
import { formatRupiah, calculateBenefits } from '../data/claimData';

export default function DetailModal({ claim, onClose, onSave, onOpenEditField }) {
  const [activeTab, setActiveTab] = useState('profil'); // 'profil' | 'masakerja'

  if (!claim) return null;

  const baseCalc = calculateBenefits(claim.gajiPokok, claim.masaKerjaBulan, 0, 0);
  const newCalc = calculateBenefits(claim.gajiPokok, claim.masaKerjaBulan, claim.skorsingBulan, claim.mkgAwalTahun);

  const diffTa = newCalc.ta - baseCalc.ta;
  const diffNtta = newCalc.ntta - baseCalc.ntta;
  const diffNtip = newCalc.ntip - baseCalc.ntip;

  return (
    <div className="modal-backdrop active">
      <div className="modal-container modal-large">
        {/* HEADER */}
        <div className="modal-header">
          <div className="header-title-wrap">
            <span className="modal-tag">KOREKSI DATA PERHITUNGAN MANFAAT PESERTA</span>
            <h2>Form Detail Peserta — {claim.nama} ({claim.spNum})</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose}>✕</button>
        </div>

        {/* TAB BAR */}
        <div className="modal-tab-bar">
          <button 
            className={`modal-tab-btn ${activeTab === 'profil' ? 'active' : ''}`}
            onClick={() => setActiveTab('profil')}
          >
            👤 Profil Peserta
          </button>
          <button 
            className={`modal-tab-btn ${activeTab === 'masakerja' ? 'active' : ''}`}
            onClick={() => setActiveTab('masakerja')}
          >
            🎖️ Masa Kerja & Parameter Koreksi
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          {/* TAB 1: PROFIL PESERTA */}
          {activeTab === 'profil' && (
            <div className="modal-tab-content active">
              <div className="form-section-banner">
                <span>Form Profil Pribadi Peserta</span>
              </div>

              <div className="field-stripe-grid">
                <div className="stripe-row"><span className="row-lbl">KTPA</span><span className="row-val">{claim.ktpa}</span></div>
                <div className="stripe-row alt">
                  <span className="row-lbl">Nama Peserta</span>
                  <span className="row-val editable">
                    <span>{claim.nama}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('nama', 'Nama Peserta', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row">
                  <span class="row-lbl">NRP/NIP</span>
                  <span className="row-val editable">
                    <span>{claim.nrp}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('nrp', 'NRP/NIP', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row alt">
                  <span className="row-lbl">Identitas Diri (NIK)</span>
                  <span className="row-val editable">
                    <span>{claim.nik}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('nik', 'Identitas Diri (NIK)', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row">
                  <span className="row-lbl">NPWP</span>
                  <span className="row-val editable">
                    <span>{claim.npwp}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('npwp', 'NPWP', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row alt"><span className="row-lbl">Tanggal Awal Daftar</span><span className="row-val">{claim.tglAwalDaftar}</span></div>
                <div className="stripe-row"><span className="row-lbl">Tempat, Tanggal Lahir</span><span className="row-val">{claim.ttl}</span></div>
                <div className="stripe-row alt">
                  <span className="row-lbl">Alamat</span>
                  <span className="row-val editable">
                    <span>{claim.alamat}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('alamat', 'Alamat Peserta', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row"><span className="row-lbl">RT/RW</span><span className="row-val">{claim.rtRw}</span></div>
                <div className="stripe-row alt"><span className="row-lbl">Desa/Kelurahan</span><span className="row-val">{claim.desa}</span></div>
                <div className="stripe-row"><span className="row-lbl">Kecamatan</span><span className="row-val">{claim.kecamatan}</span></div>
                <div className="stripe-row alt"><span className="row-lbl">Kota</span><span className="row-val">{claim.kota}</span></div>
                <div className="stripe-row"><span className="row-lbl">Provinsi</span><span className="row-val">{claim.provinsi}</span></div>
                <div className="stripe-row alt">
                  <span className="row-lbl">Kode Pos</span>
                  <span className="row-val editable">
                    <span>{claim.kodePos}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('kodePos', 'Kode Pos', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row"><span className="row-lbl">Status KTPA</span><span className="row-val status-text-green">{claim.statusKtpa}</span></div>
                <div className="stripe-row alt"><span className="row-lbl">Status Pensiun</span><span className="row-val">{claim.statusPensiun}</span></div>
              </div>
            </div>
          )}

          {/* TAB 2: MASA KERJA */}
          {activeTab === 'masakerja' && (
            <div className="modal-tab-content active">
              <div className="form-section-banner">
                <span>Data Masa Kerja & Parameter Koreksi</span>
              </div>

              <div className="field-stripe-grid">
                <div className="stripe-row">
                  <span className="row-lbl">PDW</span>
                  <span className="row-val editable">
                    <span>{claim.pdw}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('pdw', 'PDW', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row alt">
                  <span className="row-lbl">Satker Awal</span>
                  <span className="row-val editable">
                    <span>{claim.satkerAwal}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('satkerAwal', 'Satker Awal', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row">
                  <span className="row-lbl">Satker Akhir</span>
                  <span className="row-val editable">
                    <span>{claim.satkerAkhir}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('satkerAkhir', 'Satker Akhir', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row alt">
                  <span className="row-lbl">No SKEP Pengangkatan</span>
                  <span className="row-val editable">
                    <span>{claim.noSkepPengangkatan}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('noSkepPengangkatan', 'No SKEP Pengangkatan', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row">
                  <span className="row-lbl">Tanggal SKEP Pengangkatan</span>
                  <span className="row-val editable">
                    <span>{claim.tglSkepPengangkatan}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('tglSkepPengangkatan', 'Tanggal SKEP Pengangkatan', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row alt"><span className="row-lbl">TMT Skep Pengangkatan</span><span className="row-val">{claim.tmtSkepPengangkatan}</span></div>
                <div className="stripe-row"><span className="row-lbl">TMT Pensiun</span><span className="row-val">{claim.tmtPensiun}</span></div>
                <div className="stripe-row alt">
                  <span className="row-lbl">Tgl Skep Pensiun</span>
                  <span className="row-val editable">
                    <span>{claim.tglSkepPensiun}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('tglSkepPensiun', 'Tgl Skep Pensiun', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row">
                  <span className="row-lbl">No Skep Pensiun</span>
                  <span className="row-val editable">
                    <span>{claim.noSkepPensiun}</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('noSkepPensiun', 'No Skep Pensiun', 'text')}>✏️</button>
                  </span>
                </div>
                <div className="stripe-row alt"><span className="row-lbl">TMT SKPP</span><span className="row-val">{claim.tmtSkpp}</span></div>
                <div className="stripe-row"><span className="row-lbl">Nomor Pensiun</span><span className="row-val">{claim.noPensiun}</span></div>
                <div className="stripe-row alt"><span className="row-lbl">Pensiun Pokok</span><span className="row-val highlight-blue">{formatRupiah(claim.pensiunPokok)}</span></div>
                <div className="stripe-row"><span className="row-lbl">Tunjangan Cacat</span><span className="row-val">{formatRupiah(claim.tunjanganCacat)}</span></div>
                <div className="stripe-row alt"><span className="row-lbl">Status Hidup</span><span className="row-val">{claim.statusHidup}</span></div>
                <div className="stripe-row"><span className="row-lbl">Tanggal Meninggal</span><span className="row-val">{claim.tglMeninggal}</span></div>
                <div className="stripe-row alt"><span className="row-lbl">Tanggal Non Aktif</span><span className="row-val">{claim.tglNonAktif}</span></div>

                {/* MASA KERJA GOLONGAN (MKG) AWAL */}
                <div className="stripe-row">
                  <span className="row-lbl">Masa Kerja Golongan (MKG) Awal</span>
                  <span className="row-val editable">
                    <span>{claim.mkgAwalTahun} Tahun</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('mkgAwalTahun', 'Masa Kerja Golongan (MKG) Awal', 'number', 'Tahun')}>✏️</button>
                  </span>
                </div>

                {/* SKORSING */}
                <div className="stripe-row alt">
                  <span className="row-lbl">Data Skorsing</span>
                  <span className="row-val editable">
                    <span>{claim.skorsingBulan} Bulan</span>
                    <button className="pencil-btn" onClick={() => onOpenEditField('skorsingBulan', 'Data Skorsing', 'number', 'Bulan')}>✏️</button>
                  </span>
                </div>
              </div>

              {/* CALCULATOR RESULTS */}
              <div className="modal-section result-section" style={{ marginTop: '20px' }}>
                <div className="section-title">
                  <span className="step-num">3</span>
                  <h3>Hasil Perhitungan Ulang Nilai Manfaat Klaim (Real-time Calculator)</h3>
                  <span className="calc-badge">⚡ Real-time System Engine</span>
                </div>

                <div className="benefit-calc-cards">
                  <div className="benefit-card">
                    <div className="benefit-head">
                      <span className="benefit-name">MANFAAT TA</span>
                      <span className="sub-label">Tabungan Asuransi</span>
                    </div>
                    <div className="benefit-compare">
                      <div className="compare-col old"><span className="lbl">Awal:</span><span className="val">{formatRupiah(baseCalc.ta)}</span></div>
                      <div className="compare-col new"><span className="lbl">Koreksi:</span><span className="val">{formatRupiah(newCalc.ta)}</span></div>
                    </div>
                    <div className="benefit-diff" style={{ color: diffTa >= 0 ? '#16a34a' : '#dc2626' }}>
                      {diffTa >= 0 ? '+' : ''}{formatRupiah(diffTa)}
                    </div>
                  </div>

                  <div className="benefit-card">
                    <div className="benefit-head">
                      <span className="benefit-name">NILAI TUNAI TA (NTTA)</span>
                      <span className="sub-label">Nilai Tunai Tabungan</span>
                    </div>
                    <div className="benefit-compare">
                      <div class="compare-col old"><span className="lbl">Awal:</span><span className="val">{formatRupiah(baseCalc.ntta)}</span></div>
                      <div className="compare-col new"><span className="lbl">Koreksi:</span><span className="val">{formatRupiah(newCalc.ntta)}</span></div>
                    </div>
                    <div className="benefit-diff" style={{ color: diffNtta >= 0 ? '#16a34a' : '#dc2626' }}>
                      {diffNtta >= 0 ? '+' : ''}{formatRupiah(diffNtta)}
                    </div>
                  </div>

                  <div className="benefit-card">
                    <div className="benefit-head">
                      <span className="benefit-name">NILAI TUNAI NTIP</span>
                      <span className="sub-label">Iuran Pensiun</span>
                    </div>
                    <div className="benefit-compare">
                      <div className="compare-col old"><span className="lbl">Awal:</span><span className="val">{formatRupiah(baseCalc.ntip)}</span></div>
                      <div className="compare-col new"><span className="lbl">Koreksi:</span><span className="val">{formatRupiah(newCalc.ntip)}</span></div>
                    </div>
                    <div className="benefit-diff" style={{ color: diffNtip >= 0 ? '#16a34a' : '#dc2626' }}>
                      {diffNtip >= 0 ? '+' : ''}{formatRupiah(diffNtip)}
                    </div>
                  </div>
                </div>

                <div className="total-benefit-banner">
                  <div className="banner-left">
                    <span className="total-lbl">TOTAL MANFAAT HASIL KOREKSI (POST CONDITION)</span>
                    <span className="total-sub">Telah memperhitungkan MKG Awal & Skorsing sesuai pengajuan.</span>
                  </div>
                  <div className="banner-right">
                    <span className="total-amount">{formatRupiah(newCalc.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Tutup</button>
          <button className="btn btn-primary" onClick={onSave}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Hitung Ulang & Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
