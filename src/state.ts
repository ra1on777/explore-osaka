import type { GameState, Settings } from './types';

const KEY_SLOT = (n: number) => `exploreosaka.slot.${n}`;
const KEY_LAST = 'exploreosaka.lastSlot';
const KEY_SETTINGS = 'exploreosaka.settings';
export const SLOTS = [1, 2, 3];
export const START_SCREEN = '2b';

export function newGame(name: string, nameJa: string): GameState {
  return {
    version: 1,
    player: { name: name.trim() || 'Alex', nameJa: nameJa.trim() },
    screen: START_SCREEN,
    visited: [START_SCREEN],
    strands: {},
    flags: {},
    inventory: [],
    vocab: {},
    playtime: 0,
    savedAt: 0,
  };
}

/** Der laufende Spielstand. */
export let G: GameState = newGame('', '');
export let currentSlot = 1;
export function setGame(g: GameState, slot: number) { G = g; currentSlot = slot; }

// ---------- Einstellungen (global, nicht pro Spielstand) ----------
export const settings: Settings = { romaji: true, sound: true, autosave: true, textSpeed: 1 };
export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY_SETTINGS);
    if (raw) Object.assign(settings, JSON.parse(raw));
  } catch { /* privater Modus o. ä. */ }
}
export function saveSettings() {
  try { localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings)); } catch { /* ignorieren */ }
}

// ---------- Speicherplätze ----------
export function readSlot(n: number): GameState | null {
  try {
    const raw = localStorage.getItem(KEY_SLOT(n));
    return raw ? validate(JSON.parse(raw)) : null;
  } catch { return null; }
}
export function writeSlot(n: number, g: GameState = G): boolean {
  try {
    g.savedAt = Date.now();
    localStorage.setItem(KEY_SLOT(n), JSON.stringify(g));
    localStorage.setItem(KEY_LAST, String(n));
    return true;
  } catch { return false; }
}
export function lastSlot(): number | null {
  try {
    const n = Number(localStorage.getItem(KEY_LAST));
    return SLOTS.includes(n) && readSlot(n) ? n : null;
  } catch { return null; }
}
export function autosave(): boolean {
  return settings.autosave ? writeSlot(currentSlot) : true;
}

export function validate(x: unknown): GameState | null {
  const g = x as GameState;
  if (!g || g.version !== 1 || typeof g.screen !== 'string' || !g.player || typeof g.strands !== 'object') return null;
  g.visited ??= [];
  g.flags ??= {};
  g.inventory ??= [];
  g.vocab ??= {};
  g.playtime ??= 0;
  return g;
}

export function exportGame(): void {
  const blob = new Blob([JSON.stringify(G, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `exploreosaka-${G.player.name}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
export async function importGame(file: File): Promise<GameState | null> {
  try { return validate(JSON.parse(await file.text())); } catch { return null; }
}

// Spielzeit mitzählen
let lastTick = Date.now();
export function tickPlaytime() {
  const now = Date.now();
  G.playtime += Math.min(now - lastTick, 60_000);
  lastTick = now;
}
