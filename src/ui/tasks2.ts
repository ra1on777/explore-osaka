// Weitere Mechaniken (ab Region 2): Kartenquiz/Wegfindung, Ticketautomat, Espresso, Sortieren, Kanji-Raster.
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Task } from '../types';
import { closeups, quizMaps } from './art';
import { h, shuffle, svg, wait } from './dom';
import { showOverlay } from './scene';
import { continueBtn, frame, rightFx, wrongFx } from './tasks';
import { jpBlock, rich } from './text';

// ---------- Kartenquiz / Wegfindung: Tippen auf einen Punkt der Karte (oberer Bildschirm) ----------
export async function mapquiz(task: Extract<Task, { type: 'mapquiz' }>): Promise<number> {
  let errors = 0;
  const pins = new Map<string, HTMLButtonElement>();
  const board = h('div', { class: 'quizmap' }, svg(quizMaps[task.map] ?? '', 'quizmap-art'));
  for (const p of task.points) {
    const edge = p.x < 15 ? 'al' : p.x > 85 ? 'ar' : '';
    const b = h('button', { class: `qpin ${p.label ? 'labeled' : ''} ${edge}`, style: `left:${p.x}%;top:${p.y}%`, 'aria-label': p.label ?? p.id },
      h('span', { class: 'qdot' }), p.label ? h('span', { class: 'qlabel', lang: 'ja', html: rich(p.label) }) : null);
    pins.set(p.id, b);
    board.append(b);
  }
  showOverlay(board);
  for (let i = 0; i < task.rounds.length; i++) {
    const r = task.rounds[i];
    const { el, fb } = frame(r.q, h('div', { class: 'small' }, `${t('task.round', { i: i + 1, n: task.rounds.length })} · ${t('task.map.hint')}`));
    await new Promise<void>((resolve) => {
      for (const [id, b] of pins) {
        b.onclick = () => {
          if (id === r.answer) {
            b.classList.add('right');
            for (const x of pins.values()) x.onclick = null;
            rightFx(fb, r.fb ? `${t('task.right')} ${r.fb}` : t('task.right'));
            resolve();
          } else {
            errors++;
            b.classList.add('wrong');
            setTimeout(() => b.classList.remove('wrong'), 600);
            wrongFx(el, fb);
          }
        };
      }
    });
    await continueBtn(el);
    for (const b of pins.values()) b.classList.remove('right');
  }
  showOverlay(null);
  return errors;
}

// ---------- Ticketautomat: Fahrpreis ablesen, Knopf wählen, Münzen einwerfen ----------
export async function ticket(task: Extract<Task, { type: 'ticket' }>): Promise<number> {
  let errors = 0;
  const target = task.fares.find((f) => f.jp === task.target)!;
  showOverlay(h('div', { class: 'faretable' },
    h('div', { class: 'fare-head' }, h('span', { lang: 'ja' }, 'うんちん'), h('span', {}, ' · Fahrpreise')),
    h('div', { class: 'fare-grid' }, ...task.fares.map((f) =>
      h('div', { class: 'fare' }, h('span', { class: 'fare-st', html: jpBlock(f.jp, f.ro) }), h('span', { class: 'fare-p' }, `${f.price}円`))))));
  const prices = shuffle([...new Set(task.fares.map((f) => f.price))].sort((a, b) => a - b));
  const keys = h('div', { class: 'ticket-keys' });
  const { el, fb } = frame(task.q, h('div', { class: 'small' }, t('task.ticket.hint')), keys);
  await new Promise<void>((resolve) => {
    prices.forEach((p) => {
      const b = h('button', { class: 'tkey' }, `${p}円`);
      b.onclick = () => {
        if (b.disabled) return;
        if (p === target.price) {
          b.classList.add('right');
          keys.querySelectorAll('button').forEach((x) => (x.disabled = true));
          sfx.right();
          resolve();
        } else {
          errors++;
          b.classList.add('wrong');
          b.disabled = true;
          wrongFx(el, fb);
        }
      };
      keys.append(b);
    });
  });
  // Münzen einwerfen
  let paid = 0;
  const lcd = h('div', { class: 'lcd' });
  const coins = h('div', { class: 'coins' });
  const draw = () => (lcd.textContent = `${t('task.ticket.paid')}: ${paid}円 / ${target.price}円`);
  draw();
  fb.className = 'feedback';
  fb.textContent = t('task.ticket.coins');
  el.append(lcd, coins);
  await new Promise<void>((resolve) => {
    for (const c of [500, 100, 50, 10]) {
      coins.append(h('button', {
        class: `coin c${c}`, onclick: () => {
          if (paid >= target.price) return;
          paid += c;
          sfx.tap();
          draw();
          if (paid >= target.price) {
            coins.querySelectorAll('button').forEach((x) => (x.disabled = true));
            rightFx(fb, `${t('task.ticket.done')}${paid > target.price ? ` ${t('task.ticket.change', { n: paid - target.price })}` : ''}`);
            resolve();
          }
        },
      }, `${c}`));
    }
  });
  await continueBtn(el);
  showOverlay(null);
  return errors;
}

// ---------- Espresso: Mahlgrad, Temperatur und Anpressdruck einstellen ----------
export async function espresso(task: Extract<Task, { type: 'espresso' }>): Promise<number> {
  let errors = 0;
  const v = { ...task.start };
  const cup = h('div', { class: 'espresso-cup' }, svg(closeups.espresso), h('div', { class: 'espresso-note' }, t('task.espresso.ready')));
  showOverlay(h('div', { class: 'closeup' }, h('div', { class: 'closeup-card' }, h('div', { class: 'closeup-head' }, t('task.espresso.title')), cup)));
  const slider = (key: 'grind' | 'temp' | 'tamp', label: string, min: number, max: number, unit: (n: number) => string) => {
    const out = h('span', { class: 'sl-val' }, unit(v[key]));
    const r = h('input', { type: 'range', min, max, step: 1, value: v[key], 'aria-label': label }) as HTMLInputElement;
    r.oninput = () => { v[key] = Number(r.value); out.textContent = unit(v[key]); };
    return h('label', { class: 'sl' }, h('span', { class: 'sl-l' }, label), r, out);
  };
  const btn = h('button', { class: 'btn primary' }, t('task.espresso.brew'));
  const { el, fb } = frame(task.q,
    slider('grind', t('task.espresso.grind'), 1, 7, (n) => `${n} · ${n <= 2 ? t('task.espresso.fine') : n >= 6 ? t('task.espresso.coarse') : t('task.espresso.mid')}`),
    slider('temp', t('task.espresso.temp'), 86, 98, (n) => `${n} °C`),
    slider('tamp', t('task.espresso.tamp'), 5, 25, (n) => `${n} kg`),
    h('div', { class: 'row' }, btn));
  const note = cup.querySelector('.espresso-note') as HTMLElement;
  await new Promise<void>((resolve) => {
    btn.onclick = () => {
      const seconds = Math.round(27 + (3 - v.grind) * 5 + (v.tamp - 15) * 0.35);
      const problems: string[] = [];
      if (v.grind > task.ok.grind[1]) problems.push(t('task.espresso.tooCoarse'));
      if (v.grind < task.ok.grind[0]) problems.push(t('task.espresso.tooFine'));
      if (v.temp > task.ok.temp[1]) problems.push(t('task.espresso.tooHot'));
      if (v.temp < task.ok.temp[0]) problems.push(t('task.espresso.tooCold'));
      if (v.tamp < task.ok.tamp[0]) problems.push(t('task.espresso.tooLoose'));
      if (v.tamp > task.ok.tamp[1]) problems.push(t('task.espresso.tooHard'));
      cup.classList.remove('pour');
      void cup.offsetWidth;
      cup.classList.add('pour');
      note.textContent = `${t('task.espresso.time', { s: Math.max(8, seconds) })} ${problems.length ? problems.join(' ') : t('task.espresso.perfect')}`;
      if (problems.length) { errors++; wrongFx(el, fb, problems.join(' ')); }
      else {
        btn.remove();
        el.querySelectorAll('input').forEach((i) => (i.disabled = true));
        rightFx(fb, t('task.espresso.perfect'));
        resolve();
      }
    };
  });
  await continueBtn(el);
  showOverlay(null);
  return errors;
}

// ---------- Chronologisch sortieren ----------
export async function sortTask(task: Extract<Task, { type: 'sort' }>): Promise<number> {
  let errors = 0;
  const order = h('ol', { class: 'sort-list' });
  const pool = h('div', { class: 'sort-pool' });
  const btn = h('button', { class: 'btn primary' }, t('common.check'));
  const reset = h('button', { class: 'btn small' }, t('common.undo'));
  const { el, fb } = frame(task.q, h('div', { class: 'small' }, t('task.sort.hint')), order, pool, h('div', { class: 'row' }, reset, btn));
  const picked: HTMLElement[] = [];
  const cards = task.items.map((it, i) => {
    const b = h('button', { class: 'sort-card', 'data-i': String(i) }, h('span', { class: 'sc-l', html: rich(it.label) }), it.sub ? h('span', { class: 'sc-s' }, it.sub) : null);
    b.onclick = () => {
      sfx.tap();
      if (b.parentElement === pool) { order.append(b); picked.push(b); }
      else { pool.append(b); picked.splice(picked.indexOf(b), 1); }
    };
    return b;
  });
  for (const c of shuffle(cards)) pool.append(c);
  reset.onclick = () => { for (const c of picked.splice(0)) pool.append(c); };
  await new Promise<void>((resolve) => {
    btn.onclick = () => {
      if (picked.length !== task.items.length) { fb.className = 'feedback'; fb.textContent = t('task.sort.all'); return; }
      if (picked.every((c, i) => c.dataset.i === String(i))) {
        btn.remove(); reset.remove();
        picked.forEach((c) => ((c as HTMLButtonElement).disabled = true));
        rightFx(fb);
        resolve();
      } else {
        errors++;
        wrongFx(el, fb);
      }
    };
  });
  await continueBtn(el);
  return errors;
}

// ---------- Kanji-Raster: Bedeutung lesen, passendes Zeichen antippen ----------
export async function kanjigrid(task: Extract<Task, { type: 'kanjigrid' }>): Promise<number> {
  let errors = 0;
  const prompt = h('div', { class: 'kg-prompt' });
  const grid = h('div', { class: 'kg-grid' });
  const { el, fb } = frame(task.q, prompt, grid);
  const tiles = new Map<string, HTMLButtonElement>();
  for (const k of shuffle(task.grid)) {
    const b = h('button', { class: 'kg-tile', lang: 'ja' }, k);
    tiles.set(k, b);
    grid.append(b);
  }
  for (let i = 0; i < task.prompts.length; i++) {
    const p = task.prompts[i];
    prompt.innerHTML = `<span class="small muted">${t('task.round', { i: i + 1, n: task.prompts.length })}</span><span class="kg-de">${rich(p.de)}</span>`;
    await new Promise<void>((resolve) => {
      for (const [k, b] of tiles) {
        b.onclick = () => {
          if (b.disabled) return;
          if (k === p.answer) {
            b.classList.add('right');
            b.disabled = true;
            sfx.right();
            fb.className = 'feedback good';
            fb.textContent = `${k} = ${p.de}`;
            resolve();
          } else {
            errors++;
            b.classList.add('wrong');
            setTimeout(() => b.classList.remove('wrong'), 500);
            wrongFx(el, fb);
          }
        };
      }
    });
    await wait(450);
  }
  rightFx(fb);
  await continueBtn(el);
  return errors;
}
