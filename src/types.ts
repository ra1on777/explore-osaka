// ---------- Statische Daten (sprachneutral) ----------
export interface RoutingNext { target_screen_id: string; difficulty_tier: number; hint_type: string }
export interface StageDef {
  stage_index: number;
  screen_id: string;
  npc_id: string;
  interaction_type: string;
  routing_next: RoutingNext | null;
  fetch_details?: { origin_screen_id: string; target_fetch_screens: string[]; return_screen_id: string };
}
export interface QuestDef { quest_id: string; total_stages: number; lead_npcs: string[]; stages: StageDef[] }

export interface Slot { x: number; bottom: number; h: number }
export interface ScreenDef {
  region: string; cluster?: string; jp?: string; kana?: string; ro?: string;
  indoor?: boolean; night?: boolean; slots?: Partial<Record<'A' | 'B' | 'C', Slot>>; variants?: string[];
}
export interface ClusterDef { id: string; region: string; x: number; y: number; screens: string[]; flip?: boolean }
export interface NpcDef { short: string; default?: string; poses?: string[]; placeholder?: 'cat' | 'person' }

// ---------- Inhalte (übersetzbar) ----------
export interface Line { s: string; p?: string; t?: string; jp?: string; ro?: string }
export type Option = string | { jp: string; ro?: string };

export type Task =
  | { type: 'choice'; q: string; show?: { jp: string }; options: Option[]; answer: number; explain?: string }
  | { type: 'input'; q: string; show?: { jp: string }; placeholder?: string; accept: string[] }
  | { type: 'estimate'; q: string; min: number; max: number; step: number; answer: number; unit: string; tol: number }
  | { type: 'inspect'; q: string; x: number; y: number; r: number; closeup: { art: string; title: string; text: string } }
  | { type: 'pairs'; q: string; sets: [string, string][][] }
  | { type: 'decipher'; q: string; sign: string; tiles: string[]; answer: string[]; meaning: string }
  | { type: 'slots'; q: string; items: { icon: string; label: string; answer: string }[]; words: { jp: string; ro: string }[] }
  | { type: 'build'; q: string; tiles: { jp: string; ro: string }[]; answer: string[] }
  | { type: 'rounds'; art?: string; timed?: number; fixed?: string[];
      rounds: { q?: string; jp?: string; ro?: string; art?: string; options?: string[]; answer: number; fb?: string }[] }
  | { type: 'route'; q: string; flag?: string; options: { label: string; value: string; facts?: string[]; pose?: string }[] }
  | { type: 'shogi'; q: string; cols: number; rows: number; pieces: { k: string; x: number; y: number; foe?: boolean }[];
      hand?: string[]; answer: { from: string; to: string }[]; fb?: string }
  | { type: 'mapquiz'; q?: string; map: string; points: { id: string; x: number; y: number; label?: string }[];
      rounds: { q: string; answer: string; fb?: string }[] }
  | { type: 'ticket'; q: string; fares: { jp: string; ro: string; price: number }[]; target: string }
  | { type: 'espresso'; q: string; start: { grind: number; temp: number; tamp: number };
      ok: { grind: [number, number]; temp: [number, number]; tamp: [number, number] } }
  | { type: 'sort'; q: string; items: { label: string; sub?: string }[] }
  | { type: 'ingredient'; q: string; dish: string; art?: string; clues: string[]; options: string[]; answer: number; fb?: string }
  | { type: 'photo'; q: string; target: { x: number; y: number }; zoom: [number, number]; title: string; text: string }
  | { type: 'kanjigrid'; q: string; grid: string[]; prompts: { de: string; answer: string }[] };

export interface VocabEntry { jp: string; ro: string; de: string }
export interface StageContent {
  mood?: Mood;
  /** Optionaler Innenraum-Hintergrund aus img/bg (z. B. gen_bg_izakaya_warm_blur_v2) während der Etappe. */
  bg?: string;
  lines?: Line[];
  tasks?: Task[];
  after?: Line[];
  hint: string;
  vocab?: VocabEntry[];
  variants?: Record<string, { lines?: Line[]; tasks?: Task[]; after?: Line[]; afterBy?: AfterBy }>;
  /** Abschluss-Dialog abhängig von einer Entscheidung (Flag) in dieser Etappe. */
  afterBy?: AfterBy;
  /** Holen-und-Zurückbringen: Gegenstand liegt auf dem Ziel-Screen an (x, y). */
  fetch?: { item: string; x: number; y: number; find: string; hintOut: string; hintBack: string; art?: string };
}
export interface AfterBy { flag: string; lines: Record<string, Line[]> }
export type Mood = 'morning' | 'day' | 'golden' | 'night';

// ---------- Spielstand ----------
export interface StrandProgress { done: number; stars: Record<number, number>; touched: number; fetch?: 'out' | 'got' }
export interface Settings { romaji: boolean; sound: boolean; autosave: boolean; textSpeed: number }
export interface GameState {
  version: 1;
  player: { name: string; nameJa: string };
  screen: string;
  visited: string[];
  strands: Record<string, StrandProgress>;
  flags: Record<string, string>;
  inventory: string[];
  vocab: Record<string, { ro: string; de: string }>;
  playtime: number;
  savedAt: number;
}
