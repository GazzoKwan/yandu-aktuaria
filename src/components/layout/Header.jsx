import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function Header({ userRole, handleRoleChange, searchVal, setSearchVal }) {
  const getRoleLabel = (role) => {
    switch(role) {
      case 'CSO': return 'CSO KANTOR CABANG';
      case 'AKTUARIA_MAKER': return 'ANALIS AKTUARIA (MAKER)';
      case 'AKTUARIA_CHECKER': return 'KABID AKTUARIA (CHECKER)';
      case 'AKTUARIA_APPROVER': return 'KADIV AKTUARIA (FINAL APPROVER)';
      default: return 'DIVISI AKTUARIA';
    }
  };

  const getAvatarInfo = (role) => {
    switch(role) {
      case 'CSO': return { text: 'CS', bg: '#2563eb' };
      case 'AKTUARIA_MAKER': return { text: 'AN', bg: '#0284c7' };
      case 'AKTUARIA_CHECKER': return { text: 'KB', bg: '#7c3aed' };
      case 'AKTUARIA_APPROVER': return { text: 'KD', bg: '#059669' };
      default: return { text: 'DA', bg: '#059669' };
    }
  };

  const avatarInfo = getAvatarInfo(userRole);

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <img src="/logo-asabri-white.png" alt="Logo ASABRI" style={styles.brandBox} />
        <div>
          <div style={styles.brandTitle}>YANDU NEXTGEN ASABRI</div>
          <div style={styles.brandSub}>
            {getRoleLabel(userRole)}
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
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', color: '#bfd6f5' }}>PILIH AKSES:</span>
          <select 
            style={styles.roleSelectDropdown}
            value={userRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="CSO">CSO Kancab</option>
            <option value="AKTUARIA_MAKER">Analis Aktuaria (Maker)</option>
            <option value="AKTUARIA_CHECKER">Kabid Aktuaria (Checker)</option>
            <option value="AKTUARIA_APPROVER">Kadiv Aktuaria (Approver)</option>
          </select>
        </div>
        <div style={{ ...styles.userAvatar, background: avatarInfo.bg }}>
          {avatarInfo.text}
        </div>
      </div>
    </header>
  );
}
