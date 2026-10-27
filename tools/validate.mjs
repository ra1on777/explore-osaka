// Prüft Daten und Inhalte auf Konsistenz: node tools/validate.mjs
import { readFileSync, existsSync } from 'node:fs';

const j = (p) => JSON.parse(readFileSync(p, 'utf8'));
const quests = j('src/data/quests.json').quests;
const world = j('src/data/world.json');
const npcs = j('src/data/npcs.json');
const lang = 'de';
const stages = Object.assign({}, ...['stages_story_a', 'stages_story_b', 'stages_lang'].map((f) => j(`src/content/${lang}/${f}.json`)));
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
        }
        if (t.type === 'decipher') {
          const pool = [...t.tiles];
          for (const a of t.answer) { const i = pool.indexOf(a); if (i < 0) err(`${key}: decipher Kachel ${a} fehlt`); else pool.splice(i, 1); }
        }
        if (t.type === 'build') for (const a of t.answer) if (!t.tiles.some((x) => x.jp === a)) err(`${key}: build Kachel ${a} fehlt`);
        if (t.type === 'slots') for (const it of t.items) if (!t.words.some((w) => w.ro === it.answer)) err(`${key}: slot ${it.answer} fehlt`);
        if (t.type === 'inspect' && !(t.x >= 0 && t.x <= 100 && t.y >= 0 && t.y <= 100)) err(`${key}: inspect Koordinaten`);
        if (t.type === 'estimate' && !(t.answer >= t.min && t.answer <= t.max)) err(`${key}: estimate außerhalb`);
      }
    }
  }
}
const total = quests.reduce((a, q) => a + q.stages.length, 0);
const avg = lineCounts.reduce((a, b) => a + b, 0) / lineCounts.length;
console.log(`${total} Etappen, Dialogzeilen Ø ${avg.toFixed(1)} (min ${Math.min(...lineCounts)}, max ${Math.max(...lineCounts)})`);
console.log(errors ? `${errors} Fehler` : '✓ keine Fehler');
process.exit(errors ? 1 : 0);
