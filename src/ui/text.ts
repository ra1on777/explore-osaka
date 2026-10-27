import { G, settings } from '../state';
import { npcName } from '../data';
import { escapeHtml } from './dom';

/** Platzhalter ersetzen: {{name}}, {{nameJa}}, {{nameRo}}, {{partner}} */
export function vars(s: string): string {
  return s
    .replace(/\{\{nameJa\}\}/g, G.player.nameJa || G.player.name)
    .replace(/\{\{nameRo\}\}/g, G.player.name)
    .replace(/\{\{name\}\}/g, G.player.name)
    .replace(/\{\{partner\}\}/g, G.flags.partner ? npcName(G.flags.partner) : '…');
}

/**
 * Wandelt Fließtext in HTML: Variablen, sowie antippbare Vokabeln [[漢字|かな|rōmaji|Deutsch]]
 * (werden als <ruby> mit Furigana dargestellt).
 */
export function rich(s: string): string {
  const parts: string[] = [];
  let last = 0;
  const re = /\[\[([^|\]]+)\|([^|\]]+)\|([^|\]]+)\|([^\]]+)\]\]/g;
  const src = vars(s);
  for (let m = re.exec(src); m; m = re.exec(src)) {
    parts.push(escapeHtml(src.slice(last, m.index)));
    const [, jp, kana, ro, de] = m;
    parts.push(`<ruby class="tapword" tabindex="0" data-jp="${escapeHtml(jp)}" data-kana="${escapeHtml(kana)}" data-ro="${escapeHtml(ro)}" data-de="${escapeHtml(de)}">${escapeHtml(jp)}<rt>${escapeHtml(kana)}</rt></ruby>`);
    last = m.index + m[0].length;
  }
  parts.push(escapeHtml(src.slice(last)));
  return parts.join('');
}

/** Reiner Text (für Schreibmaschinen-Effekt-Längen und Screenreader). */
export function plain(s: string): string {
  return vars(s).replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, '$1');
}

export function jpBlock(jp: string, ro?: string, cls = ''): string {
  const showRo = settings.romaji && ro;
  return `<span class="jp ${cls}" lang="ja">${escapeHtml(vars(jp))}</span>${showRo ? `<span class="ro">${escapeHtml(vars(ro!))}</span>` : ''}`;
}

/** Vergleich für Texteingaben: Kleinschreibung, Makrons und Leerzeichen tolerant. */
export function normalize(s: string): string {
  return s.toLowerCase().trim()
    .replace(/[āâ]/g, 'aa').replace(/[ūû]/g, 'uu').replace(/[ōô]/g, 'ou').replace(/[ēê]/g, 'ee').replace(/[īî]/g, 'ii')
    .replace(/[\s.!?。、]+/g, '');
}
export function matches(input: string, accept: string[]): boolean {
  const n = normalize(input);
  const loose = (x: string) => x.replace(/ou/g, 'o').replace(/oo/g, 'o').replace(/uu/g, 'u').replace(/aa/g, 'a').replace(/-/g, '');
  return accept.some((a) => normalize(a) === n || loose(normalize(a)) === loose(n));
}
