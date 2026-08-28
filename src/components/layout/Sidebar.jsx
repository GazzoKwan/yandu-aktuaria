import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function Sidebar({
  activePage,
  setActivePage,
  userRole,
  reportExpanded,
  setReportExpanded,
  addToast
}) {
  return (
    <aside style={styles.sidebar}>
      <div>
        <div style={styles.sidebarSectionLabel}>MENU APLIKASI</div>

        {/* SHARED MENU: DATA PESERTA */}
        <div 
          style={activePage === 'dataPeserta' ? styles.sidebarNavItemActive : styles.sidebarNavItem}
          onClick={() => setActivePage('dataPeserta')}
        >
          <span>👥 Data Peserta</span>
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
            </div>

            {/* UC-AKT-005: PERUBAHAN PARAMETER */}
            <div 
              style={activePage === 'parameterAktuaria' ? styles.sidebarNavItemActive : styles.sidebarNavItem}
              onClick={() => setActivePage('parameterAktuaria')}
            >
              <span>⚙️ Perubahan Parameter</span>
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
  );
}
