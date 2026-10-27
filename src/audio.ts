// Einfache, synthetisch erzeugte Soundeffekte (keine Audiodateien nötig).
import { settings } from './state';

let ctx: AudioContext | null = null;
function ac(): AudioContext | null {
  if (!settings.sound) return null;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch { return null; }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.12) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

export const sfx = {
  tap: () => tone(880, 0, 0.06, 'triangle', 0.06),
  blip: () => tone(1320, 0, 0.025, 'square', 0.015),
  open: () => { tone(660, 0, 0.08, 'triangle', 0.08); tone(990, 0.06, 0.1, 'triangle', 0.07); },
  right: () => { tone(784, 0, 0.12, 'triangle'); tone(1175, 0.1, 0.2, 'triangle'); },
  wrong: () => { tone(220, 0, 0.18, 'sawtooth', 0.06); tone(185, 0.12, 0.22, 'sawtooth', 0.05); },
  done: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.3, 'triangle', 0.1)),
  travel: () => { tone(392, 0, 0.15, 'sine', 0.08); tone(523, 0.12, 0.15, 'sine', 0.08); tone(659, 0.24, 0.25, 'sine', 0.08); },
  find: () => { tone(1047, 0, 0.1, 'sine', 0.1); tone(1568, 0.08, 0.25, 'sine', 0.09); },
};
