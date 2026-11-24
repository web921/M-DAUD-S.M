/* JasaDaud.online — service worker (ringan): halaman utama bisa dibuka cepat & offline.
   Naikkan VER setiap kali file website diubah agar cache lama dibuang. */
const VER = "jasadaud-ocean-v17";
const CORE = ["./", "index.html", "style.css?v=17", "sky.js?v=17", "deep.js?v=17", "script.js?v=17", "manifest.webmanifest", "favicon.png", "apple-touch-icon.png",
  "img/logo-128.webp", "img/logo-384.webp", "icons/icon-192.png", "icons/icon-512.png", "img/cloud1.webp", "img/cloud2.webp", "img/cloud3.webp", "img/caustic-v2.webp", "img/daud.webp", "img/grain.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VER).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const swr = req => caches.open(VER).then(c => c.match(req).then(hit => {
  const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r; }).catch(() => hit);
  return hit || net;
}));
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET" || req.headers.has("range") || /\.mp3$/i.test(new URL(req.url).pathname)) return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(VER).then(c => c.put("index.html", cp)); } return r; }).catch(() => caches.match("index.html").then(r => r || caches.match("./"))));
    return;
  }
  if (url.origin === location.origin || /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname)) e.respondWith(swr(req));
});
