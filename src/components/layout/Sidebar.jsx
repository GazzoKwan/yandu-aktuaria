import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function Sidebar({
  activePage,
  setActivePage,
  userRole,
  reportExpanded,
  setReportExpanded,
  approvalExpanded = true,
  setApprovalExpanded,
  pendingApprovals = [],
  addToast
}) {
  const isApproverRole = userRole === 'AKTUARIA_CHECKER' || userRole === 'AKTUARIA_APPROVER' || userRole === 'AKTUARIA';

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
                style={activePage === 'reportPenyelesaian' ? styles.sidebarSubItemActive : styles.sidebarSubItem}
                onClick={() => setActivePage('reportPenyelesaian')}
              >
                📄 Report Penyelesaian Klaim
              </div>

              <div 
                style={activePage === 'reportHutang' ? styles.sidebarSubItemActive : styles.sidebarSubItem}
                onClick={() => setActivePage('reportHutang')}
              >
                📄 Report Hutang Klaim
              </div>
            </div>
          )}
        </div>

        {/* MENUS FOR DIVISI AKTUARIA (FSD EXTENDED MODULES) */}
        {(userRole.startsWith('AKTUARIA') || userRole === 'AKTUARIA') && (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* UC-AKT-003: REPORT KU */}
            <div 
              style={activePage === 'reportKU' ? styles.sidebarNavItemActive : styles.sidebarNavItem}
              onClick={() => setActivePage('reportKU')}
            >
              <span>💰 Report KU (Dapem & Non)</span>
            </div>

            {/* UC-AKT-005: PERUBAHAN PARAMETER (DROPDOWN PARENT) */}
            <div style={{ marginTop: 4 }}>
              <div 
                style={{
                  ...styles.sidebarParentNav,
                  backgroundColor: (activePage === 'parameterAktuaria' || activePage === 'approvalParameter') ? '#eff6ff' : '#f8fafc',
                  borderColor: (activePage === 'parameterAktuaria' || activePage === 'approvalParameter') ? '#bfdbfe' : '#f1f5f9'
                }}
                onClick={() => setApprovalExpanded && setApprovalExpanded(!approvalExpanded)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>⚙️ Perubahan Parameter</span>
                  {isApproverRole && pendingApprovals.length > 0 && (
                    <span style={{
                      background: '#d97706',
                      color: '#ffffff',
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: 'bold'
                    }}>
                      {pendingApprovals.length}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 10, color: '#1d4ed8' }}>{approvalExpanded ? '▼' : '▶'}</span>
              </div>

              {approvalExpanded && (
                <div style={{ marginLeft: 12, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {/* SUB-MENU 1: DAFTAR PARAMETER */}
                  <div 
                    style={activePage === 'parameterAktuaria' ? styles.sidebarSubItemActive : styles.sidebarSubItem}
                    onClick={() => setActivePage('parameterAktuaria')}
                  >
                    📄 Daftar Parameter
                  </div>

                  {/* SUB-MENU 2: APPROVAL (KHUSUS KABID & KADIV AKTUARIA) */}
                  {isApproverRole && (
                    <div 
                      style={activePage === 'approvalParameter' ? { ...styles.sidebarSubItemActive, backgroundColor: '#fef3c7', color: '#b45309' } : styles.sidebarSubItem}
                      onClick={() => setActivePage('approvalParameter')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span>⚖️ Approval</span>
                        {pendingApprovals.length > 0 && (
                          <span style={{
                            background: '#d97706',
                            color: '#ffffff',
                            fontSize: '10px',
                            padding: '1px 6px',
                            borderRadius: '10px',
                            fontWeight: 'bold'
                          }}>
                            {pendingApprovals.length}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={styles.sidebarFooter}>
        <div style={{ fontWeight: 'bold', fontSize: 12 }}>
          Mode Akses: {
            userRole === 'CSO' ? 'CSO Kancab' :
            userRole === 'AKTUARIA_MAKER' ? 'Analis Aktuaria' :
            userRole === 'AKTUARIA_CHECKER' ? 'Kabid Aktuaria' :
            userRole === 'AKTUARIA_APPROVER' ? 'Kadiv Aktuaria' : 'Divisi Aktuaria'
          }
        </div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
          {userRole === 'CSO' 
            ? 'Hak Edit: MKG & Skorsing Aktif.' 
            : (userRole === 'AKTUARIA_CHECKER' || userRole === 'AKTUARIA_APPROVER')
              ? 'Hak Akses: Monitoring / Hanya Lihat Parameter.'
              : 'Wewenang Pengusulan Parameter Baru.'}
        </div>
      </div>
    </aside>
  );
}
