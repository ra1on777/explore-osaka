// Kartenspiele: Karuta (Karten auf dem Tisch, Gegner schlägt bei Zeitablauf zu) und Hanafuda (Blumenkarte auf den richtigen Monat legen).
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Task } from '../types';
import { hanafuda } from './art';
import { h, shuffle, svg, wait } from './dom';
import { continueBtn, frame, rightFx, wrongFx } from './tasks';
import { jpBlock, rich } from './text';

type El = HTMLElement;

// ================= Karuta =================
export async function karuta(task: Extract<Task, { type: 'karuta' }>): Promise<number> {
  let errors = 0;
  const secs = task.time ?? 8;
  const reader = h('div', { class: 'kr-reader' });
  const timer = h('div', { class: 'timer' }, h('span'));
  const table = h('div', { class: 'kr-table' });
  const score = h('div', { class: 'kr-score small' });
  const { el, fb } = frame(t('kr.q'), reader, timer, table, score);
  let mine = 0, foe = 0;
  const cards = new Map<string, HTMLButtonElement>();
  for (const c of shuffle([...task.cards])) {
    const b = h('button', { class: 'kr-card', 'data-v': c, style: `--rot:${(Math.random() * 8 - 4).toFixed(1)}deg` },
      h('span', { class: 'kr-face', html: rich(c) })) as HTMLButtonElement;
    cards.set(c, b);
    table.append(b);
  }
  const showScore = () => { score.textContent = t('kr.score', { me: mine, foe }); };
  showScore();
  for (let ri = 0; ri < task.rounds.length; ri++) {
    const r = task.rounds[ri];
    reader.replaceChildren(...[
      h('div', { class: 'small muted' }, `${t('kr.reader')} · ${ri + 1}/${task.rounds.length}`),
      r.jp ? h('div', { class: 'show', html: jpBlock(r.jp, r.ro, 'huge') }) : null,
      r.q ? h('div', { class: 'kr-clue', html: rich(r.q) }) : null].filter(Boolean) as HTMLElement[]);
    fb.className = 'feedback'; fb.textContent = '';
    await wait(250);
    const won = await new Promise<boolean>((resolve) => {
      const bar = timer.firstElementChild as El;
      bar.style.transition = 'none'; bar.style.width = '100%'; void bar.offsetWidth;
      bar.style.transition = `width ${secs}s linear`; bar.style.width = '0%';
      const finish = (ok: boolean) => { clearTimeout(tid); cards.forEach((b) => (b.onclick = null)); resolve(ok); };
      const tid = window.setTimeout(() => finish(false), secs * 1000);
      cards.forEach((b, v) => {
        b.onclick = () => {
          if (v === r.answer) { finish(true); return; }
          errors++;
          b.classList.remove('miss'); void b.offsetWidth; b.classList.add('miss');
          wrongFx(el, fb, t('kr.otetsuki'));
        };
      });
    });
    const card = cards.get(r.answer)!;
    if (won) {
      mine++; sfx.right();
      card.classList.add('taken');
      fb.className = 'feedback good'; fb.innerHTML = rich(`${t('kr.got')}${r.fb ? ` ${r.fb}` : ''}`);
    } else {
      foe++; errors++; sfx.wrong();
      card.classList.add('slapped');
      fb.className = 'feedback bad'; fb.innerHTML = rich(`${t('kr.lost')} ${r.answer}${r.fb ? ` – ${r.fb}` : ''}`);
    }
    showScore();
    await wait(900);
    card.remove(); cards.delete(r.answer);
  }
  timer.remove();
  reader.replaceChildren(h('div', { class: 'kr-final' }, mine >= foe ? t('kr.win', { me: mine, foe }) : t('kr.lose', { me: mine, foe })));
  if (mine >= foe) sfx.done();
  await continueBtn(el);
  return errors;
}

// ================= Hanafuda: Monate legen =================
const MONTH_JP = ['いちがつ', 'にがつ', 'さんがつ', 'しがつ', 'ごがつ', 'ろくがつ', 'しちがつ', 'はちがつ', 'くがつ', 'じゅうがつ', 'じゅういちがつ', 'じゅうにがつ'];
const MONTH_RO = ['ichigatsu', 'nigatsu', 'sangatsu', 'shigatsu', 'gogatsu', 'rokugatsu', 'shichigatsu', 'hachigatsu', 'kugatsu', 'jūgatsu', 'jūichigatsu', 'jūnigatsu'];
const monthOf = (card: string) => Number(card.replace('hf-', ''));

export async function hanafudaGame(task: Extract<Task, { type: 'hanafuda' }>): Promise<number> {
  let errors = 0;
  const need = task.rounds.map((r) => monthOf(r.card));
  const others = shuffle([...Array(12)].map((_, i) => i + 1).filter((m) => !need.includes(m)));
  const months = (task.months ?? [...need, ...others.slice(0, Math.max(0, 6 - need.length))]).slice().sort((a, b) => a - b);
  const field = h('div', { class: 'hf-field' });
  const slots = new Map<number, El>();
  for (const m of months) {
    const s = h('button', { class: 'hf-slot', 'data-m': String(m) },
      h('span', { class: 'hf-pile' }), h('span', { class: 'hf-mname', html: jpBlock(MONTH_JP[m - 1], MONTH_RO[m - 1]) }));
    slots.set(m, s); field.append(s);
  }
  const hand = h('div', { class: 'hf-hand' });
  const { el, fb } = frame(task.q ?? t('hf.q'), hand, field);
  el.classList.add('hf-game');
  for (let ri = 0; ri < task.rounds.length; ri++) {
    const r = task.rounds[ri];
    const m = monthOf(r.card);
    const card = svg(hanafuda[r.card], 'hf-card');
    hand.replaceChildren(card, h('div', { class: 'hf-desc' },
      h('div', { class: 'small muted' }, t('task.round', { i: ri + 1, n: task.rounds.length })),
      h('div', { html: rich(r.q ?? t(`hf.m${m}`)) })));
    fb.className = 'feedback'; fb.textContent = '';
    await new Promise<void>((resolve) => {
      slots.forEach((s, sm) => {
        s.onclick = () => {
          if (sm === m) { slots.forEach((x) => (x.onclick = null)); resolve(); return; }
          errors++;
          wrongFx(el, fb, t('hf.wrong'));
        };
      });
    });
    const slot = slots.get(m)!;
    slot.querySelector('.hf-pile')!.replaceChildren(svg(hanafuda[r.card], 'hf-mini'));
    slot.classList.add('filled');
    rightFx(fb, `${MONTH_JP[m - 1]} – ${t(`hf.month${m}`)}: ${t(`hf.m${m}`)}.${r.fb ? ` ${r.fb}` : ''}`);
    await wait(1100);
  }
  hand.replaceChildren();
  await continueBtn(el);
  return errors;
}
