// Sprachpaket-Registry. Für eine neue Sprache: Ordner src/content/<lang>/ und src/i18n/<lang>.json anlegen
// und hier registrieren. Alle sichtbaren Texte laufen über t() bzw. die Content-Lookups in data.ts.
import de from './i18n/de.json';
import deWorld from './content/de/world.json';
import deNpcs from './content/de/npcs.json';
import deStrands from './content/de/strands.json';
import deStoryA from './content/de/stages_story_a.json';
import deStoryB from './content/de/stages_story_b.json';
import deLang from './content/de/stages_lang.json';
import type { StageContent } from './types';

export interface LangPack {
  ui: Record<string, string>;
  world: { regions: Record<string, string>; clusters: Record<string, string>; screens: Record<string, string> };
  npcs: Record<string, string>;
  strands: Record<string, string>;
  stages: Record<string, Record<string, StageContent>>;
}

const packs: Record<string, LangPack> = {
  de: {
    ui: de,
    world: deWorld,
    npcs: deNpcs,
    strands: deStrands,
    stages: { ...deStoryA, ...deStoryB, ...deLang } as unknown as Record<string, Record<string, StageContent>>,
  },
};

let current: LangPack = packs.de;
export function setLang(lang: string) { current = packs[lang] ?? packs.de; }
export function pack(): LangPack { return current; }

export function t(key: string, vars: Record<string, string | number> = {}): string {
  const raw = current.ui[key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
