// src/icons.jsx — Iconos SVG (window.Icon)
const ICON_PATHS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V9.5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z"/>',
  bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  support: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/>',
  doc: '<path d="M14 3v5h5"/><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M9 13h6M9 17h4"/>',
  file: '<path d="M14 3v5h5"/><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>',
  wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a1 1 0 0 1 1 1v1.5"/><rect x="3" y="7.5" width="18" height="12" rx="2.5"/><circle cx="16.5" cy="13.5" r="1.3" fill="currentColor" stroke="none"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="3.5" cy="6" r="1.1" fill="currentColor" stroke="none"/><circle cx="3.5" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="3.5" cy="18" r="1.1" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  gift: '<rect x="3" y="9" width="18" height="4" rx="1"/><path d="M5 13v8h14v-8M12 9v12"/><path d="M12 9S10.5 4.5 8 5.5 9.5 9 12 9zM12 9s1.5-4.5 4-3.5S14.5 9 12 9z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 21a6 6 0 0 1 12 0"/><path d="M16 5.2a3.5 3.5 0 0 1 0 6.8M21 21a6 6 0 0 0-4-5.7"/>',
  rocket: '<path d="M5 13c-1.5.5-3 2.5-3 6 3.5 0 5.5-1.5 6-3"/><path d="M12.5 4.5C16 1 20.5 2 22 3.5S23 10 19.5 13.5L15 18l-5-5z"/><circle cx="15.5" cy="8.5" r="1.5"/>',
  campus: '<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5"/><path d="M9 11h.01M15 11h.01"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.8 7.8 0 0 0 0-3l1.6-1.2-1.8-3.1-1.9.8a7.7 7.7 0 0 0-2.6-1.5L14.4 2h-3.6l-.3 2a7.7 7.7 0 0 0-2.6 1.5l-1.9-.8L4.2 7.8 5.8 9a7.8 7.8 0 0 0 0 3l-1.6 1.2 1.8 3.1 1.9-.8a7.7 7.7 0 0 0 2.6 1.5l.3 2h3.6l.3-2a7.7 7.7 0 0 0 2.6-1.5l1.9.8 1.8-3.1z"/>',
  moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="M5 12.5 10 17.5 19.5 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  logout: '<path d="M15 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2"/><path d="M10 12H3M6 8l-4 4 4 4"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9.5 12 1.8 1.8 3.2-3.6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  play: '<path d="M7 5.5 19 12 7 18.5z" fill="currentColor" stroke="none"/>',
  sparkle: '<path d="M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9z"/><path d="M19 4v3M20.5 5.5h-3" stroke-width="1.4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  filter: '<path d="M3 5h18l-7 8v5l-4 2v-7z"/>',
  dots: '<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z"/>',
  flame: '<path d="M12 22c4 0 6.5-2.7 6.5-6 0-3.5-3-5-3.5-8-2 1.5-2.5 3-2.5 3S11 8 9 6c-.5 1.5-2.5 3-2.5 6.5C6.5 16.5 8 22 12 22z"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M9 14.5 8 22l4-2.5L16 22l-1-7.5"/>',
  trending: '<path d="M3 17 9 11l4 4 8-8"/><path d="M21 7v5h-5"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  download: '<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 20h14"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10 5-3v10l-5-3z"/>',
  link: '<path d="M9 15 15 9"/><path d="M11 6.5 13 4.5a4 4 0 0 1 5.7 5.7l-2 2"/><path d="M13 17.5 11 19.5a4 4 0 0 1-5.7-5.7l2-2"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 4 9-.2 3.4-1.5 6.5-4 9-2.5-2.5-3.8-5.6-4-9 .2-3.4 1.5-6.5 4-9z"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M20 14v.01M14 20h.01M17 20h.01M20 17v4"/>',
  fingerprint: '<path d="M12 11a2 2 0 0 1 2 2c0 3.5-1 5.5-1.5 6.5"/><path d="M8.5 13a3.5 3.5 0 0 1 7 0c0 2-.3 4-1 5.5"/><path d="M5 12a7 7 0 0 1 13.5-2.5"/><path d="M5.5 16c.3 1 .3 2.5 0 3.5"/>',
};

function Icon({ name, size = 22, className = '', strokeWidth = 1.7, style }) {
  const path = ICON_PATHS[name] || ICON_PATHS.info;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

window.Icon = Icon;
