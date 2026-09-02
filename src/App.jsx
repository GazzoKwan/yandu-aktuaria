import React, { useState } from 'react';

// Data imports
import { initialClaimData } from './data/mockClaims';
import { initialActuaryParameters, initialParameterChangeLogs, initialPendingApprovals } from './data/mockParameters';
import { initialEdosirList, initialSptbList } from './data/mockEdosirSptb';

// Utils
import {
  calculateBenefits,
  calculateMonthDiff,
  getSkorsingStatus,
  calculateEffectiveSkorsingMonths
} from './utils/actuaryCalculator';
import { formatMkgDisplay } from './utils/formatters';

// Styles
import { styles } from './styles/themeStyles';

// Layout & Shared UI
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Toast from './components/common/Toast';

// Feature: Data Peserta
import DataPesertaView from './features/data-peserta/DataPesertaView';
import DetailPesertaModal from './features/data-peserta/modals/DetailPesertaModal';
import EditMkgModal from './features/data-peserta/modals/EditMkgModal';
import SkorsingManageModal from './features/data-peserta/modals/SkorsingManageModal';
import AddSkorsingModal from './features/data-peserta/modals/AddSkorsingModal';
import EditFieldModal from './features/data-peserta/modals/EditFieldModal';
import EdosirPreviewModal from './features/data-peserta/modals/EdosirPreviewModal';

// Feature: Reports
import ReportHutangView from './features/reports/ReportHutangView';
import ReportPenyelesaianView from './features/reports/ReportPenyelesaianView';
import ReportKuView from './features/reports/ReportKuView';
import ReportHutangPreviewModal from './features/reports/modals/ReportHutangPreviewModal';
import ReportPenyelesaianPreviewModal from './features/reports/modals/ReportPenyelesaianPreviewModal';
import ReportKuPreviewModal from './features/reports/modals/ReportKuPreviewModal';

// Feature: Parameter Aktuaria
import ParameterAktuariaView from './features/parameter-aktuaria/ParameterAktuariaView';
import ParameterApprovalListView from './features/parameter-aktuaria/ParameterApprovalListView';
import ParamManageModal from './features/parameter-aktuaria/modals/ParamManageModal';
import AddRateModal from './features/parameter-aktuaria/modals/AddRateModal';
import ParamLogModal from './features/parameter-aktuaria/modals/ParamLogModal';
import ParamApprovalModal from './features/parameter-aktuaria/modals/ParamApprovalModal';

export default function App() {
  // Global Data State
  const [claims, setClaims] = useState(initialClaimData);
  const [actuaryParams, setActuaryParams] = useState(initialActuaryParameters);
  const [paramChangeLogs, setParamChangeLogs] = useState(initialParameterChangeLogs);
  const [pendingApprovals, setPendingApprovals] = useState(initialPendingApprovals);
  const [selectedApprovalId, setSelectedApprovalId] = useState(null);
  const [edosirList] = useState(initialEdosirList);
  const [sptbList] = useState(initialSptbList);

  // Role State (CSO, AKTUARIA_MAKER, AKTUARIA_CHECKER, AKTUARIA_APPROVER) with LocalStorage persistence
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('yandu_user_role');
    if (saved === 'AKTUARIA') return 'AKTUARIA_APPROVER';
    return saved || 'AKTUARIA_APPROVER';
  });

  // Navigation State
  const [activePage, setActivePage] = useState('dataPeserta');
  const [reportExpanded, setReportExpanded] = useState(true);
  const [approvalExpanded, setApprovalExpanded] = useState(true);

  // Search & Filter State for Data Peserta
  const [searchVal, setSearchVal] = useState('');
  const [filterKlaim, setFilterKlaim] = useState('ALL');
  
  // Modals & Toast State
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [modalTab, setModalTab] = useState('profil');
  const [editConfig, setEditConfig] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [toasts, setToasts] = useState([]);

  // Sub-modal for MKG Awal (Tahun & Bulan)
  const [showEditMkgModal, setShowEditMkgModal] = useState(false);
  const [mkgInputTahun, setMkgInputTahun] = useState('0');
  const [mkgInputBulan, setMkgInputBulan] = useState('0');

  // Report Hutang Klaim Form State (B-2)
  const [hutangPeriode, setHutangPeriode] = useState('2');
  const [hutangTahun, setHutangTahun] = useState('2026');
  const [hutangKategori, setHutangKategori] = useState('Utang Klaim Tahun Lalu');
  const [hutangType, setHutangType] = useState('Rekap');
  const [filterHutangOpen, setFilterHutangOpen] = useState(true);
  const [showHutangPreviewModal, setShowHutangPreviewModal] = useState(false);

  // Report Penyelesaian Klaim Form State (E-1)
  const [penyelesaianPeriode, setPenyelesaianPeriode] = useState('1');
  const [penyelesaianType, setPenyelesaianType] = useState('Rekap');
  const [penyelesaianJenis, setPenyelesaianJenis] = useState('KLAIM DALAM PROSES AKHIR TRIWULAN/TAHUN LALU');
  const [penyelesaianTahun, setPenyelesaianTahun] = useState('2026');
  const [filterPenyelesaianOpen, setFilterPenyelesaianOpen] = useState(true);
  const [showReportPreviewModal, setShowReportPreviewModal] = useState(false);

  // Report KU Form State
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

  // Parameter Modal State
  const [selectedParamId, setSelectedParamId] = useState(null);
  const [selectedParamLogId, setSelectedParamLogId] = useState(null);

  // Sub-modal for Parameter Actions
  const [showAddRateModal, setShowAddRateModal] = useState(false);
  const [newRatePersen, setNewRatePersen] = useState('');
  const [newRateTglMulai, setNewRateTglMulai] = useState('2026-12-07');
  const [newRateTglSelesai, setNewRateTglSelesai] = useState('2027-12-31');
  const [newRateLandasan, setNewRateLandasan] = useState('');
  const [newRateCatatan, setNewRateCatatan] = useState('');

  // Skorsing Modal State
  const [showSkorsingManageModal, setShowSkorsingManageModal] = useState(false);
  const [showAddSkorsingSubModal, setShowAddSkorsingSubModal] = useState(false);
  const [skorsingTglMulai, setSkorsingTglMulai] = useState('2025-01-01');
  const [skorsingTglAkhir, setSkorsingTglAkhir] = useState('2025-06-30');
  const [skorsingPersenNum, setSkorsingPersenNum] = useState('50');
  const [skorsingNoSkep, setSkorsingNoSkep] = useState('SKEP/SKOR/2025/099');
  const [skorsingFileName, setSkorsingFileName] = useState('');
  const [skorsingLandasan, setSkorsingLandasan] = useState('');

  // Dynamically fetch active allocation rate from unified parameter (Param #4)
  const paramAlokasi = actuaryParams.find(p => p.id === 4);
  const rateManfaatPeserta = paramAlokasi ? (paramAlokasi.history.find(h => h.status === 'AKTIF')?.persen || 90) : 90;
  const rateUangRisiko = Math.max(0, 100 - rateManfaatPeserta);

  // Toast Notification System
  const addToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Role Switcher Handler
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('yandu_user_role', newRole);
    if (newRole === 'CSO') {
      if (['reportKU', 'parameterAktuaria', 'approvalParameter'].includes(activePage)) {
        setActivePage('dataPeserta');
      }
      addToast('👤 Hak Akses Diperbarui: CSO Kancab (Akses Edit: MKG & Skorsing)');
    } else if (newRole === 'AKTUARIA_MAKER') {
      if (activePage === 'approvalParameter') {
        setActivePage('parameterAktuaria');
      }
      addToast('📝 Hak Akses Diperbarui: Analis Aktuaria (Maker — Pembuat Usulan Perubahan Rate)');
    } else if (newRole === 'AKTUARIA_CHECKER') {
      addToast('🔍 Hak Akses Diperbarui: Kabid Aktuaria (Checker — Verifikasi Usulan Tahap 1)');
    } else if (newRole === 'AKTUARIA_APPROVER') {
      addToast('🛡️ Hak Akses Diperbarui: Kadiv Aktuaria (Approver — Pengesahan Final Tahap 2)');
    } else {
      addToast('🛡️ Hak Akses Diperbarui: Divisi Aktuaria');
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
  const selectedApprovalProposal = pendingApprovals.find(p => p.id === selectedApprovalId);

  // Field Edit Modal Triggers
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

  // Handler: Save MKG Awal (CSO Only)
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

  // Handler: Save Field Inline Edit
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

  // Handler: Add Skorsing
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

  // Handler: Delete Skorsing
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

  // Handler: Propose New Actuary Rate (Maker Action -> Enters Tier 1 Approval)
  const handleAddNewRateSubmit = (e) => {
    e.preventDefault();
    if (!selectedParam) return;

    const rateVal = parseFloat(newRatePersen) || 0;
    const activeRate = selectedParam.history.find(h => h.status === 'AKTIF') || selectedParam.history[0];
    const timestampNow = new Date().toLocaleString('id-ID');

    let makerName = 'Ratna Meilani (Analis Aktuaria)';
    if (userRole === 'AKTUARIA_CHECKER') makerName = 'Budi Santoso (Kabid Aktuaria)';
    if (userRole === 'AKTUARIA_APPROVER') makerName = 'Dr. Hendra, FSAI (Kadiv Aktuaria)';

    const newProposal = {
      id: Date.now(),
      paramId: selectedParam.id,
      namaParam: selectedParam.nama,
      kategori: selectedParam.kategori,
      nilaiLama: selectedParam.id === 4 
        ? `${activeRate?.persen || 0}% (Peserta) / ${Math.max(0, 100 - (activeRate?.persen || 0))}% (Risiko)` 
        : `${activeRate?.persen || 0} %`,
      nilaiBaru: rateVal,
      tglMulai: newRateTglMulai,
      tglSelesai: newRateTglSelesai,
      landasan: newRateLandasan || "SK Penyesuaian Parameter Aktuaria",
      catatanPengajuan: newRateCatatan || "Usulan penyesuaian berkala kajian aktuaria",
      diajukanOleh: makerName,
      tglPengajuan: timestampNow,
      diverifikasiOleh: null,
      tglVerifikasi: null,
      catatanVerifikasi: "",
      disetujuiOleh: null,
      tglApproval: null,
      catatanApproval: "",
      status: "PENDING"
    };

    setPendingApprovals(prev => [newProposal, ...prev.filter(p => p.paramId !== selectedParam.id)]);

    addToast(`📤 Usulan Rate Baru (${rateVal}%) berhasil diajukan dengan status PENDING!`);
    setShowAddRateModal(false);
    setNewRatePersen('');
    setNewRateLandasan('');
    setNewRateCatatan('');
  };

  // Handler: Persetujuan Usulan oleh Kabid atau Kadiv Aktuaria (1x Approval)
  const handleApproveProposal = (proposalId, catatan) => {
    const proposal = pendingApprovals.find(p => p.id === proposalId);
    if (!proposal) return;

    const timestampNow = new Date().toLocaleString('id-ID');
    const rateVal = proposal.nilaiBaru;
    const actorName = userRole === 'AKTUARIA_CHECKER' 
      ? 'Budi Santoso, M.Act (Kabid Aktuaria)' 
      : 'Dr. Hendro P., FSAI (Kadiv Aktuaria)';

    const newRateObj = {
      id: Date.now(),
      persen: rateVal,
      tglMulai: proposal.tglMulai,
      tglSelesai: proposal.tglSelesai,
      diubahOleh: `${proposal.diajukanOleh} (Disetujui: ${actorName})`,
      landasan: proposal.landasan,
      status: "AKTIF"
    };

    // Update active rates in actuaryParams
    setActuaryParams(prev => prev.map(param => {
      if (param.id === proposal.paramId) {
        const updatedHistory = param.history.map(h => ({ ...h, status: "HISTORI" }));
        return {
          ...param,
          history: [newRateObj, ...updatedHistory]
        };
      }
      return param;
    }));

    const risikoCalculated = Math.max(0, 100 - rateVal);
    const newLogObj = {
      id: Date.now(),
      paramId: proposal.paramId,
      namaParam: proposal.namaParam,
      timestamp: timestampNow,
      diajukanOleh: proposal.diajukanOleh,
      tglPengajuan: proposal.tglPengajuan,
      diverifikasiOleh: actorName,
      tglVerifikasi: timestampNow,
      disetujuiOleh: actorName,
      tglApproval: timestampNow,
      nilaiLama: proposal.nilaiLama,
      nilaiBaru: proposal.paramId === 4 
        ? `${rateVal} % (Peserta) / ${risikoCalculated} % (Risiko)` 
        : `${rateVal} %`,
      tglMulai: proposal.tglMulai,
      tglSelesai: proposal.tglSelesai,
      landasan: proposal.landasan,
      catatan: catatan || "Disetujui dan diberlakukan secara resmi",
      tipeAksi: `Persetujuan Parameter (${actorName.includes('Kabid') ? 'Kabid Aktuaria' : 'Kadiv Aktuaria'})`,
      statusApproval: "DISETUJUI"
    };

    setParamChangeLogs(prev => [newLogObj, ...prev]);
    setPendingApprovals(prev => prev.filter(p => p.id !== proposalId));

    addToast(`✨ Usulan Rate Parameter resmi DISETUJUI & DITERBITKAN oleh ${actorName.includes('Kabid') ? 'Kabid Aktuaria' : 'Kadiv Aktuaria'}!`);
    setSelectedApprovalId(null);
  };

  // Handler: Penolakan Usulan oleh Kabid atau Kadiv
  const handleRejectProposal = (proposalId, alasan, rejectedByRole) => {
    const proposal = pendingApprovals.find(p => p.id === proposalId);
    if (!proposal) return;

    const timestampNow = new Date().toLocaleString('id-ID');
    const rejectLogObj = {
      id: Date.now(),
      paramId: proposal.paramId,
      namaParam: proposal.namaParam,
      timestamp: timestampNow,
      diajukanOleh: proposal.diajukanOleh,
      tglPengajuan: proposal.tglPengajuan,
      diverifikasiOleh: rejectedByRole.includes('Kabid') ? `Ditolak oleh ${rejectedByRole}` : (proposal.diverifikasiOleh || '-'),
      tglVerifikasi: proposal.tglVerifikasi || timestampNow,
      disetujuiOleh: rejectedByRole.includes('Kadiv') ? `Ditolak oleh ${rejectedByRole}` : null,
      tglApproval: rejectedByRole.includes('Kadiv') ? timestampNow : null,
      nilaiLama: proposal.nilaiLama,
      nilaiBaru: `${proposal.nilaiBaru} % (Ditolak)`,
      tglMulai: proposal.tglMulai,
      tglSelesai: proposal.tglSelesai,
      landasan: proposal.landasan,
      catatan: `Penolakan oleh ${rejectedByRole}: "${alasan}"`,
      tipeAksi: `Penolakan Usulan (${rejectedByRole})`,
      statusApproval: "DITOLAK"
    };

    setParamChangeLogs(prev => [rejectLogObj, ...prev]);
    setPendingApprovals(prev => prev.filter(p => p.id !== proposalId));

    addToast(`❌ Usulan ditolak oleh ${rejectedByRole}. Catatan penolakan tersimpan di Audit Log.`);
    setSelectedApprovalId(null);
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

  const baseCalc = selectedClaim ? calculateBenefits(selectedClaim.gajiPokok, selectedClaim.masaKerjaBulan, 0, 0, 0, rateManfaatPeserta) : null;
  const newCalc = selectedClaim ? calculateBenefits(selectedClaim.gajiPokok, selectedClaim.masaKerjaBulan, selectedClaim.skorsingBulan, selectedClaim.mkgAwalTahun, selectedClaim.mkgAwalBulan, rateManfaatPeserta) : null;

  return (
    <div style={styles.appRoot}>
      {/* Top Navigation Bar with Role Switcher */}
      <Header 
        userRole={userRole}
        handleRoleChange={handleRoleChange}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />

      <div style={styles.appLayout}>
        {/* Sidebar Navigation */}
        <Sidebar 
          activePage={activePage}
          setActivePage={setActivePage}
          userRole={userRole}
          reportExpanded={reportExpanded}
          setReportExpanded={setReportExpanded}
          approvalExpanded={approvalExpanded}
          setApprovalExpanded={setApprovalExpanded}
          pendingApprovals={pendingApprovals}
          addToast={addToast}
        />

        {/* Main Content Area */}
        <main style={styles.mainContent}>
          {activePage === 'dataPeserta' && (
            <DataPesertaView 
              searchVal={searchVal}
              setSearchVal={setSearchVal}
              filterKlaim={filterKlaim}
              setFilterKlaim={setFilterKlaim}
              userRole={userRole}
              filteredClaims={filteredClaims}
              rateManfaatPeserta={rateManfaatPeserta}
              setSelectedClaimId={setSelectedClaimId}
              setModalTab={setModalTab}
              handleExportDataPesertaPdf={handleExportDataPesertaPdf}
              handleExportDataPesertaExcel={handleExportDataPesertaExcel}
            />
          )}

          {activePage === 'reportHutang' && (
            <ReportHutangView 
              filterHutangOpen={filterHutangOpen}
              setFilterHutangOpen={setFilterHutangOpen}
              hutangPeriode={hutangPeriode}
              setHutangPeriode={setHutangPeriode}
              hutangTahun={hutangTahun}
              setHutangTahun={setHutangTahun}
              hutangType={hutangType}
              setHutangType={setHutangType}
              hutangKategori={hutangKategori}
              setHutangKategori={setHutangKategori}
              handleOpenHutangPreview={handleOpenHutangPreview}
              addToast={addToast}
            />
          )}

          {activePage === 'reportPenyelesaian' && (
            <ReportPenyelesaianView 
              filterPenyelesaianOpen={filterPenyelesaianOpen}
              setFilterPenyelesaianOpen={setFilterPenyelesaianOpen}
              penyelesaianPeriode={penyelesaianPeriode}
              setPenyelesaianPeriode={setPenyelesaianPeriode}
              penyelesaianTahun={penyelesaianTahun}
              setPenyelesaianTahun={setPenyelesaianTahun}
              penyelesaianType={penyelesaianType}
              setPenyelesaianType={setPenyelesaianType}
              penyelesaianJenis={penyelesaianJenis}
              setPenyelesaianJenis={setPenyelesaianJenis}
              handleOpenPenyelesaianPreview={handleOpenPenyelesaianPreview}
              addToast={addToast}
            />
          )}

          {activePage === 'reportKU' && (userRole.startsWith('AKTUARIA') || userRole === 'AKTUARIA') && (
            <ReportKuView 
              filterKuOpen={filterKuOpen}
              setFilterKuOpen={setFilterKuOpen}
              kuCetak={kuCetak}
              setKuCetak={setKuCetak}
              kuPeriodeAwal={kuPeriodeAwal}
              setKuPeriodeAwal={setKuPeriodeAwal}
              kuMitraBayar={kuMitraBayar}
              setKuMitraBayar={setKuMitraBayar}
              kuCabang={kuCabang}
              setKuCabang={setKuCabang}
              kuPeriodeAkhir={kuPeriodeAkhir}
              setKuPeriodeAkhir={setKuPeriodeAkhir}
              kuJumlah={kuJumlah}
              setKuJumlah={setKuJumlah}
              kuJenisBayar={kuJenisBayar}
              setKuJenisBayar={setKuJenisBayar}
              handleOpenKuPreview={handleOpenKuPreview}
            />
          )}

          {activePage === 'parameterAktuaria' && (userRole.startsWith('AKTUARIA') || userRole === 'AKTUARIA') && (
            <ParameterAktuariaView 
              actuaryParams={actuaryParams}
              setSelectedParamId={setSelectedParamId}
              setShowAddRateModal={setShowAddRateModal}
              setSelectedParamLogId={setSelectedParamLogId}
              pendingApprovals={pendingApprovals}
              userRole={userRole}
            />
          )}

          {activePage === 'approvalParameter' && (userRole === 'AKTUARIA_CHECKER' || userRole === 'AKTUARIA_APPROVER' || userRole === 'AKTUARIA') && (
            <ParameterApprovalListView 
              pendingApprovals={pendingApprovals}
              onOpenApprovalModal={(id) => setSelectedApprovalId(id)}
              userRole={userRole}
            />
          )}
        </main>
      </div>

      {/* MODALS */}
      <DetailPesertaModal 
        selectedClaim={selectedClaim}
        userRole={userRole}
        modalTab={modalTab}
        setModalTab={setModalTab}
        onClose={() => setSelectedClaimId(null)}
        handleOpenEditField={handleOpenEditField}
        rateManfaatPeserta={rateManfaatPeserta}
        rateUangRisiko={rateUangRisiko}
        baseCalc={baseCalc}
        newCalc={newCalc}
        edosirList={edosirList}
        sptbList={sptbList}
        setSelectedDocPreview={setSelectedDocPreview}
        handleSaveModal={handleSaveModal}
      />

      <EditMkgModal 
        show={showEditMkgModal}
        selectedClaim={selectedClaim}
        userRole={userRole}
        mkgInputTahun={mkgInputTahun}
        setMkgInputTahun={setMkgInputTahun}
        mkgInputBulan={mkgInputBulan}
        setMkgInputBulan={setMkgInputBulan}
        onClose={() => setShowEditMkgModal(false)}
        onSubmit={handleSaveMkgSubmit}
      />

      <SkorsingManageModal 
        show={showSkorsingManageModal}
        selectedClaim={selectedClaim}
        userRole={userRole}
        onClose={() => setShowSkorsingManageModal(false)}
        onOpenAddSkorsing={() => setShowAddSkorsingSubModal(true)}
        onDeleteSkorsingItem={handleDeleteSkorsingItem}
      />

      <AddSkorsingModal 
        show={showAddSkorsingSubModal}
        selectedClaim={selectedClaim}
        userRole={userRole}
        skorsingTglMulai={skorsingTglMulai}
        setSkorsingTglMulai={setSkorsingTglMulai}
        skorsingTglAkhir={skorsingTglAkhir}
        setSkorsingTglAkhir={setSkorsingTglAkhir}
        skorsingPersenNum={skorsingPersenNum}
        setSkorsingPersenNum={setSkorsingPersenNum}
        skorsingNoSkep={skorsingNoSkep}
        setSkorsingNoSkep={setSkorsingNoSkep}
        skorsingFileName={skorsingFileName}
        setSkorsingFileName={setSkorsingFileName}
        skorsingLandasan={skorsingLandasan}
        setSkorsingLandasan={setSkorsingLandasan}
        onClose={() => setShowAddSkorsingSubModal(false)}
        onSubmit={handleAddSkorsingSubmit}
      />

      <EditFieldModal 
        editConfig={editConfig}
        editInputValue={editInputValue}
        setEditInputValue={setEditInputValue}
        onClose={() => setEditConfig(null)}
        onSubmit={handleSaveFieldEdit}
      />

      <EdosirPreviewModal 
        selectedDocPreview={selectedDocPreview}
        onClose={() => setSelectedDocPreview(null)}
      />

      <ParamManageModal 
        selectedParam={selectedParam}
        onClose={() => setSelectedParamId(null)}
        onOpenAddRate={() => setShowAddRateModal(true)}
        onOpenLog={(paramId) => setSelectedParamLogId(paramId)}
      />

      <AddRateModal 
        show={showAddRateModal}
        selectedParam={selectedParam}
        newRatePersen={newRatePersen}
        setNewRatePersen={setNewRatePersen}
        newRateTglMulai={newRateTglMulai}
        setNewRateTglMulai={setNewRateTglMulai}
        newRateTglSelesai={newRateTglSelesai}
        setNewRateTglSelesai={setNewRateTglSelesai}
        newRateLandasan={newRateLandasan}
        setNewRateLandasan={setNewRateLandasan}
        newRateCatatan={newRateCatatan}
        setNewRateCatatan={setNewRateCatatan}
        onClose={() => setShowAddRateModal(false)}
        onSubmit={handleAddNewRateSubmit}
      />

      <ParamLogModal 
        selectedParamLog={selectedParamLog}
        paramChangeLogs={paramChangeLogs}
        onClose={() => setSelectedParamLogId(null)}
      />

      {/* MODAL APPROVAL PARAMETER (1X APPROVAL OLEH KABID ATAU KADIV) */}
      {selectedApprovalProposal && (
        <ParamApprovalModal 
          proposal={selectedApprovalProposal}
          selectedParam={actuaryParams.find(p => p.id === selectedApprovalProposal.paramId)}
          userRole={userRole}
          onClose={() => setSelectedApprovalId(null)}
          onApprove={handleApproveProposal}
          onReject={handleRejectProposal}
        />
      )}

      <ReportPenyelesaianPreviewModal 
        show={showReportPreviewModal}
        penyelesaianPeriode={penyelesaianPeriode}
        penyelesaianTahun={penyelesaianTahun}
        onClose={() => setShowReportPreviewModal(false)}
        onDownloadPdf={handleDownloadPdf}
        onDownloadExcel={handleDownloadExcel}
      />

      <ReportHutangPreviewModal 
        show={showHutangPreviewModal}
        hutangPeriode={hutangPeriode}
        hutangTahun={hutangTahun}
        onClose={() => setShowHutangPreviewModal(false)}
        onDownloadPdf={handleDownloadHutangPdf}
        onDownloadExcel={handleDownloadHutangExcel}
      />

      <ReportKuPreviewModal 
        show={showKuPreviewModal}
        kuCetak={kuCetak}
        kuCabang={kuCabang}
        kuMitraBayar={kuMitraBayar}
        kuPeriodeAwal={kuPeriodeAwal}
        kuPeriodeAkhir={kuPeriodeAkhir}
        onClose={() => setShowKuPreviewModal(false)}
        onDownloadPdf={handleDownloadKuPdf}
        onDownloadExcel={handleDownloadKuExcel}
      />

      {/* Floating Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
}
