// Prüft Daten und Inhalte auf Konsistenz: node tools/validate.mjs
// Neue Stränge: Etappen in src/data/quests_<name>.json, Texte in src/content/de/stages_<name>.json, Titel in strands.json.
import { readFileSync, existsSync } from 'node:fs';

const j = (p) => JSON.parse(readFileSync(p, 'utf8'));
import { genContent } from './gen_content.mjs';
const gen = genContent();
const quests = [...gen.quests.flatMap((f) => j(`src/data/${f}`).quests), j('src/data/quest_test.json')];
const world = j('src/data/world.json');
const npcs = j('src/data/npcs.json');
const lang = 'de';
const stages = {};
for (const f of gen.stages.map((x) => x.replace('.json', '')))
  for (const [q, st] of Object.entries(j(`src/content/${lang}/${f}.json`))) stages[q] = { ...stages[q], ...st };
const art = readFileSync('src/ui/art.ts', 'utf8');
const hasArt = (k) => new RegExp(`\\b${k}\\s*:`).test(art);
const names = j(`src/content/${lang}/npcs.json`);
const screenNames = j(`src/content/${lang}/world.json`).screens;
const short = Object.fromEntries(Object.entries(npcs).filter(([k]) => !k.startsWith('_')).map(([id, n]) => [n.short, id]));

let errors = 0;
const err = (m) => { errors++; console.log('✗', m); };
const lineCounts = [];

for (const id of Object.keys(world.screens)) {
  if (!screenNames[id]) err(`Screen ${id} ohne Namen`);
  const file = world.screens[id].variants?.[0] ?? id;
  if (!existsSync(`public/img/screens/${file}.webp`)) err(`Bild fehlt: ${file}`);
}
for (const [id, n] of Object.entries(npcs)) {
  if (id.startsWith('_')) continue;
  if (!names[id]) err(`NPC ${id} ohne Namen`);
  for (const p of n.poses ?? []) if (!existsSync(`public/img/chars/${id}/${p}.webp`)) err(`Sprite fehlt: ${id}/${p}`);
}

const strandNames = j(`src/content/${lang}/strands.json`);
const seenQ = new Set();
for (const q of quests) {
  if (seenQ.has(q.quest_id)) err(`Strang ${q.quest_id} doppelt definiert`);
  seenQ.add(q.quest_id);
  if (!strandNames[q.quest_id]) err(`Strang ${q.quest_id} ohne Titel in strands.json`);
  if (q.total_stages !== q.stages.length) err(`${q.quest_id}: total_stages ${q.total_stages} ≠ ${q.stages.length} Etappen`);
  q.stages.forEach((s, i) => { if (s.stage_index !== i + 1) err(`${q.quest_id}: Etappen-Nummer ${s.stage_index} an Position ${i + 1}`); });
  const last = q.stages[q.stages.length - 1];
  if (last?.routing_next) err(`${q.quest_id}: letzte Etappe hat noch ein routing_next`);
  q.stages.forEach((s, i) => {
    const n = q.stages[i + 1];
    if (n && s.interaction_type !== 'FETCH_AND_RETURN' && s.routing_next?.target_screen_id !== n.screen_id)
      err(`${q.quest_id}#${s.stage_index}: Hinweis führt nach ${s.routing_next?.target_screen_id}, nächste Etappe ist aber auf ${n.screen_id}`);
  });
  for (const s of q.stages) {
    if (s.routing_next && !world.screens[s.routing_next.target_screen_id]) err(`${q.quest_id}#${s.stage_index}: Ziel-Screen ${s.routing_next.target_screen_id} unbekannt`);
    const key = `${q.quest_id}#${s.stage_index}`;
    if (!world.screens[s.screen_id]) err(`${key}: unbekannter Screen ${s.screen_id}`);
    if (s.npc_id !== 'BRANCH_ACTIVE_PARTNER' && !npcs[s.npc_id]) err(`${key}: unbekannter NPC ${s.npc_id}`);
    const c = stages[q.quest_id]?.[String(s.stage_index)];
    if (!c) { err(`${key}: kein Inhalt`); continue; }
    if (!c.hint) err(`${key}: kein Hinweis`);
    if (c.bg) {
      if (!existsSync(`public/img/bg/${c.bg}.webp`)) err(`${key}: Hintergrund ${c.bg} fehlt`);
      const ts = [...(c.tasks ?? []), ...Object.values(c.variants ?? {}).flatMap((v) => v.tasks ?? [])];
      if (ts.some((t) => t.type === 'inspect' || t.type === 'photo')) err(`${key}: Innenraum-Hintergrund mit Bildaufgabe`);
    }
    if (s.interaction_type === 'FETCH_AND_RETURN') {
      if (!c.fetch) err(`${key}: fetch-Inhalt fehlt`);
      else {
        if (!s.fetch_details) err(`${key}: fetch_details fehlen`);
        for (const f of ['item', 'find', 'hintOut', 'hintBack']) if (!c.fetch[f]) err(`${key}: fetch.${f} fehlt`);
        if (c.fetch.art && !hasArt(c.fetch.art)) err(`${key}: fetch-Grafik fehlt`);
      }
    } else if ((c.tasks ?? []).length === 0 && !/PURE/.test(s.interaction_type)) err(`${key}: ${s.interaction_type} ohne Aufgabe`);
    const variants = c.variants ? Object.values(c.variants).map((v) => ({ ...c, ...v })) : [c];
    for (const v of variants) {
      const all = [...(v.lines ?? []), ...(v.after ?? []), ...Object.values(v.afterBy?.lines ?? {}).flat()];
      lineCounts.push(all.length);
      for (const l of all) {
        if (!['me', 'nar', 'partner'].includes(l.s) && !short[l.s]) err(`${key}: unbekannter Sprecher ${l.s}`);
        const npcId = l.s === 'partner' ? null : short[l.s];
        if (npcId && l.p && npcs[npcId].poses && !npcs[npcId].poses.includes(l.p)) err(`${key}: Pose ${l.s}/${l.p} fehlt`);
        if (!l.t && !l.jp) err(`${key}: leere Zeile`);
      }
      for (const t of v.tasks ?? []) {
        if (t.type === 'choice' && !(t.answer >= 0 && t.answer < t.options.length)) err(`${key}: choice answer`);
        if (t.type === 'rounds') for (const r of t.rounds) {
          const n = (t.fixed ?? r.options ?? []).length;
          if (!(r.answer >= 0 && r.answer < n)) err(`${key}: rounds answer`);
          if ((t.fixed ?? r.options ?? []).some((o) => typeof o !== 'string')) err(`${key}: rounds-Optionen müssen Text sein`);
        }
        if (t.type === 'penalty') for (const r of t.rounds) {
          const Z = ['tl', 'tc', 'tr', 'bl', 'bc', 'br'];
          if (!r.good?.length || r.good.some((z) => !Z.includes(z))) err(`${key}: penalty Zonen`);
          if (r.keeper && !['center', 'left', 'right', 'wide', 'diveLeft', 'diveRight'].includes(r.keeper)) err(`${key}: penalty Torwart ${r.keeper}`);
          if (r.power && !(r.power[0] >= 0 && r.power[1] <= 1 && r.power[1] - r.power[0] >= 0.15)) err(`${key}: penalty Kraftfenster`);
        }
        if (t.type === 'karuta') {
          if (new Set(t.cards).size !== t.cards.length) err(`${key}: karuta doppelte Karten`);
          const used = new Set();
          for (const r of t.rounds) {
            if (!t.cards.includes(r.answer)) err(`${key}: karuta Antwort ${r.answer} fehlt`);
            if (used.has(r.answer)) err(`${key}: karuta Karte ${r.answer} doppelt gefragt`);
            used.add(r.answer);
          }
        }
        if (t.type === 'hanafuda') for (const r of t.rounds) {
          if (!/^hf-(1[0-2]|[1-9])$/.test(r.card)) err(`${key}: hanafuda Karte ${r.card}`);
          if (t.months && !t.months.includes(Number(r.card.slice(3)))) err(`${key}: hanafuda Monat fehlt`);
        }
        if (t.type === 'duel') for (const r of t.rounds) {
          if (!(r.answer >= 0 && r.answer < t.moves.length)) err(`${key}: duel answer`);
          if (!['wide', 'closed', 'rush', 'lunge', 'shoulder', 'deep', 'side', 'loose', 'tired', 'slip', 'post'].includes(r.pose)) err(`${key}: duel Pose ${r.pose}`);
        }
        if (t.type === 'decipher') {
          const pool = [...t.tiles];
          for (const a of t.answer) { const i = pool.indexOf(a); if (i < 0) err(`${key}: decipher Kachel ${a} fehlt`); else pool.splice(i, 1); }
        }
        if (t.type === 'build') for (const a of t.answer) if (!t.tiles.some((x) => x.jp === a)) err(`${key}: build Kachel ${a} fehlt`);
        if (t.type === 'slots') for (const it of t.items) if (!t.words.some((w) => w.ro === it.answer)) err(`${key}: slot ${it.answer} fehlt`);
        if (t.type === 'inspect' && !(t.x >= 0 && t.x <= 100 && t.y >= 0 && t.y <= 100)) err(`${key}: inspect Koordinaten`);
        if (t.type === 'estimate' && !(t.answer >= t.min && t.answer <= t.max)) err(`${key}: estimate außerhalb`);
        if (t.type === 'inspect' && !hasArt(t.closeup.art)) err(`${key}: Closeup-Grafik ${t.closeup.art} fehlt`);
        if (t.type === 'slots') for (const it of t.items) if (!hasArt(it.icon)) err(`${key}: Icon ${it.icon} fehlt`);
        if (t.type === 'mapquiz') {
          if (!hasArt(t.map)) err(`${key}: Quizkarte ${t.map} fehlt`);
          for (const r of t.rounds) if (!t.points.some((p) => p.id === r.answer)) err(`${key}: mapquiz Punkt ${r.answer} fehlt`);
          for (const p of t.points) if (!(p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100)) err(`${key}: mapquiz Koordinaten`);
        }
        if (t.type === 'ticket' && !t.fares.some((f) => f.jp === t.target)) err(`${key}: ticket Ziel fehlt`);
        if (t.type === 'espresso') for (const k of ['grind', 'temp', 'tamp']) {
          const [lo, hi] = t.ok[k]; const s0 = t.start[k];
          if (!(lo <= hi)) err(`${key}: espresso ${k}`);
        }
        if (t.type === 'espresso' && ['grind', 'temp', 'tamp'].every((k) => t.start[k] >= t.ok[k][0] && t.start[k] <= t.ok[k][1])) err(`${key}: espresso Startwerte schon richtig`);
        if (t.type === 'ingredient' && !(t.answer >= 0 && t.answer < t.options.length && t.clues.length >= 2)) err(`${key}: ingredient`);
        if (t.type === 'photo') {
          if (!(t.target.x >= 0 && t.target.x <= 100 && t.target.y >= 0 && t.target.y <= 100)) err(`${key}: photo Ziel`);
          if (!(t.zoom[0] >= 1 && t.zoom[1] <= 6 && t.zoom[0] <= t.zoom[1])) err(`${key}: photo Zoom`);
        }
        if (t.type === 'shogi') {
          const occ = new Set(t.pieces.map((p) => `${p.x},${p.y}`));
          for (const a of t.answer) {
            if (a.from.startsWith('hand:')) { if (!(t.hand ?? []).includes(a.from.slice(5))) err(`${key}: shogi Handstein fehlt`); if (occ.has(a.to)) err(`${key}: shogi Einsetzfeld besetzt`); }
            else if (!t.pieces.some((p) => !p.foe && `${p.x},${p.y}` === a.from)) err(`${key}: shogi Startstein fehlt`);
            const [x, y] = a.to.split(',').map(Number);
            if (!(x >= 1 && x <= t.cols && y >= 1 && y <= t.rows)) err(`${key}: shogi Ziel außerhalb`);
          }
        }
        if (t.type === 'route' && v.afterBy && t.flag === v.afterBy.flag) for (const o of t.options) if (!v.afterBy.lines[o.value]) err(`${key}: afterBy ${o.value} fehlt`);
        if (t.type === 'sort' && t.items.length < 3) err(`${key}: sort zu kurz`);
        if (t.type === 'kanjigrid') for (const p of t.prompts) if (!t.grid.includes(p.answer)) err(`${key}: kanjigrid ${p.answer} fehlt`);
      }
    }
  }
}
const total = quests.reduce((a, q) => a + q.stages.length, 0);
const avg = lineCounts.reduce((a, b) => a + b, 0) / lineCounts.length;
console.log(`${total} Etappen, Dialogzeilen Ø ${avg.toFixed(1)} (min ${Math.min(...lineCounts)}, max ${Math.max(...lineCounts)})`);
console.log(errors ? `${errors} Fehler` : '✓ keine Fehler');
process.exit(errors ? 1 : 0);
