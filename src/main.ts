import './style.css';
import { loadSettings, tickPlaytime } from './state';
import { fit, root } from './ui/layout';
import { titleScreen } from './ui/game';
import { G } from './state';
import * as engine from './engine';
import * as data from './data';

// Für automatisierte Tests und Fehlersuche
(window as unknown as Record<string, unknown>).__eo = { get G() { return G; }, engine, data };

loadSettings();
document.getElementById('app')!.append(root);
fit();
titleScreen();
setInterval(tickPlaytime, 15_000);

// Tastatur: Enter/Leertaste = Hauptaktion, 1–9 = Antwortoptionen, Esc = zurück, M/Q/V/B = Menüs
window.addEventListener('keydown', (e) => {
  const tag = (e.target as HTMLElement)?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  const panel = document.querySelector('.screen.bottom')!;
  const modal = panel.querySelector('.modal');
  const scope = (modal ?? panel) as HTMLElement;
  const click = (sel: string) => {
    const el = [...scope.querySelectorAll<HTMLElement>(sel)].reverse().find((x) => !(x as HTMLButtonElement).disabled && x.offsetParent);
    if (el) { e.preventDefault(); el.click(); return true; }
    return false;
  };
  if (e.key === 'Enter' || e.key === ' ') click('[data-primary]');
  else if (/^[1-9]$/.test(e.key)) click(`[data-key="${e.key}"]`);
  else if (e.key === 'Escape') click('[data-esc]') || click('[data-hotkey="escape"]');
  else if (e.key.length === 1) click(`[data-hotkey="${e.key.toLowerCase()}"]`);
});

// Offline-Fähigkeit (PWA). In Vorschau-Umgebungen ohne Service-Worker-Unterstützung einfach überspringen.
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => undefined);
  });
}
