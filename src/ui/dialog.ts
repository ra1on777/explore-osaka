// Dialogbox auf dem unteren Bildschirm: Pergament-Box mit Namensschild und Porträt (Ausschnitt der Figur).
import { NPC_BY_SHORT, NPCS, imgChar, npcName } from '../data';
import { sfx } from '../audio';
import { G, settings } from '../state';
import type { Line } from '../types';
import { placeholders } from './art';
import { h, svg } from './dom';
import { mount, toast } from './layout';
import { focusNpc } from './scene';
import { jpBlock, plain, rich } from './text';
import { t } from '../i18n';

export function speakerId(s: string): string | null {
  if (s === 'me' || s === 'nar') return null;
  if (s === 'partner') return G.flags.partner ?? 'MAYA_EXCHANGE_STUDENT';
  return NPC_BY_SHORT[s] ?? null;
}

export function portrait(npcId: string, pose?: string): HTMLElement {
  const src = imgChar(npcId, pose);
  if (src) return h('div', { class: 'portrait' }, h('img', { src, alt: '' }));
  return h('div', { class: 'portrait ph' }, svg(placeholders[NPCS[npcId]?.placeholder ?? 'person']));
}

const SPEED = [34, 16, 0];

export function runLines(lines: Line[] | undefined, extra?: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (!lines?.length) { resolve(); return; }
    let i = 0;
    let typing: number | null = null;
    let full = () => {};

    const nameEl = h('div', { class: 'name' });
    const textEl = h('div', { class: 'text' });
    const jpEl = h('div', { class: 'jpline' });
    const next = h('div', { class: 'next', 'aria-hidden': 'true' }, '▼');
    const portraitSlot = h('div', { class: 'portrait-slot' });
    const box = h('div', { class: 'dialog-box', role: 'button', tabindex: '0', 'data-primary': '', 'aria-live': 'polite' },
      nameEl, jpEl, textEl, next);
    const wrapEl = h('div', { class: 'dialog' }, portraitSlot, box);
    mount(wrapEl, extra ?? null);

    const show = () => {
      const line = lines[i];
      const sid = speakerId(line.s);
      focusNpc(sid, line.p);
      portraitSlot.replaceChildren(sid ? portrait(sid, line.p) : '');
      wrapEl.classList.toggle('no-portrait', !sid);
      box.classList.toggle('narrator', line.s === 'nar');
      box.classList.toggle('player', line.s === 'me');
      nameEl.textContent = line.s === 'me' ? G.player.name : sid ? npcName(sid) : '';
      nameEl.hidden = line.s === 'nar';
      jpEl.innerHTML = line.jp ? jpBlock(line.jp, line.ro) : '';
      jpEl.hidden = !line.jp;
      const html = line.t ? rich(line.t) : '';
      const txt = line.t ? plain(line.t) : '';
      next.classList.remove('on');
      const speed = SPEED[settings.textSpeed] ?? 16;
      full = () => {
        if (typing) clearInterval(typing);
        typing = null;
        textEl.innerHTML = html;
        next.classList.add('on');
      };
      if (!speed || !txt) { full(); return; }
      let n = 0;
      textEl.textContent = '';
      typing = window.setInterval(() => {
        n += 1;
        textEl.textContent = txt.slice(0, n);
        if (n % 3 === 0) sfx.blip();
        if (n >= txt.length) full();
      }, speed);
    };

    const advance = (e?: Event) => {
      const target = e?.target as HTMLElement | undefined;
      if (target?.closest('.tapword')) return;
      if (typing) { full(); return; }
      sfx.tap();
      i += 1;
      if (i >= lines.length) {
        box.removeEventListener('click', advance);
        resolve();
        return;
      }
      show();
    };
    box.addEventListener('click', advance);
    textEl.addEventListener('click', (e) => {
      const w = (e.target as HTMLElement).closest<HTMLElement>('.tapword');
      if (!w) return;
      e.stopPropagation();
      tapWord(w);
    });
    show();
  });
}

export function tapWord(w: HTMLElement) {
  const { jp, kana, ro, de } = w.dataset as Record<string, string>;
  const isNew = !G.vocab[jp];
  G.vocab[jp] = { ro: `${kana} · ${ro}`, de };
  sfx.find();
  toast(`${jp}（${kana}）${ro} – ${de}${isNew ? ` · ${t('vocab.new')}` : ''}`, 'good', 3200);
}
