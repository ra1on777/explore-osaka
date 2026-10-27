// Service Worker: Bilder werden nach dem ersten Laden zwischengespeichert (offline spielbar),
// HTML/JS kommen bevorzugt frisch aus dem Netz.
const CACHE = 'exploreosaka-__V__';
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './app.js?v=__V__', './app.css?v=__V__', './manifest.webmanifest'])).catch(() => undefined));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isImg = /\.(webp|png|jpg|svg|woff2?)$/.test(url.pathname) || url.host.includes('fonts.g');
  if (isImg) {
    e.respondWith(caches.open(CACHE).then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') c.put(req, res.clone());
      return res;
    }));
  } else if (url.origin === location.origin) {
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  }
});
