// Sprachpaket-Registry. Für eine neue Sprache: Ordner src/content/<lang>/ und src/i18n/<lang>.json anlegen
// und hier registrieren. Alle sichtbaren Texte laufen über t() bzw. die Content-Lookups in data.ts.
import de from './i18n/de.json';
import deWorld from './content/de/world.json';
import deNpcs from './content/de/npcs.json';
import deStrands from './content/de/strands.json';
import deStoryA from './content/de/stages_story_a.json';
import deStoryB from './content/de/stages_story_b.json';
import deLang from './content/de/stages_lang.json';
import deR2Story from './content/de/stages_r2_story.json';
import deR2Lang from './content/de/stages_r2_lang.json';
import deR3 from './content/de/stages_r3.json';
import deIntro from './content/de/intro.json';
import deR4a from './content/de/stages_r4_story_a.json';
import deR4b from './content/de/stages_r4_story_b.json';
import deR4l from './content/de/stages_r4_lang.json';
import deR5a from './content/de/stages_r5_a.json';
import deR5b from './content/de/stages_r5_b.json';
import deR5r from './content/de/stages_r5_romance.json';
import deR5l from './content/de/stages_r5_lang.json';
import type { Line, StageContent } from './types';

export interface LangPack {
  ui: Record<string, string>;
  world: { regions: Record<string, string>; clusters: Record<string, string>; screens: Record<string, string> };
  npcs: Record<string, string>;
  strands: Record<string, string>;
  stages: Record<string, Record<string, StageContent>>;
  intro: { kenji: Line[] };
}

/** Inhalte sind pro Region in Dateien aufgeteilt; Stränge werden etappenweise zusammengeführt. */
function mergeStages(...files: object[]): Record<string, Record<string, StageContent>> {
  const out: Record<string, Record<string, StageContent>> = {};
  for (const f of files) for (const [q, st] of Object.entries(f as Record<string, Record<string, StageContent>>)) out[q] = { ...out[q], ...st };
  return out;
}

const packs: Record<string, LangPack> = {
  de: {
    ui: de,
    world: deWorld,
    npcs: deNpcs,
    strands: deStrands,
    intro: deIntro as { kenji: Line[] },
    stages: mergeStages(deStoryA, deStoryB, deLang, deR2Story, deR2Lang, deR3, deR4a, deR4b, deR4l, deR5a, deR5b, deR5r, deR5l),
  },
};

let current: LangPack = packs.de;
export function setLang(lang: string) { current = packs[lang] ?? packs.de; }
export function pack(): LangPack { return current; }

export function t(key: string, vars: Record<string, string | number> = {}): string {
  const raw = current.ui[key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
