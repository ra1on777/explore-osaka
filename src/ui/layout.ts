// Doppelbildschirm: zwei 4:3-Flächen. Hochformat -> übereinander, Querformat -> nebeneinander
// (je nachdem, was die größere Bildfläche ergibt).
import { h } from './dom';

export const root = h('div', { id: 'console' });
export const top = h('section', { class: 'screen top', 'aria-label': 'Schauplatz' });
export const hinge = h('div', { class: 'hinge', 'aria-hidden': 'true' });
export const bottom = h('section', { class: 'screen bottom', 'aria-label': 'Interaktion' });
export const panel = h('div', { class: 'panel' });
export const toasts = h('div', { class: 'toasts', 'aria-live': 'polite' });
bottom.append(panel, toasts);
root.append(top, hinge, bottom);

export function fit() {
  const app = document.getElementById('app');
  const vw = app?.clientWidth || window.innerWidth;
  const vh = app?.clientHeight || window.innerHeight;
  const pad = vw < 600 ? 8 : 16;
  const gap = vw < 600 ? 8 : 14;
  // Übereinander
  const wStack = Math.min(vw - pad * 2, ((vh - pad * 2 - gap) / 2) * (4 / 3));
  // Nebeneinander
  const wSide = Math.min((vw - pad * 2 - gap) / 2, (vh - pad * 2) * (4 / 3));
  const side = wSide > wStack * 1.08;
  const w = Math.floor(side ? wSide : wStack);
  root.classList.toggle('side', side);
  root.classList.toggle('stack', !side);
  root.style.setProperty('--sw', `${w}px`);
  // Hochformat: unterer Bildschirm darf den restlichen Platz nutzen (mehr Raum für Text und Aufgaben)
  const bh = side ? w * 0.75 : Math.min(w * 1.25, Math.max(w * 0.75, vh - pad * 2 - gap - w * 0.75));
  root.style.setProperty('--bh', `${Math.floor(bh)}px`);
  root.style.setProperty('--gap', `${gap}px`);
}
window.addEventListener('resize', fit);
window.addEventListener('orientationchange', () => setTimeout(fit, 200));

export function mount(...nodes: (Node | null | false)[]) {
  panel.replaceChildren(...(nodes.filter(Boolean) as Node[]));
  panel.scrollTop = 0;
}

export function toast(text: string, kind: 'info' | 'good' | 'bad' = 'info', ms = 2200) {
  const el = h('div', { class: `toast ${kind}` }, text);
  toasts.append(el);
  requestAnimationFrame(() => el.classList.add('in'));
  setTimeout(() => { el.classList.remove('in'); setTimeout(() => el.remove(), 300); }, ms);
}

export function confirmBox(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    const box = h('div', { class: 'modal' },
      h('div', { class: 'modal-card' },
        h('p', {}, text),
        h('div', { class: 'row' },
          h('button', { class: 'btn', 'data-esc': '', onclick: () => { box.remove(); resolve(false); } }, 'Abbrechen'),
          h('button', { class: 'btn primary', 'data-primary': '', onclick: () => { box.remove(); resolve(true); } }, 'OK'))));
    bottom.append(box);
  });
}
