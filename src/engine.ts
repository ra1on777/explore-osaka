// Quest-Fortschritt und Bildschirm-Belegung (Concurrency-Regeln aus explore_osaka_gamerules_concurrency.yaml)
import { QUESTS, QUEST_BY_ID, STRAND_ORDER, stageContent, stageDef, isScored, screenPlayable } from './data';
import { G } from './state';
import type { StageDef } from './types';

export const MAX_NPCS = 3;
export const PARTNER = 'BRANCH_ACTIVE_PARTNER';

export interface Offer { questId: string; stage: StageDef; npcId: string }
export interface Presence { npcId: string; offers: Offer[]; slot: 'A' | 'B' | 'C' }

export function progress(questId: string) {
  return (G.strands[questId] ??= { done: 0, stars: {}, touched: 0 });
}
export function peekProgress(questId: string) {
  return G.strands[questId] ?? { done: 0, stars: {}, touched: 0 };
}
export function resolveNpc(npcId: string): string {
  return npcId === PARTNER ? G.flags.partner ?? 'MAYA_EXCHANGE_STUDENT' : npcId;
}
/** Nächste offene Etappe eines Strangs (falls in den Daten vorhanden). */
export function nextStage(questId: string): StageDef | undefined {
  const q = QUEST_BY_ID[questId];
  const p = peekProgress(questId);
  return q.stages.find((s) => s.stage_index === p.done + 1);
}
export function isStrandDemoFinished(questId: string): boolean {
  return !nextStage(questId) && peekProgress(questId).done > 0;
}
export function isStrandComplete(questId: string): boolean {
  return peekProgress(questId).done >= QUEST_BY_ID[questId].total_stages;
}

function offersOn(screenId: string): Offer[] {
  const out: Offer[] = [];
  for (const q of QUESTS) {
    const s = nextStage(q.quest_id);
    if (s && s.screen_id === screenId) out.push({ questId: q.quest_id, stage: s, npcId: resolveNpc(s.npc_id) });
  }
  return out;
}

/**
 * Wer steht auf diesem Screen? Höchstens 3 NPCs (Slots A/B/C), jeder NPC nur einmal (Multi-Quest-Merge).
 * Priorität: zuletzt bearbeiteter Strang (Last-Touched), dann weiter fortgeschrittener Strang,
 * dann feste Strangreihenfolge. Der Rest wartet im Off-Screen-Puffer.
 */
export function presence(screenId: string): { shown: Presence[]; waiting: number } {
  const byNpc = new Map<string, Offer[]>();
  for (const o of offersOn(screenId)) {
    if (!byNpc.has(o.npcId)) byNpc.set(o.npcId, []);
    byNpc.get(o.npcId)!.push(o);
  }
  const score = (offers: Offer[]) => {
    const touched = Math.max(...offers.map((o) => peekProgress(o.questId).touched));
    const done = Math.max(...offers.map((o) => peekProgress(o.questId).done));
    const order = Math.min(...offers.map((o) => {
      const i = STRAND_ORDER.indexOf(o.questId);
      return i < 0 ? 99 : i;
    }));
    return { touched, done, order };
  };
  const groups = [...byNpc.entries()].map(([npcId, offers]) => {
    offers.sort((a, b) => peekProgress(b.questId).touched - peekProgress(a.questId).touched
      || STRAND_ORDER.indexOf(a.questId) - STRAND_ORDER.indexOf(b.questId));
    return { npcId, offers, s: score(offers) };
  });
  groups.sort((a, b) => b.s.touched - a.s.touched || b.s.done - a.s.done || a.s.order - b.s.order);
  const shown = groups.slice(0, MAX_NPCS);
  // Stabile Platzierung: in Lesereihenfolge des Strang-Index, damit Figuren nicht springen
  const slotOrder: ('A' | 'B' | 'C')[] = shown.length === 1 ? ['B'] : shown.length === 2 ? ['A', 'C'] : ['A', 'B', 'C'];
  const placed = [...shown].sort((a, b) => a.s.order - b.s.order)
    .map((g, i) => ({ npcId: g.npcId, offers: g.offers, slot: slotOrder[i] }));
  return { shown: placed, waiting: Math.max(0, groups.length - MAX_NPCS) };
}

export interface StageResult { stars: number | null; questId: string; idx: number }

export function completeStage(questId: string, idx: number, errors: number): StageResult {
  const p = progress(questId);
  const c = stageContent(questId, idx, G.flags.partner);
  const scored = isScored(c);
  const stars = scored ? Math.max(0, 3 - errors) : null;
  if (stars !== null) p.stars[idx] = stars;
  p.done = Math.max(p.done, idx);
  p.touched = Date.now();
  for (const v of c?.vocab ?? []) G.vocab[v.jp] = { ro: v.ro, de: v.de };
  const def = stageDef(questId, idx);
  // Fetch-Quests: vorübergehendes Item wieder abgeben
  if (def?.interaction_type === 'FETCH_AND_RETURN') G.inventory = G.inventory.filter((i) => !i.startsWith(`${questId}#`));
  return { stars, questId, idx };
}

export function strandStars(questId: string): number {
  return Object.values(peekProgress(questId).stars).reduce((a, b) => a + b, 0);
}
export function lastHint(questId: string): { text: string; target: string | null; outside: boolean } | null {
  const p = peekProgress(questId);
  if (p.done === 0) return null;
  const c = stageContent(questId, p.done, G.flags.partner);
  const def = stageDef(questId, p.done);
  const target = def?.routing_next?.target_screen_id ?? null;
  return { text: c?.hint ?? '', target, outside: !!target && !screenPlayable(target) };
}
export function discoveredStrands(): string[] {
  return QUESTS.map((q) => q.quest_id).filter((id) => peekProgress(id).done > 0)
    .sort((a, b) => peekProgress(b).touched - peekProgress(a).touched);
}
