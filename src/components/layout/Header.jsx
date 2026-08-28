import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function Header({ userRole, handleRoleChange, searchVal, setSearchVal }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <div style={styles.brandBox}>A</div>
        <div>
          <div style={styles.brandTitle}>YANDU NEXTGEN ASABRI</div>
          <div style={styles.brandSub}>
            {userRole === 'CSO' ? 'CSO KANTOR CABANG' : 'DIVISI AKTUARIA'}
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
          <span style={{ fontSize: '11px', color: '#cbd5e1' }}>PILIH AKSES:</span>
          <select 
            style={styles.roleSelectDropdown}
            value={userRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="CSO">CSO Kancab</option>
            <option value="AKTUARIA">Divisi Aktuaria</option>
          </select>
        </div>
        <div style={{ ...styles.userAvatar, background: userRole === 'CSO' ? '#2563eb' : '#059669' }}>
          {userRole === 'CSO' ? 'CS' : 'DA'}
        </div>
      </div>
    </header>
  );
}
