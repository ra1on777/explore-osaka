// Fußball-Minispiele: Elfmeter (zielen + Schusskraft) und 1-gegen-1-Duell (Situation lesen + Timing).
import { sfx } from '../audio';
import { t } from '../i18n';
import type { DuelPose, PkKeeper, PkZone, Task } from '../types';
import { h, svg, wait } from './dom';
import { continueBtn, frame, rightFx, wrongFx } from './tasks';
import { rich } from './text';

type El = HTMLElement;
const O = '#2C221E', GOLD = '#F4B63F', RED = '#E8352E', BLUE = '#3A72C8', SKIN = '#f2cfa9';

/** Zeitfehler (Schusskraft, Timing) zählen nur halb, Entscheidungsfehler voll. */
const score = (decision: number, timing: number) => decision + Math.floor(timing / 2);

/** Hin-und-her-Wert 0..1..0 für Balken und Ringe. */
function pingPong(start: number, dur: number) {
  const x = ((performance.now() - start) / dur) % 2;
  return x < 1 ? x : 2 - x;
}

/** Wartet auf Klick oder Leertaste/Enter auf einem Knopf. */
function press(btn: El): Promise<void> {
  return new Promise((resolve) => {
    const key = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); done(); } };
    const done = () => { if ((btn as HTMLButtonElement).disabled) return; document.removeEventListener('keydown', key); btn.onclick = null; resolve(); };
    btn.onclick = done;
    document.addEventListener('keydown', key);
  });
}

// ================= Elfmeter =================
const ZONES: Record<PkZone, [number, number]> = { tl: [82, 58], tc: [160, 58], tr: [238, 58], bl: [82, 122], bc: [160, 122], br: [238, 122] };
const KEEPER: Record<PkKeeper, string> = {
  center: 'translate(160px,150px)',
  left: 'translate(138px,150px) rotate(-12deg)',
  right: 'translate(182px,150px) rotate(12deg)',
  wide: 'translate(160px,150px) scale(1.14)',
  diveLeft: 'translate(110px,148px) rotate(-78deg)',
  diveRight: 'translate(210px,148px) rotate(78deg)',
};
function keeperTo(z: PkZone) {
  const [x, y] = ZONES[z];
  const rot = x < 120 ? -70 : x > 200 ? 70 : 0;
  return `translate(${x + (rot ? (rot < 0 ? 28 : -28) : 0)}px,${y + 34}px) rotate(${rot}deg)`;
}
function keeperSvg(arms: 'down' | 'up') {
  const a = arms === 'up' ? 'M-10 -54l-20 -22M10 -54l20 -22' : 'M-10 -52l-18 14M10 -52l18 14';
  return `<g class="pk-keeper-fig">
    <path d="M-7 -26l-6 26M7 -26l6 26" stroke="${O}" stroke-width="7" stroke-linecap="round"/>
    <path d="${a}" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="${arms === 'up' ? -30 : -28}" cy="${arms === 'up' ? -76 : -38}" r="5" fill="#59b35a" stroke="${O}" stroke-width="1.5"/>
    <circle cx="${arms === 'up' ? 30 : 28}" cy="${arms === 'up' ? -76 : -38}" r="5" fill="#59b35a" stroke="${O}" stroke-width="1.5"/>
    <rect x="-12" y="-60" width="24" height="36" rx="7" fill="${GOLD}" stroke="${O}" stroke-width="2"/>
    <circle cy="-70" r="9" fill="${SKIN}" stroke="${O}" stroke-width="2"/>
    <path d="M-9 -73c3-8 15-8 18 0" fill="${O}"/></g>`;
}
function goalSvg(keeper: PkKeeper, wind?: 'left' | 'right') {
  const net = [...Array(13)].map((_, i) => `<path d="M${40 + i * 20} 30v120" />`).join('') + [...Array(6)].map((_, i) => `<path d="M40 ${30 + i * 20}h240" />`).join('');
  const zones = (Object.keys(ZONES) as PkZone[]).map((z) => {
    const [x, y] = ZONES[z];
    return `<rect class="pk-zone" data-zone="${z}" x="${x - 38}" y="${y - 28}" width="76" height="56" rx="8"/>`;
  }).join('');
  const w = wind ? `<g class="pk-wind" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".85">${[20, 44, 68].map((y) =>
    wind === 'right' ? `<path d="M8 ${y}h22m-6-5l6 5-6 5"/>` : `<path d="M312 ${y}h-22m6-5l-6 5 6 5"/>`).join('')}</g>` : '';
  return `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="200" fill="#4f8a4b"/><rect y="150" width="320" height="50" fill="#5a9a55"/>
    <path d="M0 150h320" stroke="#e8f3e3" stroke-width="2"/>
    <g stroke="rgba(255,255,255,.28)" stroke-width="1">${net}</g>
    <path d="M40 152V30h240v122" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>
    ${zones}
    <g class="pk-keeper" style="transform:${KEEPER[keeper]}">${keeperSvg(keeper === 'wide' ? 'up' : 'down')}</g>
    <g class="pk-ball" style="transform:translate(160px,184px)"><circle r="8" fill="#fff" stroke="${O}" stroke-width="1.8"/><path d="M-3-2l3-3 3 3-1 4h-4z" fill="${O}"/></g>
    ${w}</svg>`;
}

export async function penalty(task: Extract<Task, { type: 'penalty' }>): Promise<number> {
  let dec = 0, tim = 0;
  for (let ri = 0; ri < task.rounds.length; ri++) {
    const r = task.rounds[ri];
    const [lo, hi] = r.power ?? [0.6, 0.84];
    const dur = 1050 / (r.speed ?? 1);
    const pitch = svg(goalSvg(r.keeper ?? 'center', r.wind), 'pk-pitch');
    const zone = h('div', { class: 'pk-ok', style: `left:${lo * 100}%;width:${(hi - lo) * 100}%` });
    const marker = h('div', { class: 'pk-mark' });
    const bar = h('div', { class: 'pk-power', 'data-ok': '0' }, h('span', { class: 'pk-lbl l' }, t('pk.soft')), zone, marker, h('span', { class: 'pk-lbl r' }, t('pk.hard')));
    const shoot = h('button', { class: 'btn primary wide pk-shoot', disabled: true }, t('pk.shoot')) as HTMLButtonElement;
    const step1 = h('div', { class: 'pk-step on' }, `1 · ${t('pk.aim')}`);
    const step2 = h('div', { class: 'pk-step' }, `2 · ${t('pk.power')}`);
    const { el, fb } = frame(r.q,
      h('div', { class: 'small' }, t('task.round', { i: ri + 1, n: task.rounds.length })),
      pitch, h('div', { class: 'pk-steps' }, step1, step2), bar, shoot);
    const S = pitch.querySelector('svg')!;
    const keeper = S.querySelector<SVGGElement>('.pk-keeper')!;
    const ball = S.querySelector<SVGGElement>('.pk-ball')!;
    let aim: PkZone | null = null;
    const setAim = (z: PkZone | null) => {
      aim = z;
      S.querySelectorAll('.pk-zone').forEach((x) => x.classList.toggle('sel', x.getAttribute('data-zone') === z));
      shoot.disabled = !z;
      step1.classList.toggle('on', !z); step2.classList.toggle('on', !!z);
    };
    S.querySelectorAll<SVGRectElement>('.pk-zone').forEach((zr) => zr.addEventListener('click', () => { sfx.tap(); setAim(zr.dataset.zone as PkZone); }));
    // Kraftbalken läuft durchgehend
    const t0 = performance.now();
    let raf = 0, live = true;
    const tick = () => {
      if (!live) return;
      const p = pingPong(t0, dur);
      marker.style.left = `${p * 100}%`;
      const m = (hi - lo) * 0.2;
      bar.dataset.ok = p > lo + m && p < hi - m ? '1' : '0';
      raf = requestAnimationFrame(tick);
    };
    tick();
    const reset = () => { ball.style.transition = 'none'; ball.style.transform = 'translate(160px,184px)'; keeper.style.transition = 'none'; keeper.style.transform = KEEPER[r.keeper ?? 'center']; void (ball as unknown as HTMLElement).getBoundingClientRect(); ball.style.transition = ''; keeper.style.transition = ''; };
    for (;;) {
      await press(shoot);
      const p = pingPong(t0, dur);
      const z = aim!;
      const [x, y] = ZONES[z];
      shoot.disabled = true;
      if (p > hi) {
        tim++; ball.style.transform = `translate(${x}px,8px) scale(.55)`;
        wrongFx(el, fb, t('pk.over'));
      } else if (p < lo) {
        tim++; ball.style.transform = `translate(${x}px,${y + 20}px) scale(.7)`; keeper.style.transform = keeperTo(z);
        wrongFx(el, fb, t('pk.weak'));
      } else if (!r.good.includes(z)) {
        dec++; ball.style.transform = `translate(${x}px,${y}px) scale(.62)`; keeper.style.transform = keeperTo(z);
        wrongFx(el, fb, t('pk.saved'));
      } else {
        const other = (['bl', 'br', 'tl', 'tr'] as PkZone[]).find((k) => ZONES[k][0] !== x && !r.good.includes(k)) ?? (x < 160 ? 'br' : 'bl');
        ball.style.transform = `translate(${x}px,${y}px) scale(.62)`; keeper.style.transform = keeperTo(other);
        el.classList.add('pk-goal');
        rightFx(fb, `${t('pk.goal')} ${r.fb ?? ''}`);
        break;
      }
      const saved = p >= lo && p <= hi;
      await wait(900);
      reset();
      if (saved) setAim(null); else shoot.disabled = false;
    }
    live = false; cancelAnimationFrame(raf);
    bar.remove(); shoot.remove();
    await continueBtn(el);
  }
  return score(dec, tim);
}

// ================= 1 gegen 1 =================
interface Fig { x: number; spread?: number; lean?: number; crouch?: number; lunge?: boolean; down?: boolean }
function figure(f: Fig, color: string, face: 1 | -1) {
  const sp = f.spread ?? 12, cr = f.crouch ?? 0, lean = f.lean ?? 0;
  const hip = -34 + cr * 10;
  const leg = (deg: number) => `M0 ${hip}L${(Math.tan((deg * Math.PI) / 180) * -hip).toFixed(1)} 0`;
  const legs = f.lunge
    ? `M0 ${hip}l${32 * face} ${-hip - 4}M0 ${hip}l${-6 * face} ${-hip}`
    : `${leg(-sp)}${leg(sp)}`;
  const body = `<g style="transform:rotate(${lean * face}deg)">
    <path d="${legs}" stroke="${O}" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M-9 ${hip - 26}l-14 18M9 ${hip - 26}l14 18" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
    <rect x="-12" y="${hip - 34}" width="24" height="36" rx="8" fill="${color}" stroke="${O}" stroke-width="2"/>
    <circle cy="${hip - 44}" r="10" fill="${SKIN}" stroke="${O}" stroke-width="2"/>
    <path d="M-10 ${hip - 47}c3-9 17-9 20 0" fill="${O}"/>
    <circle cx="${4 * face}" cy="${hip - 44}" r="1.6" fill="${O}"/></g>`;
  return `<g style="transform:translate(${f.x}px,140px)${f.down ? ' rotate(68deg) translate(10px,-6px)' : ''}">${body}</g>`;
}
const POSES: Record<DuelPose, { foe: Fig; extra?: string; ball?: number }> = {
  wide: { foe: { x: 215, spread: 34 } },
  closed: { foe: { x: 190, spread: 3, lean: 14 }, extra: 'speed' },
  rush: { foe: { x: 180, spread: 34, lean: 12 }, extra: 'speed' },
  lunge: { foe: { x: 170, lunge: true, lean: 10 } },
  shoulder: { foe: { x: 128, spread: 16, lean: 28 }, extra: 'contact' },
  deep: { foe: { x: 262, spread: 22, crouch: 1 }, extra: 'dots' },
  side: { foe: { x: 215, spread: 14 }, extra: 'look', ball: 198 },
  loose: { foe: { x: 205, spread: 20, lean: 8 }, ball: 248, extra: 'loose' },
  tired: { foe: { x: 205, spread: 30, lean: -6 }, extra: 'sweat' },
  slip: { foe: { x: 206, down: true } },
  post: { foe: { x: 168, spread: 30, crouch: .5 }, extra: 'post' },
};
function duelSvg(pose: DuelPose, ball: 'me' | 'foe') {
  const P = POSES[pose];
  const bx = ball === 'me' ? 112 : P.ball ?? P.foe.x - 18;
  const ex = {
    speed: `<g stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8">${[70, 90, 110].map((y) => `<path d="M${P.foe.x + 22} ${y}h${18 + (y % 3) * 6}"/>`).join('')}</g>`,
    contact: `<path d="M110 72l4 8 8-3-5 8 7 5-9 1 1 9-6-6-6 6 1-9-9-1 7-5-5-8 8 3z" fill="${GOLD}" stroke="${O}" stroke-width="1.5"/>`,
    dots: `<g fill="#fff">${[0, 1, 2].map((i) => `<circle cx="${P.foe.x - 8 + i * 8}" cy="52" r="2.5"/>`).join('')}</g>`,
    look: `<ellipse cx="270" cy="62" rx="36" ry="16" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-dasharray="5 4"/><path d="M${P.foe.x + 10} 80q30-26 44-20" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 4"/>`,
    loose: `<path d="M${P.foe.x + 14} 136q14-14 28-4" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`,
    sweat: `<g fill="#9fd3ff" stroke="${O}" stroke-width="1">${[[P.foe.x + 16, 72], [P.foe.x - 18, 78]].map(([x, y]) => `<path d="M${x} ${y}q4 6 0 9q-4-3 0-9z"/>`).join('')}</g>`,
    post: `<rect x="132" y="26" width="7" height="116" rx="3" fill="#6b7280" stroke="${O}" stroke-width="2"/><path d="M128 28h22" stroke="${O}" stroke-width="4" stroke-linecap="round"/><circle cx="150" cy="32" r="7" fill="#ffe9a8" stroke="${O}" stroke-width="2"/>`,
  }[P.extra ?? ''] ?? '';
  return `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="160" fill="#4f8a4b"/>${[0, 1, 2, 3].map((i) => `<rect x="${i * 80}" width="40" height="160" fill="rgba(255,255,255,.05)"/>`).join('')}
    <path d="M0 146h320" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
    ${pose === 'post' ? ex : ''}
    <g class="du-me">${figure({ x: 82, spread: 18, lean: 6 }, BLUE, 1)}</g>
    <g class="du-foe">${figure(P.foe, RED, -1)}</g>
    ${pose === 'post' ? '' : ex}
    <g class="du-ballg" style="transform:translate(${bx}px,139px)"><circle class="du-ring" r="34" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0"/><circle class="du-target" r="13" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 3" opacity="0"/><circle r="7" fill="#fff" stroke="${O}" stroke-width="1.8"/><path d="M-2.5-2l2.5-2.5 2.5 2.5-1 3h-3z" fill="${O}"/></g>
    <text x="82" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Fredoka, sans-serif">${t('du.you')}</text>
  </svg>`;
}

export async function duel(task: Extract<Task, { type: 'duel' }>): Promise<number> {
  let dec = 0, tim = 0;
  for (let ri = 0; ri < task.rounds.length; ri++) {
    const r = task.rounds[ri];
    const ballSide = r.ball ?? 'me';
    const scene = svg(duelSvg(r.pose, ballSide), 'du-pitch');
    const S = scene.querySelector('svg')!;
    const grid = h('div', { class: 'options du-moves' });
    const timer = h('div', { class: 'timer' }, h('span'));
    const step1 = h('div', { class: 'pk-step on' }, `1 · ${t('du.read')}`);
    const step2 = h('div', { class: 'pk-step' }, `2 · ${t('du.exec')}`);
    const { el, fb } = frame(r.q,
      h('div', { class: 'small' }, t('task.round', { i: ri + 1, n: task.rounds.length })),
      scene, h('div', { class: 'pk-steps' }, step1, step2), timer, grid);
    const secs = r.time ?? task.time ?? 8;
    const ballG = S.querySelector<SVGGElement>('.du-ballg')!;
    const me = S.querySelector<SVGGElement>('.du-me')!;
    const startBall = ballG.style.transform;
    // Stufe 1: Situation lesen und Zug wählen (mit Reaktionszeit)
    await new Promise<void>((resolve) => {
      let tid = 0;
      const startTimer = () => {
        const bar = timer.firstElementChild as El;
        bar.style.transition = 'none'; bar.style.width = '100%'; void bar.offsetWidth;
        bar.style.transition = `width ${secs}s linear`; bar.style.width = '0%';
        clearTimeout(tid);
        tid = window.setTimeout(() => { dec++; wrongFx(el, fb, t('du.slow')); startTimer(); }, secs * 1000);
      };
      task.moves.forEach((m, i) => {
        const b = h('button', { class: 'opt', 'data-key': String(i + 1), 'data-opt': String(i) }, h('span', { class: 'k' }, String(i + 1)), h('span', { html: rich(m) })) as HTMLButtonElement;
        b.onclick = async () => {
          if (b.disabled) return;
          if (i === r.answer) {
            clearTimeout(tid); timer.remove();
            b.classList.add('right');
            grid.querySelectorAll('button').forEach((x) => ((x as HTMLButtonElement).disabled = true));
            sfx.tap();
            resolve();
          } else {
            dec++;
            b.classList.add('wrong'); b.disabled = true;
            ballG.style.transform = ballSide === 'me' ? 'translate(230px,139px)' : 'translate(300px,120px)';
            wrongFx(el, fb, t('du.lost'));
            await wait(700); ballG.style.transform = startBall;
          }
        };
        grid.append(b);
      });
      startTimer();
    });
    // Stufe 2: Ausführung im richtigen Moment
    step1.classList.remove('on'); step2.classList.add('on');
    fb.className = 'feedback'; fb.textContent = t('du.execHint');
    const ring = S.querySelector<SVGCircleElement>('.du-ring')!;
    const target = S.querySelector<SVGCircleElement>('.du-target')!;
    ring.setAttribute('opacity', '1'); target.setAttribute('opacity', '1');
    const go = h('button', { class: 'btn primary wide du-go', 'data-ok': '0' }, t('du.go')) as HTMLButtonElement;
    el.append(go);
    const dur = 1250 / (r.speed ?? task.speed ?? 1);
    const R = (p: number) => 34 - p * 30; // 34 → 4
    const t0 = performance.now();
    let live = true;
    const tick = () => {
      if (!live) return;
      const rad = R(pingPong(t0, dur));
      ring.setAttribute('r', rad.toFixed(1));
      ring.setAttribute('stroke', Math.abs(rad - 13) <= 5 ? '#7CFC8A' : GOLD);
      go.dataset.ok = Math.abs(rad - 13) <= 3.5 ? '1' : '0';
      requestAnimationFrame(tick);
    };
    tick();
    for (;;) {
      await press(go);
      const rad = R(pingPong(t0, dur));
      if (Math.abs(rad - 13) <= 5.5) break;
      tim++;
      wrongFx(el, fb, rad > 13 ? t('du.early') : t('du.late'));
    }
    live = false;
    go.remove(); ring.setAttribute('opacity', '0'); target.setAttribute('opacity', '0');
    if (ballSide === 'me') { me.style.transform = 'translate(190px,0)'; ballG.style.transform = 'translate(300px,139px)'; } else { ballG.style.transform = 'translate(112px,139px)'; }
    el.classList.add('pk-goal');
    rightFx(fb, `${t('du.win')} ${r.fb ?? ''}`);
    await continueBtn(el);
  }
  return score(dec, tim);
}
