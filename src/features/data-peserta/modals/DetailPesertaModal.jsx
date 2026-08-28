import React from 'react';
import { styles } from '../../../styles/themeStyles';
import { formatRupiah, formatMkgDisplay } from '../../../utils/formatters';
import StripeRow from '../components/StripeRow';
import BenefitCard from '../components/BenefitCard';

export default function DetailPesertaModal({
  selectedClaim,
  userRole,
  modalTab,
  setModalTab,
  onClose,
  handleOpenEditField,
  rateManfaatPeserta,
  rateUangRisiko,
  baseCalc,
  newCalc,
  edosirList,
  sptbList,
  setSelectedDocPreview,
  handleSaveModal
}) {
  if (!selectedClaim) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={{ ...styles.modalContainer, maxWidth: '960px' }}>
        <div style={styles.modalHeader}>
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>
              {userRole === 'CSO' ? 'KOREKSI DATA PERHITUNGAN MANFAAT PESERTA' : 'DETAIL PROFIL PESERTA & DOKUMEN DIGITAL (READ-ONLY)'}
            </div>
            <h2 style={{ fontSize: 16, marginTop: 2 }}>Form Detail Peserta — {selectedClaim.nama} ({selectedClaim.spNum})</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
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
                <div style={{ fontWeight: 'bold', fontSize: 13, color: '#0f172a', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>⚡ Hasil Perhitungan Ulang Nilai Manfaat Klaim (Real-time Calculator)</span>
                  <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px' }}>
                    Tarif Alokasi THT Aktif: {rateManfaatPeserta}% Peserta • {rateUangRisiko}% Dana Risiko
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <BenefitCard title="MANFAAT TA" oldVal={baseCalc.ta} newVal={newCalc.ta} />
                  <BenefitCard title="NILAI TUNAI TA (NTTA)" oldVal={baseCalc.ntta} newVal={newCalc.ntta} />
                  <BenefitCard title="NILAI TUNAI NTIP" oldVal={baseCalc.ntip} newVal={newCalc.ntip} />
                  <div style={{ background: '#fff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px', backgroundColor: '#f0f9ff' }}>
                    <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a8a' }}>ALOKASI DANA RISIKO ({rateUangRisiko}%)</div>
                    <div style={{ margin: '6px 0', fontSize: 12 }}>
                      <div style={{ color: '#64748b' }}>Dari Manfaat Kotor: {formatRupiah(newCalc.total)}</div>
                      <div style={{ color: '#d97706', fontWeight: 'bold', fontSize: '13px', marginTop: '2px' }}>{formatRupiah(newCalc.uangRisiko)}</div>
                    </div>
                    <div style={{ fontSize: 10, color: '#0369a1', fontStyle: 'italic' }}>
                      Dipotong untuk Dana Risiko THT
                    </div>
                  </div>
                </div>

                <div style={styles.totalBanner}>
                  <div>
                    <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold' }}>TOTAL MANFAAT CAIR KE PESERTA (POST CONDITION — {rateManfaatPeserta}%)</div>
                    <div style={{ fontSize: 11, color: '#cbd5e1' }}>
                      Manfaat Kotor: {formatRupiah(newCalc.total)} • Potongan Dana Risiko ({rateUangRisiko}%): {formatRupiah(newCalc.uangRisiko)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold', color: '#4ade80' }}>
                      {formatRupiah(newCalc.hakPeserta)}
                    </div>
                    <div style={{ fontSize: 10, color: '#fbbf24', fontWeight: 'bold', marginTop: '2px' }}>
                      ({rateManfaatPeserta}% Bersih Diterima Peserta)
                    </div>
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
          <button style={styles.secBtn} onClick={onClose}>Tutup</button>
          {userRole === 'CSO' && modalTab === 'masakerja' && (
            <button style={styles.priBtn} onClick={handleSaveModal}>Hitung Ulang & Simpan Perubahan</button>
          )}
        </div>
      </div>
    </div>
  );
}
