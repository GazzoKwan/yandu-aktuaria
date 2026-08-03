import React from 'react';

export default function Header({ searchVal, setSearchVal }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-toggle" aria-label="Toggle Sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
        <div className="brand-container">
          <div className="brand-logo-box">A</div>
          <div className="brand-text">
            <span className="brand-name">YANDU NEXTGEN ASABRI</span>
            <span className="brand-subtitle">CSO KANTOR CABANG</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="search-box">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input 
            type="text" 
            value={searchVal} 
            onChange={(e) => setSearchVal(e.target.value)} 
            placeholder="Cari SP / NRP / NIP / Nama Peserta..." 
          />
        </div>
      </div>

      <div className="header-right">
        <div className="role-badge">
          <span className="role-title">ROLE: CSO Kantor Cabang</span>
          <span className="role-pill">AKSES EDIT</span>
        </div>
        <button className="icon-btn notification-btn" title="Notifikasi">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="dot-badge"></span>
        </button>
        <div className="user-avatar" title="CSO KanCab User">CS</div>
      </div>
    </header>
  );
}
