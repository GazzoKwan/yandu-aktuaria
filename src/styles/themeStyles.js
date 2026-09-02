// GAYA INLINE TERPUSAT — disamakan dengan ASABRI-FE-YANDU-NEXT-GEN.
// Warna merek diambil dari globals.css + Navbar FE (brand-action #0141A8,
// gradien navbar #003180 → #01358C, emas #FFDE24) dan netralnya memakai
// skala slate Tailwind. Nama kunci tidak berubah supaya semua pemanggilan
// `styles.*` di seluruh src tetap berjalan apa adanya.

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif";
const NAVBAR_GRADIENT = "linear-gradient(90deg, #003180 0%, #0141A8 55%, #01358C 100%)";
const SHADOW_CARD = "0 1px 2px rgba(15,23,42,0.05)";

export const styles = {
  appRoot: { fontFamily: FONT, backgroundColor: "#f8fafc", color: "#334155", minHeight: "100vh" },

  // ---------- Navbar (Navbar.tsx FE) ----------
  header: { height: "64px", background: NAVBAR_GRADIENT, color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, boxShadow: "0 4px 14px rgba(1,53,140,0.25)", boxSizing: "border-box", userSelect: "none" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  brandBox: { height: "40px", width: "auto", flexShrink: 0 },
  brandTitle: { fontWeight: "700", fontSize: "14px", color: "#fff", letterSpacing: "-0.15px", lineHeight: 1.15 },
  brandSub: { fontSize: "9px", color: "#bfd6f5", fontWeight: "500", letterSpacing: "0.6px", lineHeight: 1, marginTop: "2px" },
  headerCenter: { flex: 1, maxWidth: "440px", margin: "0 20px" },
  searchInput: { width: "100%", padding: "8px 14px", background: "rgba(11,30,80,0.2)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: "8px", color: "#fff", outline: "none", fontSize: "12px", fontWeight: "500", fontFamily: FONT, transition: "all 0.2s", boxSizing: "border-box" },
  headerRight: { display: "flex", alignItems: "center", gap: "12px" },
  roleBadge: { background: "rgba(11,30,80,0.2)", padding: "6px 12px", borderRadius: "8px", fontSize: "11px", color: "#bfd6f5", display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(96,165,250,0.3)" },
  roleSelectDropdown: { background: "#01358C", color: "#ffffff", border: "1px solid rgba(96,165,250,0.4)", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", fontFamily: FONT, outline: "none", cursor: "pointer" },
  userAvatar: { width: "32px", height: "32px", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "12px", border: "1px solid rgba(255,255,255,0.6)", flexShrink: 0 },

  // ---------- Kerangka & sidebar (Sidebar.tsx FE) ----------
  appLayout: { display: "flex", marginTop: "64px", minHeight: "calc(100vh - 64px)" },
  sidebar: { width: "256px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", padding: "12px", position: "fixed", top: "64px", bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "20px", boxSizing: "border-box", overflowY: "auto", userSelect: "none" },
  sidebarSectionLabel: { fontSize: "10px", fontWeight: "700", color: "#9ca3af", marginBottom: "8px", padding: "0 10px", letterSpacing: "0.8px", textTransform: "uppercase" },
  sidebarNavItem: { padding: "8px 10px", borderRadius: "8px", fontWeight: "600", fontSize: "12px", color: "#374151", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.12s, color 0.12s" },
  sidebarNavItemActive: { padding: "9px 10px 9px 6px", borderRadius: "0 8px 8px 0", borderLeft: "4px solid #2563eb", backgroundColor: "rgba(239,246,255,0.8)", color: "#1e40af", fontWeight: "700", fontSize: "12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" },
  sidebarParentNav: { padding: "8px 10px", borderRadius: "8px", fontWeight: "600", fontSize: "12px", color: "#374151", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent", border: "none", transition: "background 0.12s" },
  sidebarSubItem: { padding: "7px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", color: "#374151", cursor: "pointer", transition: "background 0.12s, color 0.12s" },
  sidebarSubItemActive: { padding: "7px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", color: "#1e40af", backgroundColor: "rgba(239,246,255,0.8)", cursor: "pointer" },
  sidebarFooter: { background: "rgba(248,250,252,0.6)", border: "1px solid #f1f5f9", borderRadius: "10px", padding: "12px" },

  // ---------- Area konten ----------
  mainContent: { flex: 1, marginLeft: "256px", padding: "24px", boxSizing: "border-box" },
  pageTopBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  breadcrumb: { fontSize: "12px", color: "#94a3b8", fontWeight: "500" },
  pageTitle: { fontSize: "22px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.4px" },
  dateBox: { background: "#ffffff", color: "#334155", border: "1px solid #e2e8f0", padding: "7px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: "700", boxShadow: SHADOW_CARD },
  toolbar: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: SHADOW_CARD },
  filterInput: { padding: "8px 12px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#0f172a", borderRadius: "8px", fontSize: "12px", fontWeight: "600", fontFamily: FONT, outline: "none", boxSizing: "border-box" },
  filterSelect: { padding: "8px 12px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#0f172a", borderRadius: "8px", fontSize: "12px", fontWeight: "600", fontFamily: FONT, outline: "none", boxSizing: "border-box" },

  // ---------- Tabel (DataTable.tsx FE) ----------
  tableWrap: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflowX: "auto", boxShadow: SHADOW_CARD },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" },
  thRow: { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  th: { padding: "11px 16px", fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "13px 16px", color: "#334155", fontWeight: "600" },
  pesertaClickable: { cursor: "pointer" },
  pesertaName: { fontWeight: "700", color: "#0141A8", textDecoration: "underline" },
  pesertaSub: { fontSize: "11px", color: "#64748b" },
  badge: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", padding: "2px 10px", borderRadius: "999px", fontWeight: "800", fontSize: "10px", letterSpacing: "0.4px", textTransform: "uppercase" },
  actionBtnIcon: { background: "#eff6ff", color: "#0141A8", border: "1px solid #bfdbfe", width: "32px", height: "32px", borderRadius: "8px", fontSize: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },
  actionBtnParamIcon: { background: "#eff6ff", color: "#0141A8", border: "1px solid #bfdbfe", width: "34px", height: "34px", borderRadius: "8px", fontSize: "15px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },
  actionBtnHistoryIcon: { background: "#ffffff", color: "#334155", border: "1px solid #cbd5e1", width: "34px", height: "34px", borderRadius: "8px", fontSize: "15px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },

  // ---------- Modal (Modal.tsx FE: kepala terang, bukan gelap) ----------
  modalBackdrop: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", boxSizing: "border-box" },
  modalContainer: { background: "#fff", width: "100%", maxWidth: "860px", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", boxShadow: "0 12px 32px rgba(15,23,42,0.16)", boxSizing: "border-box" },
  modalHeader: { background: "#ffffff", color: "#0f172a", padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" },
  closeBtn: { background: "none", border: "none", color: "#94a3b8", fontSize: "16px", cursor: "pointer" },
  modalTabBar: { display: "flex", background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "0 12px" },
  modalTabBtn: { padding: "9px 14px", background: "none", border: "none", borderBottom: "2px solid transparent", fontSize: "12px", fontWeight: "800", color: "#64748b", fontFamily: FONT, cursor: "pointer" },
  modalTabBtnActive: { padding: "9px 14px", background: "none", border: "none", borderBottom: "2px solid #0141A8", color: "#0141A8", fontWeight: "800", fontSize: "12px", fontFamily: FONT, cursor: "pointer" },
  modalBody: { padding: "20px", overflowY: "auto", flex: 1 },
  bannerTitle: { background: "#f1f5f9", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "800", color: "#334155", marginBottom: "12px" },
  stripeGrid: { border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" },
  stripeRow: { display: "flex", justifyContent: "space-between", padding: "9px 14px", fontSize: "12px" },
  pencilBtn: { background: "#eff6ff", border: "1px solid #bfdbfe", color: "#0141A8", padding: "3px 8px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "700" },
  eyeBtn: { background: "#f8fafc", border: "1px solid #cbd5e1", color: "#475569", padding: "3px 8px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "700" },
  calcBox: { marginTop: "20px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" },
  benefitCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px", boxShadow: SHADOW_CARD },
  totalBanner: { marginTop: "12px", background: NAVBAR_GRADIENT, borderRadius: "12px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalFooter: { padding: "14px 20px", background: "#ffffff", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: "10px" },
  secBtn: { padding: "9px 16px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "10px", fontWeight: "800", fontSize: "12px", fontFamily: FONT, cursor: "pointer", color: "#334155" },
  priBtn: { padding: "9px 16px", background: "#0141A8", color: "#fff", border: "1px solid transparent", borderRadius: "10px", fontWeight: "800", fontSize: "12px", fontFamily: FONT, cursor: "pointer", boxShadow: SHADOW_CARD },
  btnPdfRed: { padding: "9px 18px", background: "#e11d48", color: "#ffffff", border: "1px solid transparent", borderRadius: "10px", fontWeight: "800", fontSize: "12px", fontFamily: FONT, cursor: "pointer", boxShadow: SHADOW_CARD },
  btnExcelGreen: { padding: "9px 18px", background: "#059669", color: "#ffffff", border: "1px solid transparent", borderRadius: "10px", fontWeight: "800", fontSize: "12px", fontFamily: FONT, cursor: "pointer", boxShadow: SHADOW_CARD },
  subModalContainer: { background: "#fff", width: "100%", maxWidth: "560px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 12px 32px rgba(15,23,42,0.16)", boxSizing: "border-box" },
  subModalHeader: { background: "#ffffff", color: "#0f172a", padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" },
  editInput: { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontWeight: "700", fontFamily: FONT, outline: "none", backgroundColor: "#f8fafc", color: "#0f172a", boxSizing: "border-box" },
  suffixText: { position: "absolute", right: "14px", fontWeight: "800", color: "#64748b", fontSize: "11px", pointerEvents: "none" },
  toastWrap: { position: "fixed", bottom: "24px", right: "24px", zIndex: 2000, display: "flex", flexDirection: "column", gap: "8px" },
  toast: { background: "#0f172a", color: "#fff", padding: "12px 18px", borderRadius: "10px", fontSize: "12px", fontWeight: "700", borderLeft: "4px solid #059669", boxShadow: "0 12px 32px rgba(15,23,42,0.16)" },

  // ---------- Kartu & filter (Card.tsx / FilterCard.tsx FE) ----------
  modernCardContainer: { background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: SHADOW_CARD },
  modernFilterCard: { border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", background: "#ffffff", boxShadow: SHADOW_CARD },
  modernFilterHeader: { background: "#f8fafc", color: "#0f172a", padding: "12px 20px", fontSize: "13px", fontWeight: "800", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #e2e8f0" },
  modernFilterTag: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", padding: "2px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: "800", letterSpacing: "0.4px", textTransform: "uppercase" },
  modernFilterBody: { padding: "20px", backgroundColor: "#ffffff" },
  modernControlsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "20px" },
  modernFieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  modernLabel: { fontSize: "10px", fontWeight: "800", color: "#64748b", letterSpacing: "0.6px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" },
  modernInput: { padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", fontFamily: FONT, outline: "none", transition: "all 0.2s", backgroundColor: "#f8fafc", fontWeight: "600", color: "#0f172a", boxSizing: "border-box" },
  modernSelect: { padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", fontFamily: FONT, color: "#0f172a", backgroundColor: "#f8fafc", outline: "none", cursor: "pointer", fontWeight: "600", transition: "all 0.2s", boxSizing: "border-box" },
  modernActionBar: { display: "flex", alignItems: "center", paddingTop: "16px", borderTop: "1px solid #f1f5f9" },
  btnPrimaryModern: { background: "#0141A8", color: "#ffffff", border: "1px solid transparent", padding: "10px 18px", borderRadius: "10px", fontSize: "12px", fontWeight: "800", fontFamily: FONT, cursor: "pointer", boxShadow: SHADOW_CARD, display: "inline-flex", alignItems: "center", gap: "8px", transition: "background 0.15s" },
  btnIconResetModern: { background: "#ffffff", color: "#475569", border: "1px solid #cbd5e1", width: "38px", height: "38px", borderRadius: "10px", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },

  // Tabel tiruan Excel — sengaja tetap bergaris hitam agar mirip cetakan.
  thExcelExact: { border: "1px solid #000000", padding: "6px 8px", fontSize: "10px", fontWeight: "bold", backgroundColor: "#ffffff", color: "#0f172a" },
  tdExcelExact: { border: "1px solid #000000", padding: "5px 8px", fontSize: "10px", color: "#0f172a" }
};
