import React from 'react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="section-label">PELAYANAN KANCAB</div>
        <ul className="nav-list">
          <li className="nav-item active">
            <a href="#koreksi" className="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>
              <span>Koreksi Manfaat</span>
              <span className="pill-badge pill-blue">AKTIF</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer-card">
        <div class="lock-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <div className="footer-card-content">
          <h4>Akses CSO KanCab</h4>
          <p>Klik nama peserta untuk membuka detail. Klik icon ✏️ pensil untuk mengedit MKG & Skorsing.</p>
        </div>
      </div>
    </aside>
  );
}
