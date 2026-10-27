// Automatischer Komplett-Durchlauf aller Demo-Etappen über die echte Oberfläche.
// Aufruf: node tools/playtest.cjs <url> [viewport: phone|desk] [screenshotDir]
// Beantwortet jede Aufgabe korrekt, baut aber pro Aufgabe gezielt einen Fehler ein (Sterne-Logik).
const { chromium } = require('playwright');

const url = process.argv[2] || 'http://localhost:8765/';
const vpName = process.argv[3] || 'phone';
const shotDir = process.argv[4];
const VP = { phone: { width: 390, height: 844 }, desk: { width: 1440, height: 900 } }[vpName];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VP });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('ERR_TUNNEL')) errors.push(m.text()); });
  await page.goto(url);
  await page.waitForTimeout(500);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(500);
  // Einstellungen: Text sofort
  await page.evaluate(() => localStorage.setItem('exploreosaka.settings', JSON.stringify({ romaji: true, sound: false, autosave: true, textSpeed: 2 })));
  await page.reload();
  await page.click('text=Neues Spiel');
  await page.fill('input.field', 'Lukas');
  await page.click("text=Los geht's");
  const clickDialogs = async () => {
    for (let i = 0; i < 40; i++) {
      const box = await page.$('.dialog-box');
      if (!box) return;
      await box.click();
      await page.waitForTimeout(30);
    }
  };
  await clickDialogs();

  const total = await page.evaluate(() => window.__eo.data.QUESTS.reduce((a, q) => a + q.stages.length, 0));
  let played = 0;
  let shots = 0;
  const shot = async (n) => { if (shotDir && shots < 40) { shots++; await page.screenshot({ path: `${shotDir}/${vpName}-${String(shots).padStart(2, '0')}-${n}.png` }); } };

  for (let guard = 0; guard < 200 && played < total; guard++) {
    // Nächste spielbare Etappe bestimmen
    const next = await page.evaluate(() => {
      const { engine, data, G } = window.__eo;
      const here = engine.presence(G.screen).shown;
      if (here.length) return { here: true, npc: here[0].npcId, q: here[0].offers[0].questId, i: here[0].offers[0].stage.stage_index };
      for (const q of data.QUESTS) { const s = engine.nextStage(q.quest_id); if (s) return { here: false, screen: s.screen_id }; }
      return null;
    });
    if (!next) break;
    if (!next.here) {
      // über die Karte reisen
      await page.click('[data-hotkey="m"]');
      await page.waitForTimeout(150);
      const cluster = await page.evaluate((sid) => window.__eo.data.clusterOf(sid).id, next.screen);
      const label = await page.evaluate((cid) => document.querySelector(`.pin[aria-label]`) && [...document.querySelectorAll('.pin')].find((p) => p.getAttribute('aria-label') === window.__eo.data.clusterName(cid)).getAttribute('aria-label'), cluster);
      await page.click(`.pin[aria-label="${label}"]`);
      await page.waitForTimeout(100);
      const name = await page.evaluate((sid) => window.__eo.data.screenName(sid), next.screen);
      await page.click(`.map-info .way:has-text("${name}")`);
      await page.waitForTimeout(300);
      continue;
    }
    try { await page.click(`.npc[data-npc="${next.npc}"]`, { timeout: 4000 }); }
    catch (e) { await page.screenshot({ path: `${shotDir || '.'}/FAIL.png` }); console.log('FAIL', JSON.stringify(next), await page.evaluate(() => document.querySelector('.panel').innerText.slice(0, 400))); throw e; }
    await page.waitForTimeout(100);
    let cur = next;
    for (;;) {
      await page.waitForTimeout(60);
      const c = await page.evaluate(([q, i]) => window.__eo.data.stageContent(q, i, window.__eo.G.flags.partner), [cur.q, cur.i]);
      await clickDialogs();
      for (const t of c.tasks || []) {
        await page.waitForTimeout(80);
        if (played % 7 === 0) await shot(`${cur.q}-${cur.i}-${t.type}`);
        await solve(page, t);
        if (t.type !== 'route' && t.type !== 'pairs') {
          const btn = await page.$('.task .btn.primary.wide');
          if (btn) await btn.click();
        }
        await page.waitForTimeout(80);
      }
      await clickDialogs();
      await page.waitForSelector('.result');
      if (played % 9 === 0) await shot(`${cur.q}-${cur.i}-result`);
      await page.click('.result .btn.primary');
      played++;
      await page.waitForTimeout(120);
      const more = await page.$('.result .btn.primary');
      if (!more) break;
      await more.click();
      await page.waitForTimeout(120);
      cur = await page.evaluate(() => window.__eoCurrent);
    }
  }
  const state = await page.evaluate(() => {
    const { G, engine, data } = window.__eo;
    return { done: Object.fromEntries(Object.entries(G.strands).map(([k, v]) => [k, v.done])), stars: data.QUESTS.map((q) => `${q.quest_id}: ${engine.strandStars(q.quest_id)}/${data.maxStars(q.quest_id)}`), vocab: Object.keys(G.vocab).length, saved: !!localStorage.getItem('exploreosaka.slot.1') };
  });
  await page.click('[data-hotkey="q"]');
  await shot('questlog');
  await page.click('[data-esc]');
  await page.click('[data-hotkey="v"]');
  await shot('vocab');
  console.log(JSON.stringify({ played, total, state, errors }, null, 1));
  await browser.close();
})();

async function solve(page, t) {
  const S = (sel) => page.click(sel);
  switch (t.type) {
    case 'choice': {
      const wrong = (t.answer + 1) % t.options.length;
      await S(`.task [data-key="${wrong + 1}"]`);
      await S(`.task [data-key="${t.answer + 1}"]`);
      break;
    }
    case 'input':
      await page.fill('.task input.field', 'falsch');
      await S('.task .input-row .btn');
      await page.fill('.task input.field', t.accept[0]);
      await S('.task .input-row .btn');
      break;
    case 'estimate':
      await page.fill('.task input.num', String(t.answer));
      await S('.task .estimate .btn');
      break;
    case 'inspect': {
      const box = await page.locator('.hot').boundingBox();
      await page.mouse.click(box.x + box.width * 0.02, box.y + box.height * 0.98); // daneben
      await page.waitForTimeout(50);
      await page.mouse.click(box.x + (box.width * t.x) / 100, box.y + (box.height * t.y) / 100);
      break;
    }
    case 'pairs':
      for (const set of t.sets) {
        for (const [jp] of set) {
          await page.click(`.pairs .col:first-child .tile[data-v="${jp}"]`);
          await page.click(`.pairs .col:last-child .tile[data-v="${jp}"]`);
        }
        await page.waitForTimeout(650);
      }
      break;
    case 'decipher':
      for (const syl of t.answer) {
        const tiles = await page.$$('.task .tiles .tile:not([disabled])');
        for (const el of tiles) { if ((await el.textContent()) === syl) { await el.click(); break; } }
      }
      break;
    case 'slots':
      for (const it of t.items) {
        const w = t.words.find((x) => x.ro === it.answer);
        await page.click(`.task .tiles .tile:has-text("${w.jp}")`);
        await page.click(`.task .slot-item:has-text("${it.label}")`);
      }
      break;
    case 'build':
      for (const a of t.answer) await page.click(`.task .tiles .tile[data-jp="${a}"]`);
      await S('.task .row .btn.primary');
      break;
    case 'rounds':
      for (let i = 0; i < t.rounds.length; i++) {
        const r = t.rounds[i];
        await page.waitForSelector('.task .options .opt:not([disabled])');
        await S(`.task [data-key="${r.answer + 1}"]`);
        const isLast = i === t.rounds.length - 1;
        if (r.fb || isLast) { if (!isLast) { await page.click('.task .btn.primary.wide'); } }
        else await page.waitForTimeout(800);
        if (!isLast) await page.waitForTimeout(100);
      }
      break;
    case 'route':
      await S('.task [data-key="1"]');
      break;
  }
}
