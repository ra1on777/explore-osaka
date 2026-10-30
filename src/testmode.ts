// Versteckter Test-Strang: einschalten mit ?test=1 in der Adresse, ausschalten mit ?test=0.
// Die Einstellung bleibt im Browser gespeichert. Ohne sie existiert der Strang im Spiel nicht.
const KEY = 'exploreosaka.test';
function detect(): boolean {
  try {
    const p = new URLSearchParams(location.search).get('test');
    if (p === '1') localStorage.setItem(KEY, '1');
    if (p === '0') localStorage.removeItem(KEY);
    return localStorage.getItem(KEY) === '1';
  } catch { return false; }
}
export const TEST_MODE = detect();
export const TEST_QUEST = 'STRANG_TEST';
/** Schalter in den Einstellungen; die Seite lädt neu, weil die Strangliste beim Start feststeht. */
export function setTestMode(on: boolean) {
  try { if (on) localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY); } catch { /* ohne Speicher kein Test-Strang */ }
  location.reload();
}
