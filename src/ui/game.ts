// Spielablauf: Titelbild, neues Spiel, Erkunden, Etappen, Menüs.
import { sfx } from '../audio';
import {
  ALL_STRANDS, CLUSTERS, QUEST_BY_ID, REGIONS, SCREENS, clusterName, clusterOf, maxStars, npcName,
  regionName, screenName, screenPlayable, stageContent, strandTitle,
} from '../data';
import {
  completeStage, discoveredStrands, isStrandComplete, isStrandDemoFinished, lastHint, peekProgress, pickUp, pickups,
  presence, resolveNpc, startFetch, strandStars, type Presence,
} from '../engine';
import { pack, t } from '../i18n';
import {
  G, SLOTS, autosave, currentSlot, exportGame, importGame, lastSlot, newGame, readSlot, saveSettings, setGame,
  settings, writeSlot,
} from '../state';
import { closeups, icons, mapBase, mapBaseR2, mapBaseR3, mapBaseR4 } from './art';
import { runLines } from './dialog';
import { h, svg } from './dom';
import { confirmBox, mount, toast, top } from './layout';
import { ensureNpc, focusNpc, preload, renderPickups, renderScene, setMood, showOverlay } from './scene';
import { runTask } from './tasks';
import { jpBlock, vars } from './text';

let busy = false; // läuft gerade eine Etappe?
let dirty = false; // ungespeicherte Änderungen (bei abgeschaltetem Autosave)

// =====================================================================
// Titelbild
// =====================================================================
export function titleScreen() {
  busy = false;
  setMood(null);
  showOverlay(h('div', { class: 'title-art' }, h('img', { src: 'img/ui/title-bg.webp', alt: 'ExploreOsaka' })));
  top.classList.add('title');
  const last = lastSlot();
  mount(h('div', { class: 'menu-list title-menu' },
    h('div', { class: 'demo-tag' }, t('title.demo')),
    last ? h('button', { class: 'btn primary wide', 'data-primary': '', onclick: () => loadSlot(last) }, t('title.continue')) : null,
    h('button', { class: `btn wide ${last ? '' : 'primary'}`, 'data-primary': last ? undefined : '', onclick: newGameScreen }, t('title.new')),
    h('button', { class: 'btn wide', onclick: () => slotScreen('load', titleScreen) }, t('title.load')),
    h('button', { class: 'btn wide', onclick: () => settingsScreen(titleScreen) }, t('title.settings')),
  ));
}

function newGameScreen() {
  sfx.tap();
  const name = h('input', { class: 'field', maxlength: '16', placeholder: t('new.namePh'), 'aria-label': t('new.name') });
  const kana = h('input', { class: 'field', lang: 'ja', maxlength: '12', readonly: true, placeholder: 'カタカナ', 'aria-label': t('new.nameJa') });
  const pad = katakanaPad(kana);
  let slot = SLOTS.find((n) => !readSlot(n)) ?? 1;
  const slotRow = h('div', { class: 'seg' });
  const warn = h('div', { class: 'small warn' });
  const drawSlots = () => {
    slotRow.replaceChildren(...SLOTS.map((n) => h('button', {
      class: `seg-btn ${n === slot ? 'on' : ''}`, onclick: () => { slot = n; drawSlots(); },
    }, t('slot.n', { n }))));
    warn.textContent = readSlot(slot) ? t('new.overwrite', { n: slot }) : '';
  };
  drawSlots();
  mount(h('div', { class: 'form' },
    h('h2', {}, t('new.heading')),
    h('label', {}, t('new.name'), name),
    h('label', {}, t('new.nameJa'), kana),
    h('div', { class: 'small' }, t('new.nameJaHint')),
    pad,
    h('label', {}, t('new.slot')), slotRow, warn,
    h('div', { class: 'row' },
      h('button', { class: 'btn', 'data-esc': '', onclick: titleScreen }, t('new.back')),
      h('button', {
        class: 'btn primary', 'data-primary': '', onclick: () => {
          if (!name.value.trim()) { name.focus(); name.classList.add('shake'); return; }
          setGame(newGame(name.value, kana.value), slot);
          writeSlot(slot);
          intro();
        },
      }, t('new.start'))),
  ));
  setTimeout(() => name.focus({ preventScroll: true }), 50);
}

/** Kleine Katakana-Tastatur, damit niemand eine japanische Tastatur braucht. */
function katakanaPad(target: HTMLInputElement) {
  const rows = ['アイウエオ', 'カキクケコ', 'サシスセソ', 'タチツテト', 'ナニヌネノ', 'ハヒフヘホ', 'マミムメモ', 'ヤユヨ', 'ラリルレロ', 'ワヲン',
    'ガギグゲゴ', 'ザジズゼゾ', 'ダヂヅデド', 'バビブベボ', 'パピプペポ', 'ャュョッー', 'ァィゥェォヴ'];
  const pad = h('details', { class: 'kana-pad' }, h('summary', {}, 'カタカナ ⌨'));
  const grid = h('div', { class: 'kana-grid' });
  for (const r of rows) for (const ch of r) grid.append(h('button', { type: 'button', lang: 'ja', onclick: () => { if (target.value.length < 12) target.value += ch; } }, ch));
  grid.append(h('button', { type: 'button', class: 'wide-key', onclick: () => (target.value = target.value.slice(0, -1)) }, '⌫'));
  grid.append(h('button', { type: 'button', class: 'wide-key', onclick: () => (target.value = '') }, t('new.kanaClear')));
  pad.append(grid);
  return pad;
}

async function intro() {
  top.classList.remove('title');
  showOverlay(null);
  renderScene(G.screen, [], () => undefined);
  setMood('morning');
  await runLines([
    { s: 'nar', t: t('intro.1') },
    { s: 'nar', t: t('intro.2') },
    { s: 'nar', t: t('intro.3') },
  ]);
  setMood(null);
  // Einzige Ausnahme von der Strang-Auswahl: Kenji erklärt das Spiel, dann folgen seine ersten
  // beiden Etappen im Wohnheimzimmer direkt hintereinander (nicht überspringbar).
  const kenji = 'KENJI_DORM_MATE';
  renderScene(G.screen, [], () => undefined);
  ensureNpc(G.screen, kenji);
  await runLines(pack().intro.kenji);
  for (const [q, i] of [['STRANG_LANG_VOCABULARY', 1], ['STRANG_NIGHTLIFE_ETIQUETTE', 1]] as const) {
    if (peekProgress(q).done < i) await playStage(q, i);
  }
  explore();
}

function loadSlot(n: number) {
  const g = readSlot(n);
  if (!g) return;
  setGame(g, n);
  top.classList.remove('title');
  showOverlay(null);
  sfx.open();
  toast(t('menu.loaded'), 'good');
  explore();
}

// =====================================================================
// Erkunden
// =====================================================================
export function explore() {
  busy = false;
  top.classList.remove('title', 'talking');
  showOverlay(null);
  focusNpc(null);
  const pres = presence(G.screen);
  renderScene(G.screen, pres.shown, talkTo);
  const items = pickups(G.screen).map((pk) => ({ ...pk, c: stageContent(pk.questId, pk.stage.stage_index, G.flags.partner)!.fetch! }));
  renderPickups(items.map((it) => ({ x: it.c.x, y: it.c.y, label: it.c.item, onClick: () => takeItem(it.questId, it.c) })));
  const cl = clusterOf(G.screen);
  const ways = (cl?.screens ?? []).filter((s) => s !== G.screen);
  ways.forEach(preload);

  mount(
    h('div', { class: 'explore' },
      h('div', { class: 'loc' },
        h('div', { class: 'loc-cluster' }, cl ? clusterName(cl.id) : ''),
        h('div', { class: 'loc-name' }, screenName(G.screen))),
      pres.shown.length
        ? h('div', { class: 'people' }, h('div', { class: 'label' }, t('explore.here')),
          ...pres.shown.map((p) => h('button', { class: 'person', onclick: () => talkTo(p) },
            h('span', { class: 'excl' }, '!'), npcName(p.npcId))))
        : h('div', { class: 'small muted' }, t('explore.nobody')),
      pres.waiting ? h('div', { class: 'small muted' }, t('explore.more')) : null,
      items.length ? h('div', { class: 'people' }, h('div', { class: 'label' }, t('explore.items')),
        ...items.map((it) => h('button', { class: 'person item', onclick: () => takeItem(it.questId, it.c) },
          svg(icons.magnifier, 'ico'), it.c.item))) : null,
      ways.length ? h('div', { class: 'ways' }, h('div', { class: 'label' }, t('explore.ways')),
        ...ways.map((s) => h('button', { class: 'way', onclick: () => travel(s) }, svg(icons.walk, 'ico'), screenName(s)))) : null,
    ),
    navBar(),
  );
}

function navBar() {
  const b = (key: string, icon: string, fn: () => void, hot?: string) =>
    h('button', { class: 'nav-btn', 'data-hotkey': hot, onclick: () => { sfx.tap(); fn(); } }, svg(icons[icon], 'ico'), h('span', {}, t(key)));
  return h('nav', { class: 'navbar' },
    b('nav.map', 'map', () => mapScreen(), 'm'),
    b('nav.quests', 'quests', questLog, 'q'),
    b('nav.vocab', 'vocab', vocabScreen, 'v'),
    b('nav.bag', 'bag', bagScreen, 'b'),
    b('nav.menu', 'menu', menuScreen, 'escape'));
}

export function travel(screenId: string) {
  if (!screenPlayable(screenId)) return;
  sfx.travel();
  G.screen = screenId;
  if (!G.visited.includes(screenId)) G.visited.push(screenId);
  save();
  explore();
}

function save() {
  if (settings.autosave) {
    if (!autosave()) toast(t('menu.storageFail'), 'bad', 3500);
  } else dirty = true;
}

// =====================================================================
// Etappe spielen (inkl. Multi-Quest-Merge: weitere Quests desselben NPCs folgen direkt)
// =====================================================================
async function talkTo(p: Presence) {
  if (busy) return;
  busy = true;
  sfx.open();
  let pickOffer = p.offers[0];
  // Hat die Figur hier Etappen aus mehreren Strängen, wählt man bewusst, worüber man spricht.
  if (p.offers.length > 1) {
    const chosen = await new Promise<typeof pickOffer | null>((r) => {
      mount(h('div', { class: 'sub offer-pick' },
        header(npcName(p.npcId), () => r(null)),
        h('p', { class: 'small muted' }, t('talk.pick')),
        ...p.offers.map((o) => h('button', { class: 'btn wide offer', 'data-quest': o.questId, onclick: () => { sfx.tap(); r(o); } },
          h('span', { class: 'excl' }, '!'), strandTitle(o.questId)))));
    });
    if (!chosen) { explore(); return; }
    pickOffer = chosen;
  }
  await playStage(pickOffer.questId, pickOffer.stage.stage_index);
  explore();
}

async function takeItem(questId: string, f: NonNullable<ReturnType<typeof stageContent>>['fetch']) {
  if (busy || !f) return;
  busy = true;
  sfx.find();
  pickUp(questId, f.item);
  save();
  showOverlay(h('div', { class: 'closeup' }, h('div', { class: 'closeup-card' },
    h('div', { class: 'closeup-head' }, f.item), svg(closeups[f.art ?? ''] ?? closeups.dictionary, 'closeup-art'))));
  await new Promise<void>((r) => mount(h('div', { class: 'result' },
    h('div', { class: 'result-strand' }, strandTitle(questId)),
    h('h3', {}, t('fetch.got')),
    h('p', {}, vars(f.find)),
    h('div', { class: 'result-hint' }, h('div', { class: 'label' }, t('result.hint')), h('div', {}, vars(f.hintBack))),
    h('button', { class: 'btn primary wide', 'data-primary': '', onclick: () => r() }, t('common.next')))));
  explore();
}

async function playStage(questId: string, idx: number) {
  const c = stageContent(questId, idx, G.flags.partner);
  const def = QUEST_BY_ID[questId].stages.find((s) => s.stage_index === idx)!;
  if (!c) { toast(`Inhalt fehlt: ${questId} #${idx}`, 'bad'); return; }
  (window as unknown as Record<string, unknown>).__eoCurrent = { q: questId, i: idx };
  // Holen und Zurückbringen: Teil 1 = Auftrag, Teil 2 = Abgabe beim Auftraggeber
  if (def.interaction_type === 'FETCH_AND_RETURN' && c.fetch) {
    const npc = resolveNpc(def.npc_id);
    ensureNpc(G.screen, npc);
    if (peekProgress(questId).fetch !== 'got') {
      await runLines(c.lines);
      startFetch(questId);
      save();
      focusNpc(null);
      await new Promise<void>((r) => mount(h('div', { class: 'result' },
        h('div', { class: 'result-strand' }, strandTitle(questId)),
        h('h3', {}, t('fetch.task')),
        h('div', { class: 'result-hint' }, h('div', { class: 'label' }, t('result.hint')), h('div', {}, vars(c.fetch!.hintOut))),
        h('button', { class: 'btn primary wide', 'data-primary': '', onclick: () => r() }, t('common.next')))));
      return;
    }
    await runLines(c.after);
    completeStage(questId, idx, 0);
    save();
    await resultCard(questId, null);
    return;
  }
  const npcId = resolveNpc(def.npc_id);
  ensureNpc(G.screen, npcId);
  if (c.mood && !SCREENS[G.screen]?.night) setMood(c.mood);
  await runLines(c.lines);
  let errors = 0;
  for (const task of c.tasks ?? []) {
    focusNpc(npcId);
    errors += await runTask(task);
  }
  // Nach der Routenwahl kann sich der Gesprächspartner ändern
  const after = stageContent(questId, idx, G.flags.partner)?.after ?? c.after;
  await runLines(after);
  const res = completeStage(questId, idx, errors);
  save();
  await resultCard(questId, res.stars);
  setMood(null);
}

function resultCard(questId: string, stars: number | null): Promise<void> {
  sfx.done();
  focusNpc(null);
  const hint = lastHint(questId);
  return new Promise((resolve) => {
    mount(h('div', { class: 'result' },
      h('div', { class: 'result-strand' }, strandTitle(questId)),
      h('h3', {}, stars === null ? t('result.noStars') : t('result.title')),
      stars === null ? null : h('div', { class: 'stars big' }, ...[0, 1, 2].map((i) => svg(icons.star, `star ${i < stars ? 'on' : ''}`))),
      hint ? h('div', { class: 'result-hint' }, h('div', { class: 'label' }, t('result.hint')), h('div', {}, vars(hint.text)),
        hint.outside ? h('div', { class: 'small muted' }, t('quests.demoEnd')) : null) : null,
      h('button', { class: 'btn primary wide', 'data-primary': '', onclick: () => resolve() }, t('common.next'))));
  });
}

// =====================================================================
// Karte (oberer Bildschirm) mit freier Schnellreise
// =====================================================================
function mapScreen(regionId?: string) {
  const here = clusterOf(G.screen)?.id;
  const region = regionId ?? clusterOf(G.screen)?.region ?? 'R1';
  const info = h('div', { class: 'map-info' }, h('div', { class: 'small muted' }, t('map.pick')));
  const pins = CLUSTERS.filter((c) => c.region === region).map((c) => {
    const visited = c.screens.some((s) => G.visited.includes(s));
    return h('button', {
      class: `pin ${c.id === here ? 'here' : ''} ${visited ? 'visited' : ''} ${c.flip ? 'flip' : ''}`,
      style: `left:${c.x / 10}%;top:${(c.y / 820) * 100}%`,
      'aria-label': clusterName(c.id),
      'data-id': c.id,
      onclick: () => pick(c.id),
    }, h('span', { class: 'dot' }), h('span', { class: 'pin-label' }, clusterName(c.id)));
  });
  const bases: Record<string, string> = { R1: mapBase, R2: mapBaseR2, R3: mapBaseR3, R4: mapBaseR4 };
  showOverlay(h('div', { class: 'worldmap' }, svg(bases[region] ?? mapBase, 'map-base'), ...pins));
  const pick = (id: string) => {
    sfx.tap();
    pins.forEach((p) => p.classList.toggle('sel', p.dataset.id === id));
    const c = CLUSTERS.find((x) => x.id === id)!;
    info.replaceChildren(
      h('div', { class: 'map-title' }, clusterName(id), h('span', { class: 'small muted' }, ` · ${regionName(c.region)}`)),
      ...c.screens.map((s) => h('button', { class: 'way', disabled: s === G.screen, onclick: () => travel(s) },
        svg(icons.walk, 'ico'), screenName(s),
        h('span', { class: 'small muted' }, s === G.screen ? ` · ${t('map.here')}` : G.visited.includes(s) ? ` · ${t('map.visited')}` : ''))));
  };
  const playable = REGIONS.filter((r) => r.playable);
  const soon = REGIONS.filter((r) => !r.playable);
  mount(h('div', { class: 'sub' },
    header(t('map.title'), () => { showOverlay(null); explore(); }),
    h('div', { class: 'seg region-tabs' }, ...playable.map((r) => h('button', {
      class: `seg-btn ${r.id === region ? 'on' : ''}`, 'data-region': r.id, onclick: () => { sfx.tap(); mapScreen(r.id); },
    }, regionName(r.id)))),
    info,
    soon.length ? h('div', { class: 'small muted' }, `${t('map.soon')}: ${soon.map((r) => regionName(r.id)).join(' · ')}`) : null));
  if (here && CLUSTERS.find((c) => c.id === here)?.region === region) pick(here);
}

function header(title: string, back: () => void) {
  return h('div', { class: 'sub-head' },
    h('button', { class: 'icon-btn', 'data-esc': '', 'aria-label': t('common.back'), onclick: () => { sfx.tap(); back(); } }, svg(icons.back)),
    h('h2', {}, title));
}

// =====================================================================
// Quest-Log, Vokabelheft, Tasche
// =====================================================================
function questLog() {
  const ids = discoveredStrands();
  mount(h('div', { class: 'sub' },
    header(t('quests.title'), explore),
    h('div', { class: 'small muted' }, t('quests.found', { n: ids.length, total: ALL_STRANDS })),
    ids.length ? null : h('p', { class: 'muted' }, t('quests.empty')),
    ...ids.map((id) => {
      const p = peekProgress(id);
      const q = QUEST_BY_ID[id];
      const hint = lastHint(id);
      const max = maxStars(id);
      return h('div', { class: 'quest' },
        h('div', { class: 'quest-title' }, strandTitle(id)),
        h('div', { class: 'quest-meta' },
          h('span', {}, t('quests.stage', { done: p.done, total: q.total_stages })),
          max ? h('span', { class: 'stars-inline' }, svg(icons.star, 'star on'), ` ${strandStars(id)} / ${max}`) : null),
        h('div', { class: 'bar' }, h('span', { style: `width:${(p.done / q.total_stages) * 100}%` })),
        isStrandComplete(id) ? h('div', { class: 'small good' }, t('quests.complete'))
          : hint ? h('div', { class: 'quest-hint' }, h('span', { class: 'label' }, t('quests.next')), ' ', vars(hint.text),
            isStrandDemoFinished(id) && hint.outside ? h('div', { class: 'small muted' }, t('quests.demoEnd')) : null) : null);
    })));
}

function vocabScreen() {
  const entries = Object.entries(G.vocab);
  mount(h('div', { class: 'sub' },
    header(t('vocab.title'), explore),
    h('div', { class: 'small muted' }, t('vocab.count', { n: entries.length })),
    entries.length ? h('div', { class: 'vocab' }, ...entries.map(([jp, v]) =>
      h('div', { class: 'vocab-row' }, h('span', { class: 'v-jp', html: jpBlock(jp) }), h('span', { class: 'v-ro' }, v.ro), h('span', { class: 'v-de' }, v.de))))
      : h('p', { class: 'muted' }, t('vocab.empty'))));
}

function bagScreen() {
  mount(h('div', { class: 'sub' },
    header(t('bag.title'), explore),
    G.inventory.length ? h('div', { class: 'bag' }, ...G.inventory.map((i) => h('div', { class: 'bag-item' }, svg(icons.item, 'ico'), i.split('#')[1] ?? i)))
      : h('p', { class: 'muted' }, t('bag.empty'))));
}

// =====================================================================
// Menü, Speichern/Laden, Einstellungen
// =====================================================================
function menuScreen() {
  const file = h('input', { type: 'file', accept: 'application/json,.json', hidden: true });
  file.onchange = async () => {
    const f = file.files?.[0];
    if (!f) return;
    const g = await importGame(f);
    if (!g) { toast(t('menu.importFail'), 'bad'); return; }
    setGame(g, currentSlot);
    writeSlot(currentSlot);
    toast(t('menu.loaded'), 'good');
    explore();
  };
  mount(h('div', { class: 'sub' },
    header(t('menu.title'), explore),
    h('div', { class: 'menu-list' },
      h('button', { class: 'btn wide', onclick: () => slotScreen('save', menuScreen) }, svg(icons.save, 'ico'), t('menu.save')),
      h('button', { class: 'btn wide', onclick: () => slotScreen('load', menuScreen) }, svg(icons.upload, 'ico'), t('menu.load')),
      h('button', { class: 'btn wide', onclick: () => settingsScreen(menuScreen) }, svg(icons.gear, 'ico'), t('menu.settings')),
      h('button', { class: 'btn wide', onclick: exportGame }, svg(icons.download, 'ico'), t('menu.export')),
      h('button', { class: 'btn wide', onclick: () => file.click() }, svg(icons.upload, 'ico'), t('menu.import')),
      h('button', {
        class: 'btn wide', onclick: async () => {
          if (dirty && !(await confirmBox(t('menu.leaveWarn')))) return;
          titleScreen();
        },
      }, svg(icons.home, 'ico'), t('menu.title_screen')),
      file)));
}

function slotScreen(mode: 'save' | 'load', back: () => void) {
  const draw = () => mount(h('div', { class: 'sub' },
    header(t(mode === 'save' ? 'menu.save' : 'menu.load'), back),
    ...SLOTS.map((n) => {
      const g = readSlot(n);
      return h('button', {
        class: `slot-card ${n === currentSlot && mode === 'save' ? 'current' : ''}`,
        disabled: mode === 'load' && !g,
        onclick: () => {
          if (mode === 'save') {
            if (writeSlot(n)) { setGame(G, n); dirty = false; toast(t('menu.saved', { n }), 'good'); draw(); }
            else toast(t('menu.storageFail'), 'bad');
          } else loadSlot(n);
        },
      }, h('div', { class: 'slot-n' }, t('slot.n', { n })),
      h('div', { class: 'small' }, g ? t('slot.info', {
        name: g.player.name, place: screenName(g.screen),
        date: new Date(g.savedAt).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }),
      }) : t('slot.empty')));
    })));
  draw();
}

function settingsScreen(back: () => void) {
  const toggle = (key: 'romaji' | 'sound' | 'autosave', label: string) => {
    const box = h('input', { type: 'checkbox' }) as HTMLInputElement;
    box.checked = settings[key];
    box.onchange = () => { settings[key] = box.checked; saveSettings(); sfx.tap(); };
    return h('label', { class: 'toggle' }, box, h('span', {}, label));
  };
  const speed = h('div', { class: 'seg' });
  const drawSpeed = () => speed.replaceChildren(...['slow', 'normal', 'fast'].map((k, i) =>
    h('button', { class: `seg-btn ${settings.textSpeed === i ? 'on' : ''}`, onclick: () => { settings.textSpeed = i; saveSettings(); drawSpeed(); } }, t(`settings.speed.${k}`))));
  drawSpeed();
  mount(h('div', { class: 'sub' },
    header(t('settings.title'), back),
    toggle('romaji', t('settings.romaji')),
    toggle('sound', t('settings.sound')),
    toggle('autosave', t('settings.autosave')),
    h('label', {}, t('settings.speed')), speed,
    h('div', { class: 'small muted', html: jpBlock('れい：こんにちは', 'rei: konnichiwa') })));
}

