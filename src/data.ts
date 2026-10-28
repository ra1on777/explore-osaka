import questsJson from './data/quests.json';
import worldJson from './data/world.json';
import npcsJson from './data/npcs.json';
import { pack } from './i18n';
import type { ClusterDef, NpcDef, QuestDef, ScreenDef, Slot, StageContent, StageDef, Task } from './types';

export const QUESTS: QuestDef[] = (questsJson as { quests: QuestDef[] }).quests;
export const QUEST_BY_ID: Record<string, QuestDef> = Object.fromEntries(QUESTS.map((q) => [q.quest_id, q]));
export const SCREENS: Record<string, ScreenDef> = worldJson.screens as Record<string, ScreenDef>;
export const CLUSTERS: ClusterDef[] = worldJson.clusters as ClusterDef[];
export const SLOT_DEFAULTS = worldJson.slotDefaults as Record<'A' | 'B' | 'C', Slot>;
export const REGIONS = worldJson.regions as { id: string; playable: boolean }[];
export const NPCS: Record<string, NpcDef> = Object.fromEntries(
  Object.entries(npcsJson).filter(([k]) => !k.startsWith('_')),
) as Record<string, NpcDef>;
export const NPC_BY_SHORT: Record<string, string> = Object.fromEntries(
  Object.entries(NPCS).map(([id, n]) => [n.short, id]),
);
/** Feste Reihenfolge für Gleichstände bei der Platzvergabe (gemischt, nicht alphabetisch). */
export const STRAND_ORDER = [
  'STRANG_CAMPUS_EXPEDITION', 'STRANG_LANG_VOCABULARY', 'STRANG_GEOGRAPHY', 'STRANG_NIGHTLIFE_ETIQUETTE',
  'STRANG_LANG_HIRAGANA', 'STRANG_FOOTBALL_DERBY', 'STRANG_NATURE_RETREAT', 'STRANG_LANG_CONVERSATION',
  'STRANG_CULTURE_KANSAI', 'STRANG_LANG_KATAKANA', 'STRANG_PHILOSOPHY_THEOLOGY', 'STRANG_ROMANCE_MEMORIES',
  'STRANG_CULTURE_JAPAN', 'STRANG_LANG_KANJI', 'STRANG_TRANSIT_STATIONS', 'STRANG_CAFE_CULTURE',
  'STRANG_LITERATURE', 'STRANG_SHOPPING_BARGAINS', 'STRANG_LANDMARKS_DISCOVERY',
];
export const ALL_STRANDS = 25;

export function clusterOf(screenId: string): ClusterDef | undefined {
  return CLUSTERS.find((c) => c.screens.includes(screenId));
}
export function screenPlayable(screenId: string): boolean {
  const s = SCREENS[screenId];
  return !!s && REGIONS.find((r) => r.id === s.region)?.playable === true;
}
export function screenName(id: string): string { return pack().world.screens[id] ?? id; }
export function clusterName(id: string): string { return pack().world.clusters[id] ?? id; }
export function regionName(id: string): string { return pack().world.regions[id] ?? id; }
export function npcName(id: string): string { return pack().npcs[id] ?? id; }
export function strandTitle(id: string): string { return pack().strands[id] ?? id; }

export function stageContent(questId: string, idx: number, partner?: string): StageContent | undefined {
  const c = pack().stages[questId]?.[String(idx)];
  if (!c) return undefined;
  if (c.variants && partner && c.variants[partner]) return { ...c, ...c.variants[partner] };
  return c;
}
export function stageDef(questId: string, idx: number): StageDef | undefined {
  return QUEST_BY_ID[questId]?.stages.find((s) => s.stage_index === idx);
}
/** Etappen mit bewertbarer Aufgabe geben Sterne (reine Dialoge und Routenwahl nicht). */
export function isScored(c: StageContent | undefined): boolean {
  return !!c?.tasks?.some((t: Task) => t.type !== 'route');
}
export function maxStars(questId: string): number {
  const q = QUEST_BY_ID[questId];
  return q.stages.reduce((sum, s) => sum + (isScored(stageContent(questId, s.stage_index)) ? 3 : 0), 0);
}

export function imgScreen(id: string, small: boolean): string {
  const variants = SCREENS[id]?.variants;
  const file = variants ? variants[0] : id;
  return `img/screens/${file}${small ? '@s' : ''}.webp`;
}
export function imgChar(npcId: string, pose?: string): string | null {
  const n = NPCS[npcId];
  if (!n || n.placeholder || !n.poses) return null;
  const p = pose && n.poses.includes(pose) ? pose : n.default ?? n.poses[0];
  return `img/chars/${npcId}/${p}.webp`;
}
