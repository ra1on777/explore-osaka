// Oberer Bildschirm: Schauplatz mit Hintergrund-Artwork, Ortsschild, Figuren und Stimmungsfilter.
import { SCREENS, SLOT_DEFAULTS, imgChar, imgScreen, NPCS, npcName, screenName } from '../data';
import type { Presence } from '../engine';
import type { Mood } from '../types';
import { bubble, placeholders } from './art';
import { h, svg } from './dom';
import { top } from './layout';

const bg = h('img', { class: 'bg', alt: '', draggable: 'false' });
const mood = h('div', { class: 'mood' });
const npcLayer = h('div', { class: 'npcs' });
const sign = h('div', { class: 'sign' });
export const hot = h('div', { class: 'hot' });
export const overlay = h('div', { class: 'overlay' });
top.append(bg, mood, npcLayer, sign, hot, overlay);

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
  const fig = src
    ? h('img', { class: 'fig', src, alt: npcName(p.npcId), draggable: 'false' })
    : svg(placeholders[ph ?? 'person'], `fig ph-${ph ?? 'person'}`);
  const el = h('button', {
    class: `npc${ph === 'cat' ? ' small' : ''}`,
    'data-npc': p.npcId,
    style: `left:${slot.x}%;bottom:${slot.bottom}%;height:${ph === 'cat' ? slot.h * 0.42 : slot.h}%`,
    'aria-label': `${npcName(p.npcId)} ansprechen`,
    onclick: () => onNpc(p),
  }, fig, svg(bubble, 'bubble'));
  return el;
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
  npcLayer.append(npcEl(screenId, { npcId, offers: [], slot: 'B' }, () => undefined));
}

export function setMood(m: Mood | null | undefined) {
  mood.className = `mood ${m && m !== 'day' ? m : ''}`;
  top.dataset.mood = m ?? 'day';
}

export function showOverlay(el: HTMLElement | null) {
  overlay.replaceChildren(...(el ? [el] : []));
  overlay.classList.toggle('on', !!el);
}
