// Prüft Daten und Inhalte auf Konsistenz: node tools/validate.mjs
import { readFileSync, existsSync } from 'node:fs';

const j = (p) => JSON.parse(readFileSync(p, 'utf8'));
const quests = j('src/data/quests.json').quests;
const world = j('src/data/world.json');
const npcs = j('src/data/npcs.json');
const lang = 'de';
const stages = {};
for (const f of ['stages_story_a', 'stages_story_b', 'stages_lang', 'stages_r2_story', 'stages_r2_lang', 'stages_r3'])
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

for (const q of quests) {
  for (const s of q.stages) {
    const key = `${q.quest_id}#${s.stage_index}`;
    if (!world.screens[s.screen_id]) err(`${key}: unbekannter Screen ${s.screen_id}`);
    if (s.npc_id !== 'BRANCH_ACTIVE_PARTNER' && !npcs[s.npc_id]) err(`${key}: unbekannter NPC ${s.npc_id}`);
    const c = stages[q.quest_id]?.[String(s.stage_index)];
    if (!c) { err(`${key}: kein Inhalt`); continue; }
    if (!c.hint) err(`${key}: kein Hinweis`);
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
      const all = [...(v.lines ?? []), ...(v.after ?? [])];
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
          if (s0 >= lo && s0 <= hi && k === 'grind') err(`${key}: espresso Startwert schon richtig`);
        }
        if (t.type === 'photo') {
          if (!(t.target.x >= 0 && t.target.x <= 100 && t.target.y >= 0 && t.target.y <= 100)) err(`${key}: photo Ziel`);
          if (!(t.zoom[0] >= 1 && t.zoom[1] <= 6 && t.zoom[0] <= t.zoom[1])) err(`${key}: photo Zoom`);
        }
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
