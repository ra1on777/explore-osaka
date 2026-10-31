// Oberer Bildschirm: Schauplatz mit Hintergrund-Artwork, Ortsschild, Figuren und Stimmungsfilter.
import { SCREENS, SLOT_DEFAULTS, freeSlots, imgChar, imgScreen, NPCS, npcName, screenName } from '../data';
import type { Presence } from '../engine';
import type { Mood } from '../types';
import { bubble, pickupIcon, placeholders } from './art';
import { h, svg } from './dom';
import { top } from './layout';

const bg = h('img', { class: 'bg', alt: '', draggable: 'false' });
const mood = h('div', { class: 'mood' });
const npcLayer = h('div', { class: 'npcs' });
const sign = h('div', { class: 'sign' });
const itemLayer = h('div', { class: 'items' });
export const hot = h('div', { class: 'hot' });
export const overlay = h('div', { class: 'overlay' });
top.append(bg, mood, itemLayer, npcLayer, sign, hot, overlay);

let currentScreen = '';
const preloaded = new Set<string>();

export function preload(screenId: string) {
  const src = imgScreen(screenId, smallImages());
  if (preloaded.has(src)) return;
  preloaded.add(src);
  const i = new Image();
  i.src = src;
}
function smallImages() { return top.clientWidth * (window.devicePixelRatio || 1) < 1100; }

export function renderScene(screenId: string, people: Presence[], onNpc: (p: Presence) => void) {
  const def = SCREENS[screenId];
  if (screenId !== currentScreen) {
    currentScreen = screenId;
    top.classList.add('fading');
    const src = imgScreen(screenId, smallImages());
    const img = new Image();
    img.onload = img.onerror = () => { bg.src = src; top.classList.remove('fading'); };
    img.src = src;
    top.classList.toggle('night-native', !!def?.night);
  }
  sign.replaceChildren(
    ...(def?.jp ? [h('span', { class: 'sign-jp', lang: 'ja' }, def.jp)] : []),
    h('span', { class: 'sign-de' }, screenName(screenId)),
  );
  npcLayer.replaceChildren(...people.map((p) => npcEl(screenId, p, onNpc)));
}

function npcEl(screenId: string, p: Presence, onNpc: (p: Presence) => void) {
  const slot = SCREENS[screenId]?.slots?.[p.slot] ?? SLOT_DEFAULTS[p.slot];
  const src = imgChar(p.npcId);
  const ph = NPCS[p.npcId]?.placeholder;
  const scale = NPCS[p.npcId]?.scale ?? (ph === 'cat' ? 0.42 : 1);
  const fallback = () => svg(placeholders[ph ?? 'person'], `fig ph-${ph ?? 'person'}`);
  const fig = src ? h('img', { class: 'fig', src, alt: '', draggable: 'false' }) : fallback();
  // Fehlt eine Sprite-Datei, erscheint die Silhouette statt eines kaputten Bildsymbols.
  if (src) (fig as HTMLImageElement).onerror = () => fig.replaceWith(fallback());
  const el = h('button', {
    class: `npc${scale < 1 ? ' small' : ''}`,
    'data-npc': p.npcId,
    'data-slot': p.slot,
    style: `left:${slot.x}%;bottom:${slot.bottom}%;height:${slot.h * scale}%;z-index:${100 - Math.round(slot.bottom)}`,
    'aria-label': `${npcName(p.npcId)} ansprechen`,
    onclick: () => onNpc(p),
  }, fig, svg(bubble, 'bubble'));
  return el;
}

/** Abholbare Gegenstände (Fetch-Aufträge) als Lupen-Marker im Bild. */
export function renderPickups(list: { x: number; y: number; label: string; onClick: () => void }[]) {
  itemLayer.replaceChildren(...list.map((it) => h('button', {
    class: 'pickup', style: `left:${it.x}%;top:${it.y}%`, 'aria-label': it.label, onclick: it.onClick,
  }, svg(pickupIcon, 'pickup-ico'))));
}

/** Während eines Gesprächs: sprechende Figur hervorheben, Pose wechseln, Rest abdunkeln. */
export function focusNpc(npcId: string | null, pose?: string) {
  top.classList.toggle('talking', !!npcId);
  for (const el of npcLayer.querySelectorAll<HTMLElement>('.npc')) {
    const me = el.dataset.npc === npcId;
    el.classList.toggle('active', me);
    if (me && pose) {
      const img = el.querySelector<HTMLImageElement>('img.fig');
      const src = imgChar(npcId!, pose);
      if (img && src && !img.src.endsWith(src)) img.src = src;
    }
  }
}
/** Figur ins Bild holen, falls sie (z. B. als Partnerin) noch nicht dasteht. */
export function ensureNpc(screenId: string, npcId: string) {
  if (npcLayer.querySelector(`[data-npc="${npcId}"]`)) return;
  const free = freeSlots(screenId);
  const used = new Set([...npcLayer.querySelectorAll<HTMLElement>('.npc')].map((e) => e.dataset.slot));
  const slot = (free.includes('B') && !used.has('B') ? 'B' : free.find((k) => !used.has(k))) ?? free[0] ?? 'B';
  npcLayer.append(npcEl(screenId, { npcId, offers: [], slot }, () => undefined));
}

export function setMood(m: Mood | null | undefined) {
  mood.className = `mood ${m && m !== 'day' ? m : ''}`;
  top.dataset.mood = m ?? 'day';
}

/** Innenraum-Hintergrund (img/bg/…) für die Dauer einer Etappe; null stellt den Screen wieder her. */
/** Platzierung der Figuren auf Innen-Hintergründen: [x, bottom, h] für Hauptfigur und zweite Figur (in %). */
const BG_SLOTS: Record<string, [[number, number, number], [number, number, number]]> = {
  gen_bg_cafe_modern_blur: [[31, -14, 52], [64, -10, 46]],
  gen_bg_commuter_train_osaka_blur: [[42, -12, 54], [64, -6, 46]],
  gen_bg_izakaya_warm_blur_v2: [[30, -14, 54], [60, -10, 48]],
  loading_screen_dotonbori_rain: [[44, -12, 50], [64, -8, 44]],
};
const BG_DEFAULT: [[number, number, number], [number, number, number]] = [[38, 2, 58], [66, 5, 54]];

export function setStageBg(key: string | null | undefined, lead?: string) {
  const [l, o] = (key && BG_SLOTS[key]) || BG_DEFAULT;
  ([['l', l], ['o', o]] as const).forEach(([p, v]) => { top.style.setProperty(`--${p}x`, `${v[0]}%`); top.style.setProperty(`--${p}b`, `${v[1]}%`); top.style.setProperty(`--${p}h`, `${v[2]}%`); });
  for (const el of npcLayer.querySelectorAll<HTMLElement>('.npc')) el.classList.toggle('lead', !!key && el.dataset.npc === lead);
  if (!key) {
    if (!top.classList.contains('interior')) return;
    top.classList.remove('interior');
    bg.src = imgScreen(currentScreen, smallImages());
    return;
  }
  const src = `img/bg/${key}${smallImages() ? '@s' : ''}.webp`;
  top.classList.add('fading');
  const img = new Image();
  img.onload = img.onerror = () => { bg.src = src; top.classList.add('interior'); top.classList.remove('fading'); };
  img.src = src;
}

/** Aktuelles Hintergrundbild (für Foto-Ausschnitte). */
export function sceneImage(): string { return bg.src; }

export function showOverlay(el: HTMLElement | null) {
  overlay.replaceChildren(...(el ? [el] : []));
  overlay.classList.toggle('on', !!el);
}
