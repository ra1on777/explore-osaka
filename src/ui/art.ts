// Vektor-Illustrationen (Platzhalter-Grafiken für Nahaufnahmen, Minigames und Icons).
// Farben nach CI: Kontur #2C221E, Navy #0B1630, Gold #F4B63F, Rot #E8352E, Pergament #F3F1EA.
const O = '#2C221E';
const NAVY = '#0B1630';
const GOLD = '#F4B63F';
const RED = '#E8352E';
const PAPER = '#F3F1EA';
const CREME = '#E8E2D0';
const BLUE = '#3A72C8';
const GREEN = '#4E7B74';

const wrap = (vb: string, body: string) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">${body}</svg>`;

// ---------- Icons (Navigation & Slots), viewBox 24 ----------
const I = (body: string) => wrap('0 0 24 24', `<g fill="none" stroke="currentColor" stroke-width="2">${body}</g>`);
export const icons: Record<string, string> = {
  map: I('<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>'),
  quests: I('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 11h7M9 15h7M9 19h4"/>'),
  vocab: I('<path d="M4 5c3-1.5 6-1.5 8 0 2-1.5 5-1.5 8 0v14c-3-1.5-6-1.5-8 0-2-1.5-5-1.5-8 0z"/><path d="M12 5v14"/>'),
  bag: I('<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: I('<path d="M6 6l12 12M18 6L6 18"/>'),
  back: I('<path d="M15 5l-7 7 7 7"/>'),
  star: wrap('0 0 24 24', `<path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z" fill="currentColor"/>`),
  sound: I('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9c1.5 1.5 1.5 4.5 0 6M18.5 6.5c3 3 3 8 0 11"/>'),
  mute: I('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>'),
  walk: I('<circle cx="13" cy="4" r="2"/><path d="M9 21l2-6 3 3v5M7 12l3-4 4 1 3 3M11 15l-1-5"/>'),
  key: I('<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M21 12v2"/>'),
  trash: I('<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/><path d="M10 11v6M14 11v6"/>'),
  broom: I('<path d="M14 3l-4 9"/><path d="M7 12h7l2 9H5z"/><path d="M8 16v5M11 16v5M14 16v5"/>'),
  door: I('<path d="M6 21V3h12v18"/><path d="M4 21h16"/><circle cx="15" cy="12" r="1"/>'),
  teacher: I('<circle cx="8" cy="6" r="3"/><path d="M3 21v-6a5 5 0 0 1 10 0v6"/><path d="M14 4h7v8h-7M16 14l3-2"/>'),
  student: I('<circle cx="12" cy="8" r="3.5"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/><path d="M5 5l7-3 7 3-7 3z"/>'),
  friends: I('<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 21v-3a5 5 0 0 1 10 0M12 18a5 5 0 0 1 10 0v3"/>'),
  me: I('<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/><path d="M12 13v3"/>'),
  book: I('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>'),
  exam: I('<path d="M6 3h12v18H6z"/><path d="M9 8l1.5 1.5L13 7M9 14l1.5 1.5L13 13M15 8h1M15 14h1"/>'),
  lecture: I('<path d="M3 4h18v11H3z"/><path d="M8 21l4-6 4 6M7 8h6M7 11h9"/>'),
  study: I('<path d="M4 18h16"/><path d="M6 18V9l6-4 6 4v9"/><path d="M10 18v-5h4v5"/>'),
  item: I('<path d="M4 8l8-5 8 5v8l-8 5-8-5z"/><path d="M4 8l8 5 8-5M12 13v8"/>'),
  magnifier: I('<circle cx="10" cy="10" r="6"/><path d="M15 15l6 6"/>'),
  save: I('<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>'),
  upload: I('<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>'),
  download: I('<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>'),
  home: I('<path d="M3 11l9-8 9 8M5 9v12h14V9"/>'),
  train: I('<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 17l-2 4M15 17l2 4"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/>'),
  subway: I('<path d="M3 21h18"/><path d="M4 21V9a8 8 0 0 1 16 0v12"/><rect x="8" y="10" width="8" height="7" rx="2"/>'),
  bus: I('<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 10h16M7 18v3M17 18v3"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>'),
  taxi: I('<path d="M3 15l2-5h14l2 5v4H3z"/><path d="M9 10l1-3h4l1 3"/><circle cx="7" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>'),
  yum: I('<circle cx="12" cy="12" r="9"/><path d="M8 14c2 3 6 3 8 0M8 9h1M15 9h1"/><path d="M14 16c1 1 2 1 2 0"/>'),
  cake: I('<path d="M4 20h16v-7H4z"/><path d="M4 13c2-2 4-2 6 0s4 2 6 0 3-1 4 0M12 9V6"/><path d="M12 6c-1-1 0-3 0-3s1 2 0 3z"/>'),
  pepper: I('<path d="M15 6c-6 0-10 6-10 13 5-2 12-6 12-12z"/><path d="M15 6c1-2 3-3 4-3"/>'),
  coffee: I('<path d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2M8 3c0 2 2 2 2 4M12 3c0 2 2 2 2 4"/>'),
  eat: I('<path d="M5 3v8a3 3 0 0 0 6 0V3M8 3v18"/><path d="M17 3c-2 2-2 6 0 8v10"/>'),
  drink: I('<path d="M6 3h12l-2 18H8z"/><path d="M7 8h10"/>'),
  cart: I('<path d="M3 4h3l3 11h9l3-8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>'),
  wallet: I('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/>'),
  front: I('<circle cx="12" cy="7" r="3"/><path d="M12 10v6M8 21l4-5 4 5"/><path d="M12 2v0M4 13h4"/><path d="M5 11l-2 2 2 2"/>'),
  behind: I('<rect x="4" y="4" width="10" height="16" rx="1"/><circle cx="18" cy="9" r="2"/><path d="M18 11v5M16 20l2-4 2 4"/>'),
  beside: I('<rect x="3" y="8" width="8" height="12" rx="1"/><circle cx="17" cy="9" r="2"/><path d="M17 11v5M15 20l2-4 2 4"/><path d="M12 14h2"/>'),
  near: I('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8" stroke-dasharray="2 3"/>'),
  play: I('<circle cx="12" cy="12" r="9"/><path d="M12 3l3 5-3 4-3-4zM3.5 10l5.5 2-1 5M20.5 10l-5.5 2 1 5"/>'),
  eye: I('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  ear: I('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1"/><rect x="17" y="14" width="4" height="7" rx="1"/>'),
  run: I('<circle cx="15" cy="4" r="2"/><path d="M7 21l4-6 3 2 2 5M10 10l3-3 3 3 3 1M13 7l-2 6"/>'),
  sun: I('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'),
  rain: I('<path d="M6 14a4 4 0 0 1 1-8 5 5 0 0 1 10 1 3.5 3.5 0 0 1 0 7z"/><path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3"/>'),
  wind: I('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),
  hot: I('<path d="M10 4a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0z"/><path d="M12 9v7"/><path d="M18 5l2-1M18 9h2"/>'),
  cold: I('<path d="M12 2v20M4 7l16 10M20 7L4 17"/><path d="M9 3l3 2 3-2M9 21l3-2 3 2"/>'),
  temple: I('<path d="M2 9l10-5 10 5z"/><path d="M5 9v10M19 9v10M3 21h18M9 21v-6h6v6"/>'),
  gate: I('<path d="M3 7h18M5 4h14l2 3M5 7v14M19 7v14M5 13h14M10 13v8M14 13v8"/>'),
  torii: I('<path d="M2 5c6 2 14 2 20 0M4 9h16M7 6v15M17 6v15"/>'),
  bridge: I('<path d="M2 18c4-8 16-8 20 0M2 18h20M7 13v5M12 11v7M17 13v5"/>'),
  lantern: I('<path d="M12 2v3M9 5h6M7 8c0-2 10-2 10 0v8c0 2-10 2-10 0zM9 19h6M12 19v3"/><path d="M7 12h10"/>'),
  amulet: I('<path d="M8 6l4-3 4 3v14H8z"/><path d="M10 10h4M10 13h4"/><path d="M12 3V1"/>'),
  fortune: I('<path d="M6 4h12v16H6z"/><path d="M9 8h6M9 11h6M9 14h4"/><path d="M4 4h4M16 20h4"/>'),
  gear: I('<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>'),
};

// ---------- "!"-Sprechblase über NPCs ----------
export const bubble = wrap('0 0 40 48', `
  <path d="M20 2a17 17 0 0 1 17 17c0 9-7 15-12 17l-5 9-5-9C10 34 3 28 3 19A17 17 0 0 1 20 2z" fill="${GOLD}" stroke="${NAVY}" stroke-width="3"/>
  <rect x="17" y="9" width="6" height="15" rx="3" fill="${NAVY}"/><circle cx="20" cy="30" r="3.4" fill="${NAVY}"/>`);

// ---------- Platzhalter-Figuren ----------
export const placeholders: Record<string, string> = {
  cat: wrap('0 0 120 160', `
    <path d="M30 150c-6-30 0-58 18-70l-6-34 18 20h20l18-20-6 34c18 12 24 40 18 70z" fill="#3b2f2a" stroke="${O}" stroke-width="3"/>
    <path d="M96 140c14-4 20-20 14-34" fill="none" stroke="#3b2f2a" stroke-width="9"/>
    <circle cx="50" cy="92" r="6" fill="${GOLD}"/><circle cx="72" cy="92" r="6" fill="${GOLD}"/>
    <circle cx="50" cy="92" r="2.5" fill="${NAVY}"/><circle cx="72" cy="92" r="2.5" fill="${NAVY}"/>
    <path d="M58 102l3 3 3-3" fill="none" stroke="#f0a39b" stroke-width="3"/>
    <path d="M36 104l-14-2M36 108l-14 4M86 104l14-2M86 108l14 4" stroke="#d8cfc0" stroke-width="2"/>
    <path d="M44 128c8 6 26 6 34 0" fill="none" stroke="${RED}" stroke-width="5"/><circle cx="61" cy="134" r="4" fill="${GOLD}"/>`),
  person: wrap('0 0 120 240', `
    <circle cx="60" cy="40" r="26" fill="#8a94a6" stroke="${O}" stroke-width="3"/>
    <path d="M22 236V120c0-28 16-48 38-48s38 20 38 48v116z" fill="#8a94a6" stroke="${O}" stroke-width="3"/>
    <text x="60" y="160" font-size="56" text-anchor="middle" fill="${PAPER}" font-family="Fredoka, sans-serif" font-weight="700">?</text>`),
};

// ---------- Nahaufnahmen (Inspect), viewBox 200x150 ----------
const C = (body: string) => wrap('0 0 200 150', `<rect width="200" height="150" fill="${CREME}"/>${body}`);
export const closeups: Record<string, string> = {
  plungepool: C(`
    <rect x="0" y="0" width="200" height="150" fill="#6f8f7a"/>
    <path d="M70 0h60v70H70z" fill="#5d6b70"/><path d="M86 0h28v78H86z" fill="#e9f4fb"/>
    <path d="M90 0v78M98 0v80M106 0v78" stroke="#bcd7ea" stroke-width="2"/>
    <ellipse cx="100" cy="102" rx="78" ry="34" fill="#2e6f8e" stroke="${O}" stroke-width="2"/>
    <ellipse cx="100" cy="104" rx="46" ry="18" fill="#174c66"/>
    <path d="M60 100c10-6 20 6 30 0s20 6 30 0 20 6 30 0" fill="none" stroke="#9fd0e6" stroke-width="2"/>
    <circle cx="80" cy="110" r="5" fill="#9a8f82" stroke="${O}"/><circle cx="118" cy="108" r="4" fill="#9a8f82" stroke="${O}"/>
    <path d="M92 88a10 10 0 0 1 16 0" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M150 80c8 4 14 14 10 22" fill="none" stroke="${GOLD}" stroke-width="3"/>
    <text x="150" y="136" font-size="12" fill="#fff" font-family="Manrope, sans-serif" text-anchor="middle">Kolk</text>`),
  goldenface: C(`
    <rect width="200" height="150" fill="#bfe1f3"/>
    <path d="M70 150c4-50 10-90 30-120 20 30 26 70 30 120z" fill="#fbfaf6" stroke="${O}" stroke-width="2"/>
    <circle cx="100" cy="52" r="30" fill="${GOLD}" stroke="${O}" stroke-width="2.5"/>
    <circle cx="100" cy="52" r="22" fill="#e9b94a"/>
    <path d="M88 48h8M104 48h8" stroke="${NAVY}" stroke-width="4"/>
    <path d="M100 52v8" stroke="${O}" stroke-width="2"/>
    <path d="M100 22v-14M94 10l6-6 6 6" stroke="${O}" stroke-width="2.5" fill="none"/>
    <path d="M76 110c8-6 16-10 24 0s16 6 24 0" fill="none" stroke="${RED}" stroke-width="4"/>`),
  board: C(`
    <rect x="20" y="20" width="160" height="104" rx="6" fill="#5a4636" stroke="${O}" stroke-width="2"/>
    <rect x="30" y="28" width="140" height="88" fill="${PAPER}"/>
    <text x="100" y="44" font-size="11" font-weight="700" text-anchor="middle" fill="${NAVY}" font-family="Manrope, sans-serif">大阪大学のルーツ</text>
    <rect x="40" y="54" width="56" height="50" fill="#e4dccb" stroke="${O}"/><path d="M44 96l12-24 12 14 8-8 16 18z" fill="#a28e6c"/>
    <text x="68" y="112" font-size="7" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Kaitokudō 1724</text>
    <rect x="104" y="54" width="56" height="50" fill="#e4dccb" stroke="${O}"/><path d="M112 96h40v-18l-20-12-20 12z" fill="#a28e6c"/>
    <text x="132" y="112" font-size="7" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Tekijuku 1838</text>
    <rect x="94" y="124" width="12" height="20" fill="#5a4636"/>`),
  tiger: C(`
    <rect width="200" height="150" fill="#f3e3c8"/>
    <path d="M30 0v40M170 0v40" stroke="${O}" stroke-width="2"/>
    <ellipse cx="100" cy="82" rx="74" ry="40" fill="${GOLD}" stroke="${O}" stroke-width="3"/>
    <path d="M60 50l8 18M80 44l4 18M120 44l-4 18M140 50l-8 18M48 96l16-6M152 96l-16-6" stroke="${O}" stroke-width="5"/>
    <circle cx="80" cy="76" r="7" fill="#fff" stroke="${O}" stroke-width="2"/><circle cx="120" cy="76" r="7" fill="#fff" stroke="${O}" stroke-width="2"/>
    <circle cx="81" cy="77" r="3" fill="${O}"/><circle cx="121" cy="77" r="3" fill="${O}"/>
    <path d="M78 98c12 10 32 10 44 0" fill="#fff" stroke="${O}" stroke-width="3"/>
    <path d="M168 82l26-16v32z" fill="${GOLD}" stroke="${O}" stroke-width="3"/>`),
  schedule: C(`
    <rect x="18" y="14" width="164" height="122" rx="4" fill="#fff" stroke="${O}" stroke-width="2"/>
    <rect x="18" y="14" width="164" height="26" fill="#1F4B8F"/>
    <text x="100" y="32" font-size="12" font-weight="700" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif">SPIELPLAN</text>
    ${[0, 1, 2, 3].map((i) => `<rect x="28" y="${48 + i * 21}" width="144" height="17" fill="${i === 1 ? '#fde7a8' : '#eef2f8'}"/>
      <text x="34" y="${60 + i * 21}" font-size="9" fill="${NAVY}" font-family="Manrope, sans-serif">${['Sa · Heim', 'Sa · DERBY', 'Mi · Auswärts', 'So · Heim'][i]}</text>
      <text x="166" y="${60 + i * 21}" font-size="9" fill="${NAVY}" text-anchor="end" font-family="Manrope, sans-serif">${['14:00', '19:00', '19:30', '15:00'][i]}</text>`).join('')}
    <path d="M112 66l8-6 8 6" fill="none" stroke="${RED}" stroke-width="2"/>`),
  stone: C(`
    <rect width="200" height="150" fill="#9fbf86"/>
    <path d="M40 140l10-100c20-14 80-14 100 0l10 100z" fill="#a9a59b" stroke="${O}" stroke-width="2.5"/>
    <path d="M60 60c10-4 18 2 28-2s20 4 30 0 14 4 22 0" fill="none" stroke="#6e6a61" stroke-width="2"/>
    <text x="100" y="86" font-size="14" text-anchor="middle" fill="#3d3a35" font-family="Noto Sans JP, sans-serif" font-weight="700">待兼山ワニ</text>
    <path d="M62 106c10-6 18 4 28-2l16 0 12 4 24-4" fill="none" stroke="#3d3a35" stroke-width="2.5"/>
    <path d="M66 112l3 4M76 110l3 4M86 108l3 4M96 108l3 4" stroke="#3d3a35" stroke-width="2"/>
    <path d="M30 140c20-10 40-8 50-2M120 140c20-8 40-8 56 0" stroke="#6b8c55" stroke-width="6" fill="none"/>`),
  campusmap: C(`
    <rect x="14" y="12" width="172" height="126" fill="#fff" stroke="${O}" stroke-width="2"/>
    <path d="M14 96c40-6 80 10 172-8" stroke="#9cc7e3" stroke-width="8" fill="none"/>
    <path d="M30 30h40v26H30zM84 26h44v34H84zM140 30h34v40h-34zM40 104h46v24H40zM120 104h44v24h-44z" fill="#dfe8f3" stroke="${BLUE}" stroke-width="1.5"/>
    <path d="M20 70h160" stroke="${GOLD}" stroke-width="4" stroke-dasharray="6 4"/>
    <circle cx="50" cy="70" r="5" fill="${RED}"/><circle cx="150" cy="70" r="5" fill="${RED}"/>
    <text x="50" y="47" font-size="8" text-anchor="middle" font-family="Manrope, sans-serif" fill="${NAVY}">Medizin</text>
    <text x="106" y="46" font-size="8" text-anchor="middle" font-family="Manrope, sans-serif" fill="${NAVY}">Cybermedia</text>
    <text x="157" y="53" font-size="8" text-anchor="middle" font-family="Manrope, sans-serif" fill="${NAVY}">Klinikum</text>
    <text x="63" y="119" font-size="8" text-anchor="middle" font-family="Manrope, sans-serif" fill="${NAVY}">Technik</text>
    <text x="142" y="119" font-size="8" text-anchor="middle" font-family="Manrope, sans-serif" fill="${NAVY}">Zahnmedizin</text>`),
  banner: C(`
    <rect width="200" height="150" fill="#e6e1d6"/>
    <rect x="68" y="6" width="64" height="138" fill="#1F4B8F" stroke="${O}" stroke-width="2"/>
    <circle cx="100" cy="26" r="10" fill="#fff"/><path d="M93 26a7 7 0 0 1 14 0l-7 8z" fill="#1F4B8F"/>
    ${['外', '国', '語', '学', '部'].map((k, i) => `<text x="100" y="${58 + i * 20}" font-size="17" text-anchor="middle" fill="#fff" font-family="Noto Sans JP, sans-serif" font-weight="700">${k}</text>`).join('')}`),
};

// ---------- Blatt-Silhouetten ----------
const L = (body: string) => wrap('0 0 120 120', `<rect width="120" height="120" rx="10" fill="${PAPER}"/><g fill="${GREEN}" stroke="${O}" stroke-width="2">${body}</g>`);
export const leaves: Record<string, string> = {
  maple: L(`<path d="M60 18l7 22 16-12-4 20 20-2-14 14 14 8-20 4 4 16-16-10-7 22-7-22-16 10 4-16-20-4 14-8-14-14 20 2-4-20 16 12z"/><path d="M60 92v16" fill="none"/>`),
  ginkgo: L(`<path d="M60 92C40 80 24 52 26 30c12 2 24 4 30 10l4 10 4-10c6-6 18-8 30-10 2 22-14 50-34 62z"/><path d="M60 92v18" fill="none"/>`),
  pine: L(`<g fill="none" stroke-width="3"><path d="M60 104l-20-84M60 104l-8-86M60 104l20-84M60 104l8-86"/></g><path d="M54 100h12v10H54z"/>`),
  bamboo: L(`<path d="M30 92C40 60 70 30 98 22 92 52 64 82 30 92z"/><path d="M30 92L98 22" fill="none"/><path d="M20 104l14-14" fill="none" stroke-width="4"/>`),
  tsubaki: L(`<path d="M60 100C34 92 24 64 34 34c14 6 22 18 26 30 4-12 12-24 26-30 10 30 0 58-26 66z"/><path d="M60 100V60M60 76l-12-10M60 70l12-8" fill="none"/>`),
  moss: L(`<g stroke-width="1.5">${Array.from({ length: 9 }, (_, i) => `<path d="M${20 + i * 10} 100c-2-20 4-34 10-50M${20 + i * 10} 100c4-16 2-30-6-40" fill="none" stroke-width="2.5"/><path d="M${28 + i * 10} 50l4-6 3 7z"/>`).join('')}</g><path d="M10 100h100v8H10z" fill="#7a6a4a"/>`),
};

// ---------- Hanafuda-Karten (vereinfachte Motive) ----------
const HF = (bg: string, body: string, kanji: string) => wrap('0 0 80 120', `
  <rect x="2" y="2" width="76" height="116" rx="6" fill="${bg}" stroke="${O}" stroke-width="3"/>${body}
  <rect x="58" y="8" width="14" height="30" rx="2" fill="${PAPER}" stroke="${O}"/><text x="65" y="28" font-size="12" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${O}">${kanji}</text>`);
const flower = (cx: number, cy: number, r: number, fill: string) =>
  [0, 72, 144, 216, 288].map((a) => `<circle cx="${cx + Math.cos((a * Math.PI) / 180) * r}" cy="${cy + Math.sin((a * Math.PI) / 180) * r}" r="${r * 0.75}" fill="${fill}" stroke="${O}"/>`).join('') + `<circle cx="${cx}" cy="${cy}" r="${r * 0.45}" fill="${GOLD}"/>`;
export const hanafuda: Record<string, string> = {
  'hf-2': HF('#f6e7d0', `<path d="M10 110c10-30 20-50 44-70" stroke="#5a3b2a" stroke-width="6" fill="none"/>${flower(30, 70, 7, '#fff')}${flower(46, 50, 7, '#fff')}${flower(22, 94, 6, '#fff')}`, '二'),
  'hf-3': HF('#2a2a4a', `<path d="M8 116c12-34 30-56 52-76" stroke="#5a3b2a" stroke-width="6" fill="none"/>${flower(24, 76, 8, '#f6b9c8')}${flower(42, 56, 8, '#f6b9c8')}${flower(56, 84, 8, '#f6b9c8')}${flower(20, 100, 7, '#f6b9c8')}`, '三'),
  'hf-4': HF('#f3efe4', `<path d="M10 8c20 6 40 4 60 0" stroke="#5a3b2a" stroke-width="4" fill="none"/>${[18, 34, 50].map((x) => [0, 1, 2, 3, 4].map((j) => `<circle cx="${x + (j % 2) * 3}" cy="${20 + j * 12}" r="5" fill="#9b74c9" stroke="${O}"/>`).join('')).join('')}`, '四'),
  'hf-5': HF('#e9f1f7', `<path d="M4 98h72" stroke="${BLUE}" stroke-width="5"/>${[20, 38, 56].map((x) => `<path d="M${x} 100V54" stroke="${GREEN}" stroke-width="3"/><path d="M${x} 56c-8-6-6-16 0-20 6 4 8 14 0 20z" fill="#5b45b0" stroke="${O}"/>`).join('')}`, '五'),
  'hf-6': HF('#f6efe0', `${flower(36, 74, 13, '#e05570')}<path d="M54 44c6-6 14-4 14 2-6 2-8 6-14-2zM54 44c-2-8 4-12 10-10-2 6 0 8-10 10z" fill="${GOLD}" stroke="${O}"/>`, '六'),
  'hf-1': HF('#c94a3a', `<circle cx="40" cy="44" r="14" fill="${GOLD}" opacity=".9"/><path d="M14 112c6-22 14-30 26-34M40 78c10-4 20-2 28 6" stroke="#3a2a1a" stroke-width="5" fill="none"/><path d="M10 92c10-12 30-12 40 0zM34 76c10-12 30-12 40 0z" fill="#2f5a3a" stroke="${O}"/><path d="M18 64c6-10 18-14 24-6l10-8 2 6-10 6c-4 8-18 10-26 2z" fill="#fff" stroke="${O}"/><circle cx="50" cy="52" r="2" fill="${RED}"/>`, '一'),
  'hf-8': HF('#e9e2c8', `<rect x="4" y="4" width="72" height="56" fill="#c94a3a"/><circle cx="36" cy="40" r="18" fill="#fff" stroke="${O}"/><path d="M4 116c20-50 50-60 72-60v60z" fill="#2a2a2a"/>${[16, 28, 40, 52, 64].map((x) => `<path d="M${x} 116c0-20 4-34 10-44" stroke="#c9b27a" stroke-width="3" fill="none"/>`).join('')}`, '八'),
  'hf-9': HF('#f3efe4', `${flower(28, 40, 10, '#e9c04a')}${flower(50, 62, 9, '#e9c04a')}<path d="M24 86h32l-4 20H28z" fill="${RED}" stroke="${O}" stroke-width="2"/><text x="40" y="100" font-size="9" text-anchor="middle" fill="${GOLD}">寿</text>`, '九'),
  'hf-10': HF('#f3efe4', `<path d="M10 20c20 10 40 8 60 0" stroke="#5a3b2a" stroke-width="4" fill="none"/>${[[20, 30], [40, 26], [58, 32]].map(([x, y]) => `<path d="M${x} ${y}l4 10 9-3-6 8 8 4-10 1 1 10-6-8-6 8 1-10-10-1 8-4-6-8 9 3z" fill="#d6452f" stroke="${O}"/>`).join('')}<path d="M24 110l4-30c4-10 16-10 20 0l4 30M30 72l-6-12M46 72l6-12" stroke="#8a5a32" stroke-width="5" fill="none"/>`, '十'),
  'hf-11': HF('#3a3a5a', `<path d="M8 4c4 40 10 70 14 110M20 4c2 40 8 70 10 110" stroke="#6fa56a" stroke-width="3" fill="none"/>${[50, 58, 66].map((x) => `<path d="M${x} 10l-8 30" stroke="#9ab" stroke-width="1.5"/>`).join('')}<circle cx="52" cy="70" r="7" fill="#f6e3b4" stroke="${O}"/><path d="M38 66h28l-14-10z" fill="${RED}" stroke="${O}"/><path d="M46 78h12l4 30H42z" fill="#e9e2c8" stroke="${O}"/>`, '十一'),
  'hf-12': HF('#e9d3a0', `<path d="M40 112V70" stroke="#5a3b2a" stroke-width="5"/><path d="M14 74c10-20 42-20 52 0-10 10-42 10-52 0z" fill="#4E7B74" stroke="${O}"/><path d="M20 50c10-24 30-30 44-20-6 2-10 6-10 10 10-4 18 0 18 0-12 6-24 18-52 10z" fill="${RED}" stroke="${O}"/><circle cx="54" cy="34" r="2" fill="${O}"/>`, '十二'),
};

// ---------- Fußball / Elfmeter / Karuta ----------
export const sports: Record<string, string> = {
  soccer: wrap('0 0 200 110', `
    <rect width="200" height="110" rx="10" fill="#4f8a4b"/>
    <circle cx="100" cy="55" r="40" fill="none" stroke="#e8f3e3" stroke-width="3"/>
    <circle cx="70" cy="62" r="11" fill="${BLUE}" stroke="${O}" stroke-width="2"/><text x="70" y="66" font-size="11" text-anchor="middle" fill="#fff" font-family="Fredoka, sans-serif">DU</text>
    <circle cx="130" cy="48" r="11" fill="${RED}" stroke="${O}" stroke-width="2"/>
    <circle cx="88" cy="70" r="5" fill="#fff" stroke="${O}" stroke-width="1.5"/>
    <path d="M118 50l-18 8" stroke="${GOLD}" stroke-width="3" stroke-dasharray="4 3"/>`),
  penalty: wrap('0 0 200 110', `
    <rect width="200" height="110" rx="10" fill="#4f8a4b"/>
    <path d="M30 20h140v60H30z" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="4"/>
    <path d="M30 20l20 14h100l20-14M50 34v46M150 34v46" stroke="rgba(255,255,255,.5)" stroke-width="1.5" fill="none"/>
    <circle cx="100" cy="56" r="10" fill="${GOLD}" stroke="${O}" stroke-width="2"/>
    <path d="M86 66l-12 12M114 66l12 12M100 66v14" stroke="${GOLD}" stroke-width="6"/>
    <circle cx="100" cy="98" r="6" fill="#fff" stroke="${O}" stroke-width="1.5"/>`),
  karuta: wrap('0 0 200 110', `
    <rect width="200" height="110" rx="10" fill="#c9a774"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${18 + i * 44}" y="24" width="34" height="50" rx="4" fill="${PAPER}" stroke="${O}" stroke-width="2" transform="rotate(${(i - 1.5) * 4} ${35 + i * 44} 49)"/>`).join('')}
    <path d="M150 86l18-18 8 8-18 18z" fill="#f2cfa9" stroke="${O}" stroke-width="2"/>`),
  leaf: leaves.maple,
};

// ---------- Weltkarte Region 1 (schematisch), viewBox 1000x820 ----------
export const mapBase = wrap('0 0 1000 820" preserveAspectRatio="none', `
  <defs>
    <pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d="M0 0v14" stroke="rgba(244,182,63,.12)" stroke-width="6"/></pattern>
  </defs>
  <rect width="1000" height="820" fill="#12213F"/>
  <path d="M0 0h1000v170c-80 30-160 20-240 40s-170-10-260 10-200 10-300 0S80 200 0 180z" fill="#1c3b4a"/>
  <path d="M0 40h1000v60c-120 30-260 10-380 30S300 120 180 140 40 130 0 130z" fill="#22495a"/>
  <path d="M0 780c80-30 150-36 220-20 50 12 70 40 110 60H0z" fill="#0a1a33"/>
  <path d="M0 760c60-20 130-26 200-12" stroke="#1F4B8F" stroke-width="3" fill="none" opacity=".6"/>
  <path d="M520 0c-10 120 30 220 60 320s40 240 120 360c40 60 120 110 160 140" stroke="#2E5BA6" stroke-width="9" fill="none" opacity=".75"/>
  <path d="M1000 600c-120 40-200 120-260 220" stroke="#2E5BA6" stroke-width="14" fill="none" opacity=".8"/>
  <path d="M300 0c20 160 10 300 60 440s40 260 30 380" stroke="#2E5BA6" stroke-width="5" fill="none" opacity=".55"/>
  <path d="M120 200c40 120 60 260 40 420" stroke="#2E5BA6" stroke-width="4" fill="none" opacity=".45"/>
  <path d="M640 180c60 10 160 40 300 20v220c-120 10-220-10-300-40z" fill="url(#hatch)"/>
  <text x="980" y="800" font-size="22" text-anchor="end" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Kita ↘</text>
  <text x="40" y="808" font-size="22" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Bucht von Ōsaka</text>
  <text x="500" y="34" font-size="22" text-anchor="middle" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Hokusetsu-Berge</text>
  <text x="880" y="676" font-size="20" text-anchor="middle" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Yodo-gawa</text>`);

// ---------- Region 2: weitere Nahaufnahmen ----------
Object.assign(closeups, {
  espresso: C(`
    <rect width="200" height="150" fill="#3b2f2a"/>
    <rect x="40" y="10" width="120" height="34" rx="6" fill="#c9ced6" stroke="${O}" stroke-width="2"/>
    <rect x="86" y="44" width="28" height="14" fill="#8d939c" stroke="${O}" stroke-width="2"/>
    <path d="M60 52h80" stroke="#5a3b2a" stroke-width="8"/>
    <path class="stream" d="M96 58v52M104 58v52" stroke="#9b5a2b" stroke-width="3"/>
    <path d="M74 108h52l-6 26H80z" fill="#fff" stroke="${O}" stroke-width="2"/>
    <path d="M126 114c10 0 10 14 0 14" fill="none" stroke="${O}" stroke-width="3"/>
    <ellipse cx="100" cy="110" rx="24" ry="4" fill="#c58a4b"/>
    <circle cx="150" cy="27" r="9" fill="#fff" stroke="${O}" stroke-width="2"/><path d="M150 27l5-5" stroke="${RED}" stroke-width="2"/>`),
  stationsign: C(`
    <rect width="200" height="150" fill="#4a3426"/>
    <rect x="20" y="24" width="160" height="70" rx="6" fill="${PAPER}" stroke="${O}" stroke-width="3"/>
    <text x="100" y="56" font-size="20" text-anchor="middle" font-family="Noto Sans JP, sans-serif" font-weight="700" fill="${NAVY}">てんろく</text>
    <text x="100" y="80" font-size="10" text-anchor="middle" font-family="Manrope, sans-serif" fill="${O}">Tenroku · ab 1925 Endbahnhof einer Vorortbahn</text>
    <path d="M20 106h160" stroke="#b5651d" stroke-width="10"/><path d="M20 122h160" stroke="#7a4fa0" stroke-width="10"/>
    <text x="100" y="142" font-size="9" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif">heute: U-Bahn Sakaisuji- & Tanimachi-Linie</text>`),
  routemap: C(`
    <rect width="200" height="150" fill="#fff"/>
    <text x="100" y="18" font-size="10" text-anchor="middle" font-family="Manrope, sans-serif" fill="${NAVY}" font-weight="700">Ōsaka ⇄ Kōbe</text>
    <path d="M20 50h160" stroke="#7a1f2b" stroke-width="7"/><path d="M20 100h160" stroke="#1F4B8F" stroke-width="7"/>
    ${[20, 75, 125, 180].map((x) => `<circle cx="${x}" cy="50" r="6" fill="#fff" stroke="#7a1f2b" stroke-width="3"/><circle cx="${x}" cy="100" r="6" fill="#fff" stroke="#1F4B8F" stroke-width="3"/>`).join('')}
    <text x="100" y="40" font-size="9" text-anchor="middle" font-family="Manrope, sans-serif" fill="#7a1f2b">Hankyū Kōbe-Linie (am Berghang)</text>
    <text x="100" y="122" font-size="9" text-anchor="middle" font-family="Manrope, sans-serif" fill="#1F4B8F">Hanshin-Hauptlinie (an der Küste)</text>
    <text x="20" y="140" font-size="8" font-family="Manrope, sans-serif" fill="${O}">Umeda</text><text x="180" y="140" font-size="8" text-anchor="end" font-family="Manrope, sans-serif" fill="${O}">Kōbe</text>`),
  bookspine: C(`
    <rect width="200" height="150" fill="#5a3b2a"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${20 + i * 28}" y="20" width="24" height="112" fill="${['#7a2a24', '#2E5BA6', '#4E7B74', '#d4a349', '#6b4f7a', '#8a5a3a'][i]}" stroke="${O}"/>`).join('')}
    <rect x="76" y="14" width="32" height="122" fill="${PAPER}" stroke="${GOLD}" stroke-width="3"/>
    ${['善', 'の', '研', '究'].map((k, i) => `<text x="92" y="${44 + i * 22}" font-size="16" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${O}">${k}</text>`).join('')}`),
  photobook: C(`
    <rect width="200" height="150" fill="#6e4a32"/>
    <path d="M20 22h78v106H20zM102 22h78v106h-78z" fill="${PAPER}" stroke="${O}" stroke-width="2"/>
    <rect x="28" y="32" width="62" height="48" fill="#8c8170"/><path d="M28 70l16-14 14 10 12-8 20 14v8H28z" fill="#5f574c"/>
    <path d="M30 64c20-6 40 4 58-2" stroke="#c9d6ec" stroke-width="3" fill="none"/>
    <rect x="110" y="32" width="62" height="48" fill="#8c8170"/><path d="M118 74h46v-20l-23-12-23 12z" fill="#5f574c"/>
    <text x="59" y="100" font-size="8" text-anchor="middle" font-family="Manrope, sans-serif" fill="${O}">Nakanoshima, um 1925</text>
    <text x="141" y="100" font-size="8" text-anchor="middle" font-family="Manrope, sans-serif" fill="${O}">Bibliothek, 1904</text>`),
  woodblock: C(`
    <rect width="200" height="150" fill="#3e2b20"/>
    <rect x="30" y="20" width="140" height="96" rx="4" fill="#b88a5a" stroke="${O}" stroke-width="3"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${150 - i * 20} 30v74" stroke="#7a5432" stroke-width="5" stroke-dasharray="6 4"/>`).join('')}
    <path d="M40 124h120" stroke="#1c1c1c" stroke-width="5"/>
    <text x="100" y="142" font-size="9" text-anchor="middle" fill="#f3e3c8" font-family="Manrope, sans-serif">Spiegelverkehrt geschnitzte Schrift</text>`),
  heron: C(`
    <rect y="80" width="200" height="70" fill="#7fb2c9"/>
    <path d="M0 80h200" stroke="#5d8fa6" stroke-width="3"/>
    <rect y="0" width="200" height="60" fill="#b9ab8f"/>
    ${[0,1,2,3,4].map((i) => `<path d="M${i*44} 0v60M${i*44+22} 20v40" stroke="#8f8268" stroke-width="2"/>`).join('')}
    <path d="M0 60h200v20H0z" fill="#9fb48a"/>
    <path d="M110 128v-38M118 128v-38" stroke="${O}" stroke-width="3"/>
    <path d="M100 92c-6-18 4-34 22-34 10 0 18 6 20 14l-14 20z" fill="#e9ecee" stroke="${O}" stroke-width="2.5"/>
    <path d="M128 60c2-14-4-24-12-28" stroke="${O}" stroke-width="5" fill="none"/>
    <path d="M114 30l-26 6 26 2" fill="${GOLD}" stroke="${O}" stroke-width="2"/>
    <circle cx="117" cy="31" r="1.6" fill="${O}"/>
    <path d="M30 120c10-6 30-6 40 0M150 132c10-5 26-5 36 0" stroke="#e6f1f6" stroke-width="2" fill="none"/>`),
  noticeboard: C(`
    <rect x="20" y="14" width="160" height="122" rx="6" fill="#7a5a3a" stroke="${O}" stroke-width="3"/>
    <rect x="30" y="24" width="140" height="102" fill="#e9e1cc"/>
    <rect x="40" y="32" width="58" height="40" fill="#fff" stroke="${O}"/>
    <rect x="108" y="32" width="52" height="54" fill="#fff8d8" stroke="${O}"/>
    <text x="134" y="52" font-size="12" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${O}">三方</text>
    <text x="134" y="70" font-size="12" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${RED}">よし</text>
    <path d="M46 42h46M46 50h40M46 58h44" stroke="#9a9a9a" stroke-width="3"/>
    <rect x="40" y="80" width="58" height="38" fill="#fff" stroke="${O}"/>
    <path d="M46 90h46M46 98h30M46 106h40" stroke="#9a9a9a" stroke-width="3"/>
    <circle cx="69" cy="30" r="3" fill="${RED}"/><circle cx="134" cy="30" r="3" fill="${BLUE}"/>`),
  otemaesign: C(`
    <rect width="200" height="150" fill="#d9d2c3"/>
    <path d="M40 140V40l10-10h100l10 10v100z" fill="#cfc8b8" stroke="${O}" stroke-width="3"/>
    ${['大', '手', '前'].map((k, i) => `<text x="100" y="${68 + i * 30}" font-size="26" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="#3b3a36">${k}</text>`).join('')}
    <text x="100" y="138" font-size="9" text-anchor="middle" font-family="Manrope, sans-serif" fill="#3b3a36">ŌTE · MAE</text>`),
  scroll: C(`
    <rect x="18" y="30" width="164" height="90" fill="#f4ecd6" stroke="${O}" stroke-width="2"/>
    <rect x="10" y="26" width="12" height="98" rx="5" fill="#7a3b22" stroke="${O}" stroke-width="2"/>
    <rect x="178" y="26" width="12" height="98" rx="5" fill="#7a3b22" stroke="${O}" stroke-width="2"/>
    ${[0,1,2,3,4,5,6,7].map((i) => `<path d="M${160 - i * 17} 42v64" stroke="#3b3a36" stroke-width="3" stroke-dasharray="6 4"/>`).join('')}
    <rect x="34" y="88" width="18" height="18" fill="none" stroke="${RED}" stroke-width="3"/>`),
  liontooth: C(`
    <rect width="200" height="150" fill="#7d9585"/>
    <path d="M0 0h200v60c-30 10-70 10-100 0S30 50 0 60z" fill="#8fa898"/>
    <circle cx="60" cy="30" r="16" fill="${GOLD}" stroke="${O}" stroke-width="3"/><circle cx="60" cy="30" r="6" fill="${O}"/>
    <circle cx="140" cy="30" r="16" fill="${GOLD}" stroke="${O}" stroke-width="3"/><circle cx="140" cy="30" r="6" fill="${O}"/>
    <rect x="20" y="78" width="160" height="72" fill="#2a2420"/>
    <path d="M30 76l14 44 14-44zM142 76l14 44 14-44z" fill="#e2c46a" stroke="${O}" stroke-width="3"/>
    <path d="M70 76l8 22 8-22zM114 76l8 22 8-22z" fill="#e2c46a" stroke="${O}" stroke-width="2"/>`),
  tsuna: C(`
    <rect width="200" height="150" fill="#2a2420"/>
    <path d="M0 40c40 18 160 18 200 0" stroke="#d9c48a" stroke-width="16" fill="none"/>
    <path d="M0 40c40 18 160 18 200 0" stroke="#a88d4c" stroke-width="3" stroke-dasharray="10 8" fill="none"/>
    ${[40, 80, 120, 160].map((x) => `<path d="M${x} 52l-6 12 12 8-12 8 12 8" stroke="#fff" stroke-width="5" fill="none"/>`).join('')}
    <path d="M20 120c50-12 110-12 160 0" stroke="#d9c48a" stroke-width="10" fill="none"/>
    <circle cx="30" cy="120" r="8" fill="${RED}"/><circle cx="170" cy="120" r="8" fill="${BLUE}"/>`),
  flyer: C(`
    <rect x="45" y="8" width="110" height="134" fill="#1f1b2e" stroke="${O}" stroke-width="3"/>
    <text x="100" y="34" font-size="15" text-anchor="middle" font-family="Fredoka, sans-serif" fill="${GOLD}">LIVE</text>
    <text x="100" y="52" font-size="12" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="#fff">ライブ</text>
    <path d="M70 110l20-40 20 40M84 96h12" stroke="#ff6b8b" stroke-width="5" fill="none"/>
    <path d="M118 70v40l18-8" stroke="#62d2ff" stroke-width="5" fill="none"/>
    <text x="100" y="132" font-size="10" text-anchor="middle" font-family="Manrope, sans-serif" fill="#fff">NANIWA DOCKS · SA 19:00</text>`),
  shisa: C(`
    <rect width="200" height="150" fill="#d7c9a8"/>
    <rect x="40" y="110" width="120" height="30" fill="#b35a3a" stroke="${O}" stroke-width="3"/>
    <path d="M70 110c-10-30 0-70 30-74 30 4 40 44 30 74z" fill="#c9783e" stroke="${O}" stroke-width="3"/>
    <path d="M66 50c-6-14 2-24 12-22M134 50c6-14-2-24-12-22" stroke="${O}" stroke-width="4" fill="none"/>
    <circle cx="88" cy="60" r="7" fill="#fff" stroke="${O}" stroke-width="2"/><circle cx="112" cy="60" r="7" fill="#fff" stroke="${O}" stroke-width="2"/>
    <circle cx="88" cy="60" r="3" fill="${O}"/><circle cx="112" cy="60" r="3" fill="${O}"/>
    <path d="M82 80h36c-4 14-32 14-36 0z" fill="${RED}" stroke="${O}" stroke-width="2"/><path d="M88 80v6M112 80v6" stroke="#fff" stroke-width="3"/>`),
  cartridge: C(`
    <rect width="200" height="150" fill="#b48a58"/>
    ${[0, 1, 2].map((i) => `<rect x="${24 + i * 54}" y="${46 + (i % 2) * 6}" width="46" height="62" rx="4" fill="#9a9a9a" stroke="${O}" stroke-width="2"/><rect x="${30 + i * 54}" y="${54 + (i % 2) * 6}" width="34" height="26" fill="${['#e85a5a', '#5a8ae8', '#e8c05a'][i]}"/>`).join('')}
    <text x="100" y="134" font-size="12" text-anchor="middle" font-family="Fredoka, sans-serif" fill="${O}">BARGAIN ¥500</text>`),
  tshirt: C(`
    <rect width="200" height="150" fill="#6b4a32"/>
    <path d="M60 30l-30 20 14 22 16-8v66h80V64l16 8 14-22-30-20c-8 10-22 14-40 14s-32-4-40-14z" fill="#f2d14a" stroke="${O}" stroke-width="3"/>
    <circle cx="100" cy="82" r="18" fill="#fff" stroke="${O}" stroke-width="2"/>
    <circle cx="94" cy="80" r="3" fill="${O}"/><circle cx="106" cy="80" r="3" fill="${O}"/><path d="M93 89c4 4 10 4 14 0" stroke="${O}" stroke-width="2" fill="none"/>
    <text x="100" y="120" font-size="9" text-anchor="middle" font-family="Fredoka, sans-serif" fill="${O}">1994 TOUR</text>`),
  modelkit: C(`
    <rect width="200" height="150" fill="#cfe0ea"/>
    <rect x="30" y="30" width="140" height="90" fill="#fff" stroke="${O}" stroke-width="3"/>
    <rect x="30" y="30" width="140" height="22" fill="${RED}"/>
    <text x="100" y="46" font-size="12" text-anchor="middle" font-family="Fredoka, sans-serif" fill="#fff">1/100 · 1982</text>
    <path d="M80 110l10-40h20l10 40M90 70l-14-10M110 70l14-10M95 58h10v12H95z" stroke="${BLUE}" stroke-width="6" fill="none"/>`),
  capshelf: C(`
    <rect width="200" height="150" fill="#7a5235"/>
    <path d="M10 70h180M10 120h180" stroke="#4d3220" stroke-width="6"/>
    <path d="M30 66c0-20 40-20 40 0z" fill="#3f8c6b" stroke="${O}" stroke-width="2"/><path d="M66 66h18" stroke="${O}" stroke-width="5"/>
    <path d="M110 66c0-22 44-22 44 0h-44z" fill="#d35f3a" stroke="${O}" stroke-width="2"/>
    <path d="M40 116V88h40v28zM40 88c4-10 36-10 40 0" fill="#e9dfc7" stroke="${O}" stroke-width="2"/>
    <text x="60" y="108" font-size="10" text-anchor="middle" font-family="Fredoka, sans-serif" fill="${O}">BAG</text>
    <text x="140" y="108" font-size="14" text-anchor="middle" font-family="Fredoka, sans-serif" fill="${GOLD}">¥300</text>`),
  charm: C(`
    <rect width="200" height="150" fill="#efe3c8"/>
    <path d="M100 18v22" stroke="${O}" stroke-width="3"/><circle cx="100" cy="16" r="6" fill="none" stroke="${RED}" stroke-width="3"/>
    <rect x="70" y="40" width="60" height="90" rx="10" fill="${RED}" stroke="${O}" stroke-width="3"/>
    <rect x="80" y="54" width="40" height="62" fill="#f6e3a6"/>
    <text x="100" y="80" font-size="14" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${O}">お</text>
    <text x="100" y="102" font-size="14" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${O}">まもり</text>`),
  momiji: C(`
    <rect width="200" height="150" fill="#3e6b4a"/>
    ${[[60, 60, 1.2, '#d6402b'], [130, 50, 1, '#e8862e'], [100, 105, 1.4, '#c8331f']].map(([x, y, k, c]) => `<path transform="translate(${x} ${y}) scale(${k})" d="M0 -30l6 18 18-10-8 18 20 2-18 10 6 14-16-8-8 16-8-16-16 8 6-14-18-10 20-2-8-18 18 10z" fill="${c}" stroke="${O}" stroke-width="1.5"/>`).join('')}`),
  filterpaper: C(`
    <rect width="200" height="150" fill="#e9e4da"/>
    ${[0, 1, 2].map((i) => `<path d="M${50 + i * 8} ${40 + i * 6}l50 0 -10 60h-30z" fill="#fffdf6" stroke="${O}" stroke-width="2"/>`).join('')}
    <text x="100" y="134" font-size="11" text-anchor="middle" font-family="Fredoka, sans-serif" fill="${O}">FILTER · 1–2 CUPS</text>`),
  katsuobushi: C(`
    <rect width="200" height="150" fill="#d9c7a3"/>
    <path d="M40 90c20-40 100-40 120 0-20 20-100 20-120 0z" fill="#6b3f1f" stroke="${O}" stroke-width="3"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${50 + i * 18} 120c6-10 14-10 18 0" fill="#f1c99a" stroke="#b88552" stroke-width="2"/>`).join('')}
    <text x="100" y="40" font-size="13" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${O}">かつおぶし</text>`),
  artbook: C(`
    <rect width="200" height="150" fill="#2a2c44"/>
    <rect x="50" y="20" width="100" height="112" fill="#111" stroke="${GOLD}" stroke-width="3"/>
    <circle cx="100" cy="66" r="26" fill="none" stroke="#62d2ff" stroke-width="4"/>
    <path d="M74 66h52M100 40v52" stroke="#62d2ff" stroke-width="2"/>
    <text x="100" y="118" font-size="11" text-anchor="middle" font-family="Fredoka, sans-serif" fill="${GOLD}">SPACE · ARTBOOK</text>`),
  program: C(`
    <rect width="200" height="150" fill="#3b1f1a"/>
    <rect x="50" y="18" width="100" height="116" fill="#f3ead2" stroke="${O}" stroke-width="3"/>
    <text x="100" y="44" font-size="14" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${RED}">ぶんらく</text>
    <circle cx="100" cy="78" r="12" fill="#f7efe0" stroke="${O}" stroke-width="2"/>
    <path d="M70 120c4-24 56-24 60 0" fill="#7a2d2d" stroke="${O}" stroke-width="2"/>
    <path d="M60 92c10-8 14-8 18 0M140 92c-10-8-14-8-18 0" stroke="#222" stroke-width="6"/>`),
  shoes: C(`
    <rect width="200" height="150" fill="#cfd9cc"/>
    <path d="M30 100c0-24 20-34 40-30l30 14c20 4 40 8 50 16v14H30z" fill="#1F4B8F" stroke="${O}" stroke-width="3"/>
    <path d="M30 114h120" stroke="${O}" stroke-width="3"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${40 + i * 16} 114v8" stroke="${O}" stroke-width="4"/>`).join('')}
    <path d="M60 82l40 18" stroke="#fff" stroke-width="4"/>`),
  manga: C(`
    <rect width="200" height="150" fill="#0f3550"/>
    <rect x="55" y="16" width="90" height="120" fill="#fff" stroke="${O}" stroke-width="3"/>
    <path d="M60 30h80v40H60zM60 76h38v54H60zM104 76h36v54h-36z" fill="none" stroke="${O}" stroke-width="2"/>
    <path d="M70 52c20-12 40-12 60 0-20 12-40 12-60 0z" fill="#8aa7c2" stroke="${O}" stroke-width="2"/>
    <text x="100" y="146" font-size="9" text-anchor="middle" font-family="Fredoka, sans-serif" fill="#fff">KINDAI MAGURO</text>`),
  wagashi: C(`
    <rect width="200" height="150" fill="#e9dcc4"/>
    <ellipse cx="100" cy="100" rx="70" ry="22" fill="#fff" stroke="${O}" stroke-width="2"/>
    <path d="M64 96c0-26 20-36 36-36s36 10 36 36z" fill="#f2b8c6" stroke="${O}" stroke-width="2"/>
    <path d="M86 70c6 6 22 6 28 0" stroke="#3e6b4a" stroke-width="4" fill="none"/>
    <text x="100" y="36" font-size="13" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${O}">わがし</text>`),
  dish: C(`
    <rect width="200" height="150" fill="#3b2a20"/>
    <ellipse cx="100" cy="100" rx="78" ry="26" fill="#f3ead2" stroke="${O}" stroke-width="3"/>
    ${[[70, 88], [100, 82], [130, 88], [85, 104], [115, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#c98a3a" stroke="${O}" stroke-width="2"/><path d="M${x - 9} ${y - 4}c6 -6 12 -6 18 0" stroke="#5a2a14" stroke-width="3" fill="none"/>`).join('')}
    <path d="M60 60c4-12 10-12 14 0M120 54c4-12 10-12 14 0" stroke="#e8e2d0" stroke-width="2" fill="none" opacity=".7"/>`),
  gateplaque: C(`
    <rect width="200" height="150" fill="#a5532d"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M0 ${i * 22}h200" stroke="#8c4122" stroke-width="2"/>`).join('')}
    <rect x="66" y="12" width="68" height="126" fill="#3a2a1e" stroke="${GOLD}" stroke-width="4"/>
    ${['関', '西', '大', '学'].map((k, i) => `<text x="100" y="${42 + i * 28}" font-size="22" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${GOLD}">${k}</text>`).join('')}`),
  clocktower: C(`
    <rect width="200" height="150" fill="#bfe1f3"/>
    <path d="M70 150V50h60v100z" fill="#fbf6ea" stroke="${O}" stroke-width="2"/>
    <path d="M78 50l22-30 22 30z" fill="#b5523a" stroke="${O}" stroke-width="2"/>
    <circle cx="100" cy="74" r="14" fill="#fff" stroke="${O}" stroke-width="2"/><path d="M100 74v-9M100 74l6 4" stroke="${O}" stroke-width="2"/>
    <path d="M84 104h32v46H84z" fill="#d9cdb4" stroke="${O}"/><path d="M90 150v-30a10 10 0 0 1 20 0v30" fill="#6b4f3a"/>
    <path d="M0 150v-26h70M130 124h70v26" fill="#fbf6ea" stroke="${O}" stroke-width="2"/><path d="M0 124l20-10h50M130 114h50l20 10" fill="#b5523a" stroke="${O}"/>`),
  dictionary: C(`
    <rect width="200" height="150" fill="#e4dccb"/>
    <path d="M50 20h100v110H50z" fill="#7a2a24" stroke="${O}" stroke-width="3"/>
    <path d="M58 28h84v94H58z" fill="none" stroke="${GOLD}" stroke-width="2"/>
    <text x="100" y="70" font-size="16" text-anchor="middle" font-family="Noto Sans JP, sans-serif" fill="${GOLD}" font-weight="700">大阪ことば</text>
    <text x="100" y="92" font-size="9" text-anchor="middle" font-family="Manrope, sans-serif" fill="${PAPER}">Wörterbuch</text>`),
  register: C(`
    <rect width="200" height="150" fill="#e4dccb"/>
    <path d="M40 18h120v114H40z" fill="#f3ead3" stroke="${O}" stroke-width="2"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${140 - i * 15} 30v90" stroke="#3d3a35" stroke-width="2" stroke-dasharray="3 5"/>`).join('')}
    <text x="100" y="142" font-size="9" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Abschrift: Schülerliste der Tekijuku</text>`),
});

// ---------- Quiz-Karten (viewBox 200x150, Punkte in %) ----------
export const quizMaps: Record<string, string> = {
  canals: wrap('0 0 200 150" preserveAspectRatio="none', `
    <rect width="200" height="150" fill="#e8e2d0"/>
    <path d="M200 18c-20 8-34 22-46 44" stroke="#5f97c9" stroke-width="12" fill="none"/>
    <path d="M154 62C120 56 60 58 0 54" stroke="#5f97c9" stroke-width="8" fill="none"/>
    <path d="M154 62c-30 22-90 28-154 28" stroke="#5f97c9" stroke-width="8" fill="none"/>
    <path d="M140 84v52" stroke="#5f97c9" stroke-width="5" fill="none"/>
    <path d="M10 130h132" stroke="#5f97c9" stroke-width="6" fill="none"/>
    <path d="M28 62c40 2 80 2 116 2-30 16-70 20-116 20z" fill="#cfe0b8" stroke="${O}" stroke-width="1"/>
    ${[40, 70, 100, 125].map((x) => `<path d="M${x} 50v12M${x} 82v12" stroke="${O}" stroke-width="2"/>`).join('')}
    <text x="6" y="146" font-size="7" fill="${O}" font-family="Manrope, sans-serif">N ↑</text>`),
  monorail: wrap('0 0 200 150" preserveAspectRatio="none', `
    <rect width="200" height="150" fill="#f3f1ea"/>
    <path d="M10 108C50 92 80 90 120 84s50-20 70-26" stroke="#1F4B8F" stroke-width="6" fill="none"/>
    <path d="M142 80c-4-20-6-40-2-64" stroke="#3A72C8" stroke-width="5" fill="none" stroke-dasharray="1 0"/>
    <text x="100" y="140" font-size="8" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Ōsaka Monorail · Hauptlinie (dunkel) · Saito-Linie (hell)</text>`),
  bay: wrap('0 0 200 150" preserveAspectRatio="none', `
    <rect width="200" height="150" fill="#e8e2d0"/>
    <path d="M0 0h70c-6 30-4 70 8 150H0z" fill="#8fb8cf"/>
    <path d="M200 26C140 30 100 30 66 34" stroke="#5f97c9" stroke-width="9" fill="none"/>
    <path d="M200 74C150 70 110 72 72 76" stroke="#5f97c9" stroke-width="5" fill="none"/>
    <path d="M200 118C150 112 110 116 76 122" stroke="#5f97c9" stroke-width="5" fill="none"/>
    <path d="M30 60h26v18H30zM24 96h30v22H24z" fill="#cfc39f" stroke="${O}" stroke-width="1"/>
    <text x="196" y="146" font-size="7" text-anchor="end" fill="${O}" font-family="Manrope, sans-serif">Innenstadt →</text>
    <text x="6" y="146" font-size="7" fill="${O}" font-family="Manrope, sans-serif">Bucht von Ōsaka</text>`),
  umeda: wrap('0 0 200 150" preserveAspectRatio="none', `
    <rect width="200" height="150" fill="#3b3428"/>
    <path d="M100 10v130M20 75h160M50 30l100 90M150 30L50 120" stroke="#d7c9a8" stroke-width="12" stroke-linecap="square"/>
    <circle cx="100" cy="75" r="18" fill="#d7c9a8"/>
    <text x="100" y="79" font-size="9" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Du</text>`),
};

// ---------- Weltkarte Region 2 (Kita & Nakanoshima), viewBox 1000x820 ----------
export const mapBaseR2 = wrap('0 0 1000 820" preserveAspectRatio="none', `
  <rect width="1000" height="820" fill="#12213F"/>
  <path d="M1000 260c-120 60-200 160-260 330" stroke="#2E5BA6" stroke-width="34" fill="none" opacity=".85"/>
  <path d="M740 590C560 600 300 590 0 600" stroke="#2E5BA6" stroke-width="22" fill="none" opacity=".8"/>
  <path d="M740 590c-40 60-300 120-740 130" stroke="#2E5BA6" stroke-width="22" fill="none" opacity=".8"/>
  <path d="M120 612C300 606 560 612 720 604c-30 40-300 90-600 98z" fill="#1c3b4a"/>
  <path d="M0 380h1000" stroke="#5a6570" stroke-width="10" stroke-dasharray="26 10" opacity=".7"/>
  <path d="M410 0v380" stroke="#5a6570" stroke-width="8" stroke-dasharray="20 10" opacity=".6"/>
  <path d="M780 0v820" stroke="#5a6570" stroke-width="6" stroke-dasharray="14 10" opacity=".45"/>
  <text x="980" y="250" font-size="22" text-anchor="end" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Ōkawa</text>
  <text x="40" y="585" font-size="20" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Dōjima-gawa</text>
  <text x="40" y="760" font-size="20" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Tosabori-gawa</text>
  <text x="440" y="664" font-size="22" fill="rgba(243,241,234,.4)" font-family="Fredoka, sans-serif">Nakanoshima</text>
  <text x="20" y="370" font-size="18" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">JR / Hankyū / Hanshin</text>
  <text x="790" y="40" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Tenjinbashisuji ↕</text>
  <text x="980" y="806" font-size="22" text-anchor="end" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Burg ↘</text>`);

export const mapBaseR3 = wrap('0 0 1000 820" preserveAspectRatio="none', `
  <rect width="1000" height="820" fill="#12213F"/>
  <path d="M0 80C300 60 600 70 1000 40" stroke="#2E5BA6" stroke-width="34" fill="none" opacity=".85"/>
  <path d="M960 48c-30 120-60 260-40 420" stroke="#2E5BA6" stroke-width="16" fill="none" opacity=".7"/>
  <path d="M290 820V120" stroke="#5a6570" stroke-width="8" stroke-dasharray="20 10" opacity=".55"/>
  <rect x="380" y="200" width="380" height="330" rx="26" fill="#1a3350" stroke="#2E5BA6" stroke-width="22" opacity=".95"/>
  <rect x="470" y="270" width="190" height="170" rx="14" fill="#203d36" stroke="#2E5BA6" stroke-width="14"/>
  <path d="M545 330l20-22 20 22v34h-40z" fill="rgba(244,182,63,.45)"/>
  <path d="M120 820c30-200 60-420 150-700" stroke="rgba(243,241,234,.08)" stroke-width="120" fill="none"/>
  <text x="980" y="30" font-size="22" text-anchor="end" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Ōkawa</text>
  <text x="935" y="520" font-size="18" text-anchor="end" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Neya-gawa</text>
  <text x="300" y="790" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Tanimachi-suji ↕</text>
  <text x="70" y="300" font-size="20" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif" transform="rotate(-80 70 300)">Uemachi-Hochebene</text>
  <text x="570" y="510" font-size="18" text-anchor="middle" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Burggraben</text>
  <text x="20" y="40" font-size="20" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">↖ Kita / Nakanoshima</text>`);

export const mapBaseR4 = wrap('0 0 1000 820" preserveAspectRatio="none', `
  <rect width="1000" height="820" fill="#12213F"/>
  <path d="M0 0h130c-20 200-10 500 40 820H0z" fill="#1c3b5e"/>
  <path d="M130 400C260 380 330 340 420 300" stroke="#2E5BA6" stroke-width="22" fill="none" opacity=".85"/>
  <path d="M420 300c-20 120-70 260-140 520" stroke="#2E5BA6" stroke-width="18" fill="none" opacity=".75"/>
  <path d="M420 300C560 300 700 300 790 296" stroke="#2E5BA6" stroke-width="12" fill="none" opacity=".8"/>
  <path d="M600 0v820" stroke="#5a6570" stroke-width="10" stroke-dasharray="26 10" opacity=".6"/>
  <path d="M820 200H1000" stroke="#5a6570" stroke-width="8" stroke-dasharray="20 10" opacity=".55"/>
  <text x="30" y="200" font-size="22" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif" transform="rotate(-84 30 200)">Bucht von Ōsaka</text>
  <text x="200" y="365" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Aji-gawa</text>
  <text x="300" y="720" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Kizu-gawa</text>
  <text x="690" y="286" font-size="16" text-anchor="middle" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Dōtonbori-Kanal</text>
  <text x="608" y="800" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Midō-suji ↕</text>
  <text x="985" y="180" font-size="18" text-anchor="end" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Higashi-Ōsaka →</text>
  <text x="620" y="30" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">↑ Burg / Kita</text>`);

// ---------- Region 5: Nahaufnahmen ----------
Object.assign(closeups, {
  thermo: C(`
    <rect x="10" y="80" width="80" height="56" fill="#9aa1a8" stroke="${O}" stroke-width="2"/><text x="50" y="112" font-size="11" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Beton</text>
    <rect x="110" y="80" width="80" height="56" fill="#6fa56a" stroke="${O}" stroke-width="2"/><text x="150" y="112" font-size="11" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Grün</text>
    <rect x="44" y="14" width="12" height="56" rx="6" fill="#fff" stroke="${O}" stroke-width="2"/><rect x="47" y="22" width="6" height="46" fill="${RED}"/>
    <rect x="144" y="14" width="12" height="56" rx="6" fill="#fff" stroke="${O}" stroke-width="2"/><rect x="147" y="46" width="6" height="22" fill="${BLUE}"/>`),
  senbei: C(`
    <rect x="16" y="20" width="168" height="110" rx="8" fill="#f6efe0" stroke="${O}" stroke-width="2"/>
    <circle cx="62" cy="62" r="26" fill="#c98b45" stroke="${O}" stroke-width="2"/><rect x="50" y="56" width="24" height="12" fill="#1d2a22"/>
    <circle cx="136" cy="62" r="26" fill="#d9a35a" stroke="${O}" stroke-width="2"/><path d="M118 56c10 6 26 6 36 0" stroke="${O}" stroke-width="2" fill="none"/>
    <rect x="50" y="98" width="100" height="22" rx="4" fill="#f4c7cf" stroke="${O}" stroke-width="2"/><circle cx="74" cy="109" r="6" fill="#fff"/><circle cx="100" cy="109" r="6" fill="#9ccf8c"/><circle cx="126" cy="109" r="6" fill="#f7e38a"/>`),
  benishoga: C(`
    <path d="M60 30h80v12H60z" fill="#d7c9a8" stroke="${O}" stroke-width="2"/>
    <path d="M54 42h92l-6 88H60z" fill="#f3d9da" stroke="${O}" stroke-width="2"/>
    <path d="M68 70l60-10M66 86l66-6M70 104l58-4M72 118l52 2" stroke="#d6324a" stroke-width="7"/>
    <rect x="78" y="48" width="44" height="14" fill="#fff" stroke="${O}"/><text x="100" y="59" font-size="9" text-anchor="middle" fill="${O}">紅しょうが</text>`),
  purse: C(`
    <path d="M40 54h120v70H40z" fill="#7a4b8c" stroke="${O}" stroke-width="2"/>
    <path d="M40 54c0-22 120-22 120 0" fill="#8c5ca0" stroke="${O}" stroke-width="2"/>
    <circle cx="92" cy="38" r="6" fill="${GOLD}" stroke="${O}" stroke-width="2"/><circle cx="108" cy="38" r="6" fill="${GOLD}" stroke="${O}" stroke-width="2"/>
    <rect x="66" y="76" width="68" height="26" rx="4" fill="#fff" stroke="${O}"/><text x="100" y="93" font-size="10" text-anchor="middle" fill="${O}">ロッカー 18</text>`),
  wristband: C(`
    <ellipse cx="100" cy="76" rx="72" ry="30" fill="none" stroke="${RED}" stroke-width="16"/>
    <ellipse cx="100" cy="76" rx="72" ry="30" fill="none" stroke="${O}" stroke-width="2"/>
    <text x="100" y="54" font-size="10" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif">ALL NIGHT FES</text>`),
  grater: C(`
    <rect x="70" y="16" width="60" height="96" rx="6" fill="#c8a46a" stroke="${O}" stroke-width="2"/>
    <g fill="${O}">${Array.from({ length: 8 }, (_, r) => Array.from({ length: 5 }, (_, c) => `<circle cx="${80 + c * 10}" cy="${26 + r * 10}" r="1.6"/>`).join('')).join('')}</g>
    <rect x="88" y="112" width="24" height="28" rx="4" fill="#8c6a3a" stroke="${O}" stroke-width="2"/>`),
  bowl: C(`
    <path d="M34 60h132c0 40-30 62-66 62S34 100 34 60z" fill="#5c7f9a" stroke="${O}" stroke-width="2"/>
    <path d="M40 72c40 14 80 14 120 0" stroke="#d9e4ea" stroke-width="5" fill="none"/>
    <ellipse cx="100" cy="60" rx="66" ry="12" fill="#e9e1cf" stroke="${O}" stroke-width="2"/>
    <rect x="120" y="100" width="54" height="22" fill="#fff" stroke="${O}"/><text x="147" y="115" font-size="10" text-anchor="middle" fill="${RED}">300円</text>`),
  sutra: C(`
    <rect x="18" y="30" width="164" height="90" fill="#efe3c2" stroke="${O}" stroke-width="2"/>
    <rect x="10" y="26" width="10" height="98" rx="4" fill="#7a5230"/><rect x="180" y="26" width="10" height="98" rx="4" fill="#7a5230"/>
    <g stroke="${O}" stroke-width="2">${Array.from({ length: 12 }, (_, i) => `<path d="M${168 - i * 12} 40v${50 + (i % 3) * 8}" stroke-dasharray="4 3"/>`).join('')}</g>
    <circle cx="44" cy="104" r="8" fill="${RED}" opacity=".8"/>`),
  notebook: C(`
    <rect x="44" y="18" width="112" height="116" rx="4" fill="#2f4b6e" stroke="${O}" stroke-width="2"/>
    <rect x="56" y="30" width="88" height="40" fill="${PAPER}" stroke="${O}"/>
    <text x="100" y="47" font-size="10" text-anchor="middle" fill="${O}">研究ノート</text><text x="100" y="62" font-size="8" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Archiv · Bd. 3</text>
    <path d="M60 18v116" stroke="#1b2f47" stroke-width="4"/>`),
  garan: C(`
    <rect x="70" y="10" width="60" height="130" fill="#e6dccb" stroke="${O}" stroke-width="2"/>
    <rect x="84" y="118" width="32" height="14" fill="${RED}" stroke="${O}"/><text x="140" y="129" font-size="9" fill="${O}">Tor</text>
    <rect x="90" y="86" width="20" height="20" fill="${RED}" stroke="${O}"/><text x="140" y="99" font-size="9" fill="${O}">Pagode</text>
    <rect x="80" y="52" width="40" height="22" fill="${RED}" stroke="${O}"/><text x="140" y="66" font-size="9" fill="${O}">Haupthalle</text>
    <rect x="76" y="18" width="48" height="22" fill="${RED}" stroke="${O}"/><text x="140" y="32" font-size="9" fill="${O}">Lehrhalle</text>
    <path d="M100 8v134" stroke="${GOLD}" stroke-width="2" stroke-dasharray="4 4"/><text x="40" y="20" font-size="10" fill="${O}">N ↑</text>`),
  tomikuji: C(`
    <rect x="30" y="20" width="140" height="110" rx="8" fill="#8c6a3a" stroke="${O}" stroke-width="2"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${44 + i * 24}" y="40" width="16" height="70" fill="#efe3c2" stroke="${O}"/><text x="${52 + i * 24}" y="80" font-size="10" text-anchor="middle" fill="${O}">${'一二三四五'[i]}</text>`).join('')}`),
  sketchbook: C(`
    <rect x="36" y="20" width="128" height="112" rx="4" fill="#fff" stroke="${O}" stroke-width="2"/>
    <path d="M36 32h128" stroke="${O}" stroke-width="2"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${48 + i * 15}" cy="26" r="3" fill="none" stroke="${O}"/>`).join('')}
    <path d="M70 110V64l30-20 30 20v46M62 64h76M78 78h44M84 92h32" stroke="${O}" stroke-width="2" fill="none"/>
    <text x="150" y="126" font-size="9" text-anchor="end" fill="${O}" font-family="Manrope, sans-serif">Clara</text>`),
  honganji: C(`
    <rect width="200" height="150" fill="#cfd9c6"/>
    <path d="M20 120c20-60 140-60 160 0z" fill="#b59a6a" stroke="${O}" stroke-width="2"/>
    <path d="M30 118c18-48 122-48 140 0" fill="none" stroke="#5f97c9" stroke-width="6"/>
    <path d="M76 80l24-14 24 14v20H76z" fill="#8c6a3a" stroke="${O}" stroke-width="2"/><path d="M70 82l30-20 30 20" fill="none" stroke="${O}" stroke-width="3"/>
    <path d="M40 112v-16h8v16M152 112v-16h8v16" stroke="${O}" stroke-width="2" fill="#8c6a3a"/>`),
  shogiboard: C(`
    <rect x="30" y="16" width="140" height="118" fill="#e8c27a" stroke="#6b4a1f" stroke-width="4"/>
    ${Array.from({ length: 8 }, (_, i) => `<path d="M${30 + (i + 1) * 15.5} 16v118M30 ${16 + (i + 1) * 13}h140" stroke="#8a6427"/>`).join('')}
    <path d="M88 60l6-4 6 4 2 12H86z" fill="#f6e3b4" stroke="${O}"/><path d="M104 86l6-4 6 4 2 12h-16z" fill="#f6e3b4" stroke="${O}"/>`),
  kombu: C(`
    <path d="M30 40c40-20 100 20 140-6v76c-40 22-100-18-140 6z" fill="#2f3b2a" stroke="${O}" stroke-width="2"/>
    <path d="M40 60c40-14 80 14 120-4M40 84c40-14 80 14 120-4" stroke="#56684a" stroke-width="3" fill="none"/>
    <rect x="70" y="118" width="60" height="20" fill="#fff" stroke="${O}"/><text x="100" y="132" font-size="10" text-anchor="middle" fill="${O}">昆布</text>`),
  festivalposter: C(`
    <rect x="44" y="10" width="112" height="130" fill="#1f3b73" stroke="${O}" stroke-width="2"/>
    <path d="M44 110c30-10 80-10 112 0v30H44z" fill="#2E5BA6"/>
    <path d="M70 108h60l-6 10H76z" fill="${RED}" stroke="${O}"/><circle cx="80" cy="44" r="16" fill="none" stroke="${GOLD}" stroke-width="3"/><circle cx="124" cy="36" r="10" fill="none" stroke="#f4c7cf" stroke-width="3"/>
    <text x="100" y="80" font-size="16" font-weight="700" text-anchor="middle" fill="#fff">天神祭</text><text x="100" y="96" font-size="9" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif">24.–25. Juli</text>`),
  mural: C(`
    <rect width="200" height="150" fill="#e7d7b8"/>
    <circle cx="70" cy="70" r="36" fill="${GOLD}" stroke="${O}" stroke-width="3"/><circle cx="58" cy="62" r="5" fill="${O}"/><circle cx="82" cy="62" r="5" fill="${O}"/><path d="M52 82c10 12 26 12 36 0" stroke="${O}" stroke-width="3" fill="none"/>
    <path d="M118 40h62v44h-40l-14 12v-12h-8z" fill="#fff" stroke="${O}" stroke-width="2"/><text x="149" y="67" font-size="13" font-weight="700" text-anchor="middle" fill="${RED}">なんでやねん</text>`),
  omusign: C(`
    <rect width="200" height="150" fill="#bfe0a8"/>
    <text x="100" y="98" font-size="56" font-weight="800" text-anchor="middle" fill="#fff" stroke="${O}" stroke-width="3" font-family="Manrope, sans-serif">OMU</text>
    <text x="100" y="126" font-size="11" text-anchor="middle" fill="${O}">大阪公立大学 · 2022</text>`),
  harukas: C(`
    <rect width="200" height="150" fill="#2a2f5a"/>
    <path d="M78 140V40h18V20h14v20h12v30h8v70z" fill="#8fb4e0" stroke="${O}" stroke-width="2"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M82 ${50 + i * 10}h44" stroke="#f7e8a0" stroke-width="2" opacity=".8"/>`).join('')}
    <circle cx="160" cy="30" r="10" fill="#f7e8a0"/>`),
  scarf: C(`
    <path d="M40 40c40 20 80 20 120 0l6 24c-40 22-92 22-132 0z" fill="#e7a0b3" stroke="${O}" stroke-width="2"/>
    <path d="M120 58l20 70-20 6-12-66z" fill="#e7a0b3" stroke="${O}" stroke-width="2"/>
    <path d="M60 52l4 10M80 56l4 10M100 58v10M120 56l-2 10" stroke="#fff" stroke-width="3"/>`),
  ferrymap: C(`
    <rect width="200" height="150" fill="#d9e4ea"/>
    <path d="M0 50h200M0 104h200M66 0v150" stroke="#5f97c9" stroke-width="16"/>
    ${[[66, 50], [66, 104], [150, 50], [30, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="${RED}" stroke-width="3"/>`).join('')}
    <text x="140" y="140" font-size="10" text-anchor="middle" fill="${O}">渡船 · 無料</text>`),
  todplan: C(`
    <rect width="200" height="150" fill="#e8e2d0"/>
    <rect x="20" y="96" width="160" height="22" fill="#9aa1a8" stroke="${O}" stroke-width="2"/><text x="100" y="111" font-size="9" text-anchor="middle" fill="${O}">Gleise · Bahnhof</text>
    <rect x="26" y="30" width="40" height="66" fill="#c9ced6" stroke="${O}" stroke-width="2"/><rect x="134" y="20" width="40" height="76" fill="#c9ced6" stroke="${O}" stroke-width="2"/>
    <path d="M66 50h68" stroke="${O}" stroke-width="6"/><text x="100" y="44" font-size="8" text-anchor="middle" fill="${O}">Dach · Brücke</text>
    <rect x="20" y="120" width="160" height="16" fill="#7c6d5a"/><text x="100" y="132" font-size="8" text-anchor="middle" fill="#fff">U-Bahn · Ladenpassage</text>`),
  roastchart: C(`
    <rect x="22" y="12" width="156" height="126" fill="#24322c" stroke="#7a5230" stroke-width="6"/>
    ${[['#c69a5e', '浅煎り'], ['#8a5a32', '中煎り'], ['#3e2617', '深煎り']].map(([c, l], i) => `<ellipse cx="${60 + i * 40}" cy="58" rx="12" ry="16" fill="${c}"/><text x="${60 + i * 40}" y="96" font-size="10" text-anchor="middle" fill="#fff">${l}</text>`).join('')}
    <text x="100" y="124" font-size="9" text-anchor="middle" fill="#ddd" font-family="Manrope, sans-serif">hell · mittel · dunkel</text>`),
  lens: C(`
    <circle cx="100" cy="74" r="50" fill="#a9c7e8" stroke="${O}" stroke-width="4"/><circle cx="100" cy="74" r="40" fill="#cfe2f5" opacity=".8"/>
    <path d="M80 54c10-8 24-8 32 0" stroke="#fff" stroke-width="5" fill="none"/>
    <text x="100" y="140" font-size="9" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">ND-Filter 52 mm</text>`),
  ivy: C(`
    <rect width="200" height="150" fill="#c98b5a"/>
    ${Array.from({ length: 7 }, (_, r) => `<path d="M0 ${r * 22 + 10}h200" stroke="#a86d42" stroke-width="2"/>`).join('')}
    <path d="M20 150c20-50 40-80 80-100s60-40 80-50" stroke="#3d5a2a" stroke-width="3" fill="none"/>
    ${[[40, 110], [60, 86], [86, 64], [112, 46], [140, 30], [164, 16]].map(([x, y]) => `<path d="M${x} ${y}l8-8 8 8-8 10z" fill="#5c8a3a" stroke="${O}"/>`).join('')}`),
});

// ---------- Region 6: Nahaufnahmen ----------
Object.assign(closeups, {
  keyhole: C(`<rect width="200" height="150" fill="#7aa36a"/><path d="M100 18a34 34 0 0 1 22 60l26 52H52l26-52a34 34 0 0 1 22-60z" fill="#3f6b3a" stroke="#5f97c9" stroke-width="10"/><text x="100" y="146" font-size="9" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif">Draufsicht · Schlüssellochform</text>`),
  shimenawa: C(`<path d="M20 40c50 26 110 26 160 0" stroke="#c9b27a" stroke-width="14" fill="none"/><path d="M20 40c50 26 110 26 160 0" stroke="${O}" stroke-width="2" fill="none" stroke-dasharray="10 6"/>${[52, 84, 116, 148].map((x) => `<path d="M${x} 58l-8 12 16 6-8 12 16 6" stroke="${O}" stroke-width="2" fill="#fff"/>`).join('')}`),
  taikobashi: C(`<rect width="200" height="150" fill="#cfe2f5"/><path d="M0 120h200v30H0z" fill="#5f97c9"/><path d="M20 120C50 30 150 30 180 120" stroke="${RED}" stroke-width="12" fill="none"/>${[40, 60, 80, 100, 120, 140, 160].map((x) => `<path d="M${x} ${x < 100 ? 140 - x * 0.9 : 140 - (200 - x) * 0.9}v-16" stroke="${RED}" stroke-width="3"/>`).join('')}`),
  chawan: C(`<path d="M50 60h100c0 40-20 64-50 64S50 100 50 60z" fill="#3e3a36" stroke="${O}" stroke-width="2"/><ellipse cx="100" cy="60" rx="50" ry="12" fill="#6fa56a" stroke="${O}" stroke-width="2"/><path d="M80 58c10-4 30-4 40 0" stroke="#a8d39a" stroke-width="3" fill="none"/><path d="M150 40l20-24" stroke="#c8a46a" stroke-width="4"/>`),
  omikuji: C(`<rect x="60" y="10" width="80" height="130" fill="#fff" stroke="${O}" stroke-width="2"/><text x="100" y="40" font-size="22" font-weight="700" text-anchor="middle" fill="${RED}">大吉</text><text x="100" y="60" font-size="9" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">daikichi · großes Glück</text>${[76, 88, 100, 112].map((y) => `<path d="M70 ${y}h60" stroke="#aaa"/>`).join('')}`),
  kamon: C(`<rect width="200" height="150" fill="#2c2a2a"/>${[[55, 75], [145, 75]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="40" fill="none" stroke="${GOLD}" stroke-width="4"/>${i ? `<path d="M${x} ${y - 28}l8 20 20 2-16 12 6 20-18-12-18 12 6-20-16-12 20-2z" fill="${GOLD}"/>` : `<path d="M${x - 26} ${y + 10}c10-30 42-30 52 0M${x} ${y - 30}v50M${x - 16} ${y - 18}c4 10 28 10 32 0" stroke="${GOLD}" stroke-width="5" fill="none"/>`}`).join('')}`),
  sakaicraft: C(`<rect width="200" height="150" fill="#3a2f28"/><path d="M20 60h110l30-10v14l-30 6H20z" fill="#d9dde2" stroke="${O}" stroke-width="2"/><rect x="2" y="56" width="22" height="16" rx="3" fill="#5a3b2a"/><path d="M20 100h120l24-6v10l-24 4H20z" fill="#d9dde2" stroke="${O}" stroke-width="2"/><rect x="2" y="96" width="22" height="16" rx="3" fill="#5a3b2a"/>${[150, 160, 170, 180].map((x) => `<path d="M${x} 140V20" stroke="#8a5a32" stroke-width="3"/><path d="M${x} 20c-4-8 4-12 0-18" stroke="#ccc" fill="none"/>`).join('')}`),
  jomon: C(`<rect width="200" height="150" fill="#e8d6b8"/><path d="M60 140V50c0-30 80-30 80 0v90z" fill="#c98b5a" stroke="${O}" stroke-width="3"/><path d="M66 60c14 10 20-10 34 0s20-10 34 0M66 84c14 10 20-10 34 0s20-10 34 0M66 108c14 10 20-10 34 0s20-10 34 0" stroke="${O}" stroke-width="3" fill="none"/><path d="M52 40c-10-14 6-26 16-14M148 40c10-14-6-26-16-14" stroke="${O}" stroke-width="4" fill="none"/>`),
  teppo: C(`<rect width="200" height="150" fill="#d9c9a8"/><path d="M14 70h150l20-6v12l-20-2H14z" fill="#5a5a5a" stroke="${O}" stroke-width="2"/><path d="M40 74l-20 40h30l18-36z" fill="#8a5a32" stroke="${O}" stroke-width="2"/><text x="100" y="130" font-size="12" text-anchor="middle" fill="${O}">堺 · 鉄砲</text>`),
  yakisoba: C(`<rect x="10" y="60" width="180" height="70" rx="6" fill="#444" stroke="${O}" stroke-width="2"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${30 + i * 14} 80c10 10-6 20 4 34" stroke="#c98b45" stroke-width="5" fill="none"/>`).join('')}<circle cx="70" cy="90" r="5" fill="#5c8a3a"/><circle cx="130" cy="100" r="5" fill="${RED}"/><rect x="150" y="16" width="26" height="44" rx="4" fill="#5a3b2a" stroke="${O}"/><text x="163" y="44" font-size="9" text-anchor="middle" fill="#fff">ソース</text>`),
  crema: C(`<rect width="200" height="150" fill="#e8e2d0"/><path d="M70 30h60v90a10 10 0 0 1-10 10H80a10 10 0 0 1-10-10z" fill="#fff" opacity=".6" stroke="${O}" stroke-width="2"/><rect x="72" y="70" width="56" height="58" fill="#3b2418"/><rect x="72" y="58" width="56" height="14" fill="#c48a52"/><path d="M76 62c10 4 20-2 30 2s14-2 20 0" stroke="#e8b27a" stroke-width="2" fill="none"/>`),
  stampbook: C(`<rect x="24" y="16" width="152" height="118" rx="4" fill="${PAPER}" stroke="${O}" stroke-width="2"/><path d="M100 16v118" stroke="${O}"/>${[[50, 44], [76, 44], [50, 76], [76, 76], [124, 44], [150, 44], [124, 76], [150, 76], [124, 108]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="none" stroke="${RED}" stroke-width="3"/>`).join('')}<circle cx="150" cy="108" r="11" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="3 3"/>`),
  bell: C(`<rect width="200" height="150" fill="#d9d2c2"/><path d="M100 14v12" stroke="${O}" stroke-width="4"/><path d="M66 120V56c0-24 68-24 68 0v64z" fill="#6b5a3a" stroke="${O}" stroke-width="3"/><path d="M60 120h80" stroke="${O}" stroke-width="5"/><path d="M20 70h30" stroke="#8a6427" stroke-width="10"/><path d="M150 60c10 6 14 14 14 24M160 54c14 8 20 20 20 34" stroke="${O}" stroke-width="2" fill="none"/>`),
  akamon: C(`<rect width="200" height="150" fill="#cfe2f5"/><path d="M20 40l80-24 80 24z" fill="#3a3a3a"/><rect x="40" y="40" width="120" height="16" fill="${RED}" stroke="${O}"/><rect x="50" y="56" width="16" height="84" fill="${RED}" stroke="${O}"/><rect x="134" y="56" width="16" height="84" fill="${RED}" stroke="${O}"/><path d="M66 140h68" stroke="#999" stroke-width="6"/><text x="100" y="106" font-size="9" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">Start: 6 Uhr · 10. Januar</text>`),
  lioneyes: C(`<rect width="200" height="150" fill="#7a9a86"/>${[60, 140].map((x) => `<ellipse cx="${x}" cy="72" rx="34" ry="26" fill="${GOLD}" stroke="${O}" stroke-width="3"/><circle cx="${x}" cy="72" r="13" fill="${O}"/><circle cx="${x - 4}" cy="68" r="4" fill="#fff"/>`).join('')}<path d="M24 36c20-14 40-14 60 0M116 36c20-14 40-14 60 0" stroke="${O}" stroke-width="5" fill="none"/>`),
  sacredtree: C(`<rect width="200" height="150" fill="#cfe7c0"/><path d="M80 150V30h40v120z" fill="#7a5230" stroke="${O}" stroke-width="2"/><path d="M76 70c16 8 32 8 48 0" stroke="#c9b27a" stroke-width="8" fill="none"/>${[88, 100, 112].map((x) => `<path d="M${x} 76l-5 8 10 4-5 8" stroke="${O}" fill="#fff"/>`).join('')}<path d="M60 30c0-20 80-20 80 0" fill="#3d5a2a"/>`),
  lanterns: C(`<rect width="200" height="150" fill="#d9e0d0"/>${[30, 80, 130, 172].map((x, i) => `<g transform="translate(${x - 16} ${30 + i * 6}) scale(${1 - i * 0.12})"><path d="M8 0h16l6 10H2z" fill="#8a8a8a" stroke="${O}"/><rect x="6" y="10" width="20" height="18" fill="#bdbdbd" stroke="${O}"/><rect x="11" y="14" width="10" height="8" fill="#f7e8a0"/><path d="M2 28h28v6H2zM12 34h8v40h-8zM4 74h24v8H4z" fill="#8a8a8a" stroke="${O}"/></g>`).join('')}`),
  soil: C(`<rect x="60" y="20" width="80" height="110" rx="8" fill="#eef" stroke="${O}" stroke-width="2" opacity=".9"/><rect x="62" y="60" width="76" height="68" fill="#8a6a42"/><rect x="62" y="90" width="76" height="38" fill="#b48a52"/><rect x="74" y="34" width="52" height="16" fill="#fff" stroke="${O}"/><text x="100" y="46" font-size="9" text-anchor="middle" fill="${O}">Probe 67</text>`),
  plantbook: C(`<rect x="30" y="20" width="140" height="110" rx="4" fill="#fff" stroke="${O}" stroke-width="2"/><path d="M100 20v110" stroke="${O}"/><path d="M50 100c10-30 20-40 30-46M60 74c-10 0-14-10-10-14 6 0 10 6 10 14z" stroke="${GREEN}" stroke-width="3" fill="#9ccf8c"/><circle cx="140" cy="62" r="18" fill="#f4c7cf" stroke="${O}"/><path d="M118 96h44M118 106h36" stroke="#aaa" stroke-width="3"/>`),
  letter: C(`<rect x="30" y="34" width="140" height="86" fill="#f6efe0" stroke="${O}" stroke-width="2"/><path d="M30 34l70 50 70-50" stroke="${O}" stroke-width="2" fill="none"/><circle cx="140" cy="100" r="10" fill="${RED}"/>`),
  kadomatsu: C(`<rect width="200" height="150" fill="#f3efe4"/>${[80, 100, 120].map((x, i) => `<path d="M${x - 8} 140V${30 + i * 12}l8-10 8 10v${110 - i * 12}z" fill="#6fa56a" stroke="${O}"/>`).join('')}<path d="M60 110h80v30H60z" fill="#c9a15a" stroke="${O}"/><path d="M58 100c10-20 20-30 30-30M142 100c-10-20-20-30-30-30" stroke="#2f5a3a" stroke-width="8" fill="none"/>`),
  usb: C(`<rect x="50" y="56" width="100" height="40" rx="8" fill="#1F4B8F" stroke="${O}" stroke-width="2"/><rect x="150" y="64" width="26" height="24" fill="#c9ced6" stroke="${O}"/><text x="100" y="82" font-size="11" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif">LIGA-DATEN</text>`),
  scale: C(`<rect x="40" y="70" width="120" height="50" rx="8" fill="#2a2a2a" stroke="${O}" stroke-width="2"/><rect x="60" y="56" width="80" height="14" rx="3" fill="#9aa1a8" stroke="${O}"/><rect x="74" y="84" width="52" height="20" fill="#9ad19a"/><text x="100" y="99" font-size="12" text-anchor="middle" fill="${O}" font-family="Manrope, sans-serif">18,0 g</text>`),
  whetstone: C(`<rect x="30" y="80" width="140" height="34" rx="4" fill="#c97a4a" stroke="${O}" stroke-width="2"/><rect x="30" y="114" width="140" height="14" fill="#8a5a32" stroke="${O}"/><path d="M40 70l120-14 6 8-120 16z" fill="#d9dde2" stroke="${O}" stroke-width="2"/><path d="M160 56l24-4v10l-18 2z" fill="#5a3b2a" stroke="${O}"/>`),
});

export const mapBaseR5 = wrap('0 0 1000 820" preserveAspectRatio="none', `
  <rect width="1000" height="820" fill="#12213F"/>
  <path d="M0 0h90c-10 260 0 540 30 820H0z" fill="#1c3b5e"/>
  <path d="M520 60C700 70 760 160 760 300" fill="none" stroke="#2a3d5c" stroke-width="120" opacity=".55"/>
  <ellipse cx="500" cy="370" rx="150" ry="95" fill="#1f4a3a" opacity=".9"/>
  <path d="M760 0V820" stroke="#5a6570" stroke-width="10" stroke-dasharray="26 10" opacity=".6"/>
  <path d="M0 470H1000" stroke="#5a6570" stroke-width="9" stroke-dasharray="22 10" opacity=".5"/>
  <path d="M400 0C410 200 430 330 470 470S520 700 540 820" stroke="#5a6570" stroke-width="8" stroke-dasharray="20 10" opacity=".55"/>
  <path d="M300 340C300 480 340 640 380 820" stroke="#c9a15a" stroke-width="5" stroke-dasharray="6 8" fill="none" opacity=".7"/>
  <text x="40" y="220" font-size="22" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif" transform="rotate(-86 40 220)">Richtung Bucht</text>
  <text x="500" y="440" font-size="16" text-anchor="middle" fill="rgba(243,241,234,.4)" font-family="Fredoka, sans-serif">Tennōji-Park</text>
  <text x="780" y="120" font-size="16" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif">Uemachi-Hochebene</text>
  <text x="250" y="560" font-size="15" fill="rgba(201,161,90,.6)" font-family="Fredoka, sans-serif" transform="rotate(78 250 560)">Hankai-Tram</text>
  <text x="985" y="460" font-size="16" text-anchor="end" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">JR-Ringlinie</text>
  <text x="420" y="30" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">↑ Namba / Burg</text>
  <text x="560" y="800" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Sumiyoshi ↓</text>`);

export const mapBaseR6 = wrap('0 0 1000 820" preserveAspectRatio="none', `
  <rect width="1000" height="820" fill="#12213F"/>
  <path d="M0 0h160c-30 200-60 420-40 820H0z" fill="#1c3b5e"/>
  <path d="M150 470C330 480 560 470 1000 430" stroke="#2E5BA6" stroke-width="20" fill="none" opacity=".8"/>
  <ellipse cx="560" cy="200" rx="160" ry="90" fill="#1f4a3a" opacity=".9"/>
  <path d="M440 560c30-30 90-30 110 0s0 90-50 110-90-60-60-110z" fill="#24513a" stroke="#2E5BA6" stroke-width="10" opacity=".95"/>
  <path d="M380 0C380 260 300 520 250 820" stroke="#c9a15a" stroke-width="5" stroke-dasharray="6 8" fill="none" opacity=".7"/>
  <path d="M560 0V820" stroke="#5a6570" stroke-width="9" stroke-dasharray="22 10" opacity=".5"/>
  <path d="M0 700H1000" stroke="#5a6570" stroke-width="8" stroke-dasharray="20 10" opacity=".45"/>
  <text x="60" y="260" font-size="22" fill="rgba(243,241,234,.35)" font-family="Fredoka, sans-serif" transform="rotate(-86 60 260)">Bucht von Ōsaka</text>
  <text x="780" y="460" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Yamato-gawa</text>
  <text x="560" y="300" font-size="16" text-anchor="middle" fill="rgba(243,241,234,.4)" font-family="Fredoka, sans-serif">Nagai-Park</text>
  <text x="330" y="150" font-size="15" fill="rgba(201,161,90,.6)" font-family="Fredoka, sans-serif" transform="rotate(95 330 150)">Hankai-Tram</text>
  <text x="575" y="40" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">↑ Tennōji</text>
  <text x="620" y="800" font-size="18" fill="rgba(243,241,234,.3)" font-family="Fredoka, sans-serif">Sakai ↓</text>`);

export const pickupIcon = wrap('0 0 40 48', `
  <path d="M20 2a17 17 0 0 1 17 17c0 9-7 15-12 17l-5 9-5-9C10 34 3 28 3 19A17 17 0 0 1 20 2z" fill="#fff" stroke="${NAVY}" stroke-width="3"/>
  <circle cx="18" cy="17" r="7" fill="none" stroke="${NAVY}" stroke-width="3"/><path d="M23 22l6 6" stroke="${NAVY}" stroke-width="3"/>`);
