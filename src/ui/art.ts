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

export const pickupIcon = wrap('0 0 40 48', `
  <path d="M20 2a17 17 0 0 1 17 17c0 9-7 15-12 17l-5 9-5-9C10 34 3 28 3 19A17 17 0 0 1 20 2z" fill="#fff" stroke="${NAVY}" stroke-width="3"/>
  <circle cx="18" cy="17" r="7" fill="none" stroke="${NAVY}" stroke-width="3"/><path d="M23 22l6 6" stroke="${NAVY}" stroke-width="3"/>`);
