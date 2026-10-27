// Aufgaben-Mechaniken. Jede Aufgabe liefert die Anzahl der Fehler zurück (für die Sterne).
// Bei Fehlern wird wiederholt, bis die Aufgabe gelöst ist – Scheitern gibt es nicht.
import { sfx } from '../audio';
import { t } from '../i18n';
import { G } from '../state';
import type { Option, Task } from '../types';
import { closeups, hanafuda, icons, leaves, sports } from './art';
import { h, shuffle, svg, wait } from './dom';
import { mount, toast } from './layout';
import { hot, showOverlay } from './scene';
import { jpBlock, matches, rich } from './text';

type El = HTMLElement;

export async function runTask(task: Task): Promise<number> {
  switch (task.type) {
    case 'choice': return choice(task);
    case 'input': return input(task);
    case 'estimate': return estimate(task);
    case 'inspect': return inspect(task);
    case 'pairs': return pairs(task);
    case 'decipher': return decipher(task);
    case 'slots': return slots(task);
    case 'build': return build(task);
    case 'rounds': return rounds(task);
    case 'route': return route(task);
  }
}

// ---------- Bausteine ----------
function frame(q: string, ...body: (El | null)[]) {
  const fb = h('div', { class: 'feedback', 'aria-live': 'assertive' });
  const el = h('div', { class: 'task' }, h('div', { class: 'q', html: rich(q) }), ...body.filter(Boolean) as El[], fb);
  mount(el);
  return { el, fb };
}
function optionLabel(o: Option): El {
  if (typeof o === 'string') return h('span', { html: rich(o) });
  return h('span', { class: 'opt-jp', html: jpBlock(o.jp, o.ro, 'big') });
}
function showJp(jp?: string) {
  return jp ? h('div', { class: 'show', html: jpBlock(jp, undefined, 'huge') }) : null;
}
function wrongFx(el: El, fb: El, msg = t('task.wrong')) {
  sfx.wrong();
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
  fb.className = 'feedback bad';
  fb.textContent = msg;
}
function rightFx(fb: El, msg = t('task.right')) {
  sfx.right();
  fb.className = 'feedback good';
  fb.innerHTML = rich(msg);
}
function continueBtn(container: El, label = t('common.next')): Promise<void> {
  return new Promise((r) => {
    const b = h('button', { class: 'btn primary wide', 'data-primary': '', onclick: () => r() }, label);
    container.append(b);
    b.focus({ preventScroll: true });
  });
}

// ---------- Multiple Choice / Recall-Auswahl ----------
async function choice(task: Extract<Task, { type: 'choice' }>): Promise<number> {
  let errors = 0;
  const grid = h('div', { class: `options ${task.options.some((o) => typeof o !== 'string') ? 'jp-options' : ''}` });
  const { el, fb } = frame(task.q, showJp(task.show?.jp), grid);
  await new Promise<void>((resolve) => {
    task.options.forEach((o, i) => {
      const b = h('button', { class: 'opt', 'data-key': String(i + 1) }, h('span', { class: 'k' }, String(i + 1)), optionLabel(o));
      b.addEventListener('click', () => {
        if (b.disabled) return;
        if (i === task.answer) {
          b.classList.add('right');
          grid.querySelectorAll('button').forEach((x) => (x.disabled = true));
          rightFx(fb, task.explain ? `${t('task.right')} ${task.explain}` : t('task.right'));
          resolve();
        } else {
          errors++;
          b.classList.add('wrong');
          b.disabled = true;
          wrongFx(el, fb);
        }
      });
      grid.append(b);
    });
  });
  await continueBtn(el);
  return errors;
}

// ---------- Freie Eingabe ----------
async function input(task: Extract<Task, { type: 'input' }>): Promise<number> {
  let errors = 0;
  const field = h('input', { class: 'field', type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', placeholder: task.placeholder ?? '', 'aria-label': task.q });
  const btn = h('button', { class: 'btn primary' }, t('common.check'));
  const { el, fb } = frame(task.q, showJp(task.show?.jp), h('div', { class: 'row input-row' }, field, btn));
  await new Promise<void>((resolve) => {
    const check = () => {
      if (!field.value.trim()) return;
      if (matches(field.value, task.accept)) {
        field.disabled = true;
        btn.remove();
        rightFx(fb);
        resolve();
      } else {
        errors++;
        wrongFx(el, fb);
        field.select();
      }
    };
    btn.onclick = check;
    field.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); check(); } });
    setTimeout(() => field.focus({ preventScroll: true }), 50);
  });
  await continueBtn(el);
  return errors;
}

// ---------- Schätzregler (±Toleranz) ----------
async function estimate(task: Extract<Task, { type: 'estimate' }>): Promise<number> {
  let errors = 0;
  const mid = Math.round((task.min + task.max) / 2 / task.step) * task.step;
  const range = h('input', { type: 'range', min: task.min, max: task.max, step: task.step, value: mid, 'aria-label': task.q });
  const num = h('input', { type: 'number', class: 'field num', min: task.min, max: task.max, step: task.step, value: mid });
  range.oninput = () => (num.value = range.value);
  num.oninput = () => (range.value = num.value);
  const btn = h('button', { class: 'btn primary' }, t('common.check'));
  const { el, fb } = frame(task.q, h('div', { class: 'estimate' }, range, h('div', { class: 'row' }, num, h('span', { class: 'unit' }, task.unit), btn)));
  await new Promise<void>((resolve) => {
    btn.onclick = () => {
      const v = Number(num.value);
      if (Number.isNaN(v)) return;
      if (Math.abs(v - task.answer) <= task.answer * task.tol) {
        btn.remove();
        range.disabled = num.disabled = true;
        rightFx(fb, `${t('task.estimate.ok')} ${t('task.estimate.answer', { v: task.answer, u: task.unit })}`);
        resolve();
      } else {
        errors++;
        wrongFx(el, fb, v < task.answer ? t('task.estimate.low') : t('task.estimate.high'));
      }
    };
  });
  await continueBtn(el);
  return errors;
}

// ---------- Suchbild (Point & Click) ----------
async function inspect(task: Extract<Task, { type: 'inspect' }>): Promise<number> {
  let errors = 0;
  const { el, fb } = frame(task.q, h('div', { class: 'hint-line' }, svg(icons.magnifier, 'ico'), t('task.inspect.hint')));
  hot.classList.add('on');
  await new Promise<void>((resolve) => {
    const onTap = (e: PointerEvent) => {
      const r = hot.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      // Abstand in einheitlichen Einheiten (Bild ist 4:3)
      const d = Math.hypot((x - task.x) * 4, (y - task.y) * 3) / 4;
      const ripple = h('span', { class: 'ripple', style: `left:${x}%;top:${y}%` });
      hot.append(ripple);
      setTimeout(() => ripple.remove(), 700);
      if (d <= task.r) {
        hot.removeEventListener('pointerdown', onTap);
        hot.classList.remove('on');
        sfx.find();
        showOverlay(h('div', { class: 'closeup' },
          h('div', { class: 'closeup-card' },
            h('div', { class: 'closeup-head' }, task.closeup.title),
            svg(closeups[task.closeup.art] ?? closeups.board, 'closeup-art'))));
        rightFx(fb, task.closeup.text);
        resolve();
      } else if (d <= task.r * 2) {
        fb.className = 'feedback';
        fb.textContent = '…';
      } else {
        errors++;
        wrongFx(el, fb, t('task.inspect.miss'));
      }
    };
    hot.addEventListener('pointerdown', onTap);
  });
  await continueBtn(el);
  showOverlay(null);
  return errors;
}

// ---------- Kachel-Paare (Kana ↔ Rōmaji) ----------
async function pairs(task: Extract<Task, { type: 'pairs' }>): Promise<number> {
  let errors = 0;
  for (let si = 0; si < task.sets.length; si++) {
    const set = task.sets[si];
    const left = h('div', { class: 'col' });
    const right = h('div', { class: 'col' });
    const { el, fb } = frame(task.q, h('div', { class: 'small' }, `${t('task.round', { i: si + 1, n: task.sets.length })} · ${t('task.pairs.hint')}`), h('div', { class: 'pairs' }, left, right));
    let sel: El | null = null;
    let solved = 0;
    await new Promise<void>((resolve) => {
      for (const [jp] of shuffle(set)) {
        const b = h('button', { class: 'tile jp-tile', 'data-v': jp, lang: 'ja' }, jp);
        b.onclick = () => {
          if (b.classList.contains('done')) return;
          sel?.classList.remove('sel');
          sel = b;
          b.classList.add('sel');
          sfx.tap();
        };
        left.append(b);
      }
      for (const [jp, ro] of shuffle(set)) {
        const b = h('button', { class: 'tile', 'data-v': jp }, ro);
        b.onclick = () => {
          if (!sel || b.classList.contains('done')) return;
          if (sel.dataset.v === jp) {
            sel.classList.remove('sel');
            sel.classList.add('done');
            b.classList.add('done');
            sel = null;
            sfx.right();
            if (++solved === set.length) { rightFx(fb); resolve(); }
          } else {
            errors++;
            b.classList.add('wrong');
            setTimeout(() => b.classList.remove('wrong'), 500);
            wrongFx(el, fb);
          }
        };
        right.append(b);
      }
    });
    await wait(500);
  }
  return errors;
}

// ---------- Schild entziffern (Silben zusammensetzen) ----------
async function decipher(task: Extract<Task, { type: 'decipher' }>): Promise<number> {
  let errors = 0;
  const signEl = h('div', { class: 'signboard', lang: 'ja' }, task.sign);
  const answerEl = h('div', { class: 'answer-line' });
  const tilesEl = h('div', { class: 'tiles' });
  const undo = h('button', { class: 'btn small' }, t('common.undo'));
  const { el, fb } = frame(task.q, signEl, h('div', { class: 'small' }, t('task.decipher.hint')), answerEl, tilesEl, h('div', { class: 'row' }, undo));
  const picked: HTMLButtonElement[] = [];
  const render = () => answerEl.replaceChildren(...task.answer.map((_, i) => h('span', { class: `slot ${picked[i] ? 'filled' : ''}` }, picked[i]?.textContent ?? '')));
  render();
  await new Promise<void>((resolve) => {
    shuffle(task.tiles).forEach((syl) => {
      const b = h('button', { class: 'tile' }, syl);
      b.onclick = () => {
        if (b.disabled || picked.length >= task.answer.length) return;
        sfx.tap();
        b.disabled = true;
        picked.push(b);
        render();
        if (picked.length === task.answer.length) {
          if (picked.map((p) => p.textContent).join('|') === task.answer.join('|')) {
            tilesEl.querySelectorAll('button').forEach((x) => (x.disabled = true));
            undo.remove();
            signEl.classList.add('solved');
            rightFx(fb, `${t('task.right')} ${task.sign} = ${task.answer.join('')} – ${task.meaning}`);
            resolve();
          } else {
            errors++;
            wrongFx(el, fb);
            setTimeout(() => { picked.splice(0).forEach((p) => (p.disabled = false)); render(); }, 450);
          }
        }
      };
      tilesEl.append(b);
    });
    undo.onclick = () => { const p = picked.pop(); if (p) p.disabled = false; render(); };
  });
  await continueBtn(el);
  return errors;
}

// ---------- Vokabeln einsetzen ----------
async function slots(task: Extract<Task, { type: 'slots' }>): Promise<number> {
  let errors = 0;
  const itemsEl = h('div', { class: 'slot-items' });
  const wordsEl = h('div', { class: 'tiles' });
  const { el, fb } = frame(task.q, h('div', { class: 'small' }, t('task.slots.hint')), itemsEl, wordsEl);
  let sel: { el: El; ro: string; jp: string } | null = null;
  let solved = 0;
  await new Promise<void>((resolve) => {
    for (const w of shuffle(task.words)) {
      const b = h('button', { class: 'tile jp-word', html: jpBlock(w.jp, w.ro) });
      b.onclick = () => {
        if (b.classList.contains('done')) return;
        sel?.el.classList.remove('sel');
        sel = { el: b, ro: w.ro, jp: w.jp };
        b.classList.add('sel');
        sfx.tap();
      };
      wordsEl.append(b);
    }
    for (const it of task.items) {
      const drop = h('span', { class: 'drop' }, '?');
      const card = h('button', { class: 'slot-item' }, svg(icons[it.icon] ?? icons.item, 'ico'), h('span', { class: 'lbl' }, it.label), drop);
      card.onclick = () => {
        if (!sel || card.classList.contains('done')) return;
        if (sel.ro === it.answer) {
          card.classList.add('done');
          drop.innerHTML = jpBlock(sel.jp);
          sel.el.classList.remove('sel');
          sel.el.classList.add('done');
          sel = null;
          sfx.right();
          if (++solved === task.items.length) { rightFx(fb); resolve(); }
        } else {
          errors++;
          wrongFx(card, fb);
        }
      };
      itemsEl.append(card);
    }
  });
  await continueBtn(el);
  return errors;
}

// ---------- Satzbau-Puzzle ----------
async function build(task: Extract<Task, { type: 'build' }>): Promise<number> {
  let errors = 0;
  const answerEl = h('div', { class: 'answer-line build' });
  const tilesEl = h('div', { class: 'tiles' });
  const btn = h('button', { class: 'btn primary' }, t('common.check'));
  const { el, fb } = frame(task.q, h('div', { class: 'small' }, t('task.build.hint')), answerEl, tilesEl, h('div', { class: 'row' }, btn));
  const chosen: El[] = [];
  await new Promise<void>((resolve) => {
    for (const tile of shuffle(task.tiles)) {
      const b = h('button', { class: 'tile jp-word', 'data-jp': tile.jp, html: jpBlock(tile.jp, tile.ro) });
      b.onclick = () => {
        sfx.tap();
        if (b.parentElement === tilesEl) { answerEl.append(b); chosen.push(b); }
        else { tilesEl.append(b); chosen.splice(chosen.indexOf(b), 1); }
      };
      tilesEl.append(b);
    }
    btn.onclick = () => {
      if (!chosen.length) return;
      if (chosen.map((c) => c.dataset.jp).join('|') === task.answer.join('|')) {
        btn.remove();
        [...answerEl.children, ...tilesEl.children].forEach((c) => ((c as HTMLButtonElement).disabled = true));
        rightFx(fb, `${t('task.right')} ${task.answer.join(' ')}`);
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

// ---------- Runden-Auswahl (vereinfachte Fassung der thematischen Minigames) ----------
async function rounds(task: Extract<Task, { type: 'rounds' }>): Promise<number> {
  let errors = 0;
  for (let ri = 0; ri < task.rounds.length; ri++) {
    const r = task.rounds[ri];
    const opts = task.fixed ?? r.options ?? [];
    const artKey = r.art ?? task.art ?? '';
    const art = hanafuda[artKey] ?? leaves[artKey] ?? sports[artKey] ?? (task.art ? sports[task.art] : undefined);
    const grid = h('div', { class: 'options' });
    const timer = task.timed ? h('div', { class: 'timer' }, h('span')) : null;
    const { el, fb } = frame(r.q ?? '',
      h('div', { class: 'small' }, t('task.round', { i: ri + 1, n: task.rounds.length })),
      art ? svg(art, `round-art ${task.art ?? ''}`) : null,
      r.jp ? h('div', { class: 'show', html: jpBlock(r.jp, r.ro, 'huge') }) : null,
      timer, grid);
    let tid: number | undefined;
    const startTimer = () => {
      if (!timer || !task.timed) return;
      const bar = timer.firstElementChild as El;
      bar.style.transition = 'none';
      bar.style.width = '100%';
      void bar.offsetWidth;
      bar.style.transition = `width ${task.timed}s linear`;
      bar.style.width = '0%';
      clearTimeout(tid);
      tid = window.setTimeout(() => { errors++; wrongFx(el, fb, t('task.timeout')); startTimer(); }, task.timed * 1000);
    };
    await new Promise<void>((resolve) => {
      opts.forEach((o, i) => {
        const b = h('button', { class: 'opt', 'data-key': String(i + 1) }, h('span', { class: 'k' }, String(i + 1)), h('span', { html: rich(o) }));
        b.onclick = () => {
          if (b.disabled) return;
          if (i === r.answer) {
            clearTimeout(tid);
            timer?.remove();
            b.classList.add('right');
            grid.querySelectorAll('button').forEach((x) => (x.disabled = true));
            rightFx(fb, r.fb ? `${t('task.right')} ${r.fb}` : t('task.right'));
            resolve();
          } else {
            errors++;
            b.classList.add('wrong');
            b.disabled = true;
            wrongFx(el, fb);
          }
        };
        grid.append(b);
      });
      startTimer();
    });
    if (r.fb || ri === task.rounds.length - 1) await continueBtn(el);
    else await wait(700);
  }
  return errors;
}

// ---------- Routenwahl (Romance) ----------
async function route(task: Extract<Task, { type: 'route' }>): Promise<number> {
  const grid = h('div', { class: 'options' });
  frame(task.q, grid);
  const value = await new Promise<string>((resolve) => {
    task.options.forEach((o, i) => {
      grid.append(h('button', { class: 'opt', 'data-key': String(i + 1), onclick: () => resolve(o.value) },
        h('span', { class: 'k' }, String(i + 1)), h('span', {}, o.label)));
    });
  });
  G.flags.partner = value;
  sfx.done();
  toast('♥', 'good', 900);
  return 0;
}
