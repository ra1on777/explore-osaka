// Erzeugt src/content.gen.ts: bindet automatisch alle Etappen-Dateien (src/content/de/stages_*.json)
// und alle Strang-Dateien (src/data/quests.json + src/data/quests_*.json) ein.
// Neue Stränge brauchen damit keine Code-Änderung mehr – nur neue JSON-Dateien.
// Wird von build.mjs und validate.mjs automatisch aufgerufen.
import { readdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';

export function genContent() {
  const stages = readdirSync('src/content/de').filter((f) => /^stages_.+\.json$/.test(f)).sort();
  const quests = ['quests.json', ...readdirSync('src/data').filter((f) => /^quests_.+\.json$/.test(f)).sort()];
  const id = (f) => f.replace(/\W/g, '_');
  const src = `// AUTOMATISCH ERZEUGT von tools/gen_content.mjs – nicht von Hand ändern.
${stages.map((f) => `import ${id('s_' + f)} from './content/de/${f}';`).join('\n')}
${quests.map((f) => `import ${id('q_' + f)} from './data/${f}';`).join('\n')}

export const STAGE_FILES_DE: object[] = [${stages.map((f) => id('s_' + f)).join(', ')}];
export const QUEST_FILES: { quests: unknown[] }[] = [${quests.map((f) => id('q_' + f)).join(', ')}] as { quests: unknown[] }[];
`;
  const path = 'src/content.gen.ts';
  if (!existsSync(path) || readFileSync(path, 'utf8') !== src) writeFileSync(path, src);
  return { stages, quests };
}
if (import.meta.url === `file://${process.argv[1]}`) console.log(genContent());
